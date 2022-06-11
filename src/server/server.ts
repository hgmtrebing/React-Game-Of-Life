import express from 'express';
import path from 'path';

/**
 * Starts a Web Server to serve the Game of Life frontend.
 * @param port the TCP Port that the Web Server should listen on.
 */
function runServer(port: number) {
    const app = express();
    app.use("/", express.static("public"));
    app.use("resources", express.static("resources"));

    var distPath = path.join(__dirname, "../dist")
    app.use("/dist", express.static(distPath));

    app.listen(port, () => {
        console.log("Game of Life Server listening on Port #" + port + "!");
    });
}

runServer(3000);

