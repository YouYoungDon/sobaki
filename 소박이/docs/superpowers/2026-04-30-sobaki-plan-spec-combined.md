# 소박이 플랜 및 스펙 통합 문서

**생성일**: 2026-04-30  
**설명**: 기존 분할된 `docs/superpowers/plans` 및 `docs/superpowers/specs` 파일의 전체 내용을 하나로 합친 통합본입니다.

---

## 순서

1. 프론트엔드 계획
2. 백엔드 계획
3. 설계 스펙

---

<!-- file: plans/2026-04-30-sobaki-front-plan-01-intro.md -->

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



<!-- file: plans/2026-04-30-sobaki-front-plan-02-phase-0.md -->

### Phase 0 — 프로젝트 초기 설정

#### Task 0-1: 패키지 설정 및 의존성 설치

**목표**: 소박이 미니앱 프로젝트 골격 구성

1. `package.json` 작성:


2. `granite.config.ts` 작성:


3. `vite.config.ts`:


4. `src/test/setup.ts`:


#### Task 0-2: 앱 진입점 + TDS Provider + 라우팅

**실패 테스트 작성** (`src/App.test.tsx`):


**구현** (`src/main.tsx`):


**구현** (`src/App.tsx`):


**구현** (`src/components/common/AppLayout.tsx`):


**커밋**: `feat: 소박이 AIT 앱 초기 설정 — TDS Provider, 탭 라우팅, 테스트 환경`

---



<!-- file: plans/2026-04-30-sobaki-front-plan-03-phase-1.md -->

### Phase 1 — 인증 레이어 (getAnonymousKey → JWT)

#### Task 1-1: Zustand 인증 스토어

**목표**: `getAnonymousKey()` 호출 → 백엔드 POST /api/v1/auth/anonymous → JWT 저장

**실패 테스트** (`src/stores/authStore.test.ts`):


**구현** (`src/stores/authStore.ts`):


#### Task 1-2: API 클라이언트 + 인증 초기화 훅

**실패 테스트** (`src/api/client.test.ts`):


**구현** (`src/api/client.ts`):


**구현** (`src/api/auth.ts`):


**구현** (`src/hooks/useAuth.ts`):


**`src/main.tsx` 업데이트** — `<AuthGate>` 래퍼 추가:


**커밋**: `feat: 인증 레이어 — getAnonymousKey, JWT 저장, axios 클라이언트`

---



<!-- file: plans/2026-04-30-sobaki-front-plan-04-phase-2.md -->

### Phase 2 — API 레이어 (TanStack Query hooks)

#### Task 2-1: Room API + useRoom hook

**실패 테스트** (`src/api/room.test.ts`):


**구현** (`src/api/room.ts`):


**구현** (`src/hooks/useRoom.ts`):


#### Task 2-2: Ledger / Items / Quests API

**구현** (`src/api/ledger.ts`):


**구현** (`src/api/items.ts`):


**구현** (`src/api/quests.ts`):


**구현** (`src/api/ai.ts`):


**커밋**: `feat: API 레이어 — room, ledger, items, quests, ai 엔드포인트`

---



<!-- file: plans/2026-04-30-sobaki-front-plan-05-phase-3.md -->

### Phase 3 — Room 페이지 (홈 — 소박이의 방)

#### Task 3-1: react-konva 룸 캔버스

**실패 테스트** (`src/components/room/RoomCanvas.test.tsx`):


**구현** (`src/components/room/RoomCanvas.tsx`):


#### Task 3-2: 소박이 Lottie 캐릭터

**구현** (`src/components/sobak/SobakLottie.tsx`):


> **참고**: Lottie JSON 파일은 `src/assets/characters/sobak-idle.json`, `sobak-react.json`에 위치. 실제 구현 시 디자이너로부터 전달받은 파일 사용. 없을 경우 빈 JSON `{}` 으로 placeholder.

#### Task 3-3: Room 페이지 조합

**구현** (`src/pages/Room/index.tsx`):


**구현** (`src/hooks/useWindowSize.ts`):


**구현** (`src/pages/Room/ItemTooltip.tsx`):


**커밋**: `feat: Room 페이지 — react-konva 룸 캔버스, 소박이 Lottie, 아이템 툴팁`

---



<!-- file: plans/2026-04-30-sobaki-front-plan-06-phase-4.md -->

### Phase 4 — 지출 기록 (Ledger) 모달

#### Task 4-1: 지출 기록 폼

**실패 테스트** (`src/pages/Room/LedgerModal.test.tsx`):


**구현** (`src/pages/Room/LedgerModal.tsx`):


**커밋**: `feat: 지출 기록 모달 — 금액/카테고리/절약 여부/영수증 AI 파싱`

---



<!-- file: plans/2026-04-30-sobaki-front-plan-07-phase-5.md -->

### Phase 5 — 캘린더 가계부

#### Task 5-1: 월간 캘린더 페이지

**실패 테스트** (`src/pages/Calendar/index.test.tsx`):


**구현** (`src/pages/Calendar/index.tsx`):


**구현** (`src/pages/Calendar/CalendarGrid.tsx`):


**구현** (`src/pages/Calendar/DayDetail.tsx`):


**커밋**: `feat: 캘린더 가계부 — 월간 그리드, 날짜별 상세, 월간 통계`

---



<!-- file: plans/2026-04-30-sobaki-front-plan-08-phase-6.md -->

### Phase 6 — 퀘스트 페이지

#### Task 6-1: 퀘스트 목록 + 진행도

**실패 테스트** (`src/pages/Quest/index.test.tsx`):


**구현** (`src/pages/Quest/index.tsx`):


**커밋**: `feat: 퀘스트 페이지 — 진행도 바, 보상 아이템 미리보기`

---



<!-- file: plans/2026-04-30-sobaki-front-plan-09-phase-7.md -->

### Phase 7 — 아이템 도감

#### Task 7-1: 도감 그리드 페이지

**실패 테스트** (`src/pages/Catalog/index.test.tsx`):


**구현** (`src/pages/Catalog/index.tsx`):


**커밋**: `feat: 아이템 도감 — 4열 그리드, 희귀도별 테두리, 미획득 잠금 표시`

---



<!-- file: plans/2026-04-30-sobaki-front-plan-10-phase-8.md -->

### Phase 8 — 설정 페이지

#### Task 8-1: 설정 (예산 + 계정)

**구현** (`src/pages/Settings/index.tsx`):


**커밋**: `feat: 설정 페이지 — 월/주 예산 설정, 계정 정보`

---



<!-- file: plans/2026-04-30-sobaki-front-plan-11-phase-9.md -->

### Phase 9 — 공유 기능 + 통합 완성

#### Task 9-1: 퀘스트 완료 / 아이템 획득 공유

**구현** (`src/hooks/useShare.ts`):


#### Task 9-2: 최종 통합 테스트 + 환경변수

**`.env.development`**:


**`.env.production`**:


**`src/pages/Room/index.tsx` — 공유 버튼 추가**:


**`src/App.tsx` — AuthGate 적용 완성**:


**전체 통합 테스트** (`src/integration/app.test.tsx`):


**커밋**: `feat: 공유 기능, 통합 테스트, 환경변수 설정 — 소박이 프론트 MVP 완성`

---



<!-- file: plans/2026-04-30-sobaki-front-plan-12-summary.md -->

## 구현 완료 체크리스트

| Phase | 내용 | 상태 |
|-------|------|------|
| 0 | 프로젝트 설정, TDS Provider, 탭 라우팅 | ⬜ |
| 1 | 인증 (getAnonymousKey → JWT → Zustand) | ⬜ |
| 2 | API 레이어 (axios + TanStack Query hooks) | ⬜ |
| 3 | Room 페이지 (react-konva + Lottie + 아이템 툴팁) | ⬜ |
| 4 | 지출 기록 모달 (폼 + 영수증 AI 파싱) | ⬜ |
| 5 | 캘린더 가계부 (월간 그리드 + 날짜 상세) | ⬜ |
| 6 | 퀘스트 페이지 (진행도 바 + 보상 미리보기) | ⬜ |
| 7 | 아이템 도감 (4열 그리드 + 잠금 표시) | ⬜ |
| 8 | 설정 페이지 (예산 + 계정) | ⬜ |
| 9 | 공유 기능 + 통합 테스트 + 배포 환경변수 | ⬜ |

## 주요 API 매핑

| 페이지 | Query Key | API |
|--------|-----------|-----|
| Room | `['room']` | GET /api/v1/room |
| Calendar | `['calendar', year, month]` | GET /api/v1/ledger/calendar |
| Quest | `['quests']` | GET /api/v1/quests/current |
| Catalog | `['items', 'catalog']` | GET /api/v1/items/catalog |
| Ledger 저장 | mutation | POST /api/v1/ledger/spending |
| 영수증 파싱 | mutation | POST /api/v1/ai/receipt/parse |
| 퀘스트 진행 | mutation | POST /api/v1/quests/{id}/progress |

## 빌드 & 배포



<!-- file: plans/2026-04-30-sobaki-back-plan-01-intro.md -->

## Goal

소박이 앱의 REST API 서버를 구현한다. 사용자 인증(익명 키 기반), 가계부 기록, AI 영수증 파싱, 아이템 자동 생성, 퀘스트, 룸 조회 API를 제공한다.



<!-- file: plans/2026-04-30-sobaki-back-plan-02-api-summary.md -->

## Architecture




<!-- file: plans/2026-04-30-sobaki-back-plan-03-implementation-sequence.md -->

## Tech Stack

| 항목 | 기술 |
|------|------|
| 프레임워크 | Spring Boot 3.2, Java 17 |
| DB | PostgreSQL 15, JPA/Hibernate |
| 마이그레이션 | Flyway |
| 인증 | JWT (HS256), 익명 키 기반 |
| 스토리지 | AWS S3 (SDK v2) |
| AI | Anthropic Claude API (`claude-3-5-sonnet-20241022`) |
| 빌드 | Gradle |
| 테스트 | JUnit 5, Mockito, H2 (테스트용) |
| 로컬 환경 | Docker Compose (PostgreSQL) |

---



<!-- file: specs/2026-04-30-sobaki-design-01-app-overview.md -->

## 1. 앱 개요

소박이는 **방치형 힐링 절약 앱**이다. 사용자가 소비를 기록하고 절약 퀘스트를 완수할 때마다, 소박이 수달이 사는 방에 음식/소품 아이템이 자동으로 하나씩 생겨난다. 강제로 줍거나 터치할 필요 없이 방이 점점 채워지는 모습을 보며 절약의 즐거움을 느끼는 구조다.

**핵심 감성**: 네코 아츠메(고양이 수집)처럼 들어왔을 때 "어, 이게 왜 생겼지?" 라는 궁금증과 소박한 보람.

---



<!-- file: specs/2026-04-30-sobaki-design-02-target-users.md -->

## 2. 타겟 사용자

- 소비를 줄이고 싶지만 강제성 있는 가계부는 부담스러운 20-30대
- 귀여운 캐릭터/힐링 콘텐츠에 반응하는 사용자
- 토스 앱 내 일상적으로 사용하는 기존 토스 사용자

---



<!-- file: specs/2026-04-30-sobaki-design-03-platform-stack.md -->

## 3. 플랫폼 스택

| 구분 | 기술 |
|------|------|
| 앱인토스 프레임워크 | `@apps-in-toss/web-framework` (Vite + React WebView) |
| TDS | `@toss/tds-mobile` |
| 상태 관리 | Zustand (클라이언트) + TanStack Query (서버) |
| 룸 렌더링 | react-konva (Canvas 기반) |
| 캐릭터 애니메이션 | `Asset.Lottie` (`@toss/tds-mobile`) |
| 백엔드 | Spring Boot 3 + Java 17 |
| DB | PostgreSQL 15 + JPA/Hibernate |
| 이미지 저장 | AWS S3 |
| AI 검증 | Claude Vision API (`claude-3-5-sonnet-20241022`) |
| 인증 | mTLS (백엔드↔토스) + JWT HS256 (프론트↔백엔드) |

---



<!-- file: specs/2026-04-30-sobaki-design-04-screen-composition.md -->

## 4. 화면 구성 (6개)

### 4.1 홈 — 소박이의 방 (룸)

- react-konva Canvas로 방 배경 렌더링
- 절약 행동으로 생긴 아이템들이 방 안에 배치됨 (자동, 사용자 터치 불필요)
- 소박이 수달 Lottie 애니메이션 (기본 대기, 아이템 발견 반응)
- 하단: "오늘 기록하기" 플로팅 버튼
- 아이템 탭 시: 어떤 절약 행동으로 생겼는지 툴팁 표시

### 4.2 지출 기록

- 금액 입력 + 카테고리 선택 (식비/카페/쇼핑/교통/기타)
- 절약 여부 체크 ("원래 살 뻔했는데 참았어요")
- 영수증 사진 첨부 → Claude Vision AI 자동 파싱 (금액, 가게명, 날짜)
- 메모 입력 (선택)
- 저장 시 daily_ledger sequence_no 자동 증가

### 4.3 캘린더 가계부

- 월간 캘린더 뷰 (TDS Calendar 컴포넌트)
- 날짜 탭 시 해당일 지출 목록 + 총액 표시
- 퀘스트 완료일에 스탬프 표시
- 날짜별 일기/감정(mood) 기록 가능
- 월간 절약 통계 (총 절약액, 퀘스트 완료 횟수)

### 4.4 퀘스트

- 현재 진행 중인 퀘스트 카드 (예: "카페 3번 참기", "배달 대신 직접 만들기")
- 진행률 바 + 완료 시 아이템 생성 미리보기
- 히스토리: 완료한 퀘스트 목록

### 4.5 아이템 도감

- 획득한 아이템 / 미획득(실루엣) 전체 그리드
- 아이템 탭 시: 이름, 획득 조건, 획득 날짜
- 미획득 아이템은 "???" 표시로 수집 욕구 자극

### 4.6 설정

- 예산 설정 (월/주)
- 알림 설정
- 계정 정보 (앱인토스 연동)

---



<!-- file: specs/2026-04-30-sobaki-design-05-item-system.md -->

## 5. 아이템 시스템

### 5.1 생성 원칙

아이템은 **특정 절약 행동과 1:1 매핑**된다. 카페를 참으면 카페 관련 아이템, 배달을 참으면 집밥 아이템이 생기는 식으로 행동과 보상이 직결된다.

### 5.2 아이템 카테고리 및 예시

| 카테고리 | 아이템 예시 | 생성 조건 |
|---------|------------|---------|
| 길거리 음식 | 떡볶이, 순대, 붕어빵, 어묵, 호떡 | 분식 지출 절약 |
| 카페/디저트 | 아이스크림, 버블티, 마카롱, 크로플 | 카페 지출 절약 |
| 가정식 | 밥, 라면, 김치찌개, 된장찌개, 계란프라이 | 배달 대신 직접 요리 |
| 과자/간식 | 포테이토칩, 초코파이, 쿠키, 사탕 | 편의점 지출 절약 |
| 음료 | 커피, 주스, 우유, 보리차 | 음료 지출 절약 |
| 계절/특별 | 수박 조각, 군밤, 팥빙수, 따뜻한 국물 | 계절 퀘스트 완료 |
| 소품 | 화분, 쿠션, 양초, 책 | 쇼핑 절약 |
| 소박이 굿즈 | 소박이 인형, 소박이 머그컵 | 마일스톤 달성 |

**총 50개 이상** item_master 테이블에 시드 데이터로 관리.

### 5.3 아이템 희귀도

| 등급 | 색상 | 비율 | 조건 |
|-----|-----|-----|-----|
| 일반 | 회색 | 70% | 1회 절약 |
| 희귀 | 파란색 | 20% | 3연속 절약 |
| 특별 | 보라색 | 10% | 주간 퀘스트 완료 |

---



<!-- file: specs/2026-04-30-sobaki-design-06-visual-design.md -->

## 6. 비주얼 디자인

- **캐릭터**: 소박이 수달 — 파스텔톤, 수채화 느낌
- **로고**: SOBAK'S LITTLE JOYS (영문 타이포 + 수달 일러스트)
- **메인 컬러**: `#BA68C8` (보라색 계열)
- **배경**: 따뜻한 크림/베이지 톤 방 인테리어
- **폰트**: TDS 기본 + 손글씨 포인트 폰트
- **룸 스타일**: 도트/픽셀이 아닌 부드러운 수채화 일러스트

---



<!-- file: specs/2026-04-30-sobaki-design-07-backend-architecture.md -->

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



<!-- file: specs/2026-04-30-sobaki-design-08-database-schema.md -->

## 8. 데이터베이스 스키마 (10개 테이블)

### 8.1 users

```sql
CREATE TABLE users (
  id              BIGINT AUTO_INCREMENT PRIMARY KEY,
  toss_user_id    VARCHAR(100) UNIQUE NOT NULL,
  nickname        VARCHAR(50),
  profile_image   VARCHAR(500),
  monthly_budget  BIGINT DEFAULT 0,
  weekly_budget   BIGINT DEFAULT 0,
  created_at      TIMESTAMP DEFAULT NOW(),
  updated_at      TIMESTAMP DEFAULT NOW()
);
```

### 8.2 daily_ledgers (가계부 — 핵심 테이블)

```sql
CREATE TABLE daily_ledgers (
  id              BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id         BIGINT NOT NULL REFERENCES users(id),
  record_date     DATE NOT NULL,
  sequence_no     INT NOT NULL DEFAULT 1,         -- 하루 복수 기록 지원, 백엔드에서 (user_id, record_date)의 MAX+1로 자동 계산
  total_spent     BIGINT DEFAULT 0,
  total_saved     BIGINT DEFAULT 0,
  budget_amount   BIGINT,
  diary_content   TEXT,
  mood            VARCHAR(20),                    -- happy/neutral/sad/proud
  quest_completed BOOLEAN DEFAULT FALSE,
  item_spawned    BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMP DEFAULT NOW(),
  updated_at      TIMESTAMP DEFAULT NOW(),
  UNIQUE (user_id, record_date, sequence_no)
);
```

### 8.3 spending_items (개별 지출 항목)

```sql
CREATE TABLE spending_items (
  id              BIGINT AUTO_INCREMENT PRIMARY KEY,
  ledger_id       BIGINT NOT NULL REFERENCES daily_ledgers(id),
  user_id         BIGINT NOT NULL REFERENCES users(id),
  amount          BIGINT NOT NULL,
  category        VARCHAR(50) NOT NULL,            -- food/cafe/shopping/transport/etc
  description     VARCHAR(200),
  is_saved        BOOLEAN DEFAULT FALSE,           -- 절약 여부
  receipt_image   VARCHAR(500),                    -- S3 URL
  raw_data        JSONB,                           -- AI 파싱 결과 + 향후 토스 거래내역 연동용
  spend_time      TIMESTAMP,
  location_id     BIGINT REFERENCES locations(id), -- 향후 위치 기반 연동
  created_at      TIMESTAMP DEFAULT NOW()
);
```

### 8.4 locations (향후 위치 기반 서비스 확장용)

```sql
CREATE TABLE locations (
  id          BIGINT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(200),
  address     VARCHAR(500),
  latitude    DECIMAL(10, 8),
  longitude   DECIMAL(11, 8),
  category    VARCHAR(50),
  created_at  TIMESTAMP DEFAULT NOW()
);
```

### 8.5 item_master (아이템 정의 — 시드 데이터)

```sql
CREATE TABLE item_master (
  id              BIGINT AUTO_INCREMENT PRIMARY KEY,
  name            VARCHAR(100) NOT NULL,
  description     TEXT,
  image_url       VARCHAR(500),
  category        VARCHAR(50),                    -- food/drink/props/special
  rarity          VARCHAR(20) DEFAULT 'COMMON',   -- COMMON/RARE/SPECIAL
  spawn_condition VARCHAR(200),                   -- 생성 조건 설명
  trigger_category VARCHAR(50),                  -- 어떤 지출 카테고리 절약 시 생성
  trigger_count   INT DEFAULT 1,                  -- 몇 번 절약해야 생성되는지
  is_active       BOOLEAN DEFAULT TRUE,
  sort_order      INT DEFAULT 0
);
```

### 8.6 user_items (사용자 획득 아이템)

```sql
CREATE TABLE user_items (
  id              BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id         BIGINT NOT NULL REFERENCES users(id),
  item_id         BIGINT NOT NULL REFERENCES item_master(id),
  obtained_at     TIMESTAMP DEFAULT NOW(),
  obtained_reason VARCHAR(200),                   -- 어떤 행동으로 획득했는지
  UNIQUE (user_id, item_id)
);
```

### 8.7 quests (퀘스트 정의)

```sql
CREATE TABLE quests (
  id              BIGINT AUTO_INCREMENT PRIMARY KEY,
  title           VARCHAR(200) NOT NULL,
  description     TEXT,
  quest_type      VARCHAR(50),                    -- daily/weekly/special
  target_category VARCHAR(50),
  target_count    INT DEFAULT 1,
  target_amount   BIGINT,
  reward_item_id  BIGINT REFERENCES item_master(id),
  is_active       BOOLEAN DEFAULT TRUE
);
```

### 8.8 user_quests (퀘스트 진행 상태)

```sql
CREATE TABLE user_quests (
  id              BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id         BIGINT NOT NULL REFERENCES users(id),
  quest_id        BIGINT NOT NULL REFERENCES quests(id),
  status          VARCHAR(20) DEFAULT 'IN_PROGRESS', -- IN_PROGRESS/COMPLETED/FAILED
  current_count   INT DEFAULT 0,
  started_at      TIMESTAMP DEFAULT NOW(),
  completed_at    TIMESTAMP
);
```

### 8.9 rooms (룸 상태)

```sql
CREATE TABLE rooms (
  id              BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id         BIGINT UNIQUE NOT NULL REFERENCES users(id),
  room_theme      VARCHAR(50) DEFAULT 'default',
  background_url  VARCHAR(500),
  created_at      TIMESTAMP DEFAULT NOW(),
  updated_at      TIMESTAMP DEFAULT NOW()
);
```

### 8.10 room_placements (룸 내 아이템 배치)

```sql
CREATE TABLE room_placements (
  id              BIGINT AUTO_INCREMENT PRIMARY KEY,
  room_id         BIGINT NOT NULL REFERENCES rooms(id),
  user_item_id    BIGINT NOT NULL REFERENCES user_items(id),
  pos_x           FLOAT NOT NULL,
  pos_y           FLOAT NOT NULL,
  scale           FLOAT DEFAULT 1.0,
  rotation        FLOAT DEFAULT 0.0,
  layer_order     INT DEFAULT 0,
  placed_at       TIMESTAMP DEFAULT NOW()
);
```

---



<!-- file: specs/2026-04-30-sobaki-design-09-ai-receipt-parsing.md -->

## 9. AI 영수증 파싱

**모델**: `claude-3-5-sonnet-20241022`  
**입력**: Base64 인코딩된 영수증 이미지  
**출력**: JSON (`{ amount, store_name, date, items[], category }`)

**프롬프트 전략**:
```
이 영수증 이미지에서 다음 정보를 JSON으로 추출해주세요:
- total_amount: 총 결제 금액 (숫자만)
- store_name: 가게/업체명
- purchase_date: 구매 날짜 (YYYY-MM-DD)
- items: 개별 항목 목록 [{ name, price }]
- category: food/cafe/shopping/transport/etc 중 하나

확인 불가한 항목은 null로 반환하세요.
```

**원본 응답은 `raw_data` JSONB 컬럼에 저장** → 향후 토스 거래내역 API 연동 시에도 동일 필드 재사용.

---



<!-- file: specs/2026-04-30-sobaki-design-10-appsintoss-integration.md -->

## 10. 앱인토스 연동

### 10.1 인증 (mTLS)

- 토스 인증 서버와 통신은 서버 사이드 mTLS로 처리
- 프론트 → 백엔드 API 호출 시 JWT 토큰 기반
- `@apps-in-toss/web-framework`의 WebView 환경에서는 `appLogin()` 미지원 → 백엔드에서 처리

### 10.2 앨범/사진 접근

- WebView 환경: HTML `<input type="file" accept="image/*">` 사용
- 영수증 이미지 선택 후 S3 업로드 → AI 파싱 요청

### 10.3 공유 기능

- `share()` from `@apps-in-toss/web-framework` 사용 가능 ✅
- 퀘스트 완료 시 / 특별 아이템 획득 시 공유 유도

---



<!-- file: specs/2026-04-30-sobaki-design-11-mvp-scope.md -->

## 11. MVP 범위

**MVP에 포함**:
- 홈(룸) 화면 — react-konva + Lottie
- 지출 기록 (영수증 AI 파싱 포함)
- 캘린더 가계부 (기록 조회)
- 아이템 자동 생성 (절약 행동 → 아이템)
- 퀘스트 시스템 (기본 daily 퀘스트)
- 아이템 도감

**MVP 이후 확장**:
- 토스 거래내역 API 자동 동기화 (raw_data 재사용)
- 위치 기반 "근처 저렴한 가게" 추천 (locations 테이블 활용)
- 소셜 기능 (친구 룸 방문)
- 룸 테마 변경
- 주간/월간 절약 리포트

---



<!-- file: specs/2026-04-30-sobaki-design-12-directory-structure.md -->

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



<!-- file: specs/2026-04-30-sobaki-design-13-extension-considerations.md -->

## 13. 확장성 고려사항

| 향후 기능 | 현재 설계에서 준비된 부분 |
|----------|----------------------|
| 토스 거래내역 자동 연동 | `spending_items.raw_data` JSONB 필드 |
| 위치 기반 서비스 | `locations` 테이블, `spending_items.location_id` FK |
| 하루 복수 기록 | `daily_ledgers.sequence_no` + UNIQUE 제약 |
| AI 파싱 고도화 | `raw_data`에 원본 응답 전체 저장 |
| 새로운 아이템 추가 | `item_master` 시드 데이터만 추가 |
| 룸 테마 확장 | `rooms.room_theme` 컬럼 |


