import { dal } from "../2-utils/dal";
import { CoffeeProductModel } from "../4-models/CoffeProductModel";


export async function getProducts() {
 return dal.getAllProducts();
}

export async function getProduct(id: number): Promise <CoffeeProductModel> {
    const products = await dal.getAllProducts();
    const product = products.find(p => p.id === id);

    return product;
}

export async function addProduct(code: number, type: string, price: number, strength: number) {
    const products = await getProducts();

    const id = Math.max(...(await products).map(p => p.id)) + 1;

    const product: CoffeeProductModel =  {
        id,
        code,
        type,
        price,
        strength
    };
    products.push(product);

    await dal.saveAllProducts(products);

    return product;
}


export async function editProduct(productToUpdate: CoffeeProductModel) {


    const products = await getProducts();
    const product = products.find(p => p.id === productToUpdate.id);

    product.code = productToUpdate.code;
    product.price = productToUpdate.price;
    product.type = productToUpdate.type;
    product.strength = productToUpdate.strength;


    await dal.saveAllProducts(products);
    return product;
}


export async function deleteProduct(id: number) {
    let products = getProducts();

    const productsAfterDel = (await products).filter(p => p.id !== id);

     await dal.saveAllProducts(productsAfterDel);
}


export async function getProductsMaxPrice(num: number) {
    let products = await getProducts();

    let sortedProducts = products.filter(p => p.price < num);

    return sortedProducts;
}

export async function getProductsBetweenPrice(min: number, max: number) {
    let products = await getProducts();

    let sortedProducts = products.filter(p => p.price < max && p.price > min);

    return sortedProducts;
}

export async function getProductsByStrength(num: number) {
    let products = await getProducts();

    let sortedProducts: CoffeeProductModel[] = products.filter(p => p.strength === num);
        if (sortedProducts.length === 0){
            return;
        }
    return sortedProducts;
}