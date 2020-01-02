const express = require("express")
const app = express()
const message = require("./routes/message")
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose")
const flash = require("connect-flash")
const session = require("express-session")
require("dotenv/config")



app.use(express.static("public"))
app.use(express.urlencoded({ extended: false }))
app.use(expressLayouts)
app.set("view engine", "ejs")
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }))
  app.use(flash())

  // Global variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');

    next();
  });




app.use("/", message)
mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true,useUnifiedTopology: true},
(err)=>{
    if(!err){console.log("connected to database")}
    else{console.log("app not connected" + err)}
}
)

const PORT = (process.env.PORT || 5000)

app.listen(PORT, ()=>console.log(`server running on port ${PORT}`))