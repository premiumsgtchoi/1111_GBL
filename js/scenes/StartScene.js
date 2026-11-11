class StartScene extends Phaser.Scene {
  constructor() {
    super('StartScene');
  }

  create() {
    const { width, height } = this.scale;

    this.add.rectangle(width / 2, height / 2, width, height, 0x25334b);
    this.add.text(width / 2, height * 0.3, '게이트러너', {
      color: '#ffffff',
      fontSize: '42px',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.text(width / 2, height * 0.4, '병사를 이끌고 몬스터를 물리치세요', {
      color: '#cdd6e5',
      fontSize: '16px'
    }).setOrigin(0.5);

    this.add.rectangle(width / 2, height * 0.68, 180, 58, 0x4f8e3b, 1)
      .setStrokeStyle(3, 0xa9d18e);
    this.add.text(width / 2, height * 0.68, '시작', {
      color: '#ffffff',
      fontSize: '24px',
      fontStyle: 'bold'
    }).setOrigin(0.5);
  }
}
