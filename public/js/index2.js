(function () {
  const socket = io();

  document
    .getElementById('form-product')
    .addEventListener('submit', (event) => {
      event.preventDefault();
      const inputTitle = document.getElementById('input-title');
      const inputDescription = document.getElementById('input-description');
      const inputPrice = document.getElementById('input-price');
      const inputThumbnail = document.getElementById('input-thumbnail');
      const inputCode = document.getElementById('input-code');
      const inputStock = document.getElementById('input-stock');
      const inputCategory = document.getElementById('input-category');
      const inputState = document.getElementById('input-state');
      console.log(inputState.value);

      const newProduct = {
        "title": inputTitle.value,
        "description": inputDescription.value,
        "price": parseInt(inputPrice.value),
        "thumbnail": inputThumbnail.value,
        "code": inputCode.value,
        "stock": parseInt(inputStock.value),
        "status": inputState.value === 'true' ? true : false,
        "category": inputCategory.value
      };

      socket.emit('new-product', newProduct);
      inputTitle.value = '';
      inputDescription.value = '';
      inputPrice.value = '';
      inputThumbnail.value = '';
      inputCode.value = '';
      inputStock.value = '';
      inputCategory.value = '';
      inputState.value = true;
      inputTitle.focus();
    });

  socket.on('update-product', (products) => {
    console.log('products', products);
    const productList = document.getElementById('lista-product');
    productList.innerText = '';
    products.forEach((product) => {

      const row = document.createElement('tr');
      const id = document.createElement('td');
      id.textContent = product.id;

      const title = document.createElement('td');
      title.textContent = product.title;

      const description = document.createElement('td');
      description.textContent = product.description;

      const price = document.createElement('td');
      price.textContent = product.price;

      const thumbnail = document.createElement('td');
      thumbnail.textContent = product.thumbnail;

      const code = document.createElement('td');
      code.textContent = product.code;

      const stock = document.createElement('td');
      stock.textContent = product.stock;

      const category = document.createElement('td');
      category.textContent = product.category;

      const status = document.createElement('td');
      status.textContent = product.status === true ? "Habilitado" : "Deshabilitado";

      const colDelete = document.createElement('td');
      const buttonDelete = document.createElement('button');
      buttonDelete.textContent = 'Eliminar';
      buttonDelete.addEventListener("click", () => {
        socket.emit('delete-product', product.id);
      })
      colDelete.appendChild(buttonDelete);
      row.appendChild(id);
      row.appendChild(title);
      row.appendChild(description);
      row.appendChild(price);
      row.appendChild(thumbnail);
      row.appendChild(code);
      row.appendChild(stock);
      row.appendChild(category);
      row.appendChild(status);
      row.appendChild(colDelete);
      productList.appendChild(row);
    });
  });

})();