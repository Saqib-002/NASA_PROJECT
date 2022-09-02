const {
    getAllLaunches,
    addNewLaunch
}=require('../../models/launches.model');

function httpGetAllLaunches(req,res){
    return res.status(200).json(getAllLaunches())
}

function httpAddNewLaunch(req,res){
    const launch=req.body;
    if(!launch.mission || !launch.launchDate || !launch.rocket || !launch.target){
        return res.status(400).json({
            error: 'No launch date provided',
        })
    }
    launch.launchDate=new Date( launch.launchDate)
    // if(isNaN(launch.launchDate)){ same as below
    if(launch.launchDate.toString()==="Invalid Date"){
        return res.status(400).json({
            error: 'Invalid launch date'
        })
    }
    addNewLaunch(launch)
    return res.status(201).json(launch)
}

module.exports={
    httpGetAllLaunches,
    httpAddNewLaunch
};