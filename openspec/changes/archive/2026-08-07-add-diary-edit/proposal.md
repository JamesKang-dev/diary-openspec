## Why

지금은 한 줄 다이어리 기록을 한 번 저장하면 고칠 방법이 없다. 오타나 내용을 바꾸고 싶을 때 기존 항목을 인라인으로 수정할 수 있어야 한다.

## What Changes

- 각 기록 항목에 "수정" 버튼을 추가한다
- 수정 버튼 클릭 시 해당 항목의 텍스트가 입력 필드(input)로 바뀌며 저장/취소 버튼이 나타난다
- 저장 시 해당 기록의 텍스트만 갱신하고, 날짜/시간(`createdAt`)은 그대로 유지해 목록 순서가 바뀌지 않는다
- 취소 시 원래 텍스트로 되돌리고 인라인 편집을 종료한다
- 빈 값으로는 저장할 수 없다 (기존 저장 로직과 동일한 제약)
- 삭제 기능은 이번 change 범위에 포함하지 않는다

## Capabilities

### New Capabilities
(없음)

### Modified Capabilities
- `diary-write`: 최근 기록 목록 표시 요구사항에 인라인 수정 동작이 추가된다 (텍스트 수정, 순서 유지, 빈 값 저장 차단).

## Impact

- `app.js`: 항목별 수정 상태 관리, 저장 시 텍스트만 갱신하는 로직 추가
- `index.html`/렌더링 로직: 목록 항목에 수정 버튼과 인라인 입력 UI 추가
- 기존 `diary-write` capability의 스펙(`openspec/specs/diary-write/spec.md`) 갱신 필요
