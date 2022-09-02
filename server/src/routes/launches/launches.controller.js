const {launches}=require('../../models/launches.model');

function getAllLaunches(req,res){
    console.log(Array.from(launches.values()))
    return res.status(200).json(Array.from(launches.values()))
}

module.exports={
    getAllLaunches
};