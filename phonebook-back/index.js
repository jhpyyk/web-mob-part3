const express = require("express");
const expr = express();
const bodyParser = require("body-parser");
const cors = require("cors");

expr.use(bodyParser.json());
expr.use(cors());
expr.use(express.static("build"));

let persons = [
  {
    name: "Martti Tienari",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Arto Järvinen",
    number: "040-123456",
    id: 2,
  },
  {
    name: "Lea Kutvonen",
    number: "040-123456",
    id: 3,
  },
];

expr.get("/api/persons", (req, res) => {
  res.json(persons);
});

expr.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

expr.post("/api/persons", (request, response) => {
  const body = request.body;

  if (body.name.length === 0) {
    return response.status(400).json({ error: "Name missing." });
  } else if (body.number.length === 0) {
    return response.status(400).json({ error: "Number missing." });
  } else if (isPersonInList(body.name) !== -1) {
    return response
      .status(400)
      .json({ error: "Person already in list. Name must be unique." });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 10000),
  };

  persons = persons.concat(person);

  response.json(person);
});

const isPersonInList = (name) => {
  return persons.findIndex((person) => person.name === name);
};

expr.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

const PORT = process.env.PORT || 3001;
expr.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
