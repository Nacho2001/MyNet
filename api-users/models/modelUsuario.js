// Estiende la clase model ya existente en Sequelize
const { Model, DataTypes} = require("sequelize");
const sequelize = require("../config/db")
// La clase usuario hereda los metodos de Model
class Usuario extends Model{};

// Inicializa clase usuario
Usuario.init({ // Se definen las tablas que tendrá la base de datos y aplica restricciones en los campos
    id:{ // ID de usuario
        type: DataTypes.INTEGER, // tipo de dato nro entero (INT)
        primaryKey: true, // Será clave primaria
        autoIncrement: true // Autoincremental
    },
    username:{ // Nombre de usuario
        type: DataTypes.STRING, // Tipo cadena de caracteres
        allowNull:false, // No puede ser nulo
        unique:true // El valor no puede repetirse
    },
    password:{ // Clave de acceso
        type:DataTypes.STRING, // Tipo cadena de caracteres
        allowNull:false, // Campo obligatorio
    },
    email:{ // email
        type:DataTypes.STRING, // Tipo cadena de caracteres
        allowNull:false, // Es obligatorio
        unique:true // El valor no puede repetirse
    },
    avatar:{
        type:DataTypes.STRING
    },
    rol:{
        type:DataTypes.STRING,
        allowNull:false
    }},
    {
    sequelize,
    modelName:"Usuario" // Indica el nombre del model
});

Usuario.sync()
.then(() => {
    console.log("Base de datos sincronizada");
})
.catch((error) => {
    console.log(`Error al crear la tabla: ${error}`)
})
module.exports = Usuario