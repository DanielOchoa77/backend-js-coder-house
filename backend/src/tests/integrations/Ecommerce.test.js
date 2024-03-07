import { expect } from 'chai';
import supertest from 'supertest';

const requester = supertest('http://localhost:8080');

describe('EcommerceTesting', function () {
  before(function () {
    this.cookie = {};
    this.email = '';
    this.idProduct = '';
  });
  describe('Auth Testing', function () {
    it('deberia crear el usuario de forma exitosa.', async function () {
      this.email = `pruebas${Date.now() / 1000}@gmail.com`;
      const userMock = {
        first_name: "Danielo",
        last_name: "Ochoa",
        email: this.email,
        password: "abc12334",
        age: "35"
      };
      const { statusCode, ok, _body } = await requester
        .post('/api/auth/register')
        .send(userMock);

      expect(statusCode).to.be.equal(200);
      expect(ok).to.be.ok;
      expect(_body).to.be.has.property('role', 'user');
    });

    it('deberia fallar si no se ingresan los datos completos.', async function () {
      const userMock = {
        first_name: "Danielo",
        last_name: "Ochoa",
      };
      const { statusCode, ok, _body } = await requester
        .post('/api/auth/register')
        .send(userMock);
      expect(statusCode).to.be.equal(400);
      expect(ok).to.be.not.ok;
      expect(_body).to.be.has.property('message', 'Todo los campos son requeridos');
    });

    it('deberia fallar si se ingresa un dato de un usuario ya registrado.', async function () {
      const userMock = {
        first_name: "Danielo",
        last_name: "Ochoa",
        email: "pruebas@gmail.com",
        password: "abc12334",
        age: "35"
      };
      const { statusCode, ok, _body } = await requester
        .post('/api/auth/register')
        .send(userMock);
      expect(statusCode).to.be.equal(400);
      expect(ok).to.be.not.ok;
      expect(_body).to.be.has.property('message', 'Usuario ya registrado');
    });

    it('deberia loguearse el usuario de forma exitosa', async function () {
      const userMock = {
        email: this.email,
        password: 'abc12334',
      };
      const {
        headers,
        statusCode,
        ok,
      } = await requester.post('/api/auth/login').send(userMock);
      expect(statusCode).to.be.equal(200);
      expect(ok).to.be.ok;
      const [key, value] = headers['set-cookie'][0].split('=');
      this.cookie.key = key;
      this.cookie.value = value;
    });

    it('deberia obtener la informacion el usuario de forma exitosa', async function () {
      const {
        statusCode,
        ok,
        _body,
      } = await requester
        .get('/api/sessions/current')
        .set('Cookie', [`${this.cookie.key}=${this.cookie.value}`]);
      expect(statusCode).to.be.equal(200);
      expect(ok).to.be.ok;
      expect(_body).to.be.has.property('_id');
      expect(_body).to.be.has.property('email', this.email);
    });
  });
  describe('Product Testing', function () {
    it('deberia obtener la informacion de los productos de forma exitosa', async function () {
      const {
        statusCode,
        ok,
        _body,
      } = await requester
        .get('/api/products')
        .set('Cookie', [`${this.cookie.key}=${this.cookie.value}`]);
      expect(statusCode).to.be.equal(200);
      expect(ok).to.be.ok;
      expect(_body).to.be.has.property('status', 'success');
      expect(_body).to.be.has.property('payload');
    });

    it('deberia crear el producto de forma exitosa', async function () {

      const productMock = {
        title: "producto prueba premium 3",
        description: "Este es un producto prueba premium 2",
        price: 300,
        thumbnail: "Sin imagen",
        code:`abc${Date.now() / 1000}`,
        stock: 25,
        status: true,
        category: "Zapatillas"
      };
      const {
        statusCode,
        ok,
        _body,
      } = await requester.post('/api/products').send(productMock)
        .set('Cookie', [`${this.cookie.key}=${this.cookie.value}`]);
      expect(statusCode).to.be.equal(200);
      expect(ok).to.be.ok;
      expect(_body).to.be.has.property('_id');

      this.idProduct = _body._id;
    });

    it('deberia obtener la informacion del producto por id de forma exitosa', async function () {
      const _id = this.idProduct;
      const {
        statusCode,
        ok,
        _body,
      } = await requester
        .get(`/api/products/${_id}`)
        .set('Cookie', [`${this.cookie.key}=${this.cookie.value}`]);
      expect(statusCode).to.be.equal(200);
      expect(ok).to.be.ok;
      //expect(_body).to.be.has.property('_id', _id);
    });

  });
});