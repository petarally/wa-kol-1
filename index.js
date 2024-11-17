import express from "express";
import fs from "fs";

const app = express();
app.use(express.json());

function readData(file) {
  const data = fs.readFileSync(file, "utf-8");
  if (!data) {
    return "Datoteka nije pronađena!";
  }
  return JSON.parse(data);
}

// Zadatak 1
app.get("/", (req, res) => {
  res.send("Pozdrav, Petar Prenc!");
});

// Zadatak 2
app.get("/korisnici", (req, res) => {
  let data = readData("data.json");
  res.send(data);
});

// Zadatak 3
app.post("/korisnici", (req, res) => {
  const body = req.body;
  console.log(body);
  let data = readData("data.json");
  const kljucevi = Object.keys(data[0]);
  console.log(kljucevi);
  for (let atribut of kljucevi) {
    if (!body[atribut]) {
      return res.status(400).send(`Greška! Nedostaje atribut ${atribut}!`);
    }
  }
  data.push(body);
  fs.writeFileSync("data.json", JSON.stringify(data));
  res.json(data);
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
