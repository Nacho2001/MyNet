import axios from 'axios';

export const autenticar = async (username, password) => {
    try {
        let res = await axios.post("http://localhost:5000/login", {username, password})
        return res
    } catch (error) {
        return error.response
    }
}
export const obtenerUsuarios =  async (token) => {
    const headers = {'token': token}
    try {
        const resp =  await axios.get("http://localhost:5000/usuarios", {headers});
        const users = resp.data.usuarios;
        return users;
    } catch (error) {
        console.error(error)
    }
}

export const obtenerUsuarioUnicio = async(username) => {
    try {
        const resp = await axios.get(`http://localhost:5000/usuarios/${username}`)
        // La respesta del servidor es un array, por lo tanto, se extrae el usuario desde la posición 0.
        const usuario = resp.data.usuarioBuscado[0];
        return usuario;
    } catch (error) {
        console.error(error);
    }
}

export const createUser = async (username, password, email) => {
    const rol = "usuario";
    try {
        const res = await axios.post("http://localhost:5000/usuarios", {username, password, email, rol })
        return res
    } catch (error) {
        return error.response
    }
}

export const deleteUser = async (id, token) => {
    const headers = {'token': token}
    try {
        await axios.delete(`http://localhost:5000/usuarios/${id}`, {headers})
    } catch (error) {
        console.error(error)
    }
}

export const updateUser = async (id, username, password, email, rol, token) => {
    const headers = {'token':token}
    try {
        await axios.put(`http://localhost:5000/usuarios/${id}`, {username, password, email, rol}, {headers})
    } catch (error) {
        console.error(error);
    }
}

export const getPosts = async (token) => {
    const headers = {'token':token}
    try {
        const resp = await axios.get("http://localhost:5000/publicaciones", {headers})
        const posts = resp.data.publicaciones
        return posts;
    } catch (error) {
        console.error(error)
    }
}

export const getUniquePost = async (id, token) => {
    const headers = {'token':token}
    try {
        const resp = await axios.get(`http://localhost:5000/publicaciones/${id}`, {headers})
        const post = resp.data.publicacion
        return post
    } catch (error) {
        return 0;
    }
}

export const getUserPosts = async (user, token) => {
    const headers = {'token':token}
    try {
        const resp = await axios.get(`http://localhost:5000/publicaciones/usuarios/${user}`, {headers});
        const posts = resp.data.publicaciones
        return posts
    } catch (error) {
        console.error(error);
    }
} 

export const addPost = async (titulo,cuerpo,usuario,imagen,fecha,token) => {
    const headers = {'token':token}
    try {
        await axios.post("http://localhost:5000/publicaciones", {titulo,cuerpo,imagen,usuario,fecha}, {headers})
        return 1;
    } catch (error) {
        console.log(error)
        return 0
    }
}

export const deletePost = async (id, token) => {
    const headers = {'token':token}
    try {
        await axios.delete(`http://localhost:5000/publicaciones/${id}`, {headers})
        return 1;
    } catch (error) {
        return 0;
    }
}

export const updatePost = async (id, titulo, cuerpo, usuario, fecha, token) => {
    const headers = {'token':token}
    try {
        await axios.put(`http://localhost:5000/publicaciones/${id}`,{titulo,cuerpo,usuario,fecha}, {headers})
    } catch (error) {
        console.error(error)
    }
}

// Obtener publicaciones filtradas por fecha
export const getPostsBetweenDates = async (fecha1, fecha2, token) => {
    const headers = {'token':token}
    try {
        await axios.get(`http://localhost:5000/publicaciones/${fecha1}/${fecha2}`, {headers})
    } catch (error) {
        console.error(error)
    }
}

// Busca las publicaciones de un usuario especifico, entre las fecha seleccionadas
export const getUserPostsBetweenDates = async (usuario,fecha1,fecha2, token) => {
    const headers = {'token':token}
    try {
        await axios.get(`http://localhost5000/usuarios/${usuario}/${fecha1}/${fecha2}`, {headers})
    } catch (error) {
        console.error(error)
    }
}