## 12. 디렉터리 구조

```
phy/
├── 소박이/                          # 앱인토스 미니앱 (프론트)
│   ├── granite.config.ts
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Room/               # 홈 룸 화면
│   │   │   ├── Ledger/             # 지출 기록
│   │   │   ├── Calendar/           # 캘린더 가계부
│   │   │   ├── Quest/              # 퀘스트
│   │   │   ├── Catalog/            # 아이템 도감
│   │   │   └── Settings/           # 설정
│   │   ├── components/
│   │   │   ├── room/               # Canvas 룸 컴포넌트
│   │   │   ├── sobak/              # 소박이 캐릭터 애니메이션
│   │   │   └── common/
│   │   ├── hooks/
│   │   ├── stores/                 # Zustand
│   │   ├── api/                    # TanStack Query + axios
│   │   └── assets/
│   │       ├── characters/         # 소박이 Lottie
│   │       ├── items/              # 아이템 이미지
│   │       └── room/               # 배경, 소품
│   └── docs/superpowers/specs/
│       └── 2026-04-30-sobaki-design.md
│
└── sobaki-back/                     # Spring Boot 백엔드
    └── src/main/java/com/sobaki/
        ├── auth/
        ├── user/
        ├── ledger/
        ├── item/
        ├── quest/
        ├── room/
        ├── ai/
        └── common/
```

---

