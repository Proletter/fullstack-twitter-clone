const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const monk = require('monk')
const db = monk(process.env.MONGO_URI ||'localhost/mower')
const mews = db.get('mews')
const Filter = require('bad-words')



app.use(cors())
app.use(express.json())

const IsValidNow = (mew) => {
    return mew.name && mew.name.toString().trim() !== '' &&
    mew.content && mew.content.toString().trim() !== '' 
}

const filter = new Filter()
app.get('/', async (req, res) => {
    try {
        const data = await mews.find()
        res.json(data)
    } catch (error) {
        console.log(error)
    }
   
})

app.post('/mews', (req, res) => {
    if (IsValidNow(req.body)) {
        const mew = {
            name: filter.clean(req.body.name.toString()),
            content: filter.clean(req.body.content.toString()),
            created: new Date()
        }

        mews
            .insert(mew)
            .then(createdMew => {
                res.json(createdMew)
            })
    } else {
        res.status(420)
        res.json({
            message: 'Name and content are required'
        })
    }
  console.log(req.body)  
})






app.listen(1337, () => {
    console.log('listening on port 1337')
})