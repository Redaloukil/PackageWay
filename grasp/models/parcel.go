package models

type Parcel struct {
	Id        int		`json:"id"`
	Title     string	`json:"title"`
	Body      string	`json:"body"`
	Longitude float32	`json:"longitude"`
	Largitude float32	`json:"largitude"`
}

type Parcels struct {
	Parcels []Parcel	`json:"parcels"`
}




