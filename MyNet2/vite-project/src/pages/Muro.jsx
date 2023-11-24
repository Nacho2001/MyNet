import { useState, useEffect } from "react";
import { getUserPosts } from "../callback";
import { useSelector } from "react-redux/es/hooks/useSelector";
import  CardPublicacionMuro from '../components/CardPublicacionMuro';
import {Button} from 'primereact/button';
import FormAddPost from "../components/FormAddPost";
import FormEditPost from "../components/FormEditPost";


const Muro = () => {
    const token = useSelector((state) => state.credencialesUsuario.credencialesUsuario.token)
    const username = useSelector((state) => state.credencialesUsuario.credencialesUsuario.username)
    const [misPost, setMisPost] = useState([]);
    const [modo, setModo] = useState("lectura");
    const getMyPosts = async () => {
        setMisPost(await getUserPosts(username, token))
    }
    const cambiarModo = (modo) => {
        setModo(modo)
    }
    switch (modo) {
        case "crear":
            return (
                <FormAddPost cambiarModo={cambiarModo}/>
            )
        case "edicion":
            /*return (
                <FormEditPost cambiarModo={cambiarModo} publicacion={post}/>
            )*/
        default:
            useEffect(() => {
                getMyPosts();
            }, [])
            return(
                <>
                    <h2>Mi Muro</h2>
                    <Button label="Añadir post" icon="pi pi-plus" severity="success" onClick={() => cambiarModo("crear")}></Button>
                    <div className="flex flex-wrap">
                        {misPost.map((post) => (
                            <CardPublicacionMuro publicacion={post} renderizar={getMyPosts} modo={cambiarModo}/>
                        ))}
                    </div>
                </>
            )
    }
}

export default Muro;