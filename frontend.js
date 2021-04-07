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

axios.post('http://localhost:8080/post', test).then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})