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

