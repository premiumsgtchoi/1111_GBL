// 병력 계산 규칙. 병력은 0명 아래로 내려가지 않는다.
function applyGate(troops, gate) {
  let result = troops;
  if (gate.op === 'add') result = troops + gate.value;
  if (gate.op === 'subtract') result = troops - gate.value;
  if (gate.op === 'multiply') result = troops * gate.value;
  return Math.max(0, result);
}

function fightMonster(troops, monsterPower) {
  return Math.max(0, troops - monsterPower);
}
