const launches=new Map;

const launch={
    flightNumber:100,
    mission:'Kepler Exploration X',
    rocket:'Explorer IS1',
    launchedDate:new Date('December 27, 2030'),
    target:'Kepler-442 b',
    customer:['ZTM','NASA'],
    upcoming:true,
    success:true,
}
launches.set(launch.flightNumber,launch);

module.exports ={
    launches
}