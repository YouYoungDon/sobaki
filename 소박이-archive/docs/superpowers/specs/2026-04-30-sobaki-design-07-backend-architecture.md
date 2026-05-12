## 7. 백엔드 아키텍처

### 7.1 구조

```
sobaki-back/
├── src/main/java/com/sobaki/
│   ├── auth/           # mTLS 토스 인증
│   ├── user/           # 사용자 관리
│   ├── ledger/         # 가계부 (daily_ledgers, spending_items)
│   ├── item/           # 아이템 마스터 + 사용자 아이템
│   ├── quest/          # 퀘스트 정의 + 진행
│   ├── room/           # 룸 + 아이템 배치
│   ├── ai/             # Claude Vision API 영수증 파싱
│   └── common/         # 공통 응답, 예외 처리
```

### 7.2 핵심 API

| 메서드 | 경로 | 설명 |
|--------|------|------|
| POST | `/api/v1/ledger/spending` | 지출 기록 저장 |
| GET | `/api/v1/ledger/calendar?year=&month=` | 월간 캘린더 데이터 |
| POST | `/api/v1/ai/receipt/parse` | 영수증 이미지 AI 파싱 |
| GET | `/api/v1/items/my` | 내 아이템 목록 |
| GET | `/api/v1/items/catalog` | 전체 아이템 도감 |
| GET | `/api/v1/room` | 룸 현재 상태 |
| GET | `/api/v1/quests/current` | 현재 퀘스트 |
| POST | `/api/v1/quests/{id}/progress` | 퀘스트 진행 업데이트 |

---

