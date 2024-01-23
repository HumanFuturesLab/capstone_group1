const express = require('express')
const app = express()
const bcrypt = require('bcrypt')

app.use(express.json())

//Temporary array that stores usernames and passwords, this will be removed with access to database
const users = []

//Temporary function to allow viewing of user array
app.get('/users', (req, res) => {
    res.json(users)
})

//Function allows user to create account
app.post('/users', async (req, res) => {
    try {

        //create hashed password
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        //parse user
        const user = {
            name: req.body.name,
            password: hashedPassword
        }

        //push user
        users.push(user)
        res.status(201).send('User pushed')

    } catch {
        //errors
        res.status(500).send('Something went wrong')
    }
})

//Function allows user to try login
app.post('/users/login', async (req, res) => {

    //See if user exists
    const user = users.find(user => user.name == req.body.name)

    if (user == null) {
        //User not found
        return res.status(400).send('Cannot find user')
    }
    try {

        //Verify password
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send('Success')
        }else {
            res.send('Wrong')
        }

    } catch {
        //Failure with bcrypt
        res.status(500).send('Something went wrong')
    }
})

app.listen(3000)