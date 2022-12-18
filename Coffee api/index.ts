import express, { json } from "express";
import { logRequest } from "./3-middleware/logUpdate";
import { AuthRouter } from "./6-controllers/auth";
import { CoffeeRouter } from "./6-controllers/coffee-products";


const server = express();

server.use(json())
server.use(logRequest);
server.use("/api", CoffeeRouter);
server.use("/api", AuthRouter);

server.listen(3000, () => {
    console.log("listening to port 3000");
})