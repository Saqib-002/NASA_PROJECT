const {getAllLaunches}=require('../../models/launches.model');

function httpGetAllLaunches(req,res){
    // console.log(Array.from(launches.values()))
    // return res.status(200).json(Array.from(launches.values()))
    return res.status(200).json(getAllLaunches())
}

module.exports={
    httpGetAllLaunches
};