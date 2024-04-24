const asyncHandler = require('express-async-handler')
const Goal         = require('../model/goalModel')
const connectDB = require('db')

connectDB()

const getGoals = asyncHandler(async (event) => {
        
    const goals = await Goal.find({user:event.pathParameters.id})
    const response = {
        statusCode: 200,
        body: JSON.stringify(goals)
    }

    return response;
})

const createGoal = asyncHandler(async(event) => {
   
    const data  = JSON.parse(event.body)

    if(!data.text){
        const response = {
            statusCode: 400,
            body: 'please provide a goal'
        }    
        return response;
    }

    const goal = await Goal.create({
        text: data.text,
        user: data.userId
    })
    const response = {
        statusCode: 201,
        body: JSON.stringify({erorrCode: 00, messaage: "Goal added successfully!"})
    }

    return response;
})

const updateGoal = asyncHandler(async(event) => {
    const goal = await Goal.findById(event.pathParameters.id,)
    const data  = JSON.parse(event.body)
    if(!goal){
        const response = {
            statusCode: 400,
            body: JSON.stringify({erorrCode: 400, messaage: "Goal not found!"})
        }    
        return response;
    }
console.log(event.pathParameters.id)
    const updateGoal = await Goal.findByIdAndUpdate(event.pathParameters.id,data.text,{new:true})

    const response = {
        statusCode: 200,
        body: JSON.stringify(updateGoal)
    }

    return response;
})

const deleteGoal = asyncHandler(async(event) => {

    const goal = await Goal.findById(event.pathParameters.id,)

    if(!goal){
        const response = {
            statusCode: 400,
            body: JSON.stringify({erorrCode: 400, messaage: "Goal not found!"})
        }    
        return response;
    }

    await goal.remove()
    const response = {
        statusCode: 200,
        body: JSON.stringify({erorrCode: 00, messaage: "Goal removed successfully!"})
    }

    return response;
})

module.exports = {
    getGoals, createGoal,updateGoal,deleteGoal
}