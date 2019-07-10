package models

type Parcel struct {
	Id        int     `json:"id"`
	Title     string  `json:"title"`
	Body      string  `json:"body"`
	Longitude float64 `json:"longitude"`
	Latitude  float64 `json:"latitude"`
}

type Parcels struct {
	Parcels []Parcel `json:"parcels"`
}

type Position struct {
	Latitude float64  `json:"latitude"`
	Longitude float64 `json:"longitude"`
}




