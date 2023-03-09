const { User } = require("../connection")
const jwt=require("jsonwebtoken")
const { mail } = require("../mailconfig")
require("dotenv").config()
module.exports={
    register:async(req,res)=>{
        try {
            let {firstName,lastName,email,password}=req.body
        let user=await User.create({firstName,lastName,email,password})
        let filename="Briefing.pdf"
        mail(process.env.TITLE,`Welcome To CMS.`,`Dear ${firstName} ${lastName}, <br> Welcome To Contact Management System, We keep your contacts up-to-date and private. <br> Thanks & Regards <br> - Naeem Khan`,email,filename)
        res.send("User registered Sucessfully")

            
        } catch (error) {
            res.send("Some error occured")
            console.log(error);
        }
        
        
    },login:async(req,res)=>{
      
        res.send(`Welcome ${req.user.dataValues.firstName} ${req.user.dataValues.lastName}`)
        
    },resetPassword:async(req,res)=>{
        let {email}=req.body
        let check=await User.findOne({where:{email}})
        if(!check){
            res.send("Email Address Does Not exist")
        }else{
            let payload={firstName:check.firstName,lastName:check.lastName}
            let secret=check.password + "hello"
            let token=jwt.sign(payload,secret,{expiresIn:"10m"})
            let filename="resetpassword.txt"
mail(process.env.TITLE,`Reset Password Via Token`,`Dear ${check.firstName} ${check.lastName} you've requested for resetting your password. So your password is http://localhost:3000/resetpassword/${token}`,check.email,filename)
            res.send("token sent to your email")
        }
    },resetPasswordByToken:async(req,res)=>{
        let {email,password}=req.body
        let token=req.params.token
        let check=await User.findOne({where:{email}})
       
            let secret=check.password + "hello"
            jwt.verify(token,secret,async(err,data)=>{
                if(err){
                    res.send("Invalid Token")
                }else{
                    await User.update({password},{where:{email}})
                    let filename="update.png"
                    mail(process.env.TITLE,"Your Password Updated",`Dear ${check.firstName} ${check.lastName},<br> Your password has been updated sucessfully, Now you can use your new password to avoid interruption in login. <br> Thanks for choosing Contact Management System. <br> Thanks & Regards. <br> - Naeem Khan`,check.email,filename)
                    res.send("Sucessfully Updated")
                }
            })
        
        
    }
}