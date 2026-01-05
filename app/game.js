import { toggleLoader } from './index.js';
import { formatData } from './helpers.js';
import { endGame } from './end.js';

const anwser_category = document.querySelector('.anwser')
const anwserBox = document.querySelectorAll('.anwser-test')
const questionTitle = document.querySelector('.question')
const scoreTitle = document.querySelector('.score')
const progressIndex = document.querySelector('.progress')
const nextButton = document.getElementById('next-button')
const finishButton = document.getElementById('finish-button')

const myTypes = [25, 21, 22, 9]
let formatedData;
let questionIndex = 0;
let score = 0;
let correntIndex = 0;
let isAccess = true;
let timer = null
let timeLeft = 60

export const startGame = async (difficulty, type) => {
    const difficultyLevel = difficulty.toLowerCase() || 'medium'
    const category = myTypes[type] || 25
    
    toggleLoader(true)
    try {
        const MyData = await fetch(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficultyLevel}&type=multiple`).then()
        const data = await MyData.json()
        const lastData = formatData(data.results)
        formatedData = lastData
        toggleLoader(false)
        showQuestion()
    } catch (error) {
        console.log(error)
        toggleLoader(true)
    }
}

const resetAnswersStyle = () => {
  anwserBox.forEach(button => {
    button.style.backgroundColor = ''
    button.style.opacity = ''
  })
}

const renderComponents = (answerList) => {
  resetAnswersStyle()
  anwserBox.forEach((button, index) => {
    button.textContent = answerList[index]
  })
}

const showQuestion = () => {
    const dataQuestion = formatedData[questionIndex]
    anwser_category.style.display = 'flex'
    questionTitle.innerText = dataQuestion.question
    scoreTitle.innerText = "My Score :" + score
    progressIndex.innerText = questionIndex + 1 + '/10'
    correntIndex = dataQuestion.correctAnwserIndex
    console.log(dataQuestion.correctAnwserIndex)
    isAccess = true 
    renderComponents(dataQuestion.awnsers)
    startTimer()
}

const startTimer = () => {
    clearInterval(timer)
    timeLeft = 20

    const progressBar = document.querySelector('.progress-anwser')
    const maxRadius = 50

    progressBar.style.transform = 'scaleX(1)'
    progressBar.style.borderBottomRightRadius = maxRadius + 'px'
    progressBar.style.borderTopRightRadius = maxRadius + 'px'

    timer = setInterval(() => {
        timeLeft--

        const scale = timeLeft / 20
        const radius = maxRadius * scale

        progressBar.style.transform = `scaleX(${scale})`
        progressBar.style.borderBottomRightRadius = radius + 'px'
        progressBar.style.borderTopRightRadius = radius + 'px'

        if (timeLeft <= 0) {
            clearInterval(timer)
            isAccess = false
            nextQuestion()
        }
    }, 1000)
}


const handlerAnwser = (event, index) => {
    if (isAccess == false){
        return 
    }
    clearInterval(timer)

    const isCorrect = correntIndex == index ? true : false 
    if (isCorrect) {
        event.target.style.backgroundColor = '#44db5bff'
        event.target.style.opacity = 1
        score = score + 1;
    } else {
        event.target.style.backgroundColor = '#bd3636ff'
        anwserBox[correntIndex].style.backgroundColor = '#44db5bff'
        event.target.style.opacity = 1
        anwserBox[correntIndex].style.opacity = 1
    }
    isAccess = false
}

const nextQuestion = () => {
    if (questionIndex < formatedData.length - 1) {
        questionIndex++
        showQuestion()
    } else {
        localStorage.setItem('score', score)
        endGame()
    }
}


const finishQuestion = () => {
    localStorage.setItem('score', score)
        endGame()
}
anwserBox.forEach((button, index) => {
    button.addEventListener('click', (event) => handlerAnwser(event, index))
})

nextButton.addEventListener('click', nextQuestion)
finishButton.addEventListener('click', finishQuestion)
