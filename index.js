require("./connection")
const express=require("express")
const passport = require("passport")
const router = require("./routes/router")
const session=require("express-session")
const { inititalizePassport } = require("./passportConfig")
const SwaggerUI=require("swagger-ui-express")
const { swaggerSpec } = require("./SwaggerConfig")
const app=express()

inititalizePassport(passport)
app.use(session({
    secret:"secret",
    saveUninitialized:false,
    resave:false
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(express.json())
app.use("/",router)
app.use("/api-docs",SwaggerUI.serve,SwaggerUI.setup(swaggerSpec))

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})