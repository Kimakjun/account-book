# javascript-w5-accountbook
스프린트 5-6주차 웹 프로젝트 - 가계부


## ERD

- ![ERD](https://user-images.githubusercontent.com/49400477/95411156-b26e1000-0960-11eb-89cd-b507320a528e.PNG) 

## SERVER API

- [API LINK](https://docs.google.com/spreadsheets/d/1zChKgQXQk_B6gwmwXotwr46t_PzTYat0vUd1y8RDF0E/edit#gid=0)

## Getting start
    1. install
        /front, /back : npm i
    2. dotenv
        /back => .env.example
    3. initiallize db
        /back : sequelize db:create && sequelize db:seed
    4. run
        webpack-dev-server: /front npm run build
        app: /back npm run dev
        
## back end

### day 1

- Project Setting
- [x] express 기본 세팅.
- [x] 데이터 베이스  설계(ERD 작성)
- [x] db 생성 및 sequelize db 객체 생성.

### day 2 

- [x] passport strategy
- [x] server api 작성.
- [x] passport, token 이용한 로그인구현

### day 3

- [x] server api 구현.
- [x] test(post man) 


## front end

- [x] 웹팩 설정
- [x] 린트 설정
- [x] 구조 설계
- [x] 로그인,회원가입,로그아웃 구현 
- [x] 카카오 로그인 구현
- [x] pub, sub 모델 구현
- [x] 날짜선택, 거내내역조회 



### 거래내역 화면(~10/13)

- [x] 수입 지출 분류에따른 카테고리 박스 내용 그려주기
- [x] 모달구현, 및 디자인
- [x] 모달 생성,삭제 이벤트 구현 
- [x] 결제 수단 추가 삭제 구현
- [x] 거래내역 컴포넌트 디자인
- [x] 상태 공유 클래스 구현, 모델, 뷰 분리
- [x] 거래내역 생성구현(생성시 새로운데이터 거래내역에 삽입)

- [x] 거래내역 클릭이벤트 구현(내역클릭시 인풋창에 자동 입력)
- [x] 수정모드시 인풋 구성 변경(내용지우기=> 삭제 등)
- [x] 수정모드시 삭제 입벤트 구현(삭제시 거래내역목록에서 제거됨)
- [x] 수정시 수정 내용 적용(거래내역목록에서 수정된 데이터 적용)


### 통계화면(10/14)
- [x] NAVBAR 클릭시 각 컴포넌트 렌더링 
- [ ] pie 차트 그리기
- [ ] 하단 거래내역 그래프 그리기
- [ ] 일별 지출 그래프 그리기
 
### 달력화면(10/15)


### 배포 및 리펙토링(10/16)

- [ ] 코드 리펙토링, 테스트 
- [ ] ncloud 에 배포하기
- [ ] 자동 배포 적용하기








 