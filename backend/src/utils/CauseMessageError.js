// ====================== Products Errors  ============
export const generatorProductError = (data) => {
  return `Todos los campos son requeridos y deben ser validos 😱.
    Lista de campos recibidos en la solicitud    
    - title       : ${data.title}       
    - description : ${data.description}     
    - price       : ${data.price}
    - code        : ${data.code} 
    - stock       : ${data.stock}
    - status      : ${data.status}
    - category    : ${data.category} 
    `
    ;
};

export const productIdError = (id) => {
  return `Se debe enviar un identificador valido 😱.
    Valor recibido: ${id}
  `;
};

export const generatorProductCodeError = (code) => {
  return `producto con codigo ${code} ya existe 😱`;
};

// ====================== Carts Errors  ============

export const cartIdError = (id) => {
  return `Se debe enviar un id de carrito valido 😱.
    Valor recibido: ${id}
  `;
};

//===================== Tickets Error =================

export const generatorTicketError = (data) => {
  return `Todos los campos son requeridos y deben ser validos 😱.
    Lista de campos recibidos en la solicitud    
    - amount            : ${data.amount}       
    - purchaser         : ${data.purchaser}     
    - purchaser_datetime: ${data.purchaser_datetime}
    `
    ;
};

//===================== Users Error =================

export const credentialUserError = () => {
  return `Correo o contraseña invalidos.`;
};

export const generatorUserError = (data) => {
  return `Todos los campos son requeridos y deben ser validos 😱.
    Lista de campos recibidos en la solicitud    
    - first_name  : ${data.first_name}       
    - last_name   : ${data.last_name}     
    - email       : ${data.email}
    - password    : ${data.password}
    `
    ;
};

export const generatorUserEmailError = (email) => {
  return `Ya se encuentra un usuario registrado con el correo ${email}`;
};

export const userIdError = (id) => {
  return `Se debe enviar un id de usuario valido 😱.
    Valor recibido: ${id}
  `;
};

//===================== Roles Error =================

export const permissionsError = () => {
  return `Usuario sin permisos para la accion requerida`;
};

export const UnauthorizedError = () => {
  return `Usuario sin credenciales validas de autenticacion`;
};

//===================== Send Mails Error =================

export const sendEmailInvalid = () => {
  return `por favor ingrese un correo valido`;
};

export const sendEmailNotFound = (email) => {
  return `el correo ${email} no existe en el sistema`;
};

export const newPassInvalid = () => {
  return `La contraseña debe ser diferente a la anterior registrada.`;
};

export const tokenExpired = () => {
  return `El token Expiro`;
};


// ====================== Recovery Errors  ============
export const recoveryFieldsMissed = () => {
  return `Todos los campos son requeridos.
    `
    ;
};

