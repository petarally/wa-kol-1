import express from "express";
import fs from "fs";

const app = express();

function readData(file) {
  const data = fs.readFileSync(file);
  if (!data) {
    return "Datoteka nije pronađena!";
  }
  return JSON.parse(data);
}

app.get("/", (req, res) => {
  res.send("Pozdrav, Petar Prenc!");
});

app.get("/korisnici", (req, res) => {
  res.send(readData("data.json"));
});

/*
var = {id, ime, prezime} - memorija

var2 = [{}, {}, {}] - memorija
var2 = [{}, {}, {}, var] - memorija
*/

app.post("/korisnici", (req, res) => {
  req.on("data", (data) => {
    console.log(data);
    const body = JSON.parse(data);
    console.log(typeof body);
    const users = readData("data.json");
    users.push(body);
    fs.writeFileSync("data.json", JSON.stringify(users));
    res.send(users);
  });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
