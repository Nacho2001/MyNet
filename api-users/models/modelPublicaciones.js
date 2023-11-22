const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/db");

class Publicaciones extends Model{};

Publicaciones.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    titulo:{
        type:DataTypes.STRING,
        allowNull:false
    },
    imagen:{
        type:DataTypes.STRING,
        allowNull:true
    },
    cuerpo:{
        type:DataTypes.STRING,
        allowNull:false
    },
    usuario:{
        type:DataTypes.STRING,
        allowNull:false
    },
    fecha:{
        type:DataTypes.DATEONLY,
        allowNull:false
    }
},
{
    sequelize, modelName:"Publicaciones"
})

Publicaciones.sync()
.then(() => {
    console.log("Tabla Publicaciones sincronizada");
})
.catch((error) => {
    console.log(`Error al sincronizar Publicaciones: ${error}`)
})
module.exports = Publicaciones;