import fs from "fs/promises";
import { CoffeeProductModel } from "../4-models/CoffeProductModel";
import { UserModel } from "../4-models/UserModel";


const PRODUCT_FILE: string = "./1-assets/coffeeProducts.json"
const USERS_FILE: string = "./1-assets/users.json"

export async function getAllProducts(): Promise <CoffeeProductModel[]>{
    const products = await fs.readFile(PRODUCT_FILE);   
    return JSON.parse(products.toString());
}

export async function saveAllProducts(products: CoffeeProductModel[]) {
    await fs.writeFile(PRODUCT_FILE, JSON.stringify(products, null, 2));
}

// users
export async function getAllUsers(): Promise <UserModel[]>{
    const users = await fs.readFile(USERS_FILE);   
    return JSON.parse(users.toString());
}

export async function saveAllUsers(users: UserModel[]) {
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}

export const dal = {getAllProducts, saveAllProducts, getAllUsers, saveAllUsers}