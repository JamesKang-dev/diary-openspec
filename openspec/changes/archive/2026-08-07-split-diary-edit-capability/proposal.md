## Why

`diary-write` capability에 작성/조회/수정 요구사항이 모두 섞여 있어 capability 경계가 점점 넓어지고 있다. 앞으로 삭제 기능(`diary-delete`)도 추가될 예정이라, 지금 수정 기능을 `diary-edit`이라는 독립 capability로 분리해 각 capability가 하나의 관심사만 갖도록 정리한다. 동작 자체는 바뀌지 않는 순수 구조 정리다.

## What Changes

- `diary-write`에서 "기록 인라인 수정" requirement를 제거한다
- 동일한 requirement를 새 capability `diary-edit`으로 이동한다 (내용은 동일, 위치만 이동)
- 사용자에게 보이는 동작이나 UI는 전혀 바뀌지 않는다

## Capabilities

### New Capabilities
- `diary-edit`: 한 줄 다이어리 기록의 인라인 수정(진입/저장/취소/빈값 차단)을 담당한다.

### Modified Capabilities
- `diary-write`: "기록 인라인 수정" requirement를 제거한다 (다른 requirement는 변경 없음).

## Impact

- `openspec/specs/diary-write/spec.md`: 수정 관련 requirement 제거
- `openspec/specs/diary-edit/spec.md`: 신규 생성, 수정 관련 requirement 이전
- 코드(`app.js`, `index.html`) 변경 없음 - 스펙 구조 정리만 수행
