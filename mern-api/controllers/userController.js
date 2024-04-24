const asyncHandler = require('express-async-handler')
const User         = require('../model/userModel')
const bcrypt       = require('bcryptjs')
const connectDB = require('db')

connectDB()

const registerUser = asyncHandler(async (event) => {
    const data  = JSON.parse(event.body)

    if(!data.name || !data.email ||!data.username||!data.password){
        const response = {
            statusCode: 400,
            body: JSON.stringify({erorrCode: 400, messaage:'Please provide all fields'})
        }    
        return response;
    }
    var email = data.email
    var password = data.password

    const userExist = await User.findOne({email})

    if(userExist){
        const response = {
            statusCode: 422,
            body: JSON.stringify({erorrCode: 422, messaage:'User already exists'})
        }    
        return response;
    }

    const salt = await bcrypt.genSaltSync(10)
    const newPassowrd = password.toString()
    const hashPassword = await bcrypt.hashSync(newPassowrd,salt)

    const user = await User.create({
        name: data.name,
        username: data.username,
        email: data.email,
        password: hashPassword,
    })
    const response = {
        statusCode: 201,
        body: JSON.stringify({erorrCode: 00, messaage: "User registered successfully!"})
    }

    return response;
})

const loginUser = asyncHandler(async (event) => {
    const data  = JSON.parse(event.body)

    var username = data.username
    var password = data.password
    const userExist = await User.findOne({username})

    if(!userExist){
        const response = {
            statusCode: 422,
            body: JSON.stringify({erorrCode: 422, messaage:'User does not exists'})
        }    
        return response;
    }

    if(userExist && await bcrypt.compareSync(password, userExist.password)){
        const response = {
            statusCode: 200,
            body: JSON.stringify({erorrCode: 00, messaage: "User login successfully!", userId : userExist.id})
        }
    
        return response;
    }else{
        const response = {
            statusCode: 500,
            body: JSON.stringify({erorrCode: 422, messaage:'Please try again'})
        }    
        return response;
    }

})

module.exports = {
    registerUser, loginUser
}