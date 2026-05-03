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

