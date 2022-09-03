const request=require("supertest")
const app=require("../../app")

describe("Test GET /launches",()=>{
    test("it should respond with 200 success",async ()=>{
        const response=await request(app)
        .get('/launches')
        .expect(200)
        .expect("Content-Type", /json/);
        // expect(response.statusCode).toBe(200)
    })
});


describe("Test POST /launches",()=>{
    const completeLaunchData={
        mission:"USS Enterprise",
        rocket:"NCC 1701-D",
        target:"Kepler-186 f",
        launchDate:"January 4, 2028"
    }
    const launchDataWithoutDate={
        mission:"USS Enterprise",
        rocket:"NCC 1701-D",
        target:"Kepler-186 f"
    }
    test("it should respond with 201 created",async ()=>{
        const response=await request(app)
        .post('/launches')
        .send(completeLaunchData)
        .expect(201)
        .expect("Content-Type", /json/)

        const requestDate=new Date(completeLaunchData.launchDate).valueOf();
        const responseDate=new Date(response.body.launchDate).valueOf();
        expect(responseDate).toBe(requestDate)
        expect(response.body).toMatchObject(launchDataWithoutDate);
    })
    test("it should catch missing rerquired properties",()=>{
    })
    test("it should catch invalid dates",()=>{
    })
});

