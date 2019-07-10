package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"math/rand"
	"net/http"
	"strconv"
	"time"

	"github.com/gorilla/mux"

	"github.com/tidwall/gjson"
)

type Parcel struct {
	Latitude  float64 `json:"latitude"`
	Longitude float64 `json:"longitude"`
}

type SelectedParcel struct {
	parcel Parcel `json:"parcels"`
	index  int    `json:"index"`
}

type Parcels struct {
	Parcels []Parcel `json:"parcels"`
}

type Position struct {
	Latitude  float64 `json:"latitude"`
	Longitude float64 `json:"longitude"`
}

type Rcl struct {
	Parcels []SelectedParcel `json:"rcl"`
}

const URL = "https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?origins=42.6044,-122.3345&destinations=45.5347,-122.6231&travelMode=driving&key=Ag4-ntJPWr3g6dGfBtudAzHyCoCwjaqpkmaaz3uNyU_bPoBf-4D6Cwisl_GwgNMe"
const URL2 = "https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?origins=%s&destinations=%s&travelMode=driving&key=Ag4-ntJPWr3g6dGfBtudAzHyCoCwjaqpkmaaz3uNyU_bPoBf-4D6Cwisl_GwgNMe"

func evaluateCost(startPosition Position, parcel Parcel) float64 {
	var client http.Client

	url := buildUrl(startPosition, parcel)

	response, err := client.Get(url)
	if err != nil {
		panic(err)
	}
	defer response.Body.Close()
	bValue, _ := ioutil.ReadAll(response.Body)
	myJson := string(bValue)
	data := gjson.Parse(myJson).Value().(map[string]interface{})

	resources := data["resourceSets"]

	duration_f := resources.([]interface{})[0].(map[string]interface{})["resources"].([]interface{})[0].(map[string]interface{})["results"].([]interface{})[0].(map[string]interface{})["travelDuration"].(float64)

	return duration_f
}

func calculateMax(startPosition Position, parcels Parcels) float64 {
	max := evaluateCost(startPosition, parcels.Parcels[0])
	for i := 1; i < len(parcels.Parcels); i++ {
		cost := evaluateCost(startPosition, parcels.Parcels[i])
		if cost > max {
			max = evaluateCost(startPosition, parcels.Parcels[i])
		}
	}
	return max
}

func calculateMin(startPosition Position, parcels Parcels) float64 {
	min := evaluateCost(startPosition, parcels.Parcels[0])
	for i := 1; i < len(parcels.Parcels); i++ {
		if evaluateCost(startPosition, parcels.Parcels[i]) < min {
			min = evaluateCost(startPosition, parcels.Parcels[i])
		}
	}
	return min
}

func composeRcl(startPosition Position, parcels Parcels, rcl *Rcl) SelectedParcel {

	min := calculateMin(startPosition, parcels)
	max := calculateMax(startPosition, parcels)

	//asynchronize goroutines
	evaluationConst := min + 0.4*(max-min)

	for i := 0; i < len(parcels.Parcels); i++ {
		//calculate cost
		cost := evaluateCost(startPosition, parcels.Parcels[i])
		if cost >= evaluationConst {

			var selectedP SelectedParcel
			selectedP.parcel = parcels.Parcels[i]
			selectedP.index = i
			rcl.Parcels = append(rcl.Parcels, selectedP)
		}
	}
	//select random element from restricted candidates list
	rand.Seed(time.Now().Unix())
	random := rand.Intn(len(rcl.Parcels) - 0)

	return rcl.Parcels[random]
}

func GraspConstructionPhase(parcels *Parcels, path *Parcels) {

	var startPosition Position

	var Rcl Rcl

	startPosition.Latitude = 35.6763996
	startPosition.Longitude = -0.61886867

	for len(parcels.Parcels) > 0 {

		sParcel := composeRcl(startPosition, *parcels, &Rcl)

		var selectedParcel Parcel
		selectedParcel.Latitude = sParcel.parcel.Longitude
		selectedParcel.Longitude = sParcel.parcel.Latitude

		path.Parcels = append(path.Parcels, selectedParcel)

		//delete element from Parcel
		parcels.Parcels = append(parcels.Parcels[:sParcel.index], parcels.Parcels[sParcel.index+1:]...)

		startPosition.Latitude = sParcel.parcel.Latitude
		startPosition.Longitude = sParcel.parcel.Longitude

		Rcl.Parcels = Rcl.Parcels[:0]
	}

}

func LocalSearch(parcels Parcels) {

}

func GetPath(parcels *Parcels, path *Parcels) {

	fmt.Println("#########getting all the parcels#########")
	file, err := ioutil.ReadFile("test.json")

	err = json.Unmarshal(file, &parcels.Parcels)

	if err != nil {
		panic(err)
	}

	if err != nil {
		fmt.Println(err)
	}

	for i := 0; i < len(parcels.Parcels); i++ {

		fmt.Println(parcels.Parcels[i].Latitude)
		fmt.Println(parcels.Parcels[i].Longitude)

	}

	fmt.Println("#########Start Grasp method#########")
	GraspConstructionPhase(parcels, path)

	for i := 0; i < len(path.Parcels); i++ {

		fmt.Println(path.Parcels[i].Latitude)
		fmt.Println(path.Parcels[i].Longitude)

	}

}

func floattostr(input_num float64) string {
	// to convert a float number to a string
	return strconv.FormatFloat(input_num, 'g', -1, 64)
}

func buildUrl(position Position, destination Parcel) string {
	positionOrigin := fmt.Sprintf("%s,%s", floattostr(position.Latitude), floattostr(position.Longitude))
	destinationOrigin := fmt.Sprintf("%s,%s", floattostr(destination.Latitude), floattostr(destination.Longitude))
	return fmt.Sprintf(URL2, positionOrigin, destinationOrigin)
}

var myClient = &http.Client{Timeout: 10 * time.Second}

func optSwap(route Parcels, i int, k int) Parcels {

	return route
}

func CallGetPath(writer http.ResponseWriter, request *http.Request) {
	var parcels Parcels
	var path Parcels
	GetPath(&parcels, &path)
	//local search
	//repeat until no improvement is made {

	// i := 0
	// k := 0
	// for i = 1; i < len(path.Parcels)-1; i++ {
	// 	for k = i + 1; k < len(path.Parcels); k++ {
	// 		new_route := optSwap(route, i, k)
	// 		new_distance := calculateTotalDistance(new_route)
	// 		if new_distance < best_distance {
	// 			existing_route = new_route
	// 			best_distance = new_distance
	// 			goto start_again
	// 		}
	// 	}
	// }

	response, err := json.Marshal(path.Parcels)
	if err != nil {
		panic(err)
	}
	fmt.Fprintf(writer, string(response))

}

func main() {

	r := mux.NewRouter().StrictSlash(true)
	r.HandleFunc("/grasp", CallGetPath)
	http.ListenAndServe(":8000", r)

}
