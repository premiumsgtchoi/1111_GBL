2026-11-11 16:04 / 11주차 게임기획안 내용을 바탕으로 게임 명세 작성 / spec.md, prompt.txt, work-log.md / 기획안에 없는 항목은 추측하지 않고 명시되지 않음으로 기록함
2026-11-11 16:08 / MVP 구현 작업을 작은 검증 단위로 분해 / tasks.md, prompt.txt, work-log.md / 구현 없이 각 작업에 Live Server 확인 기준을 연결함
2026-11-11 16:44 / 시작 화면 작업 구현 / index.html, css/style.css, js/scenes/StartScene.js, js/main.js, tasks.md, prompt.txt, work-log.md / 첫 작업에 필요한 모바일 세로형 Phaser 시작 장면만 구성함

2026-11-18 15:52:54 / MVP 미완료 항목을 작은 확인 단위로 재분류 / tasks.md, prompt.txt, work-log.md / 현재 시작 화면 구현은 완료로 반영하고 나머지는 명세 범위 안에서 분리함
2026-11-18 15:55 / tasks.md 미완료 작업 전체 구현 (게이트·전투 경로 선택, 병력 증감, 최종 전투, 클리어·실패 결과) / index.html, js/main.js, js/scenes/StartScene.js, js/scenes/GameScene.js, js/scenes/ResultScene.js, js/data/stageData.js, js/logic/troops.js, js/ui/createButton.js, tasks.md, prompt.txt, work-log.md / 스테이지 값·병력 계산·버튼·장면을 파일로 나누고, 수치는 클리어와 세 가지 실패를 모두 재현할 수 있게 정함
2026-11-18 16:29 / 다음 스테이지 기능 작업 추가 및 구현 (스테이지 번호 표시, 다음 스테이지 버튼, 몬스터 힘 증가, 같은 스테이지 다시 하기) / tasks.md, js/data/stageData.js, js/scenes/GameScene.js, js/scenes/ResultScene.js, prompt.txt, work-log.md / 사용자가 선택한 몬스터 힘 자동 증가 방식으로 스테이지 데이터를 하나만 유지하고 스테이지 번호로 수치를 계산함
2026-11-18 17:23 / 다음 스테이지에서 시작 병력과 +/- 게이트도 10%씩 증가하도록 조정 / js/data/stageData.js, prompt.txt, work-log.md / 몬스터(20%)보다 병력이 느리게 커지게 해서 스테이지마다 어려워지되 10스테이지까지 클리어할 수 있게 함
2026-11-25 16:06 / spec.md에 출시 항목 추가 / spec.md, prompt.txt, work-log.md / 요청한 배포·SDK·광고·결제 정책만 명세 끝에 기록함
2026-11-25 16:08 / 원스토어 웹게임 SDK 기본 연동 / index.html, js/main.js, js/onestoreBoot.js, prompt.txt, work-log.md / SDK 초기화 후 실제 스크립트 로딩 진행률과 게임 시작 및 일시정지를 연결하고 일반 브라우저 경로를 유지함
