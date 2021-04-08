const axios = require('axios')


const test = {
    title: 'Coğrafya Test-1',
    category: {
        title: 'Coğrafya'
    },
    questions: [
        {
            title: 'Dünyanın en büyük ülkesi hangisidir?',
            options: [
                {
                    title: 'Amerika'
                },
                {
                    title: 'Rusya'
                },
                {
                    title: 'Danimarka'
                },
                {
                    title: 'Türkiye'
                }
            ],
            correctOption: {
                title: 'Rusya'
            }
        }
    ]
}

// axios.post('http://localhost:8080/test', test).then(res => {
//     console.log(res)
// }).catch(err => {
//     console.log(err)
// })

const data = {
    username: 'Akseyh',
    answers: {
        '606dfb8ec2953be524c6a36f': '606dfb8ec2953be524c6a36e'
    }
}

axios.post('http://localhost:8080/test/606f54b117e7dd09ceb59439', data).then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})