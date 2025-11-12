import express from "express";

const HOST = "localhost";
const PORT = 3000;

const app = express();

app.use('/public', express.static('public'));

const cats = [
  {
    cat_id: 1,
    name: "Kissa",
    birthdate: "2024-01-10",
    weight: 5,
    owner: "Aleksi",
    image: "https://loremflickr.com/320/240/cat"
  },
  {
    cat_id: 2,
    name: "Assik",
    birthdate: "2024-10-01",
    weight: 3,
    owner: "Mikko",
    image: "https://loremflickr.com/320/240/cat"
  },
]

app.get('/', (req, res) => {
  res.send('Welcome to my REST API!');
});

app.get('/api/v1/cats', (req, res) => {
  res.json(cats);
});

app.get('/api/v1/cat/:id', (req, res) => {
  const id = Number.parseInt(req.params.id);
  const cat = cats.find((cat) => cat.cat_id === id);

  if (!cat) res.sendStatus(404);

  res.json(cat);
});

app.listen(PORT, HOST, () => {
  console.log(`Server running at ${HOST}:${PORT}`);
});