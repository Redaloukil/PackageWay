package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

type Parcel struct {
	User		User	`json:"id"`
	Id        	int		`json:"id"`
	Title     	string	`json:"title"`
	Body      	string	`json:"body"`
	Longitude 	float32	`json:"longitude"`
	Largitude 	float32	`json:"largitude"`
}

type Parcels struct {
	Parcels 	[]Parcel	`json:"parcels"`
}

type User struct {
	Id			int			`json:"parcels"`
	Username 	string		`json:"parcels"`
	FirstName	string		`json:"parcels"`
	LastName	string		`json:"parcels"`
}

func main() {
	var client http.Client

	resp, err := client.Get("http://127.0.0.1:8000/parcels/")
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()


	var parcels Parcels

	byteValue, _ := ioutil.ReadAll(resp.Body)

	json.Unmarshal(byteValue ,&parcels.Parcels)


	 for i:=0 ; i < len(parcels.Parcels); i++ {
	 	fmt.Println("Parcel Title: " + parcels.Parcels[i].Title)
	}


}
