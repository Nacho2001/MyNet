import { configureStore } from '@reduxjs/toolkit';

export const setCredenciales = (username, password, login, token) => ({
    type:'CREDENCIALES',
    payload: {username, password, login, token}
})

const estadoInicial = {
    credencialesUsuario: {
        username: '',
        password: '',
        login:false,
        token:''
    }
}

 const usuarioReducer = (state = estadoInicial, action) => {
    switch(action.type) {
        case 'CREDENCIALES':
            return {
                credencialesUsuario: action.payload
            }
        default:
            return state;
    }
}

export default configureStore({
    reducer: {
        credencialesUsuario: usuarioReducer
    }
})