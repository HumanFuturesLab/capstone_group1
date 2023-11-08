const express = require('express')
const app = express()

app.use(express.json())

const events = []
const signatures = []

app.get('/events', (req, res) => {
    res.json(events)
})

app.post('/events', (req, res) => {
    const event = { name: req.body.name, id: req.body.id, adminId: req.body.adminId, attendanceCode: req.body.attendanceCode, pointReward: req.body.pointReward}

    var exists = false
    var code = 501
    var response = "An internal error has occured"

    for(var i = 0; i < events.length; i++) {
        var element = events[i]
        if(element.id == event.id) {
            code = 401
            response = "Event Already Exists"
            exists = true
            break
        }
    }

    if(!exists) {
        events.push(event)
        code = 201
        response = "Event Added"
    }

    res.status(code).send(response)
})

app.get('/signup', (req, res) => {
    res.json(signatures)
})

app.post('/signup', (req, res) => {
    const signature = { userId: req.body.userId, eventId: req.body.eventId}

    var exists = false
    var code = 501
    var response = "An internal error has occured"

    for(var i = 0; i < events.length; i++) {
        var element = events[i]
        if(element.id == signature.eventId) {
            exists = true
            break
        }
    }
    if(!exists) {
        code = 401
        response = "Event does not exist"
    }
    else {
        exists = false
        for(var i = 0; i < signatures.length; i++) {
            var element = signatures[i]
            if(element.userId == signature.userId && element.eventId == signature.eventId) {
                exists = true
                code = 402
                response = "User is already signed up"
                break
            }
        }
        if(!exists) {
            signatures.push(signature)
            code = 201
            response = "Signed Up"
        }
    }

    res.status(code).send(response)
})

app.get('/attendance', (req, res) => {
    const attend = { userId: req.body.userId, eventId: req.body.eventId, attendanceCode: req.body.attendanceCode}

    var exists = false
    var code = 500
    var response = ""

    for(var i = 0; i < events.length; i++) {
        var event = events[i]
        if(event.id == attend.eventId && event.attendanceCode == attend.attendanceCode) {
            exists = true
            code = 201
            response = (event.pointReward).toString()
            break
        }
        else{
            response += "checked\n"
        }
    }
    if(!exists) {
        code = 401
        response += "Wrong event code"
    }

    res.status(code).send(response)
})

app.listen(3000)