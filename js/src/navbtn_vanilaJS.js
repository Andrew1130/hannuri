// navbtn_vanilajs.js


//? 구현할 기능 ------------------
// 메인페이지 스마트폰, 태블릿의 경우 헤더의 햄버거 버튼을 누르면 네비게이션이 나타나고 사라지도록 만들기



//? 변수 -----------------
var headBoxWrap = document.querySelector(".headBox_wrap");
var navBtn_head = headBoxWrap.querySelector(".headbox_navbtn");
var navBox = headBoxWrap.querySelector(".navBox");
var navBtn_navBox = navBox.querySelector(".navBox_navbtn");
var timed = 500;


//? 이벤트 ------------------
navBtn_head.addEventListener('click', function(e){
  e.preventDefault();
  navBox.classList.remove('navBox_off');
  navBox.className += ' navBox_on';
})
navBtn_navBox.addEventListener('click', function(e){
  e.preventDefault();
  navBox.classList.remove('navBox_on');
  navBox.className += ' navBox_off';
})

