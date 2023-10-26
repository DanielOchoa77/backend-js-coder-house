const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

class ProductManagers {

    constructor(path) {
        this.path = path;
    }

    getProducts() {
        return getFromFile(this.path);
    }

    async addProduct(data) {
        const { title, description, price, thumbnail, code, stock, status, category } = data;
        const products = await getFromFile(this.path);
        let validatedProduct =  this.validarProducto(products, title, description, price, thumbnail, code, stock, status, category);
        if (validatedProduct.validated) {
            products.push(
                {
                    id: uuidv4(),
                    title: title,
                    description: description,
                    price: price,
                    thumbnail: thumbnail,
                    code: code,
                    stock: stock,
                    status: status,
                    category: category
                }
            );
            await saveInFile(this.path, products);
            return {
                message: "Product is added successfully",
                status: "Success",
                statusCode: 200
            };
        }else{
            const {message,status,statusCode} = validatedProduct;
            return {
                message: message,
                status: status,
                statusCode: statusCode
            };
        }
    }

    async updateProducts(id, data) {
        const { title, description, price, thumbnail, code, stock, status, category } = data;
        const products = await getFromFile(this.path);
        const position = products.findIndex((prod) => prod.id === id);
        if (position === -1) {
            return {
                message: "Product not Found",
                status: "Error",
                statusCode: 404
            };
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
        if (status) {
            products[position].status = status;
        }

        if (category) {
            products[position].category = category;
        }

        await saveInFile(this.path, products);
        return {
            message: "Product successfully updated",
            status: "Success",
            statusCode: 200
        };
    }

    async getProductById(id) {
        const products = await getFromFile(this.path);
        const productFind = products.find((prod) => prod.id === id);

        return productFind || {
            message: "Product not Found",
            status: "Error",
            statusCode: 404
        };
    }

    async deleteProduct(id) {
        const products = await getFromFile(this.path);
        const productFind = products.find((prod) => prod.id === id);
        if (productFind) {
            const productSave = products.filter((prod) => prod.id != id);
            await saveInFile(this.path, productSave);
            return {
                message: "Product successfully deleteded",
                status: "Success",
                statusCode: 200
            };
        } else {
            return {
                message: "Product not Found",
                status: "Error",
                statusCode: 404
            };
        }
    }

    validarProducto(data, title, description, price, thumbnail, code, stock, category, status) {
        const codeExists = data.some(prod => prod.code === code);
        if (codeExists) {
            return {
                validated: false,
                message: "Not added, because the code is repeated",
                status: "Error",
                statusCode: 404
            };
        } else if (!title || !description || !price || !thumbnail || !code || !stock || !category|| status === undefined) {
            return {
                validated: false,
                message: "All fields are required",
                status: "Error",
                statusCode: 404
            };
        }
        return {validated: true};
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

module.exports = ProductManagers;