import fs from "fs";

export class ProductManagers {

    constructor(path) {
        this.path = path;
    }

    getProducts() {
        return getFromFile(this.path);
    }

    async addProduct(data) {
        const { title, description, price, thumbnail, code, stock } = data;
        const products = await getFromFile(this.path);
        let validacion = this.validarProducto(products, title, description, price, thumbnail, code, stock);
        if (validacion) {
            products.push(
                {
                    id: (products.length > 0 ? this.getIdAvailable(products) : 1),
                    title: title,
                    description: description,
                    price: price,
                    thumbnail: thumbnail,
                    code: code,
                    stock: stock
                }
            );
            await saveInFile(this.path, products);
            console.log("Product is added successfully")
        }
    }

    async updateProducts(id, data) {
        const { title, description, price, thumbnail, code, stock } = data;
        const products = await getFromFile(this.path);
        const position = products.findIndex((prod) => prod.id === id);
        if (position === -1) {
            throw new Error("Product not Found");
        }

        if (title) {
            products[position].title = title;
        }
        if (description) {
            products[position].description = description;
        }
        if (price) {
            products[position].price = price;
        }
        if (thumbnail) {
            products[position].thumbnail = thumbnail;
        }
        if (code) {
            products[position].code = code;
        }
        if (stock) {
            products[position].stock = stock;
        }

        await saveInFile(this.path, products);

        console.log("User successfully updated")

    }

    async getProductById(id) {
        const products = await getFromFile(this.path);
        const productFind = products.find((prod) => prod.id === id);
        return productFind || "Product not Found";
    }

    async deleteProduct(id) {
        const products = await getFromFile(this.path);
        const productFind = products.find((prod) => prod.id === id);
        if (productFind) {
            const productSave = products.filter((prod) => prod.id != id);
            await saveInFile(this.path, productSave);
            console.log("User successfully deleteded");
        } else {
            throw new Error("Product not Found");
        }
    }

    validarProducto(data, title, description, price, thumbnail, code, stock) {
        const codeExists = data.some(prod => prod.code === code);
        if (codeExists) {
            throw new Error("Not added, because the code is repeated");
        } else if (!title || !description || !price || !thumbnail || !code || stock === undefined) {
            throw new Error("All fields are required");
        }
        return true;
    }
    getIdAvailable(data) {
        const nextId = data.reduce((previous, current) => {
            return current.id > previous.id ? current : previous;
        });
        return nextId.id + 1;
    }
}

const getFromFile = async (path) => {
    if (!fs.existsSync(path)) {
        return [];
    }
    const content = await fs.promises.readFile(path, 'utf-8');
    return JSON.parse(content);
}

const saveInFile = async (path, data) => {
    const content = JSON.stringify(data, null, '\t');
    await fs.promises.writeFile(path, content, 'utf-8');
}

async function test() {
    console.log("Instanciar Clase");
    const productManager = new ProductManagers("./products.json");
    console.log("*******************************");
    console.log("getProducts");
    console.log("*******************************");
    console.log(await productManager.getProducts());
    console.log("*******************************");
    console.log("addProduct");
    const data = {
        title: 'producto prueba',
        description: 'Este es un producto prueba',
        price: 200,
        thumbnail: 'Sin imagen',
        code: 'abc123',
        stock: 25
    }

    const data2 = {
        title: 'producto prueba 2',
        description: 'Este es un producto prueba 2',
        price: 200,
        thumbnail: 'Sin imagen',
        code: 'abc222',
        stock: 20
    }

    await productManager.addProduct(data);
    await productManager.addProduct(data2);
    console.log("getProducts");
    console.log("*******************************");
    console.log(await productManager.getProducts());

    console.log("getProductById 1");
    console.log("*******************************");
    console.log(await productManager.getProductById(1));
    console.log("*******************************");
    console.log("getProductById 5 Not found");
    console.log("*******************************");
    console.log(await productManager.getProductById(5));
    console.log("*******************************");

    console.log("updateProducts");
    console.log("*******************************");
    await productManager.updateProducts(1, { title: 'producto prueba update' });

    console.log("*******************************");
    console.log("getProducts");
    console.log("*******************************");
    console.log(await productManager.getProducts());

    console.log("deleteProducts");
    console.log("*******************************");
    await productManager.deleteProduct(1);

    console.log("*******************************");
    console.log("getProducts");
    console.log("*******************************");
    console.log(await productManager.getProducts());
    /*
        console.log("deleteProducts not found");
        console.log("*******************************");
        await productManager.deleteProduct(7);
    */
    console.log("*******************************");
    console.log("addProduct");
    const data3 = {
        title: 'producto prueba 3',
        description: 'Este es un producto prueba 3',
        price: 200,
        thumbnail: 'Sin imagen',
        code: 'abc333',
        stock: 25
    }
    await productManager.addProduct(data3);

    console.log("*******************************");
    console.log("getProducts");
    console.log("*******************************");
    console.log(await productManager.getProducts());
}