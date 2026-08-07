## 1. 스펙 구조 확인

- [x] 1.1 delta spec(`specs/diary-write/spec.md`)이 "기록 인라인 수정" requirement를 REMOVED로 정확히 참조하는지 확인
- [x] 1.2 delta spec(`specs/diary-edit/spec.md`)이 동일한 requirement/시나리오를 빠짐없이 ADDED로 포함하는지 확인

## 2. 코드 영향 확인

- [x] 2.1 `app.js`/`index.html`에 실제 동작 변경이 없는지 확인 (이번 change는 코드 수정 없음)

## 3. 검증

- [x] 3.1 `openspec validate --specs`로 현재 main spec이 유효한지 확인 (sync 전 기준선)
- [x] 3.2 브라우저에서 기존 수정 기능이 그대로 동작하는지 재확인 (동작 불변 확인)
