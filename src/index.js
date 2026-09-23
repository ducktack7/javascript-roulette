const INITIAL_MONEY = 10000; //게임 시작 시 플레이어는 초기 자금 10,000원을 가진다.
const INITIAL_ROUND = 0;
const COLORS = [
  //확률을 백분율*10으로 저장
  { name: 'YELLOW', probability: 525, multiplier: 1 },
  { name: 'GREEN', probability: 250, multiplier: 3 },
  { name: 'BLUE', probability: 150, multiplier: 5 },
  { name: 'PURPLE', probability: 50, multiplier: 10 },
  { name: 'RED', probability: 25, multiplier: 20 },
];

export default class RouletteGame {
  constructor() {
    this.money = INITIAL_MONEY;
    this.round = INITIAL_ROUND;
  }
  play(playerColorName, betAmount) {
    if (!this.isValid(playerColorName, betAmount)) return '';
    const computerColor = this.makeComputerColor();
    if (this.isSameColorNames(playerColorName, computerColor.name)) this.processWin(betAmount, computerColor.multiplier);
    else this.processLoss(betAmount);
  }
  isValid(color, betAmount) {
    if (color === '') {
      return false;
    }
    if (betAmount <= 0) {
      return false;
    }
    if (this.money < betAmount) {
      return false;
    }
    return true;
  }
  isSameColorNames(colorName1, colorName2) {
    if (colorName1 === colorName2) return true;
    return false;
  }
  processWin(betAmount, multiplier) {
    this.money += betAmount + betAmount * multiplier;
  }
  processLoss(betAmount) {
    this.money -= betAmount;
  }
  makeComputerColor() {
    const randomNumber = Math.floor(Math.random() * 1000) + 1;
    return this.convertNumberToColor(randomNumber);
  }
  convertNumberToColor(number) {
    let accumulatedProbability = 0;
    for (const color of COLORS) {
      accumulatedProbability += color.probability;
      if (number <= accumulatedProbability) return color;
    }
  }
  addRound() {
    this.round++;
  }
}

const moneyElement = document.getElementById('current-money');
const roundElement = document.getElementById('current-round');
const resultContent = document.getElementById('result-content');
const colorSelectInput = document.getElementById('color-select');
const betAmountInput = document.getElementById('bet-amount');
const betButton = document.getElementById('bet-button');
const stopButton = document.getElementById('stop-button');
const restartButton = document.getElementById('restart-button');

const game = new RouletteGame();

betButton.addEventListener('click', handleBet);

function handleBet() {
  //베팅을 진행하면 색상과 베팅 금액을 입력한다.
  const playerColorName = colorSelectInput.value;
  const betAmount = Number(betAmountInput.value);
  game.play(playerColorName, betAmount);
}
