import express from 'express';

const app = express();
app.use("/", express.static("public"));
app.use("resources", express.static("resources"));

app.listen(3000, () => {
    console.log("Game of Life Server listening on Port #3000.");
});

