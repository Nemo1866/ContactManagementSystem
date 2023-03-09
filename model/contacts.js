module.exports=(sequelize,DataTypes)=>{
const Contact=sequelize.define("contact",{
    firstName:{
        type:DataTypes.STRING,
        allowNull:false
    },lastName:{
        type:DataTypes.STRING,
        allowNull:false
    },email:{
        type:DataTypes.STRING,
        
    },phone:{
        type:DataTypes.STRING,
    },address:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
   paranoid:true
})
return Contact
}

