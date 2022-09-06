const mongoose=require("mongoose");

const  launchesSchema=new mongoose.Schema({
    flightNumber:{
        type:Number,
        required:true
    },
    mission:{
        type:String,
        require:true
    },
    rocket:{
        type:String,
        require:true
    },
    launchDate:{
        type:Date,
        require:true
    },
    target:{
        type:String,
        required:true
    },
    customers:[String],
    upcoming:{
        type:Boolean,
        required:true
    },
    success:{
        type:Boolean,
        required:true,
        default:true
    },
})

module.exports=mongoose.model('Launch',launchesSchema);


