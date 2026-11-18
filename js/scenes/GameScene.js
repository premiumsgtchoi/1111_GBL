class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create(data) {
    const { width, height } = this.scale;
    this.stageNumber = (data && data.stageNumber) || 1;
    this.stage = getStageData(this.stageNumber);
    this.troops = this.stage.startTroops;
    this.troopsAfterGate = null;
    this.gateIndex = null;
    this.pathIndex = null;
    this.finished = false;

    this.add.rectangle(width / 2, height / 2, width, height, 0x25334b);
    // 시작 지점부터 최종 몬스터까지 이어지는 진행선
    this.add.rectangle(width / 2, 300, 6, 330, 0x55688a);

    this.troopText = this.add.text(width / 2, 32, '', {
      color: '#ffe066',
      fontSize: '24px',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.text(14, 32, `스테이지 ${this.stageNumber}`, {
      color: '#cdd6e5',
      fontSize: '15px',
      fontStyle: 'bold'
    }).setOrigin(0, 0.5);

    this.drawStartPoint(width);
    this.createGateButtons(width);
    this.createPathButtons(width);
    this.drawFinalMonster(width);

    this.finalButton = createButton(this, width / 2, 540, 200, 54, '최종 전투', () => this.fightFinal(), '22px');
    this.finalButton.setEnabled(false);

    this.messageText = this.add.text(width / 2, 600, '', {
      color: '#cdd6e5',
      fontSize: '16px'
    }).setOrigin(0.5);

    this.updateTroopText();
    this.setMessage('연산 게이트를 하나 고르세요');
  }

  drawStartPoint(width) {
    this.add.rectangle(width / 2, 90, 160, 40, 0x2f6fa8).setStrokeStyle(2, 0x9cc8f0);
    this.add.text(width / 2, 90, '출발 지점', {
      color: '#ffffff',
      fontSize: '18px',
      fontStyle: 'bold'
    }).setOrigin(0.5);
  }

  createGateButtons(width) {
    this.add.text(width / 2, 140, '연산 게이트', { color: '#cdd6e5', fontSize: '15px' }).setOrigin(0.5);
    const spacing = width / this.stage.gates.length;
    this.gateButtons = this.stage.gates.map((gate, index) =>
      createButton(this, spacing * (index + 0.5), 185, 96, 56, gate.label, () => this.selectGate(index), '24px')
    );
  }

  createPathButtons(width) {
    this.add.text(width / 2, 255, '전투 경로', { color: '#cdd6e5', fontSize: '15px' }).setOrigin(0.5);
    const spacing = width / this.stage.paths.length;
    this.pathButtons = this.stage.paths.map((path, index) =>
      createButton(
        this,
        spacing * (index + 0.5),
        310,
        150,
        70,
        `${path.name}\n${path.monster} ${path.power}`,
        () => this.selectPath(index),
        '17px'
      )
    );
    this.pathButtons.forEach((button) => button.setEnabled(false));
  }

  drawFinalMonster(width) {
    const monster = this.stage.finalMonster;
    this.add.rectangle(width / 2, 430, 200, 70, 0x8a3434).setStrokeStyle(3, 0xe08a8a);
    this.add.text(width / 2, 430, `최종 몬스터\n${monster.name} ${monster.power}`, {
      color: '#ffffff',
      fontSize: '18px',
      fontStyle: 'bold',
      align: 'center'
    }).setOrigin(0.5);
  }

  selectGate(index) {
    if (this.finished) return;
    this.gateIndex = index;
    this.pathIndex = null;
    this.gateButtons.forEach((button, i) => button.setSelected(i === index));
    this.pathButtons.forEach((button) => button.setSelected(false));
    this.finalButton.setEnabled(false);

    this.troopsAfterGate = applyGate(this.stage.startTroops, this.stage.gates[index]);
    this.troops = this.troopsAfterGate;
    this.updateTroopText();

    if (this.troops === 0) {
      this.finish(false, '게이트에서 병력을 모두 잃었습니다');
      return;
    }
    this.pathButtons.forEach((button) => button.setEnabled(true));
    this.setMessage('전투 경로를 하나 고르세요');
  }

  selectPath(index) {
    if (this.finished || this.gateIndex === null) return;
    this.pathIndex = index;
    this.pathButtons.forEach((button, i) => button.setSelected(i === index));

    this.troops = fightMonster(this.troopsAfterGate, this.stage.paths[index].power);
    this.updateTroopText();

    if (this.troops === 0) {
      this.finish(false, '전투 경로에서 병력을 모두 잃었습니다');
      return;
    }
    this.finalButton.setEnabled(true);
    this.setMessage('최종 전투 버튼을 누르세요');
  }

  fightFinal() {
    if (this.finished || this.pathIndex === null) return;
    this.troops = fightMonster(this.troops, this.stage.finalMonster.power);
    this.updateTroopText();

    if (this.troops >= 1) this.finish(true, '최종 몬스터를 물리쳤습니다');
    else this.finish(false, '최종 전투에서 병력을 모두 잃었습니다');
  }

  // 바뀐 병력 수를 잠깐 보여 준 뒤 결과 장면으로 넘어간다.
  finish(success, message) {
    this.finished = true;
    this.setMessage(message);
    [...this.gateButtons, ...this.pathButtons, this.finalButton].forEach((button) => button.setEnabled(false));
    this.time.delayedCall(1000, () => {
      this.scene.start('ResultScene', { success, troops: this.troops, stageNumber: this.stageNumber });
    });
  }

  updateTroopText() {
    this.troopText.setText(`병력 ${this.troops}명`);
  }

  setMessage(message) {
    this.messageText.setText(message);
  }
}
