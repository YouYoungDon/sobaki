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

