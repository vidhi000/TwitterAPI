// import {ans} from "../controller/twitterController"
import  {hashtagSearch}  from "../controllers/twitterController.js"

test("Addition",(a=3,b=3)=>{
    let res = a+b
    expect(res).toBe(6)
})

test("Multiplication",(x=3,y=4)=>{
    let ans = x*y
    expect(ans).toBe(12)
})

// test("subtraction",(A=5,B=5)=>{
//     let sub = A-B
//     expect(sub).toBe(10)
// })

