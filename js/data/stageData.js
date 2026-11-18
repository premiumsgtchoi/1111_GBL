// 한 스테이지의 구성 값. 병력 계산 결과로 클리어·실패를 모두 확인할 수 있도록 정한 값이다.
const STAGE_DATA = {
  startTroops: 10,
  gates: [
    { label: '+10', op: 'add', value: 10 },
    { label: '×3', op: 'multiply', value: 3 },
    { label: '-10', op: 'subtract', value: 10 }
  ],
  paths: [
    { name: '고블린 경로', monster: '고블린', power: 5 },
    { name: '오크 경로', monster: '오크', power: 25 }
  ],
  finalMonster: { name: '오우거', power: 15 }
};

// 스테이지가 1 오를 때마다 몬스터 힘은 기본값의 20%씩, 병력(시작 병력과 +/− 게이트)은 10%씩 커진다.
// 몬스터가 더 빨리 강해져서 스테이지마다 조금씩 어려워진다.
const STAGE_POWER_GROWTH = 0.2;
const STAGE_TROOP_GROWTH = 0.1;

function getStageData(stageNumber) {
  const scale = 1 + STAGE_POWER_GROWTH * (stageNumber - 1);
  const scalePower = (power) => Math.round(power * scale);
  const troopScale = 1 + STAGE_TROOP_GROWTH * (stageNumber - 1);
  const scaleTroops = (value) => Math.round(value * troopScale);
  return {
    ...STAGE_DATA,
    startTroops: scaleTroops(STAGE_DATA.startTroops),
    gates: STAGE_DATA.gates.map((gate) => {
      if (gate.op === 'multiply') return gate;
      const value = scaleTroops(gate.value);
      return { ...gate, value, label: `${gate.op === 'add' ? '+' : '-'}${value}` };
    }),
    paths: STAGE_DATA.paths.map((path) => ({ ...path, power: scalePower(path.power) })),
    finalMonster: { ...STAGE_DATA.finalMonster, power: scalePower(STAGE_DATA.finalMonster.power) }
  };
}
