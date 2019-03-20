package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"grasp/models/parcel.go"
	)




func main() {
	var client http.Client

	resp, err := client.Get("http://127.0.0.1:8000/users/")
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()
	parcels := map[string]models.Parcel{}
	err := json.Unmarshal([]byte(resp.Body), &parcels)
	if err != nil {
		panic(err)
	}
	fmt.Println(m)




}