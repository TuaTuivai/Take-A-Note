const express = require('express');
const path = require("path");
const fs = require("fs");
const app = express()

// middlewares
// for static asset loading
app.use(express.static("public"));

// for body encoding -> post requests
// app.use(express.urlencoded({extended: false}))

// for json
// app.use(express.json());


// routes
app.get("/notes", (req, res) => {
    console.log(req.body)
    // res.send("Hi!")
    res.sendFile(path.join(__dirname, "./public/notes.html"))
})

app.get("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", "UTF8", (err, data) => {
        if(err) {
            console.log("There is an error!")
            return;
        }

        const notes = JSON.parse(data)
        res.json(notes)
    })
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))

})


app.listen(3001, () => {
    console.log("Server is running on PORT 3001!")
})