# 한누리
## Intro
### 컨셉 : 동네 작은 책방(서점)
- 도서 판매, 독서 공간 있음, 간식 제공
- 3~4개월 단위로 글쓰기 그룹 모집, 출판 원하는 경우 독립출판 등으로 연결
- 베스트셀러 내지 주요도서의 저자를 초청하여 강연 진행

## 디자인
### design 폴더 내부 참조
- Hannuri_design.fig 
- pdf 폴더 내 pdf 파일들

## 폴더 및 파일 구성 (순서 없는 리스트 : 폴더 / 순서 있는 리스트 : 파일)
### html
1. main.html (메인 html)  
1. login.html (로그인 페이지 html)
1. join.html (회원가입 페이지 html)
1. intro.html (한누리소개 페이지 html)
1. booklist.html (도서목록 페이지 html)
1. event.html (이벤트 페이지 html)
### css
- common
  1. common.css
  1. reset.css
- main_page (메인페이지 css)
  1. desktop.css
  1. laptop.css
  1. smartphone.css
  1. tablet.css
- src
  1. main.css (메인 css)
  1. login.css (로그인 페이지 css)
  1. join.css (회원가입 페이지 css)
  1. intro.css (한누리소개 페이지 css)
  1. booklist.css (도서목록 페이지 css)
  1. event.css (이벤트 페이지 css)
### js
- common
  1. jquery_rwd_set.js (반응형 js를 위한 설정)
  1. jquery-3.6.0.min.js
  1. jquery-ui.min.js
- src
  - desktop
    1. slideBox.js
    1. introBox.js
    1. booklistBox.js
    1. eventBox.js
    1. footBox.js
  - laptop
    1. slideBox.js
    1. introBox.js
    1. booklistBox.js
    1. eventBox.js
    1. footBox.js
  - tablet
    1. headox.js
    1. slideBox.js
    1. introBox.js
    1. booklistBox.js
    1. eventBox.js
    1. footBox.js
  - smartphone
    1. headox.js
    1. slideBox.js
    1. introBox.js
    1. booklistBox.js
    1. eventBox.js
    1. footBox.js
  1. login.js (로그인 페이지 js)
  1. join.js (회원가입 페이지 js)
  1. intro.js (한누리소개 페이지 js)
  1. booklist.js (도서목록 페이지 js)
  1. event.js (이벤트 페이지 js)

### json
- intro
  1. intro_modalbar.js (3개의 바 형태에 대한 data)
  1. intro_modalwindow.js (바 형태를 클릭시 나타날 모달윈도우에 대한 data)
- booklist
  1. bookData_bestseller
  1. bookData_newbook
  1. bookData_steadyseller
  1. bookData_korean
  1. bookData_oversee
  1. bookData_membersbook
- event
  1. event_modalbar.js
  1. event_modalwindow.js
1. device_type (jquery_rwd_set.js을 위한 data)
1. slideBox_data
1. introBox_data

### img : 디렉토리만 기재
- main_page
  - 01_smartphone
    - 01_headBox
    - 02_slideBox
    - 03_introBox
    - 04_booklistBox
    - 05_eventBox
    - 06_footBox
  - 02_tablet
    - 01_headBox
    - 02_slideBox
    - 03_introBox
    - 04_booklistBox
    - 05_eventBox
    - 06_footBox
  - 03_labtop
    - 01_headBox
    - 02_slideBox
    - 03_introBox
    - 04_booklistBox
    - 05_eventBox
    - 06_footBox
  - 04_desktop
    - 01_headBox
    - 02_slideBox
    - 03_introBox
    - 04_booklistBox
    - 05_eventBox
    - 06_footBox
- login_page
- join_page
- intro_page
- booklist_page
- event_page

### ie
1. modernizr-custom

### design
- pdf
1. Hannuri_design.fig
---
1. index.html
1. readme.md

