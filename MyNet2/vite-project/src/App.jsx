import 'primeicons/primeicons.css';
import "primeflex/primeflex.css";
import Home from './pages/Home';
import Muro from './pages/Muro';
import Usuarios from './pages/Usuarios';
import { useState } from "react";
import { Menubar } from 'primereact/menubar';
import { useDispatch, useSelector } from 'react-redux';
import { setCredenciales } from './store';
import Auth from './pages/Auth';

const App = () => {
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.credencialesUsuario.credencialesUsuario)
  const [pageActiva, setPageActiva] = useState("Home");
  
  const items2 = [
    {label:'Home', icon:'pi pi-home', command:() => {setPageActiva("Home")}},
    {label:'Muro', icon:'pi pi-bookmark', command:() => {setPageActiva("Muro")}},
    {label:'Usuarios', icon:'pi pi-users', command:() => {setPageActiva("Usuarios")}},
    {label:'Salir', icon:'pi pi-sign-out', command: () => {dispatch(setCredenciales("","", false, ""))}}
]
  const renderizar = () => {
    switch (pageActiva) {
      case "Home":
        return <Home/>;
      case "Muro":
        return <Muro/>;
      case "Usuarios":
        return <Usuarios/>;
      default:
        return <Home/>;
    }
  }

  const checkLogin = () => {
    if (userData.token == "") {
      return (
        <Auth/>
      )
    } else {
      return (
        <div>
          <Menubar model={items2} className="w-full"/>
          {renderizar()}
        </div>
      )
    }
  }

  return (
    <div>
      {checkLogin()}
    </div>
  )
}

export default App;