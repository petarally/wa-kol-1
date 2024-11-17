import express from "express";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

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
  const { ime, prezime } = req.query;
  if (ime) {
    data = data.filter(
      (korisnik) => korisnik.ime.toLowerCase() === ime.toLowerCase()
    );
  }

  if (prezime) {
    data = data.filter(
      (korisnik) => korisnik.prezime.toLowerCase() === prezime.toLowerCase()
    );
  }
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
  res.status(200).json(data);
});

// Zadatak 4
function addNewUser(novi) {
  let data = readData("data.json");
  const id_postoji = data.some((korisnik) => korisnik.id === novi.id);
  if (id_postoji) {
    return { status: 400, message: "Korisnik s tim ID-om već postoji!" };
  }
  data.push(novi);
  fs.writeFileSync("data.json", JSON.stringify(data));
  return { status: 200, data: data };
}

app.post("/zadatak4", (req, res) => {
  const body = req.body;
  const result = addNewUser(body);
  if (result.status === 400) {
    return res.status(400).send(result.message);
  }
  res.status(200).json(result.data);
});

// Zadatak 5
app.get("/korisnici/:id", (req, res) => {
  const id = req.params.id;
  let data = readData("data.json");

  const korisnik = data.find((korisnik) => korisnik.id === id);
  if (!korisnik) {
    return res.status(404).send("Korisnik nije pronađen!");
  }
  res
    .status(200)
    .json({ korisnik, message: `Uspješno dohvaćen korisnik s id-em ${id}` });
});

// Zadatak 5
app.post("/zadatak5", (req, res) => {
  const body = req.body;
  const data = readData("data.json");
  const lastID = Number(data[data.length - 1].id);
  console.log(typeof lastID);
  console.log(typeof body.id);
  body.id = String(lastID + 1);
  data.push(body);
  res.status(200).json(data);
});

// Zadatak 6
app.post("/protected", (req, res) => {
  const apiKljuc = req.query.API_KEY;
  const validApiKey = process.env.API_KEY;
  if (apiKljuc === validApiKey) {
    res.status(200).send("Super secret protected content!!!");
  } else {
    res.status(403).send("Nemate pristup ovom sadržaju!");
  }
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
