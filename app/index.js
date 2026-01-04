const categoryRow = document.querySelectorAll('.row-category')
const categoryButton = document.querySelector('.category-button')
const category = document.querySelector('.selectCateg')

const levelRow = document.querySelectorAll('.row-level')
const levelButton = document.querySelector('.level-button')
const level = document.querySelector('.selectLevel')

let categoryType = 0;
let levelType = '';


const removeSelectorCategory = (key) => {
    categoryRow.forEach((element, key) => {
        element.classList.remove('selectedCategory')
    })
}

const handlerCategory = (key) => {
    removeSelectorCategory();
    event.target.classList.toggle('selectedCategory');
    categoryButton.style.opacity = 1;
    categoryType = key;
}

const finishSelectCategory = () => {
    if (categoryType == 0) {
        alert("please select type")
        return 
    }
    category.style.display = 'none';
}



const removeSelectorLevel = (key) => {
    levelRow.forEach((element, key) => {
        element.classList.remove('selectedCategory')
    })
}

const handlerLevel = (key) => {
    removeSelectorLevel();
    event.target.classList.toggle('selectedCategory');
    levelButton.style.opacity = 1;
    console.dir(event.target.innerText)
    levelType = event.target.innerText;
}

const finishSelectLevel = () => {
    if (levelType == '') {
        alert("please select level")
        return 
    }
    level.style.display = 'none';
}

categoryRow.forEach((element, key) => {
    element.addEventListener('click', (key) => handlerCategory(key))
})

levelRow.forEach((element, key) => {
    element.addEventListener('click', (key) => handlerLevel(key))
})

categoryButton.addEventListener('click', finishSelectCategory)
levelButton.addEventListener('click', finishSelectLevel)
