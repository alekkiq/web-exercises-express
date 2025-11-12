import express from "express";

const HOST = "localhost";
const PORT = 3000;

const app = express();

app.use(express.static());

const cats = [
  {
    cat_id: 1,
    name: "Kissa",
    birthdate: "2024-01-10",
    weight: 5,
    owner: "Aleksi",
    image: ""
  },
  {
    cat_id: 2,
    name: "Assik",
    birthdate: "2024-10-01",
    weight: 3,
    owner: "Mikko",
    image: ""
  },
]

app.get('/api/v1/cat', (req, res) => {
  res.send("moi");
});

app.listen(PORT, HOST, () => {
  console.log(`Server running at ${HOST}:${PORT}`);
});
