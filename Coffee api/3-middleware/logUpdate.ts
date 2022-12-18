import { NextFunction, Request, Response } from "express";
import fs from "fs/promises";

const LOG_FILE = "./1-assets/activities.txt";

export  function logUpdate3(req : Request, res: Response, next : NextFunction) {
    console.log(`[Coffee Route]: User Want to update: ${+req.params.id}`);
    next();
};

export async function logRequest(req : Request, res: Response, next : NextFunction){
    let log = `[Coffee Route]: ${new Date()}: Method: ${req.method}: Route: ${req.originalUrl}: IP: ${req.ip}`
    //  console.log(log);
    
        await fs.appendFile(LOG_FILE ,(log + '\n'));
    next();
};

export async function checkAddProduct(price: number){
    // let log = `[Coffee Route]: ${new Date()}: Method: ${req.method}: Route: ${req.originalUrl}: IP: ${req.ip}`
    //  console.log(log);
    if(price === 0){
        console.log("Weeee - Free Coffee!");
    }
    // await fs.appendFile(LOG_FILE ,(log + '\n'));
}
;