const mongoose=require("mongoose")

// Mongo
const MONGO_URL='mongodb+srv://nasa_api:Qo9SR0ZgTdtV1dYq@cluster0.6juh3zw.mongodb.net/nasa?retryWrites=true&w=majority'

mongoose.connection.once('open',()=>{
    console.log('Connected to MongoDB');
})
mongoose.connection.on('error',(err)=>{
    console.error(err);
})

async function mongoConnect(){
    await mongoose.connect(MONGO_URL);
}
async function mongoDisconnect(){
    await mongoose.disconnect();
}

module.exports={
    mongoConnect,
    mongoDisconnect
}