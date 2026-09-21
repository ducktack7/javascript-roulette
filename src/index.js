const INITIAL_MONEY = 10000; //게임 시작 시 플레이어는 초기 자금 10,000원을 가진다.

export default class RouletteGame {
  constructor() {
    this.money = INITIAL_MONEY;
  }
  play(colorSelect, betAmount) {}
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
  const color = colorSelectInput.value;
  const betAmount = Number(betAmountInput.value);
  game.play(color, betAmount);
}
