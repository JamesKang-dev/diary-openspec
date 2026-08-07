## Context

`diary-write` capability에 작성/조회/수정 요구사항이 모두 들어있었다. 향후 `diary-delete`가 추가될 것을 고려해, 관심사별로 capability를 나눈다. See proposal.md - Why.

## Goals / Non-Goals

**Goals:**
- 수정 관련 requirement를 `diary-write`에서 `diary-edit`으로 옮긴다
- 이동 과정에서 요구사항/시나리오 내용을 그대로 보존한다 (동작 변경 없음)

**Non-Goals:**
- 삭제 기능(`diary-delete`) 구현 - 실제로 삭제 기능을 만들 때 별도 change에서 다룬다
- 코드 리팩터링 - `app.js`/`index.html`은 이미 동작이 동일하므로 변경하지 않는다

## Decisions

- **capability 경계 기준**: "작성/조회"와 "수정"을 별개 capability로 나눈다. 각 capability는 단일 관심사(다이어리 항목의 생성·조회 vs. 기존 항목의 수정)를 갖는다.
- **구현 코드는 변경하지 않음**: 이번 change는 스펙 문서 구조만 재정리하는 것이며, `app.js`의 함수 구성(같은 파일 내 저장/렌더링/수정 로직)은 그대로 둔다. 코드 모듈 분리가 필요해지면 별도 change에서 다룬다.

## Risks / Trade-offs

- [스펙과 코드 구조 불일치] capability는 나뉘었지만 실제 코드(`app.js`)는 여전히 한 파일에 모든 로직이 있다 → 스펙 문서상 경계와 코드 모듈 경계가 항상 1:1일 필요는 없으므로 허용 가능한 불일치로 본다.
