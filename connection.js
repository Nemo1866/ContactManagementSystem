require("dotenv").config()
const {Sequelize,DataTypes}=require("sequelize")
const sequelize=new Sequelize(process.env.DATABASE,process.env.USER,process.env.PASSWORD,{
    host:process.env.HOST,
    dialect:process.env.DIALECT,
    logging:true

})

sequelize.authenticate().then(()=>{
    console.log("DB Connected");
}).catch(err=>{
    console.log(err);
})

let Contact=require("./model/contacts")(sequelize,DataTypes)
let User=require("./model/Users")(sequelize,DataTypes)

User.hasMany(Contact)
Contact.belongsTo(User)

sequelize.sync()

module.exports={Contact,User,sequelize}

