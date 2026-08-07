## Context

기록은 `{ id, date, time, text, createdAt }`로 저장되며, 인라인 수정(`diary-edit`)은 텍스트만 갱신하고 `createdAt`은 그대로 둔다. See proposal.md - Why.

## Goals / Non-Goals

**Goals:**
- 최종 수정 시각을 저장하는 필드와 갱신 조건을 정한다
- 기존 레코드(旧 데이터, `updatedAt` 없음)에 대한 표시 방식을 정한다

**Non-Goals:**
- 수정 이력 전체 로그(여러 번의 수정 내역 나열) - 최종 1건만 표시
- 삭제 기능 - 스코프 밖

## Decisions

- **필드명**: `updatedAt`(epoch ms, `createdAt`과 동일한 포맷)을 기록에 추가한다. 저장 시 `formatDate`/`formatTime`과 동일한 방식으로 화면 표시용 문자열로 변환한다.
- **갱신 조건**: 저장 직전 텍스트(trim 후)와 새 텍스트(trim 후)를 비교해 다를 때만 `updatedAt`을 현재 시각으로 설정한다. 같으면 기존 `updatedAt`(또는 없음)을 그대로 둔다.
- **미수정 표시**: 기록에 `updatedAt`이 없으면(신규 작성 후 한 번도 수정 안 한 경우, 또는 기존 레코드) 목록에 "수정한 내역이 없습니다."를 표시한다.
- **하위 호환**: 이전 change(`add-diary-edit`, `adddiary-write`)에서 저장된 레코드에는 `updatedAt` 필드가 없다. `loadEntries()`가 이미 `id`에 대해 하듯, `updatedAt`도 없으면 `undefined`로 두고 렌더링 단계에서 "수정한 내역이 없습니다."로 처리한다 (별도 마이그레이션 불필요).

## Risks / Trade-offs

- [텍스트 비교 시점] trim 전/후 공백만 다른 경우를 "변경"으로 볼지 애매할 수 있음 → 기존 빈값 검증과 동일하게 trim 후 비교해 일관성을 유지한다.
