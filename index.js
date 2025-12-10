const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");

let cards;
let interval;
let firstCard = false;
let secondCard = false;

//items array

const items = [
  { name: "tiger", image: "image/animal.png" },
  { name: "bee", image: "image/bee.png" },
  { name: "chameleon", image: "image/chameleon.png" },
  { name: "cockatoo", image: "image/cockatoo.png" },
  { name: "crocodile", image: "image/crocodile.png" },
  { name: "gorilla", image: "image/gorilla.png" },
  { name: "macaw", image: "image/macaw.png" },
  { name: "monkey", image: "image/monkey.png" },
  { name: "piranha", image: "image/piranha.png" },
  { name: "anaconda", image: "image/serpent.png" },
  { name: "sloth", image: "image/sloth.png" },
  { name: "toucan", image: "image/toucan.png" },
];

const timerGenerator = () => {
  second += 1;
  if (second >= 60) {
    minuts += 1;
    second = 0;
  }
  let secondValue = second < 10 ? `0${second}` : second;
  let minutsValue = minuts < 10 ? `0${minuts}` : minuts;
  timeValue.innerHTML = `<span>Time:</span> ${minutsValue} : ${secondValue}`;
};

//calc movments

const moveCounter = () => {
  moveCount += 1;
  moves.innerHTML = `<span>Moves: </span> ${moveCount}`;
};

//pick random
const generateRandom = (size = 4) => {
  let tempArray = [...items];
  let cardValue = [];
  size = (size * size) / 2;
  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValue.push(tempArray[randomIndex]);
    tempArray.splice(randomIndex, 1);
  }
  return cardValue;
};

const matrixGenerator = (cardValue, size = 4) => {
  gameContainer.innerHTML = "";
  let totalPairs = cardValue.length; 

  cardValue = [...cardValue, ...cardValue];
  cardValue.sort(() => Math.random() - 0.5);
  for (let i = 0; i < size * size; i++) {
    gameContainer.innerHTML += `
    <div class="card-container" data-card-value = "${cardValue[i].name}">
    <div class = "card-before">?</div>
    <div class= "card-after">
    <img src = "${cardValue[i].image}"
    class = "image"/>
    </div>
    </div>
    `;
  }

  //grid
  gameContainer.style.gridTemplateColumns = `repeat(${size}, auto)`;
  //card
  cards = document.querySelectorAll(".card-container");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      if (!card.classList.contains("matched")) {
        card.classList.add("flipped");
      }
      if (!firstCard) {
        firstCard = card;
        firstCardValue = card.getAttribute("data-card-value");
      } else {
        moveCounter();
        secondCard = card;
        let secondValue = card.getAttribute("data-card-value");
        if (firstCardValue == secondValue) {
          firstCard.classList.add("matched");
          secondCard.classList.add("matched");
          firstCard = false;
          wincount += 1;
          if (wincount === totalPairs) {
            result.innerHTML = `<h2> You win </h2>
                <h4>Moves: ${moveCount}</h4>
                `;
            stopGame();
          }
        } else {
          let [tempFirst, tempSecond] = [firstCard, secondCard];
          firstCard = false;
          secondCard = false;
          let delay = setTimeout(() => {
            tempFirst.classList.remove("flipped");
            tempSecond.classList.remove("flipped");
          }, 900);
        }
      }
    });
  });
};

// دالة إيقاف اللعبة
const stopGame = () => {
  controls.classList.remove("hide");
  stopButton.classList.add("hide");
  startButton.classList.remove("hide");
  clearInterval(interval);
};

// تهيئة اللعبة
const initalization = () => {
  result.innerText = "";
  wincount = 0;
  moveCount = 0;
  firstCard = false;
  secondCard = false;
  second = 0;
  minuts = 0;
  moves.innerHTML = `<span>Moves:</span> 0`;
  timeValue.innerHTML = `<span>Time:</span> 00 : 00`;
  let cardValue = generateRandom();
  matrixGenerator(cardValue);
};

// زر Start
startButton.addEventListener("click", () => {
  controls.classList.add("hide");
  gameContainer.classList.remove("hide");
  stopButton.classList.remove("hide");
  startButton.classList.add("hide");
  interval = setInterval(timerGenerator, 1000);
  initalization();
});

// زر Stop
stopButton.addEventListener("click", stopGame);

// تشغيل أول مرة
initalization();
