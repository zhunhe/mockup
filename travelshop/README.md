# Travelshop

모노레포(backend: Spring Boot, frontend: React + Vite) 기반의 여행 상품 쇼핑 애플리케이션입니다.

## 개요
- 주요 기능: 여행 상품 조회/검색, 장바구니, 주문
- 기술 스택: Spring Boot, Springdoc(OpenAPI), H2, Maven, React, Vite, ESLint

## 레포지토리 구조
```
backend/
  travelshop/
    src/main/java/com/example/travelshop/
      config/
      controller/
      domain/
      dto/
      exception/
      repository/
      service/
    src/main/resources/
      application.yml
      data.sql
frontend/
  src/
    components/
    contexts/
    pages/
  package.json
  vite.config.js
```

## 빠른 시작(Quick Start)

### 사전 요구사항
- Backend: JDK 17+, Maven Wrapper 사용 가능
- Frontend: Node.js 18+ 권장, npm 9+

### Backend 실행
```bash
chmod +x backend/travelshop/mvnw
cd backend/travelshop
./mvnw spring-boot:run
```
- 기본 포트: http://localhost:8080
- Swagger UI: http://localhost:8080/swagger-ui.html
- H2 콘솔: http://localhost:8080/h2-console
  - JDBC URL: `jdbc:h2:mem:traveldb;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE`
  - 사용자: `sa`, 비밀번호: 공백

테스트 실행:
```bash
./mvnw test
```

### Frontend 실행
```bash
cd frontend
npm ci
npm run dev
```
- 기본 포트: http://localhost:5173 (Vite)

빌드 및 프리뷰:
```bash
npm run build
npm run preview
```

품질 검사:
```bash
npm run lint
```

### 환경 변수(권장)
- Vite: `VITE_API_BASE_URL` 사용 권장(예: `http://localhost:8080`)
  - 접근: `import.meta.env.VITE_API_BASE_URL`

## 서비스 아키텍처 설계 문서

### 구성 요소
- Frontend(React + Vite): `frontend/`에서 개발/빌드. 상태는 `contexts/OrderContext.jsx`, 페이지는 `src/pages/*` 구성.
- Backend(Spring Boot): `backend/travelshop/` 내 레이어드 아키텍처
  - Controller: REST 엔드포인트 정의 (`controller/*`)
  - Service: 도메인 비즈니스 로직, 트랜잭션 경계 (`service/*`)
  - Repository: 데이터 접근(JPA) (`repository/*`)
  - Domain/DTO: 엔티티 모델 및 전송 객체 (`domain/*`, `dto/*`)
- Database: H2 In-Memory(개발), Hibernate `ddl-auto: update`, `data.sql` 시드 자동 실행
- 문서화: Springdoc(OpenAPI) + Swagger UI(`/swagger-ui.html`)
- 보안/연동: CORS 허용 오리진(`CorsConfig`) — `http://localhost:5173` 등

### 데이터 흐름(요청 처리)
1. 사용자가 Frontend에서 API 호출(fetch/axios)
2. Controller가 요청 파라미터/바디 검증 후 Service 호출
3. Service가 비즈니스 규칙 수행 및 Repository로 데이터 조작
4. 엔티티를 DTO로 변환해 응답 반환
5. 예외는 `GlobalExceptionHandler`에서 표준화하여 응답

### 배포/런타임
- Backend: 8080 포트, OpenAPI `/v3/api-docs`, Swagger UI `/swagger-ui.html`, H2 콘솔 `/h2-console`
- Frontend: 5173 포트(개발). 배포 시 `dist/` 정적 파일을 호스팅/리버스 프록시로 제공
- 환경 변수: Frontend에서 `VITE_API_BASE_URL`로 백엔드 주소 주입

### 운영 관점
- 로깅 레벨: SQL 및 바인딩 파라미터 출력 설정(개발)
- 확장성: Service/Repository 분리로 수평 확장 및 캐싱/비동기 처리 도입 용이
- 관측성: Swagger로 API 가시성 확보, 필요 시 APM/메트릭 추가

## API 기능 명세서

공통
- Base URL: `http://localhost:8080`
- OpenAPI: `/v3/api-docs`, Swagger UI: `/swagger-ui.html`
- 에러 응답: 400/404/500은 문자열 메시지 또는 검증 오류의 경우 `{ field: message }` 맵 반환

### TravelProduct

1) 전체 조회/검색
- Method/Path: GET `/api/products`
- Query: `q`(선택, 문자열) — 제목/설명에 부분 일치 검색
- Response: 200 OK, `TravelProductDto[]`
```json
[
  {
    "id": 1,
    "title": "제주 2박3일",
    "category": "DOMESTIC",
    "description": "자유 일정 포함",
    "price": 399000,
    "availableFrom": "2025-01-01",
    "availableTo": "2025-12-31"
  }
]
```

2) 상세 조회
- Method/Path: GET `/api/products/{id}`
- Path: `id`(Long)
- Response: 200 OK, `TravelProductDto`

3) 상품 등록(판매자)
- Method/Path: POST `/api/products`
- Request Body: `CreateTravelProductRequestDto`
```json
{
  "title": "고베/오사카 3박4일",
  "category": "OVERSEAS",
  "description": "가이던스 포함",
  "price": 899000,
  "availableFrom": "2025-03-01",
  "availableTo": "2025-12-31"
}
```
- Response: 200 OK, `TravelProductDto`
- Validation: `title`, `category` 필수, `price >= 0`, `availableFrom/To` 필수

DTO 스키마
- `TravelProductDto`: `{ id: Long, title: String, category: String, description: String, price: int, availableFrom: yyyy-MM-dd, availableTo: yyyy-MM-dd }`
- `CreateTravelProductRequestDto`: `{ title: String(필수), category: String(필수), description?: String, price: int(>=0), availableFrom: date(필수), availableTo: date(필수) }`

### Cart / Order

1) 장바구니 담기
- Method/Path: POST `/api/cart`
- Query: `userId`(String), `productId`(Long), `qty`(int, 기본값 1)
- Response: 200 OK, `CartDto`
```json
{
  "id": 10,
  "userId": "user-001",
  "items": [
    { "productId": 1, "title": "제주 2박3일", "quantity": 2, "price": 399000 }
  ]
}
```

2) 장바구니 주문
- Method/Path: POST `/api/cart/order`
- Query: `userId`(String)
- Response: 200 OK, `OrderDto`
```json
{
  "id": 101,
  "userId": "user-001",
  "orderedAt": "2025-03-01T12:34:56",
  "items": [
    { "productId": 1, "title": "제주 2박3일", "quantity": 2, "price": 399000 }
  ]
}
```

3) 바로 주문(프론트 커스텀 포맷)
- Method/Path: POST `/api/cart/direct-order`
- Request Body 예시: `{ "products": { "제주 2박3일": 1, "부산 기차여행": 2 } }`
- Response: 200 OK, `OrderDto`
- 동작: 제목으로 상품 조회하여 수량만큼 주문 항목 생성

4) 주문 내역 전체 조회
- Method/Path: GET `/api/cart/orders`
- Response: 200 OK, `OrderDto[]`

DTO 스키마
- `CartDto`: `{ id: Long, userId: String, items: CartItemDto[] }`
- `CartItemDto`: `{ productId: Long, title: String, quantity: int, price: int }`
- `OrderDto`: `{ id: Long, userId: String, orderedAt: yyyy-MM-dd'T'HH:mm:ss, items: OrderItemDto[] }`
- `OrderItemDto`: `{ productId: Long, title: String, quantity: int, price: int }`

## 데이터베이스
- H2 In-Memory DB 사용(개발)
- 스키마: Hibernate `ddl-auto: update`
- 시드: `data.sql` 자동 실행(spring.sql.init.mode=always)

## 배포
### Backend
```bash
cd backend/travelshop
./mvnw clean package
```
- 산출물: `target/*.jar`
- 환경 분리 시 `application-*.yml` 프로파일 사용 권장

### Frontend
```bash
cd frontend
npm run build
```
- 산출물: `dist/` (정적 호스팅 또는 리버스 프록시로 제공)

## 트러블슈팅
- 포트 충돌: Backend 8080, Frontend 5173 사용 중인지 확인
- macOS 권한 오류: `backend/travelshop/mvnw`에 실행 권한 부여
- Swagger 404: UI 경로(`/swagger-ui.html`)와 OpenAPI 경로(`/v3/api-docs`) 확인
