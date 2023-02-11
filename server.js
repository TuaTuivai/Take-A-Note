const express = require('express');
const path = require("path");
const fs = require("fs");
const app = express()

// middlewares
// for static asset loading
app.use(express.static("public"));

// for body encoding -> post requests
app.use(express.urlencoded({extended: false}))
// for json
app.use(express.json());


// routes
app.get("/notes", (req, res) => {
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

// post 
app.post("/api/notes", (req, res) => {
    // add the data to the notes
    console.log(req.body);

    fs.readFile("./db/db.json", "UTF8", (err, data) => {
        if(err) {
            console.log("There is an error!")
            return;
        }

        const notes = JSON.parse(data)

        console.log("Notes before push")
        console.log(notes);
        console.log("======")

        notes.push(req.body);

        console.log("Notes after push")
        console.log(notes)

        fs.writeFile("./db/db.json", JSON.stringify(notes), () => {
            console.log("File overwritten successfully!")
            
            res.status(200).end();
        } )
    })
});

app.delete("/api/notes/:id", (req, res) => {
    fs.readFile("./db/db.json", "UTF8", (err, data) => {
      if (err) {
        console.log("There is an error!");
        return;
      }
  
      let notes = JSON.parse(data);
  
      notes = notes.filter((note) => note.id !== req.params.id);
  
      fs.writeFile("./db/db.json", JSON.stringify(notes), () => {
        console.log("Note deleted successfully!");
        res.status(200).end();
      });
    });
  });
  

app.listen(3001, () => {
    console.log("Server is running on PORT 3001!")
})