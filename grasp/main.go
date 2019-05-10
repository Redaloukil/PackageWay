package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"time"
)

type Parcel struct {
	Id        int     `json:"id"`
	Title     string  `json:"title"`
	Body      string  `json:"body"`
	Longitude float32 `json:"longitude"`
	Latitude  float32 `json:"latitude"`
}

type Foo struct {
	Bar string
}


type Parcels struct {
	Parcels []Parcel `json:"parcels"`
}

var myClient = &http.Client{Timeout: 10 * time.Second}

// getJSON fetches the contents of the given URL
// and decodes it as JSON into the given result,
// which should be a pointer to the expected data.
func getJSON(url string, result interface{}) error {
	resp, err := http.Get(url);
	if err != nil {
		return fmt.Errorf("cannot fetch URL %q: %v", url, err);
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("unexpected http GET status: %s", resp.Status);
	}
	// We could check the resulting content type
	// here if desired.
	resp_body, err := ioutil.ReadAll(resp.Body)
	err = json.Unmarshal(resp_body ,&result);
	if err != nil {
		return fmt.Errorf("cannot decode JSON: %v", err);
	}
	return nil
}

func main() {
	var client http.Client

	var parcels Parcels


	const URL = "https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?origins=42.6044,-122.3345&destinations=45.5347,-122.6231&travelMode=driving&key=Ag4-ntJPWr3g6dGfBtudAzHyCoCwjaqpkmaaz3uNyU_bPoBf-4D6Cwisl_GwgNMe"

	resp, err := client.Get("http://127.0.0.1:8000/packages/")
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	byteValue, _ := ioutil.ReadAll(resp.Body)

	json.Unmarshal(byteValue, &parcels.Parcels)

	for i := 0; i < len(parcels.Parcels); i++ {
		fmt.Printf("Packages latitude :%d\n", parcels.Parcels[i].Id)
		fmt.Printf("Packages latitude :%f , Packages longitude : %f \n", parcels.Parcels[i].Latitude, parcels.Parcels[i].Longitude)
		fmt.Printf("##########################\n")
	}

	//local search

	//from the constructed path

	result := Foo{}

	getJSON(URL,&result);

	fmt.Println(result);


}



//local search

//   repeat until no improvement is made {
//      start_again:
//      best_distance = calculateTotalDistance(existing_route)
//      for (i = 1; i < number of nodes eligible to be swapped - 1; i++) {
//          for (k = i + 1; k < number of nodes eligible to be swapped; k++) {
//              new_route = 2optSwap(existing_route, i, k)
//              new_distance = calculateTotalDistance(new_route)
//              if (new_distance < best_distance) {
//                  existing_route = new_route
//                  best_distance = new_distance
//                  goto start_again
//              }
//          }
//      }
//  }