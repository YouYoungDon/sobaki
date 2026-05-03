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

