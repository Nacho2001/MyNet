import {useState} from 'react';
import { InputText } from "primereact/inputtext";
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';

const FormAddPost = () => {
    const [post, setPost] = useState({
        tituto:'',
        cuerpo:'',
        imagen:''
    })
    const setFormData = (event) => {
        setPost({
            ...userData,
            [event.target.id] : event.target.value
        })

    }
    const enviarPost = () => {
        
    }
    const cancelarPost = () => {
        
    }
    return (
        <form className='flex flex-column align-items-center'>
            <div className='flex flex-column mt-3'>
                <label>Titulo</label>
                <InputText id="titulo" className="mt-1 w-13rem" onChange={(event) => {setFormData(event)}}/>
            </div>
            <div className='flex flex-column mt-1'>
                <label>Cuerpo</label>
                <InputTextarea id="cuerpo" className="mt-1 w-13rem" autosize onChange={(event) => {setFormData(event)}}/>
            </div>
            <div className='flex flex-column mt-1 mb-3'>
                <label>Imagen</label>
                <InputText id="imagen" className="mt-1 w-13rem" placeholder="Link de imagen" onChange={(event) => {setFormData(event)}}/>
            </div>
            <div>
                <Button label="Enviar" className="mr-2" severity="success" icon="pi pi-send" onClick={() => {enviarPost}}/>
                <Button label="Cancelar" severity="danger" icon="pi pi-times" onClick={() => {cancelarPost}}/>
            </div>

        </form>
    )
}

export default FormAddPost