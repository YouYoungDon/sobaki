# 소박이 프론트엔드 구현 계획

**날짜**: 2026-04-30  
**대상**: `소박이/` — AppsInToss WebView 미니앱 (Vite + React)  
**스펙 참조**: `소박이/docs/superpowers/specs/2026-04-30-sobaki-design.md`

---

## Goal

소박이 앱의 WebView 프론트엔드를 구현한다. 토스 앱 내 미니앱으로 동작하며, 소박이 수달의 방을 canvas로 렌더링하고, 지출 기록 / 캘린더 / 퀘스트 / 아이템 도감 화면을 TDS 컴포넌트로 구성한다.

## Architecture


## Tech Stack

| 항목 | 기술 |
|------|------|
| 프레임워크 | `@apps-in-toss/web-framework` (Vite + React) |
| TDS | `@toss/tds-mobile` + `@toss/tds-mobile-ait` |
| 상태 관리 | Zustand (클라이언트) |
| 서버 상태 | TanStack Query v5 |
| HTTP | axios |
| 룸 렌더링 | react-konva |
| 애니메이션 | `Asset.Lottie` (`@toss/tds-mobile`) |
| 테스트 | Vitest + @testing-library/react |
| 빌드/배포 | `ait build` / `ait deploy` |

---

## 구현 태스크

