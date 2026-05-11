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

