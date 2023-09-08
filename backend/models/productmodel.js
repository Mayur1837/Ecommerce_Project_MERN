const mongoose=require("mongoose");

productschema=new mongoose.Schema({
    name:{
        type: String,
        required:[true,"Please Enter a Product Name"],
        trim:true
    },

    description:{
       type: String,
       required:[true,"Please Enter a Product Description"]
    },
    price:{
        type:Number,
        required:[true,"Please Enter a Product price"],
        maxLength:[8,"Price cannot exceed the 8 characters"]
    },
    ratings:{
        type: Number,
        default:0
    },

    //there are many images of one product that's we take an array....
    images:[{
        public_id:{
            type:String,
            required:true

        },
        url:{
            type:String,
            required:true
        }
    }],

    category:{
        type:String,
        required:[true,"Please enter a Product Catogory"]

    },
    stock:{
        type:Number,
        required:[true,"Please Enter a product stock"],
        maxLength:[4,"Stock cannot exceed 4 characters"],
        default:1
    },
    numOfreviews:{
        type:Number,
        default:0
    },
    reviews:[{
        user:{

            type:mongoose.Schema.ObjectId,
            ref: "User",
            required:true,
        
            },
       name:{
        type:String,
        required:true,
       },
       rating:{
         type:Number,
         required:true
       },
       comment:{
        type:String,
        required:true
       }
    }],

    user:{

    type:mongoose.Schema.ObjectId,
    ref: "User",
    required:true,

    },
    createAt:{
      type:Date,
      default:Date.now
    }   
});

module.exports=mongoose.model("Product",productschema);