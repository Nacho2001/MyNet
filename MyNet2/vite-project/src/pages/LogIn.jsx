import {useState} from 'react';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import { useDispatch, useSelector } from 'react-redux';
import { setCredenciales } from '../store';
import { autenticar } from '../callback';

const LogIn = ({registro}) => {
    const [userData, setUserData] = useState({
        username:"",
        password:""
    })
    const dispatch = useDispatch()
    const [error, setError] = useState("");
    const [inputClass, setInputClass] = useState("")
    const setFormData = (event) => {
        setUserData({
            ...userData,
            [event.target.name] : event.target.value
        })

    }
    const verificacion2 = async (event) => {
        event.preventDefault();
        if (userData.username == "" || userData.password == "") {
            setError("Todos los campos deben ser completados")
        } else {
            let auth = await autenticar(userData.username, userData.password);
            switch (auth.status) {
                case 401:
                    setError("Usuario o Contrseña incorrectos")
                    setInputClass("p-invalid")
                    break;
                case 500:
                    setError("Error del servidor")
                    break;
                case 200:
                const token = auth.data.token    
                // Pasa las credenciales ingresadas a los estados globales, cambia el estado login a true y envia el token
                    dispatch(setCredenciales(userData.username, userData.password, true, token))
                    break;
                default:
                    setError("Ocurrió un error desconocido");
                    break
            }
        }
    }
    const cambioEstadoRegistro = () => {
        registro(false)
    }
    return (
        <div className='flex justify-content-center'>  
            <form className='flex flex-column w-12 align-items-center' onSubmit={verificacion2}>
                <h1>MyNet</h1>
                <div className='flex flex-column'>
                    <label className='mb-1'>Nombre de usuario</label>
                    <InputText name="username" className={inputClass} value={userData.username} onChange={(event) => {setFormData(event)}}/>
                </div>
                <div className='flex flex-column'>
                    <label className='mt-2 mb-1'>Contraseña</label>
                    <InputText name="password" type="password" className={inputClass} value={userData.password} onChange={(event) => setFormData(event)}/>
                    <small className='mt-2' style={{"color":"#CD5C5C"}}>{error}</small>
                </div>
                <Button className="mt-3 mb-4 w-7rem" type="submit" label="Ingresar" severity="success"/>
                No posee un usuario?
                <Button className="mt-1 w-8rem" type="submit" label="Registrarse" severity="info" onClick={cambioEstadoRegistro}/>
            </form>
        </div>
    )
}

export default LogIn;