const PORT=process.env.PORT||8000;
const http=require("http");
const app=require("./app");
const mongoose=require("mongoose")
const {
    loadPlanetsData
}=require("./models/planets.model");

// Mongo
const MONGO_URL='mongodb+srv://nasa_api:Qo9SR0ZgTdtV1dYq@cluster0.6juh3zw.mongodb.net/nasa?retryWrites=true&w=majority'

const server=http.createServer(app);

mongoose.connection.once('open',()=>{
    console.log('Connected to MongoDB');
})
mongoose.connection.on('error',(err)=>{
    console.error(err);
})

async function startServer(){
    await mongoose.connect(MONGO_URL);
    await loadPlanetsData();
    server.listen(PORT,()=>{
        console.log(`Listening on port ${PORT}...`)
    })
}

startServer()
