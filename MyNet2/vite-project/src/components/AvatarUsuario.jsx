import {Avatar} from 'primereact/avatar';
const AvatarUsuario = (props) => {
    const imagen = props.imagen
    if (imagen == "" || imagen == null | imagen == undefined) {
        return (
            <i className="pi pi-user" style={{ fontSize: '1.5rem' }}></i>
        )
    } else {
        return (
            <Avatar image={props.imagen} size="xlarge" shape='circle'/>
        )
    }
}

export default AvatarUsuario;