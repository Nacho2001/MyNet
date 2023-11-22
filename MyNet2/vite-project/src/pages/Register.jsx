import {useState} from 'react';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import { createUser } from '../callback';
import { useDispatch } from 'react-redux';
import { setCredenciales } from '../store';

const Register = ({registro}) => {
    const dispatch = useDispatch();
    const [userData, setUserData] = useState({
        username:"",
        password:"",
        email:""
    })
    const [inputClass, setInputClass] = useState("")
    const [error, setError] = useState("");
    const [footerText, setFooterText] = useState("Ya posee un usuario?");
    const [registrado, setRegistrado] = useState(false);
    const setFormData = (event) => {
        setUserData({
            ...userData,
            [event.target.id] : event.target.value
        })

    }
    const cambioEstadoRegistro = () => {
        registro(true)
    }
    const registrar = async (event) => {
        event.preventDefault();
        if ( userData.username == "" || userData.password == "" || userData.email == "") {
            setError("Todos los campos deben ser completados")
        } else {
            const res = await createUser(userData.username,userData.password,userData.email)
            switch (res.status) {
                case 400:
                    setError(res.data.mensaje)
                    setInputClass("p-invalid");
                    break;
                case 201:
                    setError("");
                    setInputClass("");
                    setFooterText("Registro exitoso! Ya puede iniciar sesión");
                    setRegistrado(true)
                    break;
            }
        }
    }
    const LoginButton = () => {
        if (registrado == false){
            return (
                <Button className="mt-1 w-10rem" type="submit" label="Iniciar Sesión" severity="info" onClick={cambioEstadoRegistro}/>
            )
        } else {
            return (
                <Button className="mt-1 w-10rem" type="submit" label="Iniciar Sesión" severity="info" onClick={onLogin}/>
            )
        }
    }

    const onLogin = () => {
        dispatch(setCredenciales(userData.username, userData.password, true))
    }
    return (
        <div className='flex justify-content-center'>
            <form className='flex flex-column w-12 align-items-center' onSubmit={registrar}>
                <h1>MyNet: Registro</h1>
                <div className='flex flex-column'>
                    <label className='mb-1'>Nuevo nombre de usuario</label>
                    <InputText id="username" name="formCampo" className={inputClass} value={userData.username} onChange={(event) => {setFormData(event)}}/>
                </div>
                <div className='flex flex-column'>
                    <label className='mb-1 mt-2'>Email</label>
                    <InputText id="email" type="email" name="formCampo" value={userData.email} onChange={(event) => {setFormData(event)}}/>
                </div>
                <div className='flex flex-column'>
                    <label className='mb-1 mt-2'>Nueva Contraseña</label>
                    <InputText id="password" type="password" name="formCampo" value={userData.password} onChange={(event) => {setFormData(event)}}/>
                </div>
                <small className='mt-2' style={{"color":"#CD5C5C"}}>{error}</small>
                <Button id="registerButton" className="mt-3 mb-4 w-7rem" type="submit" severity="success" label="Registrar"/>
                {footerText}
                <LoginButton />
            </form> 
        </div>
    )
}

export default Register;