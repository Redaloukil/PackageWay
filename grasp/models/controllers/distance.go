package controllers

import (
	"backend/models"
	"fmt"
	"github.com/tidwall/gjson"
	"io/ioutil"
	"net/http"
	"strconv"
)

var client http.Client

const URL = "https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?origins=42.6044,-122.3345&destinations=45.5347,-122.6231&travelMode=driving&key=Ag4-ntJPWr3g6dGfBtudAzHyCoCwjaqpkmaaz3uNyU_bPoBf-4D6Cwisl_GwgNMe"
const URL2 = "https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?origins=%s&destinations=%s&travelMode=driving&key=Ag4-ntJPWr3g6dGfBtudAzHyCoCwjaqpkmaaz3uNyU_bPoBf-4D6Cwisl_GwgNMe"

func floattostr(input_num float64) string {

	// to convert a float number to a string
	return strconv.FormatFloat(input_num, 'g', -1, 64)
}

func buildUrl(position Position, destination Parcel) string {
	positionOrigin := fmt.Sprintf("%s,%s" , floattostr(position.Latitude) ,floattostr(position.Longitude));
	destinationOrigin := fmt.Sprintf("%s,%s" , floattostr(destination.Latitude) , floattostr(destination.Longitude) );
	return fmt.Sprintf(URL2, positionOrigin , destinationOrigin);
}



func getDistance(startPostion Position , parcels Parcels){
	response, err := client.Get(URL)
	if err != nil {
	panic(err)
	}
	defer response.Body.Close()
	bValue, _ := ioutil.ReadAll(response.Body)

	myJson := string(bValue)
	data := gjson.Parse(myJson).Value().(map[string]interface{})

	resources := data["resourceSets"]
	fmt.Println("" + buildUrl( startPostion , parcels.Parcels[i]))
	distance := resources.([]interface{})[0].(map[string] interface{})["resources"].([]interface{})[0].(map[string] interface{})["results"].([]interface{})[0].(map[string] interface{})["travelDuration"]
	println(distance)
}
