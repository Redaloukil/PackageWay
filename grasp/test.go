package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
)

func main() {

	// User struct which contains a name
	// a type and a list of social links
	type Parcel struct {
		Latitude  float64 `json:"latitude"`
		Longitude float64 `json:"longitude"`
	}

	type Parcels struct {
		Parcels []Parcel `json:"Parcels"`
	}

	// Open our jsonFile
	// jsonFile, err := os.Open("test.json")
	// // if we os.Open returns an error then handle it
	// if err != nil {
	// 	fmt.Println(err)
	// }
	// fmt.Println("Successfully Opened users.json")
	// // defer the closing of our jsonFile so that we can parse it later on
	// defer jsonFile.Close()

	// byteValue, _ := ioutil.ReadAll(jsonFile)

	// var parcels Parcels

	// json.Unmarshal(byteValue, &parcels)

	plan, _ := ioutil.ReadFile("test.json")

	var parcels Parcels

	err := json.Unmarshal(plan, &parcels.Parcels)

	if err != nil {
		fmt.Println(err)
	}

	for i := 0; i < len(parcels.Parcels); i++ {

		fmt.Println(parcels.Parcels[i].Latitude)
		fmt.Println(parcels.Parcels[i].Longitude)

	}

}
