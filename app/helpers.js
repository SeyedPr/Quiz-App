export const formatData = (items = []) => {
    const data = items.map((item, key)=> {
        const questionObject = {question: item.question}
        const questionAnwser = [...item.incorrect_answers]
        const correctAnwser = item.correct_answer
        const correctAnwserIndex = Math.floor(Math.random() * 4)
        questionAnwser.splice(correctAnwser, 0, correctAnwser)
        questionObject.awnsers = questionAnwser
        questionObject.correctAnwserIndex = correctAnwserIndex
        return questionObject
    })
    return data
}

