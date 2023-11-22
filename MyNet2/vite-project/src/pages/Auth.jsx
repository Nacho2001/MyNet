import { useState } from "react"
import Register from "./Register";
import LogIn from "./LogIn";
const Auth = () => {
    const [registrado, setRegistrado] = useState(false);
    const registrar = (value) => {
        setRegistrado(value)
    }
    if (registrado == false) {
        return (
            <Register registro={registrar}/>
        )
    } else {
        return(
            <LogIn registro={registrar}/>
        )
    }
}

export default Auth;