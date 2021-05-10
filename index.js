const express = require('express')
var cors = require('cors')
const app = express()
const port = 8080
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors())


// Models
const Answer = require("./models/Answer")
const Option = require("./models/Option")
const Test = require("./models/Test")
const Question = require("./models/Question")
const Category = require("./models/Category")

const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

app.post('/test', async (req, res) => {
    const { title, questions, category } = req.body

    const qs = await Promise.all(
        questions.map(async q => {
            const options = await Promise.all(
                q.options.map(async op => {
                    const haveOption = await Option.find({ title: op.title }).exec()
                    if (!!haveOption.length) return haveOption[0]

                    const option = new Option(op)
                    return option.save().catch(err => {
                        return null
                    })
                })
            )

            const correctOption = await Option.find({ title: q.correctOption.title }).exec()

            const question = new Question({
                ...q,
                options,
                correctOption: correctOption[0]
            })

            return question.save().catch(err => {
                console.log(err)
            })
        })
    )
    let ct
    const hasCategory = await Category.find({ title: category.title }).exec()
    if (hasCategory.length) {
        ct = hasCategory[0]
    } else {
        ct = new Category(category)
        ct = await ct.save().catch(err => {
            console.log(err)
        })
    }

    const test = new Test({
        title,
        category: ct,
        questions: qs
    })

    test.save().then(data => {
        res.send(data)
        console.log(data)
    }).catch(err => {
        console.log(err)
    })
})

app.get('/test', async (req, res) => {
    const tests = await Test.find({})
    res.json(tests)
})

app.get('/test/:id', async (req, res) => {
    const test = await Test.findById(req.params.id)
    res.json(test)
})

app.post('/test/:id', async (req, res) => {
    const { username, answers } = req.body
    const answer = new Answer({ username, answers })

    answer.save().then(data => {
        console.log(data)
    }).catch(err => {
        console.log(err)
    })
})

app.get('/', (req, res) => {
    res.send('BSEU TEST APP')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

