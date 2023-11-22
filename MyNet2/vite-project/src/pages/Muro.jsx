import { useState, useEffect } from "react";
import { getUserPosts } from "../callback";
import { useSelector } from "react-redux/es/hooks/useSelector";
import  CardPublicacion from '../components/CardPublicacion'
import {Button} from 'primereact/button';
import FormAddPost from "../components/FormAddPost";

const Muro = () => {
    const token = useSelector((state) => state.credencialesUsuario.credencialesUsuario.token)
    const username = useSelector((state) => state.credencialesUsuario.credencialesUsuario.username)
    const [misPost, setMisPost] = useState([]);
    const [postMode, setPostMode] = useState("read");
    useEffect(() => {
        const getMyPost = async () => {
            setMisPost(await getUserPosts(username, token))
        }
        // Corregir funcion Callback
        getMyPost();
    }, [])
    const changeMod = (modo) => {
        setPostMode(modo)
    }
    switch (postMode) {
        case "create":
            return (
                <FormAddPost modo={postMode}/>
            )
            break;
        case "edit":
            return (
                <FormPost2/>
            )
            break
        default:
            return(
                <>
                    <h2>Mi Muro</h2>
                    <Button label="Añadir post" icon="pi pi-plus" severity="success" onClick={() => changeMod("create")}></Button>
                    <div>
                        {misPost.map((post) => (
                            <CardPublicacion post={post} key={post.id}/>
                        ))}
                    </div>
                </>
            )
            break;
    }
}

export default Muro;