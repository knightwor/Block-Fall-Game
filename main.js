import { checkCollision } from "./js/collision.js";

const playGround = document.getElementById("play-ground");
const gameMenu = document.getElementById("start-screen")
const endGameMenu = document.getElementById("end-screen")
const enemyLeft = document.getElementById("block-left");
const enemyMid = document.getElementById("block-mid");
const enemyRight = document.getElementById("block-right");
const character = document.getElementById("character");
const gameResult = document.getElementById("game-result");
const scoreBoard = document.getElementById("score");
const leftBtn = document.getElementById("left-btn")
const rightBtn = document.getElementById("right-btn")
const playBtn = document.getElementById("play-btn")
const retryBtn = document.getElementById("retry-btn")
const quitBtn = document.getElementById("quit-btn")
const resetBtn = document.getElementById("reset-btn")
const optBtn = document.getElementById("opt-btn")
const gameSpeedSlider = document.getElementById("speed-slider") 
const gameSpeedSliderTxt = document.getElementById("speed-slider-value")
const gameSettingsMenu = document.getElementById("game-setting")
const closeSettingsMenuButton = document.getElementById("back-btn")

const viewPadding = window.innerWidth < 500 ? (window.innerWidth / 7) : 50
const blockWidth = window.innerWidth < 500 ? (window.innerWidth / 9) : 100

const blockGap = viewPadding
const enemyArr = [enemyLeft, enemyMid, enemyRight]

const DEFUALT_GAME_CONFING = {
  GAME_SPEED: 8
}

let gameSpeed = DEFUALT_GAME_CONFING.GAME_SPEED
let score = 0;
let blockPosIndex = 1;
let count = 0
let isGameOver = true
let chanceForBlockA = Math.floor(Math.random() * (enemyArr.length * 100))
let chanceForBlockB = Math.floor(Math.random() * (enemyArr.length * 100))
let colors = ["#B8B8FF", "salmon", "#b3446c", "#f88379", "#7eb77f", "#b284be"];

enemyArr.forEach(obj => {
  obj.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
})


function main() {
 
  if (!isGameOver) {
    scoreBoard.textContent = `Score: ${score}`;
    
    moveEnemy(enemyArr)

    if (checkCollision(character, enemyLeft) || checkCollision(character, enemyMid) || checkCollision(character, enemyRight)) {
      gameResult.textContent = `Your Total Score :  ${score}`
      showElement(endGameMenu)
      count = 0
      score = 0
    
      isGameOver = true
    }

  }
  
  requestAnimationFrame(main)
}

showElement(gameMenu)
main()

function startGame() {
  hideElement(gameMenu)
  hideElement(endGameMenu)
  showElement(playGround)

  chanceForBlockA = Math.floor(Math.random() * (enemyArr.length * 100))
  chanceForBlockB = Math.floor(Math.random() * (enemyArr.length * 100))

  enemyArr.forEach((obj) => {
    obj.style.top = `-${obj.getBoundingClientRect().height}px`
  })

  blockPosIndex = 1
  character.style.left = `${(blockWidth + blockGap) * blockPosIndex + viewPadding}px`
  enemyLeft.style.left = `${viewPadding}px`
  enemyRight.style.right = `${viewPadding}px`

  isGameOver = false
}

function backToStart() {
  showElement(gameMenu)
  hideElement(endGameMenu)
  hideElement(playGround)
}

function openSettings() {
  gameSettingsMenu.style.display = "flex"
}

function closeSettings() {
  gameSettingsMenu.style.display = "none"
}

function moveEnemy(arr) {

  let BAI = Math.floor(chanceForBlockA / 100)
  let BBI = Math.floor(chanceForBlockB / 100)

  if (BBI === BAI) chanceForBlockB = Math.floor(Math.random() * (enemyArr.length * 100))

  let by = arr[BAI].getBoundingClientRect().top
  let bh = arr[BAI].getBoundingClientRect().height 
  let by2 = arr[BBI].getBoundingClientRect().top
  let bh2 = arr[BBI].getBoundingClientRect().height 

  if (by > window.innerHeight + bh * 2) {
    arr[BAI].style.top = `-${bh}px`
    arr[BAI].style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
    chanceForBlockA = Math.floor(Math.random() * (enemyArr.length * 100))
    score += 1
  } else arr[BAI].style.top = `${by + (gameSpeed * (BAI + 2))}px`

  if (by2 > window.innerHeight + bh2 * 2) {
    arr[BBI].style.top = `-${bh2}px`
    arr[BBI].style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
    chanceForBlockB = Math.floor(Math.random() * (enemyArr.length * 100))
    score += 1
  } else arr[BBI].style.top = `${by2 + (gameSpeed * (BBI + 1))}px`
  
}

function moveCharacterLeft() {
  if (blockPosIndex > 0 && !isGameOver) {
    blockPosIndex -= 1
    character.style.left = `${(blockWidth + blockGap) * blockPosIndex + viewPadding}px`;
    
  } else return
}

function moveCharacterRight() {
  if (blockPosIndex < 2 && !isGameOver) {
    blockPosIndex += 1
    character.style.left = `${(blockWidth + blockGap) * blockPosIndex + viewPadding}px`;
    
  } else return
}

function showElement(element) {
  element.classList.remove("hide")
}

function hideElement(element) {
  element.classList.add("hide")
}

function resetSettings() {
  modifyGameSpeed(DEFUALT_GAME_CONFING.GAME_SPEED)
}

function modifyGameSpeed(value) {

  if (value < 10)
      value = `0${value}`

  gameSpeedSliderTxt.innerText = value
  gameSpeed = value
  gameSpeedSlider.value = value
}

document.addEventListener('keydown', (e)=>{
  if (e.key == 'ArrowLeft' || e.key == "a" || e.key == "A") {
    moveCharacterLeft()
  } else if (e.key === 'ArrowRight' || e.key == "d" || e.key == "D ") {
    moveCharacterRight()
  }
})

playBtn.addEventListener('click', startGame)
retryBtn.addEventListener('click', startGame)
resetBtn.addEventListener('click', resetSettings)
quitBtn.addEventListener('click', backToStart)
optBtn.addEventListener('click', openSettings)
leftBtn.addEventListener('click', moveCharacterLeft)
rightBtn.addEventListener('click', moveCharacterRight)
closeSettingsMenuButton.addEventListener("click", closeSettings)
gameSpeedSlider.addEventListener("input", (e) => {
  modifyGameSpeed(e.target.value)
})