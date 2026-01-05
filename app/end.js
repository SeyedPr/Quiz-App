
const saveButton = document.getElementById('save-button')
const backButton = document.getElementById('back-button')
const scoreShow = document.getElementById('score-show')
const incorrect = document.getElementById('incorrect-show')
const input = document.getElementById('username-save')


let score = Number(localStorage.getItem('score')) || 0
let topScore = JSON.parse(localStorage.getItem('topScore')) || []

export const endGame = () => {
    window.location.assign('end.html')
}

const showDetail = () => {
    scoreShow.innerText = "My Score : " + score
    const totalQuestions = 10
    const incorrectCount = totalQuestions - score
    incorrect.innerText = "Incorrect Anwser : " + incorrectCount
}



window.addEventListener('load', () => {
    backButton.addEventListener('click', () => {
        window.location.assign('index.html')
    })

    saveButton.addEventListener('click', () => {
        if (input.value.trim().length === 0) {
            alert("Please add your name.")
            return
        }

        const myID = {
            username: input.value.trim(),
            myScore: score
        }

        topScore.push(myID)
        localStorage.setItem('topScore', JSON.stringify(topScore))

        console.log(topScore)
        alert("Saved")
    })

    showDetail()
})
