import { useState, useEffect } from 'react';
import { getPosts } from '../callback';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import CardPublicacion from "../components/CardPublicacion";

const Home = () => {
    const token = useSelector((state) => state.credencialesUsuario.credencialesUsuario.token)
    const [publicaciones,setPublicaciones] = useState([]);
    useEffect(() => {
        const getPublicaciones = async () => {
            setPublicaciones(await getPosts(token))
        }
        getPublicaciones();
    }, [])
    return (
        <>
            <h2>MyNet</h2>
            <div className='flex flex-wrap'>
                {publicaciones.map((post) => (
                    <CardPublicacion post={post}/>
                ))}
            </div>
        </>
    )
}

export default Home;