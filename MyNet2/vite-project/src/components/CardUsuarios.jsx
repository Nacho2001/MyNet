import AvatarUsuario from './AvatarUsuario';

const CardUsuarios = (props) => {
    const usuario = props.usuario;
    return (
        <div className="card flex mt-5">
            <AvatarUsuario props={usuario.imagen}/>
            <div className='flex flex-column ml-2'>
                <b>{usuario.username}</b>
                <p className="-mt-1">{usuario.email}</p> 
            </div>           
        </div>
    )
}

export default CardUsuarios;