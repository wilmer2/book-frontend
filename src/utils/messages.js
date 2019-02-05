export const serverErrorMessage = 'Ha ocurrio un problemea con el servidor, vuelve a intentarlo';
export const timeoutMessage = 'No se ha podido establecer conexión con el servidor';
export const requestFailedMessage = 'Error al establecer conexión con el servidor, asegurate de tener acceso a internet';
export const notFoundMessage = 'El recurso no ha sido encontrado';

export const validationMessages = {
  required(field) {
    return `El campo ${field} es obligatorio`
  },

  email(field) {
    return `El campo ${field} debe ser un correo electrónico válido`
  },

};
