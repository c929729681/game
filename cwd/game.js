const gameContainer = document.getElementById('game-container');
const storyElement = document.getElementById('story');
const choicesElement = document.getElementById('choices');

let gameState = {
  stage: 1,
  loveMeter: 0,
};

const storyData = {
  1: {
    text: '你是一名私人侦探，经验丰富且机智。一天，一位神秘的客户雇佣了你来调查一桩离奇的谋杀案。',
    choices: [
      { text: '开始调查', nextStage: 2 },
    ],
  },
  2: {
    text: '你到达了豪华公寓，发现受害者的遗体躺在客厅。周围散落着一些奇怪的物品，包括一张写满符号的纸。',
    choices: [
      { text: '调查符号', nextStage: 3 },
    ],
  },
  3: {
    text: '你决定先调查纸上的符号。在推理过程中，你发现这些符号与城市中的某个神秘组织有关。',
    choices: [
      { text: '访问商人的妻子', lovePoints: 5, nextStage: 4 },
      { text: '与邻居交谈', lovePoints: 3, nextStage: 5 },
    ],
  },
  4: {
    text: '商人的妻子似乎有着不寻常的行为。在她的房间里，你发现了一封神秘的信件，里面提到了组织的名字。',
    choices: [
      { text: '深入调查组织', nextStage: 6 },
    ],
  },
  5: {
    text: '一位邻居透露，最近有一些可疑的人在公寓楼附近活动。',
    choices: [
      { text: '追踪可疑人物', nextStage: 7 },
    ],
  },
  6: {
    text: '你选择深入调查组织。在这个过程中，你发现他们的计划涉及到城市的资源控制和权力争夺。',
    choices: [
      { text: '对组织进行告密', nextStage: 8 },
      { text: '潜入组织', nextStage: 9 },
    ],
  },
  7: {
    text: '在一处废弃的工厂里，你发现了一些隐藏的设备和文件。',
    choices: [
      { text: '对组织进行告密', nextStage: 8 },
    ],
  },
  8: {
    text: '通过巧妙的推理，你揭示了组织的计划，并成功告发了凶手。城市得以解救，案件成功解决。',
  },
  9: {
    text: '在调查的过程中，你与一个受害者的亲属建立了深厚的感情。最终，你可以选择向这个角色表白，游戏以温馨的场景结束。',
  },
  10: {
    text: '由于错误的推理和误导，你最终揭示了一个错综复杂的真相。虽然案件解决，但城市的未来仍然存在不确定性。',
  },
};

function updateGame() {
  const stageData = storyData[gameState.stage];
  storyElement.textContent = stageData.text;

  choicesElement.innerHTML = '';
  stageData.choices.forEach((choice) => {
    const button = document.createElement('button');
    button.textContent = choice.text;
    button.addEventListener('click', () => makeChoice(choice));
    choicesElement.appendChild(button);
  });
}

function makeChoice(choice) {
  gameState.stage = choice.nextStage;
  gameState.loveMeter += choice.lovePoints || 0;

  if (gameState.stage === 10 || gameState.stage === 11 || gameState.stage === 12) {
    const endingText = storyData[gameState.stage].text;
    storyElement.textContent = endingText;
    choicesElement.innerHTML = '<button onclick="resetGame()">重新开始</button>';
  } else {
    updateGame();
  }
}

function resetGame() {
  gameState = {
    stage: 1,
    loveMeter: 0,
  };
  updateGame();
}

// 初始化游戏
updateGame();
