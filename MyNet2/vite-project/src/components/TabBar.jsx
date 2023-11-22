import Home from '../pages/Home';
import Muro from '../pages/Chat';
import Usuarios from '../pages/Usuarios';
import Chat from '../pages/Chat';
import {TabMenu} from "primereact/TabMenu";
import { useState } from "react";

const TabBar = () => {
    const [pageActiva, setPageActiva] = useState(null);
    const items = [
        {label:'Home', icon:'pi pi-fw pi-home'},
        {label:'Muro', icon:'pi pi-fw pi-bookmark'},
        {label:'Usuarios', icon:'pi pi-fw pi-users'},
        {label:'Chat', icon:'pi pi-fw pi-comment'},
    ]
    const renderizar = () => {
        switch (pageActiva.label) {
            case "Home":
                return <Home/>;
            case "Muro":
                return <Muro/>;
            case "Usuarios":
                return <Usuarios/>;
            case "Chat":
                return <Chat/>;
            default:
                return <Home/>;
        }
    }
    return (
        <div className="card">
            <TabMenu model={items}  activeItem={pageActiva} onTabChange={(event) => {setPageActiva(event.value)}}/>
            {renderizar()}
        </div>
    )
}

export default TabBar;