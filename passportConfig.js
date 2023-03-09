const { compare } = require("bcrypt")
const localStrategy=require("passport-local")
const { User } = require("./connection")

exports.inititalizePassport=(passport)=>{

    passport.use(new localStrategy({usernameField:"email",passwordField:"password"},async function(email,password,done){
        try {
           
            let user=await User.findOne({where:{email}})
            

if(!user){
    done("Email Address Does not exist")
   
}

            let hashPassword=await compare(password,user.password)
            console.log(4);
            if(!hashPassword){
                done("Email Address or Password is incorrect",false)
            }
            done(null,user)

        } catch (error) {
            done(error,false)
        }
    }))
    passport.serializeUser((user,done)=>{
        done(null,user.id)
    })
    passport.deserializeUser(async(id,done)=>{
        try {
            
            let user=await User.findOne({where:{id}})

            done(null,user)
            
        } catch (error) {
            done(error,false)
        }
    })
}

exports.isUserAuthenticated=async(req,res,next)=>{
    if(!req.user){
        return res.send("you're not logged in")
    }
    let id=req.user.dataValues.id
    let user=await User.findOne({where:{id}})

 if(user){
    return next()
 }else{
    res.send("Error")
 }


}