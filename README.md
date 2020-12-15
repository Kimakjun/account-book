**스프린트 5-6주차 웹 프로젝트 - 가계부**

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

## 폴더 구조

```
``
📦 front
 ┣ 📂src
 ┃ ┣ 📂components
 ┃ ┣ 📂models
 ┃ ┣ 📂public
 ┃ ┣ 📂states
 ┃ ┣ 📂template
 ┃ ┣ 📂util
 ┃ ┣ 📂views
 ┃ ┣ 📜App.js
 ┃ ┣ 📜index.js
 ┃ ┣ 📜index.scss
 ┣ 📜.eslintrc.js
 ┣ 📜.babelrc
 ┣ 📜pakage.json

📦back
 ┃ ┣ 📂src
 ┃ ┃ ┣ 📂config
 ┃ ┃ ┣ 📂controller
 ┃ ┃ ┣ 📂models
 ┃ ┃ ┣ 📂passport
 ┃ ┃ ┣ 📂public
 ┃ ┃ ┣ 📂route
 ┃ ┃ ┣ 📂sedders
 ┃ ┃ ┣ 📜app.js
 ┃ ┣ 📜package.json

```


## Observer Pattern


 ![](https://i.imgur.com/hKZ3HZT.png)  

- Observer 클래스는 특정 이벤트에 대한 동작(콜백 함수)에 대한 동작 정의
- Component 는 특정 이벤트에 대한 동작과 함께 Model 컴포넌트를 구독
- Model 에서 특정 이벤트가 발생했을시 이벤트를 구독하고 있는 컴포넌트에게 알림 / 컴포넌트는 특정 이벤트에 대한 콜백함수 실행




## 주요 기능

- 수입 지출 내역 관리(등록 수정 삭제)

    ![](https://i.imgur.com/U1OeCCU.png)



- 수입 지출 내역 관리(등록 수정 삭제)

    ![](https://i.imgur.com/AesKZhV.png)

- svg 를활용한 수입 지출 내역 통계 그래프
    
    ![](https://i.imgur.com/Hfu7IpF.png)

- svg 를 활용한 시계열 그래프 구현
    
    ![](https://i.imgur.com/BQyBXDO.png)
