class ResultScene extends Phaser.Scene {
  constructor() {
    super('ResultScene');
  }

  create(data) {
    const { width, height } = this.scale;

    this.add.rectangle(width / 2, height / 2, width, height, 0x25334b);
    this.add.text(width / 2, height * 0.32, data.success ? '스테이지 클리어!' : '실패', {
      color: data.success ? '#a9d18e' : '#e08a8a',
      fontSize: '40px',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.text(width / 2, height * 0.44, `남은 병력 ${data.troops}명`, {
      color: '#ffffff',
      fontSize: '22px'
    }).setOrigin(0.5);

    const stageNumber = data.stageNumber;
    createButton(this, width / 2, height * 0.64, 180, 58, '다시 하기', () =>
      this.scene.start('GameScene', { stageNumber }), '24px');

    if (data.success) {
      createButton(this, width / 2, height * 0.76, 180, 58, '다음 스테이지', () =>
        this.scene.start('GameScene', { stageNumber: stageNumber + 1 }), '22px');
    }
  }
}
