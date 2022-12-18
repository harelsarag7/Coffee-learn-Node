import { NextFunction, Request, Response } from "express";
import { decode, verify } from "jsonwebtoken";
import { UserModel } from "../4-models/UserModel";
import { getUser } from "../5-logic/users-logic";

export async function verifyUser(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization.substring(7);
    if(!token){
        res.status(401).json("Please insert token");
        return;
    }; 
    try {
        const jwt = require("jsonwebtoken");

        // const decoded = jwt.verify(token, "your secret or key");  
        // const decoded_jwt = jwt.decode(token);
// console.log(decoded_jwt);

        const {sub} = decode(token);
        console.log(sub);
        // const { id } = decoded_jwt
        // const {  password, username } = await getUser(+id);
        // verify(token, password);
       

    //    console.log("username: " + username);
       
       
    } catch(e){
        console.log("Sorry not verified");
    }
    next();
}