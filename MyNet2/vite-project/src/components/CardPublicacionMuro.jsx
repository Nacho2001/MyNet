import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { deletePost, getUniquePost } from '../callback';
import { useSelector } from "react-redux";

const CardPublicacionMuro = (props, {renderizar}) => {
    let post = props.publicacion
    const usuario = useSelector((state) => state.credencialesUsuario.credencialesUsuario);

    const borrarPost = async (event) => {
        let id = event.target.id;
        let rta = confirm("Desea eliminar este post?")
        if (rta == true) {
            let rta2 = await deletePost(id, usuario.token);
            if (rta2 == 1) {
                alert("Post eliminado exitosamente!")
            } else {
                alert("Ocurrió un error al eliminar el post")
            }
        }
        renderizar()

    }
    const actualizarPost = async (event) => {
        let id = event.target.id;
        let publicacion = await getUniquePost(id, usuario.token);
        if (publicacion == 1){
            alert("Ocurrió un error al cargar datos")
            renderizar()
        } else{
            cambiarModo("edicion")
        }
    }
    const header = () => (
        <img alt="" src={post.imagen} />
    )
    const footer = () => (
        <div>
            <Button className="mr-2" id={post.id} icon="pi pi-trash" severity="danger" onClick={(event) => {borrarPost(event)}}/>
            <Button id={post.id} icon="pi pi-pencil" onClick={(event) => {actualizarPost(event)}}/>
        </div>
    )
    const subtitle = `${post.usuario}, ${post.fecha}`
    return (
        <div className="card flex max-w-30rem m-5">
            <Card id={post.id} title={post.titulo} subTitle={subtitle} header={header} key={post.id} footer={footer}>
                {post.cuerpo}
            </Card>
        </div>
    )
}

export default CardPublicacionMuro;