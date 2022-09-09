const launchesDatabase=require('./launches.mongo');
const planets=require('./planets.mongo');
const axios=require('axios');

const DEFAULT_FLIGHT_NUMBER=100;


const SPACEX_URL="https://api.spacexdata.com/v5/launches/query";

async function findLaunch(filter){
    return await launchesDatabase.findOne(filter);
}

async function populateLaunches(){
    const response =await axios.post(SPACEX_URL,{
        query:{},
        options:{
            pagination:false,
            populate:[
            {
                path:'rocket',
                select:{
                    name:1
                }
            },
            {
                path:'payloads',
                select:{
                    'customers':1
                }
            }
        ]}
    })
    if(response.status!==200){
        console.log("error while download launch data from spacex api");
        throw new Error("downloading launch data from spacex api failed");
    }
    const launchDocs=response.data.docs;
    for(const launchDoc of launchDocs){
        const payloads=launchDoc['payloads'];
        const customers=payloads.flatMap((payload) =>{
            return payload['customers'];
        })
        const launch={
            flightNumber:launchDoc['flight_number'],
            mission:launchDoc['name'],
            rocket:launchDoc['rocket']['name'],
            launchDate:launchDoc['date_local'],
            target:launchDoc[''],
            customers,
            upcoming:launchDoc['upcoming'],
            success:launchDoc['success'],
        }
        console.log(launch);
        saveLaunch(launch)
    }
}

async function loadLauchesData(){
    const firstLaunch=await findLaunch({
        flightNumber:1,
        rocket:'Falcon 1',
        mission:'FalconSat'
    })
    if(firstLaunch){
        console.log("Launch data already exists!")
    }else{
        await populateLaunches();
    }
}

async function existsLaunchWithId(launchId){
    return await findLaunch({
        flightNumber:launchId
    })
}

async function getLatestFLightNumber(){
    const latestLaunch=await launchesDatabase.findOne()
    .sort('-flightNumber');
    if(!latestLaunch){
        return DEFAULT_FLIGHT_NUMBER;
    }
    return latestLaunch.flightNumber;
}

async function getAllLaunches(skip,limit){
    return await launchesDatabase.find({},{
        '_id':0,
        '__v':0
    })
    .sort({flightNumber:1})
    .skip(skip).limit(limit);
}

async function saveLaunch(launch){
    await launchesDatabase.findOneAndUpdate({
        flightNumber:launch.flightNumber
    },launch,{
        upsert:true
    })
}

async function addNewLaunch(launch){
    const planet=await planets.findOne({
        keplerName: launch.target
    })
    if(!planet){
        throw new Error('Planet not found');
    }
    const newFlightNumber=await getLatestFLightNumber()+1;
    const newLaunch=Object.assign(launch,
        {
            success:true,
            upcoming:true,
            customer:["Zero To Mastery","NASA"],
            flightNumber:newFlightNumber
        });
    await saveLaunch(newLaunch);
} 
async function abortLaunchById(launchId){
    const aborted=await launchesDatabase.updateOne({
        flightNumber:launchId
    },{
        upcoming:false,
        success:false
    })
    return aborted.acknowledged===true && aborted.modifiedCount===1;
}

module.exports ={
    loadLauchesData,
    existsLaunchWithId,
    getAllLaunches,
    addNewLaunch,
    abortLaunchById
}