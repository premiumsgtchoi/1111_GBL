// 사각형 + 글자로 된 버튼. 선택 상태와 사용 가능 여부를 바꿀 수 있다.
const BUTTON_COLORS = {
  fill: 0x3a4a66,
  stroke: 0x7f93b5,
  selectedFill: 0x4f8e3b,
  selectedStroke: 0xffe066
};

function createButton(scene, x, y, width, height, label, onClick, fontSize = '18px') {
  const bg = scene.add.rectangle(x, y, width, height, BUTTON_COLORS.fill)
    .setStrokeStyle(3, BUTTON_COLORS.stroke)
    .setInteractive({ useHandCursor: true });
  const text = scene.add.text(x, y, label, {
    color: '#ffffff',
    fontSize,
    fontStyle: 'bold',
    align: 'center'
  }).setOrigin(0.5);

  bg.on('pointerdown', () => onClick());

  return {
    setSelected(selected) {
      bg.setFillStyle(selected ? BUTTON_COLORS.selectedFill : BUTTON_COLORS.fill);
      bg.setStrokeStyle(3, selected ? BUTTON_COLORS.selectedStroke : BUTTON_COLORS.stroke);
    },
    setEnabled(enabled) {
      if (enabled) bg.setInteractive({ useHandCursor: true });
      else bg.disableInteractive();
      bg.setAlpha(enabled ? 1 : 0.4);
      text.setAlpha(enabled ? 1 : 0.4);
    }
  };
}
