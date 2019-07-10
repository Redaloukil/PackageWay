package main

import "fmt"

func main(){

	primes := []int{2, 3, 5, 7, 11, 13}

	i := 4
	primes = append(primes[:i], primes[i+1:]...)

	for i:=0;i< len(primes);i++{
		fmt.Printf("%d",primes[i])
	}
}
