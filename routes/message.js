const express = require("express")
const router = express.Router();
const Message = require("../models/Message")



router.get("/", (req,res)=>{

    res.render("index");
})
router.get("/about", (req,res)=>{

    res.render("about");
})
router.get("/contact", (req,res)=>{

    res.render("contact");
})
   //post request
router.post("/contact", (req,res)=>{
    
    const{fullname, email, number, message} = req.body
    let errors = [];
     if(!fullname|| !email || !number || !message){
         errors.push({msg:"Field cannot be empty"})
     }
     if(isNaN(number)){
         errors.push({msg:"Phone number must be numbers only"})
     }
     if(number.length !=11){
        errors.push({msg:"Phone number is incorrect"})
    }
    if(errors.length > 0){
        res.render('contact', {
            errors,
            fullname,
            email,
            number,
            message
         });
        }else{
            const newMessage = new Message({
               fullname,
               email,
               number,
               message
            })
            newMessage.save()
            .then(message=>{
                req.flash('success_msg', 'Your Message has been successfully sent')
                res.redirect("contact")
            })
            .catch(err=>{console.log(err)})
        }

    })

/*const message = new Message()
   message.fullname = req.body.fullname
   message.email = req.body.email
   message.number = req.body.number
   message.message = req.body.message
    
   message.save((err)=>{
       if(!err){
       res.redirect("contact")
       }
       else{console.log("an error occurred" + err)}
   }) */



module.exports = router;
