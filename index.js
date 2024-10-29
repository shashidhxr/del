import express from "express"
import mysql from 'mysql2'

const app = express()
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    "password": "root",
    "database": "test"
})

app.use(express.json())

app.get('/', (req, res) => {
    res.json("This is the backend")
})

app.get('/users', (req, res) => {
    const q = 'select * from users'
    db.query(q, (err, data) => {
        if(err){
            console.log("error")
            return res.json(err)
        }
        return res.json(data)
    })
})

app.post('/users', (req, res) => {
    const q = 'insert into users (`user_id`, `name`, `balance`) values (?)'
    const values = [
        req.body.user_id,
        req.body.name,
        req.body.balance
    ]
    
    db.query(q, [values], (err, data) => {
        if(err){
            return res.json(err)
        }
        return res.json("User created succefully")
    })
})

app.listen('3000', () => {
    console.log("Server is running at 3000")
})