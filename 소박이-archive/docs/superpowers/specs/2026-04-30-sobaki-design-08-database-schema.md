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

