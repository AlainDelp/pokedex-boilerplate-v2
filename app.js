const express = require("express");
const morgan = require("morgan");
const pokeBank = require("./pokeBank");
const pokeList = require("./views/pokeList");
const pokeDetails = require("./views/pokeDetails");
const db = require("./db")

const app = express();

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));

(async () => {
  try {
    await db.sync({force:true});
    console.log("Models synced with database");
  } catch (error) {
    console.error(error);
  }
})();


app.get("/", (req, res) => {
  const pokemon = pokeBank.list();
  res.send(pokeList(pokemon));
});

app.get("/pokemon/:id", (req, res) => {
  const pokemon = pokeBank.find(req.params.id);
  res.send(pokeDetails(pokemon));
});
const Pokemon = require("./models/Pokemon");

app.get("/pokemon", async (req, res) => {
  const pokemon = await Pokemon.findAll();
  res.json(pokemon);
});

app.get("/pokemon/:id", async (req, res) => {
  const pokemon = await Pokemon.findByPk(req.params.id);
  if (pokemon) {
    res.json(pokemon);
  } else {
    res.status(404).send("Pokemon not found");
  }
});

app.post("/pokemon", async (req, res) => {
  const newPokemon = await Pokemon.create(req.body);
  res.json(newPokemon);
});

app.put("/pokemon/:id", async (req, res) => {
  const pokemon = await Pokemon.findByPk(req.params.id);
  if (pokemon) {
    await pokemon.update(req.body);
    res.json(pokemon);
  } else {
    res.status(404).send("Pokemon not found");
  }
});

app.delete("/pokemon/:id", async (req, res) => {
  const pokemon = await Pokemon.findByPk(req.params.id);
  if (pokemon) {
    await pokemon.destroy();
    res.status(204).send();
  } else {
    res.status(404).send("Pokemon not found");
  }
});

const PORT = 2000;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});