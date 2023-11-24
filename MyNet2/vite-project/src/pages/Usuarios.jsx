import { useState, useEffect } from "react";
import { obtenerUsuarios } from "../callback";
import CardUsuarios from "../components/CardUsuarios";
import { useSelector } from "react-redux";
const Usuarios = () => {
    const [usuarios,setUsuarios] = useState([]);
    const token = useSelector((state) => state.credencialesUsuario.credencialesUsuario.token)
    useEffect(() => {
        const buscarUsuarios = async () => {
            setUsuarios(await obtenerUsuarios(token));
        }
        buscarUsuarios();
    }, [])

    return (
        <>
            <h2>Lista de Usuarios</h2>
            <ul>
                {
                    usuarios.map((usuario) => (
                        <CardUsuarios usuario={usuario} key={usuario.id}/>
                    ))
                }
            </ul>
        </>
    )
}

export default Usuarios;