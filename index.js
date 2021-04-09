const express = require('express')
const app = express()
const port = 8080
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


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
        console.log(data)
    }).catch(err => {
        console.log(err)
    })
})

app.get('/test', async (req, res) => {
    const tests = await Test.find({})
    res.json(tests)
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
    const option1 = new Option({ title: 'İstanbul' })
    const option2 = new Option({ title: 'Konya' })
    const option3 = new Option({ title: 'Sakarya' })
    const option4 = new Option({ title: 'Ordu' })

    option1.save().then(data => {
        console.log(data)
    }).catch(err => {
        console.log(err)
    })
    option2.save().then(data => {
        console.log(data)
    }).catch(err => {
        console.log(err)
    })
    option3.save().then(data => {
        console.log(data)
    }).catch(err => {
        console.log(err)
    })
    option4.save().then(data => {
        console.log(data)
    }).catch(err => {
        console.log(err)
    })

    const question1 = new Question({
        title: 'Türkiyenin en büyük yüzölçümüne sahip şehri hangisidir?',
        options: [
            option1,
            option2,
            option3,
            option4,
        ],
        correctOption: option2
    })
    question1.save().then(data => {
        console.log(data)
    }).catch(err => {
        console.log(err)
    })

    const category = new Category({
        title: 'Coğrafya'
    })
    category.save().then(data => {
        console.log(data)
    }).catch(err => {
        console.log(err)
    })

    const test = new Test({
        title: 'Coğrafya Testi',
        category,
        questions: [
            question1
        ]
    })
    test.save().then(data => {
        console.log(data)
        res.json(data)
    }).catch(err => {
        console.log(err)
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

