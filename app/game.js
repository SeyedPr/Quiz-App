import { toggleLoader } from './index.js';
import { formatData } from './helpers.js';


const myTypes = [25, 21, 22, 9]
let formatedData;

export const startGame = async (difficulty, type) => {
    const difficultyLevel = difficulty.toLowerCase() || 'medium'
    const category = myTypes[type] || 25
    
    toggleLoader(true)
    try {
        const MyData = await fetch(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficultyLevel}&type=multiple`).then()
        const data = await MyData.json()
        const lastData = formatData(data.results)
        console.log(data.results)
        toggleLoader(false)
    } catch (error) {
        console.log(error)
        toggleLoader(true)

    }
}