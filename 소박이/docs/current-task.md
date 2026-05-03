# 소박이 — 현재 작업 상태

**앱**: 소박이 (AppsInToss WebView 미니앱)  
**최종 업데이트**: 2026-05-03

---

## 진행 상태

| Phase | 내용 | 상태 |
|-------|------|------|
| 0 | 프로젝트 설정, TDS Provider, 탭 라우팅 | ✅ |
| 1 | 인증 (getAnonymousKey → JWT → Zustand) | ✅ |
| 2 | API 레이어 (axios + TanStack Query hooks) | ✅ |
| 3 | Room 페이지 (react-konva + Lottie + 아이템 툴팁) | ✅ |
| 4 | 지출 기록 모달 (폼 + 영수증 AI 파싱) | 🔄 |
| 5 | 캘린더 가계부 (월간 그리드 + 날짜 상세) | 🔄 |
| **6** | **퀘스트 페이지 (진행도 바 + 보상 미리보기)** | **🔄 ← 현재** |
| 7 | 아이템 도감 (4열 그리드 + 잠금 표시) | 🔄 |
| 8 | 설정 페이지 (예산 + 계정) | 🔄 |
| 9 | 공유 기능 + 통합 테스트 + 배포 환경변수 | ⬜ |

---

## 현재 작업

**Phase 6 — 퀘스트 페이지**

- 퀘스트 목록 조회 (`GET /api/v1/quests/current`)
- 진행도 바 (ProgressBar)
- 보상 아이템 미리보기
- 퀘스트 진행 등록 (`POST /api/v1/quests/{id}/progress`)
