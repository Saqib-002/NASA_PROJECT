const PORT=process.env.PORT||8000;  //5000
const http=require("http");

require('dotenv').config();

const app=require("./app");
const {mongoConnect}=require("./services/mongo")
const {
    loadPlanetsData
}=require("./models/planets.model");
const {
    loadLauchesData
}=require("./models/launches.model");

const server=http.createServer(app);

async function startServer(){
    await mongoConnect();
    await loadPlanetsData();
    await loadLauchesData();
    server.listen(PORT,()=>{
        console.log(`Listening on port ${PORT}...`)
    })
}

startServer()
