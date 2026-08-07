## Context

단일 정적 페이지(Vanilla JS + Tailwind CSS)로 구현하며 백엔드는 없다. 데이터는 브라우저 localStorage에만 저장된다. See proposal.md - Why.

## Goals / Non-Goals

**Goals:**
- localStorage에 저장할 데이터 구조를 확정한다
- 최근 5개 + 스크롤 목록을 어떻게 렌더링할지 결정한다

**Non-Goals:**
- 여러 기기 간 동기화, 서버 저장 (스코프 밖)
- 수정/삭제 UI (이번 change 스코프 밖)

## Decisions

- **저장 키/구조**: localStorage의 단일 키(예: `diary-entries`)에 JSON 배열 `[{ date: "YYYY-MM-DD", time: "HH:mm:ss", text: string, createdAt: number }]`을 저장한다.
  - 대안으로 날짜별 키(`diary-2026-12-31`)를 고려했으나, 같은 날 여러 건 허용 요건과 "최신순 목록" 요건을 단순하게 만족시키기 위해 단일 배열이 더 적합하다.
  - `createdAt`(epoch ms)을 정렬 기준으로 사용해 최신순 정렬을 안정적으로 처리한다.
- **날짜 표시 형식**: `YYYY-MM-DD`는 로컬 타임존 기준으로 직접 포맷팅한다(`toISOString()`은 UTC 기준이라 자정 근처에 날짜가 어긋날 수 있어 사용하지 않는다).
- **목록 렌더링**: 전체 기록을 `createdAt` 내림차순으로 정렬해 렌더링하고, 목록 컨테이너에 고정 높이 + `overflow-y-auto`(Tailwind)를 적용해 5개 초과 시 스크롤이 생기도록 한다. 최신 5개만 별도로 자르지 않고 전체를 렌더링하는 이유는 "5개 초과 시 스크롤"이라는 요건이 곧 전체 목록을 스크롤 가능한 영역에 담으라는 의미이기 때문이다.

## Risks / Trade-offs

- [localStorage 용량 제한] 장기간 사용 시 데이터가 계속 쌓여 용량 한도에 도달할 수 있다 → 이번 change 범위 밖이며, 추후 별도 change에서 정리/내보내기 기능으로 다룬다.
- [브라우저/기기 종속] localStorage는 브라우저·기기별로 분리되어 있어 동기화되지 않는다 → 요구사항상 허용된 제약으로 별도 대응 없음.
