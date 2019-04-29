const validationMessages = {
  required(field) {
    return `El campo ${field} es obligatorio`
  },

  email(field) {
    return `El campo ${field} debe ser un correo electrónico válido`
  },
};

export default validationMessages;
