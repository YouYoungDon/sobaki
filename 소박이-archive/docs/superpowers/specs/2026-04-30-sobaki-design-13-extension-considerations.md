## 13. 확장성 고려사항

| 향후 기능 | 현재 설계에서 준비된 부분 |
|----------|----------------------|
| 토스 거래내역 자동 연동 | `spending_items.raw_data` JSONB 필드 |
| 위치 기반 서비스 | `locations` 테이블, `spending_items.location_id` FK |
| 하루 복수 기록 | `daily_ledgers.sequence_no` + UNIQUE 제약 |
| AI 파싱 고도화 | `raw_data`에 원본 응답 전체 저장 |
| 새로운 아이템 추가 | `item_master` 시드 데이터만 추가 |
| 룸 테마 확장 | `rooms.room_theme` 컬럼 |
