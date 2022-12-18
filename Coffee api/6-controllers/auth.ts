import express from "express";
import { UserModel } from "../4-models/UserModel";
import { getAllUsersFromLogic, loginLogic, registerLogic } from "../5-logic/users-logic";
import * as jwt from "jsonwebtoken";


export const AuthRouter = express.Router();

AuthRouter.post("/register", async (req, res) => {
    const userBody: UserModel = req.body;
    // logic function    
    // let { firstName, lastName, username, password }: UserModel = req.body;
    // userBody.id = id

    // const token = jwt.sign({ userId: user._id }, 'your_jwt_secret');
    let token = jwt.sign({ "sub": userBody.id , "username": userBody.username, "password": userBody.password, "id": userBody.id}, userBody.password, { expiresIn : "2h"} )
// var token = jwt.sign({ foo: 'bar' }, 'shhhhh');


    await registerLogic(userBody)
    // const user = await registerLogic(firstName, lastName, username, password)
    console.log(userBody);
    console.log(token);
    
    res.status(200).json(token)
});
AuthRouter.post("/login", async (req, res) => {
    const userBody: UserModel = req.body;
    const users = await getAllUsersFromLogic();
    let user = users.find(u => u.username === userBody.username && u.password === userBody.password);

    if(user){

        let token = jwt.sign({"username": userBody.username}, userBody.password, { "expiresIn" : "2h"});
        // await loginLogic(userBody)
        res.status(200).json(token);
    } else {
        res.send(400).json("Please register");
    }
});

