const mongoose=require("mongoose");


const connectdatabase=()=>{
mongoose.connect(process.env.databaseURL).then(
    console.log("Connected to database"))
// .catch((err)=>{
//     console.log(err);
// })

}

module.exports=connectdatabase;
