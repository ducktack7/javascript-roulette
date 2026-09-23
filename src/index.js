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
    this.placeBet(betAmount);
    this.addRound();

    const computerColor = this.makeComputerColor();
    if (this.isSameColorNames(playerColorName, computerColor.name))
      //룰렛 결과가 플레이어가 선택한 색상과 같으면 베팅 성공, 다르면 베팅 실패이다.
      this.processWin(betAmount, computerColor.multiplier);

    return {
      money: this.money,
      round: this.round,
      resultMessage: '',
    };
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
  placeBet(betAmount) {
    //베팅 시 베팅 금액은 자금에서 차감된다.
    this.money -= betAmount;
  }
  addRound() {
    this.round++;
  }
  isSameColorNames(colorName1, colorName2) {
    if (colorName1 === colorName2) return true;
    return false;
  }
  processWin(betAmount, multiplier) {
    //베팅 성공: 베팅 금액 + (베팅 금액 × 배당)을 획득한다. (원금 회수 + 배당금)
    this.money += betAmount + betAmount * multiplier;
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
}
export class RouletteGameView {
  constructor() {
    this.moneyElement = document.getElementById('current-money');
    this.roundElement = document.getElementById('current-round');
    this.resultContent = document.getElementById('result-content');
  }
  updatePlayView(gameResult) {
    this.moneyElement.textContent = gameResult.money;
    this.roundElement.textContent = gameResult.round;
    this.resultContent.textContent = gameResult.resultMessage;
  }
}

const colorSelectInput = document.getElementById('color-select');
const betAmountInput = document.getElementById('bet-amount');
const betButton = document.getElementById('bet-button');
const stopButton = document.getElementById('stop-button');
const restartButton = document.getElementById('restart-button');

const game = new RouletteGame();
const gameView = new RouletteGameView();

betButton.addEventListener('click', handleBet);

function handleBet() {
  //베팅을 진행하면 색상과 베팅 금액을 입력한다.
  const playerColorName = colorSelectInput.value;
  const betAmount = Number(betAmountInput.value);
  const gameResult = game.play(playerColorName, betAmount);
  gameView.updatePlayView(gameResult);
}
