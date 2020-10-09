# javascript-w5-accountbook
스프린트 5-6주차 웹 프로젝트 - 가계부


## ERD

- ![ERD](https://user-images.githubusercontent.com/49400477/95411156-b26e1000-0960-11eb-89cd-b507320a528e.PNG) 

## SERVER API

- [API LINK](https://docs.google.com/spreadsheets/d/1zChKgQXQk_B6gwmwXotwr46t_PzTYat0vUd1y8RDF0E/edit#gid=0)

## Getting start
    1. install
        /front, /back : npm i
    2. dovenv
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

