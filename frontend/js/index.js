(function () {
  fetch('http://localhost:8080/api/products?limit=2')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(console.error);

  document
    .getElementById('start-login')
    .addEventListener('click', () => {
      fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: 'pruebas1@gmail.com', password: 'abc1234'}),
      })
        .then(response => response.json())
        .then(data => console.log('start-login', data))
        .catch(console.error);
    });

  document
    .getElementById('try-token')
    .addEventListener('click', () => {
      fetch('http://localhost:8080/api/auth/try-token', {
        method: 'GET',
        credentials: 'include',
      })
        .then(response => response.json())
        .then(data => console.log('try-token', data))
        .catch(console.error);
    });

    
})();