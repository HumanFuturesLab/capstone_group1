const express = require('express')
const app = express()

app.use(express.json())

const events = []
const signatures = []
const users = []
const rewards = []

//Return array of all events
app.get('/events', (req, res) => {
    res.json(events)
})

//Adds event to array if not already existant [UPDATED]
app.post('/events', (req, res) => {
    const event = { name: req.body.name, id: req.body.id, adminId: req.body.adminId, attendanceCode: req.body.attendanceCode, pointReward: req.body.pointReward}

    var code = 501
    var response = "An internal error has occurred"

    if(eventExists(event.id)) {
        code = 401
        response = "Event Already Exists"
    } else {
        events.push(event)
        code = 201
        response = "Event Added"
    }

    res.status(code).send(response)
})

//Return array of signups
app.get('/signup', (req, res) => {
    res.json(signatures)
})

//Adds signup to array if not already existant [UPDATED]
app.post('/signup', (req, res) => {
    const signature = { userId: req.body.userId, eventId: req.body.eventId}

    var code = 501
    var response = "An internal error has occured"

    if(eventExists(signature.eventId)) {
        if(userExists(signature.userId)) {
            if(signupExists(signature.eventId, signature.userId)) {
                code = 402
                response = "User is already signed up"
            } else {
                signatures.push(signature)
                code = 201
                response = "Signed Up"
            }
        } else {
            code = 401
            response = "User does not exist"
        }
    } else {
        code = 401
        response = "Event does not exist"
    }

    res.status(code).send(response)
})

//Checks code sent by user is a valid attendance code and sends point reward, else returns error
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

            for(var j = 0; j < users.length; j++) {
                var element = users[j]
                if(element.id == attend.userId) {
                    users[j].points += event.pointReward
                    break
                }
            }

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

//Deletes specified event and all signups associated
app.post('/events/deletion', (req, res) => {
    var eventId = req.body.eventId

    var exists = false
    var code = 500
    var response = ""

    for(var i = 0; i < events.length; i++) {
        var event = events[i]

        if(event.id == eventId) {
            exists = true
            code = 201
            response = "Event deleted"
            events.splice(i, 1)
            break
        }
        else {
            response += event.eventId + "\n"
        }
    }

    if(!exists) {
        code = 401
        response += "Event does not exist"
    } else {
        for(var i = 0; i < signatures.length; i++) {
            var element = signatures[i]

            if(element.eventId == eventId) {
                signatures.splice(i, 1)
                i--
            }
        }
    }

    res.status(code).send(response)
})

//Placeholder to fill arrays with various elemtns
app.post('/dummy', (req, res) => {
    var EVENTSTART = 12185
    var USERSTART = 1
    var NUMEVENTS = 7
    var NUMUSERS = 3

    var userAdded = USERSTART
    for (var i = 0; i < NUMUSERS; i++) {
        const user = {id: userAdded, points: 1000}
        users.push(user)
        userAdded++
    }
    var eventAdded = EVENTSTART
    for (var i = 0; i < NUMEVENTS; i++) {
        const event = {name: "Hiking", id: eventAdded, attendanceCode: "randomString", adminId: NUMEVENTS, pointReward: (NUMEVENTS*NUMUSERS)}
        events.push(event)
        eventAdded++
    }
    eventAdded = EVENTSTART
    userAdded = USERSTART
    for (var i = 0; i < events.length; i++) {
        for (var j = 0; j < NUMUSERS; j++) {
            const signature = {userId: userAdded, eventId: eventAdded}
            signatures.push(signature)
            userAdded++
        }
        userAdded = USERSTART
        eventAdded++;
    }
    res.status(200).send("Data added")
})

//Adds user to array if not already existant
app.post('/user', (req, res) => {
    const user = { id: req.body.id, points: 0 }

    var code = 501
    var response = "An internal error has occurred"

    if(userExists(user.id)) {
        code = 401
        response = "User already exists"
    } else {
        users.push(user)
        code = 201
        response = "User added"
    }

    res.status(code).send(response)
})

//Return array of users
app.get('/user', (req, res) => {
    res.json(users)
})

//Return array of rewards
app.get('/reward', (req, res) => {
    res.json(rewards)
})

//Adds reward to array if not already existant
app.post('/reward', (req, res) => {
    const reward = { name: req.body.name, id: req.body.id, cost: req.body.cost }

    var code = 501
    var response = "An internal issue has occurred"

    if(rewardExists(reward.id) == -1) {
        rewards.push(reward)
        code = 201
        response = "Reward added"
    } else {
        code = 401
        response = "Reward already exists"
    }

    res.status(code).send(response)
})

//Attempts to purchase reward for given user
app.post('/redeem', (req, res) => {
    const redemption = { rewardId: req.body.rewardId, userId: req.body.userId }

    var code = 501
    var response = "An internal error has occurred"

    while(true) {

        if(!userExists(redemption.userId)) {
            code = 401
            response = "User does not exist"
            break
        }
        if(rewardExists(redemption.rewardId) == -1) {
            code = 401
            response = "Reward does not exist"
            break
        }

        if(users[userGet(redemption.userId)].points >= rewards[rewardExists(redemption.rewardId)].cost) {
            users[userGet(redemption.userId)].points -= rewards[rewardExists(redemption.rewardId)].cost
            code = 201
            response = "Reward redeemed"
            break
        } else {
            code = 401
            response = "User does not have enough points"
            break
        }

        break
    }

    res.status(code).send(response)
})

app.listen(3000)



//Takes the event id and returns true if it exists, or false if it doesn't
function eventExists(givenId) {
    for(var i = 0; i < events.length; i++) {
        var element = events[i]
        if(element.id == givenId) return true
    }
    return false
}

//Takes the user id and returns true if it exists, or false if it doesn't
function userExists(givenId) {
    for(var i = 0; i < users.length; i++) {
        var element = users[i]
        if(element.id == givenId) return true
    }
    return false
}

//Takes user id and event id, if signup exists, returns true. Otherwise returns false
function signupExists(userId, eventId) {
    for(var i = 0; i < signatures.length; i++) {
        element = signatures[i]
        if(element.userId == userId && element.eventId == eventId) return true
    }
    return false
}

//Takes reward id and returns index if it exists, or -1 if it doesn't
function rewardExists(rewardId) {
    for(var i = 0; i < rewards.length; i++) if(rewards[i].id == rewardId) return i
    return -1
}

function userGet(givenId) {
    for(var i = 0; i < users.length; i++) {
        var element = users[i]
        if(element.id == givenId) return i
    }
    return -1
}