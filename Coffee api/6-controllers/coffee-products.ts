import express, { request, response } from "express";
import { checkAddProduct, logUpdate3 } from "../3-middleware/logUpdate";
import { verifyUser } from "../3-middleware/verifyUser";
import { CoffeeProductModel } from "../4-models/CoffeProductModel";
import { addProduct, deleteProduct, editProduct, getProduct, getProducts, getProductsBetweenPrice, getProductsByStrength, getProductsMaxPrice } from "../5-logic/products-logic";




export const CoffeeRouter = express.Router();

CoffeeRouter.get("/products", verifyUser, async (req, res) => {
    
    const products = await getProducts();
    res.json(products);
});

CoffeeRouter.get("/product/:id", async (req, res) => {
    const { id } = req.params;
    const product = await getProduct(+id);

    if(!product) {
        res.sendStatus(404);
    };
    res.send(product);
});

CoffeeRouter.post("/product/add", async (req, res) => {
    const code = req.body.code;
    const type = req.body.type;
    const price = req.body.price;
    const strength = req.body.strength;
    

    checkAddProduct(+price);
    const product = await addProduct(code,type, price, strength);
    res.json(product);
});

CoffeeRouter.put("/product/:id", logUpdate3, async (req, res) => {
    let id = +req.params.id;
    let { type } = req.body;
    let code = +req.body.code;
    let strength = +req.body.strength;
    let price = +req.body.price;
    let product = {
        id,
        code,
        type,
        strength,
        price
    };
    let updateProduct = await editProduct(product);
    
    res.json(product);
});

CoffeeRouter.delete("/product/:id", async (req, res) => {
    let id = +req.params.id;
    const product = await deleteProduct(id);

    res.send("Product Deleted").sendStatus(200);
})


CoffeeRouter.get("/products/max/:num", async (req, res) => {
    let num = +req.params.num;

    let sortedProducts = await getProductsMaxPrice(num);

    res.json(sortedProducts);
    return sortedProducts;
});


CoffeeRouter.get("/products/btw/:min/:max", async (req, res) => {
    let min = +req.params.min;
    let max = +req.params.max;
    
    let sortedProducts = await getProductsBetweenPrice(min, max);
    
    res.json(sortedProducts).sendStatus(200);
    return sortedProducts;
});


CoffeeRouter.get("/products/strength/:num", async (req, res) => {
    try {
        let num = +req.params.num;
        let sortedProducts: CoffeeProductModel[] = await getProductsByStrength(num);
        res.json(sortedProducts)
        return sortedProducts;
    } catch(e){
        console.log(e);
    }
});