const { Contact } = require("../connection")
const xlsx=require("xlsx")
const { mail } = require("../mailconfig")
require("dotenv").config()

module.exports={
    addContact:async(req,res)=>{
        try {
            let {firstName,lastName,email,phone,address}=req.body
            let create=await Contact.create({firstName,lastName,email,phone,address,userId:req.user.dataValues.id})
            if(!create){
                res.send("you have forgotten to add a field")
            }else{
                let filename="add.png"
                mail(process.env.TITLE,'Added a new contact in CMS.',`Dear ${req.user.dataValues.firstName} ${req.user.dataValues.lastName}, <br> You've Added a new contact sucessfully <br> Thanks for Choosing Contact Management System <br> Thanks & Regards <br> - Naeem Khan`,req.user.dataValues.email,filename)
                res.send("Added a new contact")
            }
        } catch (error) {
            res.send("Some Error Occured")
            console.log(error);
        }
      
    },viewContact:async(req,res)=>{
        let result=await Contact.findAll({where:{userId:req.user.dataValues.id}})
        if(!result){
            res.send("No Contacts Found")
        }else{
            res.send(result)
        }
    },viewContactById:async(req,res)=>{
        let result=await Contact.findOne({where:{id:req.params.id , userId:req.user.dataValues.id}})
        if(!result){
            res.send("No Contact Found")
        }else{
            res.send(result)
        }
    },updateContact:async(req,res)=>{
        try {
            let {firstName,lastName,email,phone,address}=req.body
            let update=await Contact.update({firstName,lastName,email,phone,address},{where:{id:req.params.id,userId:req.user.dataValues.id}})
            let check=await Contact.findOne({where:{userId:req.user.dataValues.id}})
            if(!check){
                res.send("Could not find any contact to update")
            }else{
                let filename="updateContact.png"
                mail(process.env.TITLE,"Updated a contact.",`Dear ${req.user.dataValues.firstName} ${req.user.dataValues.lastName},<br> You've Sucessfully updated a contact. <br> Thanks for choosing Contact Management System <br> Thanks & Regards<br> - Naeem Khan`,req.user.dataValues.email,filename)
                res.send("Updated A Contact")
            }
            
        } catch (error) {
            res.send("Some Error Occured")
            console.log(error);
        }
      
    },deleteAll:async(req,res)=>{
        let result=await Contact.destroy({where:{userId:req.user.dataValues.id}})
        if(!result){
            res.send("No Contact Found to Delete")
        }else{
            let filename="loader.gif"
            mail(process.env.TITLE,'Deleted All Contacts.',`Dear ${req.user.dataValues.firstName} ${req.user.dataValues.lastName}, <br> Unfortunately You've deleted all the contacts , if it was not you then you can fix this again by sending an email to this mail. <br> Thanks & Regards - Naeem Khan`,req.user.dataValues.email,filename)
            res.send("Deleted All the contacts")
        }
    },deleteById:async(req,res)=>{
        let result=await Contact.destroy({where:{id:req.params.id,userId:req.user.dataValues.id}})
        if(!result){
            res.send("No Contact Found to delete")

        }else{
            let filename="loader.gif"
            mail(process.env.TITLE,"Deleted a contact",`Dear ${req.user.dataValues.firstName} ${req.user.dataValues.lastName}, <br> You've Sucessfully Deleted a contact if it was not you then you can fix this again by sending an email to this mail. <br> Thanks & Regards - Naeem Khan`,req.user.dataValues.email,filename)
            res.send("Deleted a contact")
        }
    },exportAllContacts:async(req,res)=>{
        try {
          
            let data=await Contact.findAll({attributes:["id","firstName","lastName","email","phone","address"],where:{userId:req.user.dataValues.id}})
          
            if(!data){
                res.send("Add a contact before exporting")
              

            }else{
            let contactsData=data.map((element)=>element.toJSON())
        
            let contactSheet=xlsx.utils.json_to_sheet(contactsData)
        
            let contactWorkBook=xlsx.utils.book_new()
        
            xlsx.utils.book_append_sheet(contactWorkBook,contactSheet,"Contact")
            let filename="contact.xlsx"
        
            xlsx.writeFile(contactWorkBook,filename)
            mail(process.env.TITLE,"Exported Contacts Excel File.",`Dear ${req.user.dataValues.firstName} ${req.user.dataValues.lastName}, <br> Please find the attachment below the end of the file of your exported contacts. <br> Thanks for choosing Contact Management System. <br> Thanks & Regards <br> - Naeem Khan`,req.user.dataValues.email,filename )
            res.send("Exported all the contacts to excel file.")
            }
        } catch (error) {
            res.send("Some Error Occured")
            console.log(error);
        }
   

    },restoreContactById :async(req,res)=>{
        let check=await Contact.restore({where :{id:req.params.id,userId:req.user.dataValues.id}})
        if(!check){
            res.send("Could Not find Any deleted data")
        }else{
            let filename="restore.jpg"
            mail(process.env.TITLE,`Sucessfully Restored a contact`,`Dear ${req.user.dataValues.firstName} ${req.user.dataValues.lastName}, <br> You've Sucessfully Restored a contact, please avoid deleting contact if not needed as it might happend to lost your contact forever <br> Thanks & Regards <br> - Naeem khan`,req.user.dataValues.email,filename)
            res.send("Restored a contact")
        }
    },restoreContacts:async(req,res)=>{
        let check=await Contact.restore({where :{userId:req.user.dataValues.id}})
        if(!check){
            res.send("There is no contact for restoring")
        }else{
            let filename="restore.jpg"
            mail(process.env.TITLE,"Restored All Contacts",`Dear ${req.user.dataValues.firstName} ${req.user.dataValues.lastName}, <br> You've sucessfully restored all the contacts, please avoid deleting contact if not needed as it might happend to lost your contact forever <br> Thanks & Regards <br> - Naeem khan `,req.user.dataValues.email,filename)
            res.send("Restored All the contacts")
        }
    }
}