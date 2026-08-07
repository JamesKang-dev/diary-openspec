# 한 줄 다이어리

오늘 날짜를 자동으로 보여주고, 한 줄 텍스트를 저장하면 최근 기록을 목록으로 확인할 수 있는 간단한 다이어리 앱입니다.

## 기능

- 오늘 날짜를 `YYYY-MM-DD` 형식으로 자동 표시
- 한 줄 텍스트 입력 후 저장 (같은 날 여러 번 작성 가능, 덮어쓰지 않고 누적)
- 저장된 기록은 브라우저 `localStorage`에 보관되어 새로고침 후에도 유지
- 최근 기록을 최신순으로 표시, 5개를 초과하면 스크롤로 확인

## 실행 방법

별도 빌드나 서버 설정 없이 `index.html`을 브라우저로 열면 바로 사용할 수 있습니다.

```bash
# 정적 파일 서버로 실행하고 싶다면 (선택)
python -m http.server 8000
# http://localhost:8000 접속
```

## 기술 스택

- Vanilla JavaScript
- Tailwind CSS (CDN)
- Browser localStorage

## 프로젝트 구조

```
index.html   # 마크업 + Tailwind 연결
app.js        # 날짜 표시, 저장/조회 로직
openspec/     # OpenSpec 계획 아티팩트 (proposal, spec, design, tasks)
```

## OpenSpec

이 프로젝트는 [OpenSpec](https://github.com/Fission-AI/OpenSpec)으로 스펙 기반 개발(spec-driven development)을 진행합니다. 완료된 change는 `openspec/changes/archive/`에서, 현재 스펙은 `openspec/specs/`에서 확인할 수 있습니다.
