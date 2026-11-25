const scripts = [
  'https://cdn.jsdelivr.net/npm/phaser@3.90.0/dist/phaser.min.js',
  'js/data/stageData.js',
  'js/logic/troops.js',
  'js/ui/createButton.js',
  'js/scenes/StartScene.js',
  'js/scenes/GameScene.js',
  'js/scenes/ResultScene.js',
  'js/main.js'
];

let game;
let paused = false;

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

async function boot() {
  let sdk;
  try {
    const { createSDK } = await import('https://h5sdk.onestore.net/lib/v1.2.0/onestore-h5-sdk.min.js');
    sdk = createSDK();
    sdk.on('pause', () => {
      paused = true;
      if (game) {
        game.loop.sleep();
        game.sound.pauseAll();
      }
    });
    sdk.on('resume', () => {
      paused = false;
      if (game) {
        game.sound.resumeAll();
        game.loop.wake();
      }
    });
    const info = await sdk.initializeAsync();
    if (info.err) sdk = null;
  } catch (error) {
    console.warn('원스토어 SDK 초기화 실패:', error);
    sdk = null;
  }

  if (sdk) sdk.setLoadingProgress(0);
  for (let i = 0; i < scripts.length; i += 1) {
    await loadScript(scripts[i]);
    if (sdk) sdk.setLoadingProgress(Math.round((i + 1) / scripts.length * 100));
  }
  if (sdk) {
    try {
      await sdk.startGameAsync();
    } catch (error) {
      console.error('원스토어 게임 시작 실패:', error);
    }
  }
  game = window.startGateRunner();
  if (paused) {
    game.events.once('ready', () => {
      if (paused) {
        game.loop.sleep();
        game.sound.pauseAll();
      }
    });
  }
}

boot().catch((error) => console.error('게임 로딩 실패:', error));
