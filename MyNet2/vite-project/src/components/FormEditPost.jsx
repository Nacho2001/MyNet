import {useState} from 'react';
import { InputText } from "primereact/inputtext";
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { updatePost } from '../callback';
import { useSelector } from 'react-redux';

const FormEditPost = ({ cambiarModo }, publicacion) => {
    const usuario = useSelector((state) => state.credencialesUsuario.credencialesUsuario)
    console.log(usuario)
    const [post, setPost] = useState({
        titulo: publicacion.titulo,
        cuerpo: publicacion.cuerpo,
        imagen: publicacion.imagen
    })

    const setFormData = (event) => {
        setPost({
            ...post,
            [event.target.name] : event.target.value
        })

    }
    const actualizarPost = async (event) => {
        event.preventDefault();
        function formatoFecha() {
            let fecha = new Date(),
                mes = '' + (fecha.getMonth() + 1),
                dia = '' + fecha.getDate(),
                anio = fecha.getFullYear();
        
            if (mes.length < 2) 
                mes = '0' + mes;
            if (dia.length < 2) 
                dia = '0' + dia;
        
            return [anio, mes, dia].join('-');
        }
        const fecha = formatoFecha();
        let actualizar = await updatePost(post.titulo, post.cuerpo, usuario.username, post.imagen, fecha, usuario.token);
        if (actualizar == 1) {
            alert("Post Añadido exitosamente!")
        } else {
            alert("Ocurrió un error al añadir posteo")
        }
        cambiarModo("lectura")
    }
    const cancelarEdicion = (event) => {
        event.preventDefault()
        cambiarModo("lectura")
    }
    return (
        <form className='flex flex-column align-items-center'>
            <div className='flex flex-column mt-3'>
                <label>Titulo</label>
                <InputText name="titulo" value={post.titulo} className="mt-1 w-13rem" onChange={(event) => {setFormData(event)}}/>
            </div>
            <div className='flex flex-column mt-1'>
                <label>Cuerpo</label>
                <InputTextarea name="cuerpo" value={post.cuerpo} className="mt-1 w-13rem" autosize onChange={(event) => {setFormData(event)}}/>
            </div>
            <div className='flex flex-column mt-1 mb-3'>
                <label>Imagen</label>
                <InputText name="imagen" value={post.imagen} className="mt-1 w-13rem" placeholder="Link de imagen" onChange={(event) => {setFormData(event)}}/>
            </div>
            <div>
                <Button label="Enviar" className="mr-2" severity="success" icon="pi pi-send" onClick={(event) => {actualizarPost(event)}}/>
                <Button label="Cancelar" severity="danger" icon="pi pi-times" onClick={(event) => {cancelarEdicion(event)}}/>
            </div>

        </form>
    )
}

export default FormEditPost