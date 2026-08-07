## Why

지금은 한 줄 다이어리를 기록할 방법이 전혀 없다. 매일의 기록을 가장 단순한 형태(오늘 날짜 + 한 줄 텍스트)로 남기고, 최근 기록을 바로 확인할 수 있는 최소 기능이 필요하다.

## What Changes

- 오늘 날짜(YYYY-MM-DD 형식)를 화면에 자동 표시
- 한 줄 텍스트 입력 필드와 저장 버튼 제공
- 저장 시 날짜 + 시간 + 텍스트를 localStorage에 추가 저장 (같은 날 여러 번 작성 허용, 덮어쓰지 않음)
- 저장된 기록 중 최신 5개를 목록으로 표시, 5개를 초과하는 이력은 스크롤로 확인
- 이번 change 범위는 작성(Create)과 목록 조회(Read)까지이며, 수정/삭제 기능은 포함하지 않음

## Capabilities

### New Capabilities
- `diary-write`: 오늘 날짜 자동 표시, 한 줄 입력 및 저장, localStorage 저장/조회, 최근 항목 목록(스크롤) 기능을 다룬다.

### Modified Capabilities
(없음)

## Impact

- 신규 정적 웹 페이지 (Vanilla JS + Tailwind CSS)
- 브라우저 localStorage를 데이터 저장소로 사용 (별도 백엔드 없음)
- 새로운 파일: HTML/JS/CSS(Tailwind) 진입점 (구조는 tasks 단계에서 확정)
