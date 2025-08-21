# 주식 분석 및 추천 시스템

AI 기반 주식 분석, 예측, 구매 추천 서비스

## 프로젝트 개요

- 주식 데이터 분석 및 시각화
- AI를 활용한 주식 가격 예측
- 개인화된 주식 추천 시스템
- 추세선 분석 및 기술적 지표 제공
- 실시간 주식 정보 모니터링

## 기술 스택

### Backend
- **Spring Boot** - RESTful API 서버
- **Spring Security** - 인증 및 권한 관리
- **JPA/Hibernate** - 데이터베이스 ORM
- **MySQL/PostgreSQL** - 주 데이터베이스
- **Redis** - 캐싱 및 세션 관리

### Frontend
- **HTML/CSS/JavaScript** - 기본 웹 기술
- **Tailwind CSS** - 유틸리티 우선 CSS 프레임워크
- **Chart.js/D3.js** - 주식 차트 및 데이터 시각화

### AI/ML
- **Python** - AI 모델 개발 및 API 서버
- **Flask/FastAPI** - Python API 서버
- **TensorFlow/PyTorch** - 딥러닝 모델
- **Scikit-learn** - 머신러닝 알고리즘
- **Pandas/NumPy** - 데이터 처리

### 외부 API
- **주식 데이터 API** (Yahoo Finance, Alpha Vantage 등)
- **AI API** (OpenAI, Claude, etc.)
- **뉴스 API** - 주식 관련 뉴스 수집

## 주요 기능

### 1. 사용자 관리
- 회원가입/로그인 (Spring Security)
- 개인 포트폴리오 관리
- 관심 종목 관리

### 2. 주식 데이터 분석
- 실시간 주가 정보
- 기술적 지표 계산
- 추세선 분석
- 거래량 분석

### 3. AI 예측 시스템
- 주가 예측 모델
- 매수/매도 신호
- 리스크 분석
- 포트폴리오 최적화

### 4. 시각화
- 인터랙티브 차트
- 기술적 지표 표시
- 예측 결과 시각화
- 포트폴리오 성과 분석

## 프로젝트 구조

```
Stock_project/
├── backend/              # Spring Boot 백엔드
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   └── resources/
│   │   └── test/
│   ├── build.gradle
│   └── README.md
├── frontend/             # 프론트엔드
│   ├── src/
│   │   ├── css/
│   │   ├── js/
│   │   └── index.html
│   ├── package.json
│   └── tailwind.config.js
├── ai-service/           # Python AI 서비스
│   ├── models/
│   ├── api/
│   ├── requirements.txt
│   └── main.py
└── README.md
```

## 개발 환경 설정

### 필수 요구사항
- Java 21+
- Node.js 18+
- Python 3.9+
- MySQL 8.0+ 또는 PostgreSQL 13+
- Redis 6.0+

### 설치 및 실행
1. 백엔드 (Spring Boot)
```bash
cd backend
./gradlew bootRun
```

2. 프론트엔드
```bash
cd frontend
npm install
npm run dev
```

3. AI 서비스 (Python)
```bash
cd ai-service
pip install -r requirements.txt
python main.py
```

## API 문서

- Backend API: http://localhost:8080/swagger-ui.html
- AI Service API: http://localhost:5000/docs

## 라이선스

MIT License
