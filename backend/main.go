package main

import (
	"encoding/json"
	"math/rand"
	"net/http"
	"time"
)

type Exercise struct {
	Name  string `json:"name"`
	Count int    `json:"count"`
}

var exercises = []string{"腕立て伏せ", "腹筋", "背筋", "腿上げ", "懸垂"}

func getRandomExercises(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	var randomExercises []Exercise
	for _, exercise := range exercises {
		count := rand.Intn(100) + 1
		randomExercises = append(randomExercises, Exercise{Name: exercise, Count: count})
	}

	json.NewEncoder(w).Encode(randomExercises)
}

func main() {
	rand.Seed(time.Now().UnixNano())
	http.HandleFunc("/exercises", getRandomExercises)
	http.ListenAndServe(":8080", nil)
}
