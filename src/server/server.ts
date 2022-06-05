import express from 'express';
import path from 'path';

const app = express();
app.use("/", express.static("public"));
app.use("resources", express.static("resources"));

var distPath = path.join(__dirname, "../dist")
app.use("/dist", express.static(distPath));

app.listen(3000, () => {
    console.log("Game of Life Server listening on Port #3000!");
});

