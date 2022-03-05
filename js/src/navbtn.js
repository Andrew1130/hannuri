// navbtn.js


(function($){
//? 구현할 기능 -----------
// 메인페이지 스마트폰, 태블릿의 경우 헤더의 햄버거 버튼을 누르면 네비게이션이 나타나고 사라지도록 만들기

//? 변수 ------------
setTimeout(function(){

var headBoxWrap = $(".headBox_wrap")
// console.log(headBoxWrap)
var navBtn_head = headBoxWrap.find(".headbox_navbtn")
// console.log(navBtn_head)
var navBox = headBoxWrap.find(".navBox")
// console.log(navBox)
var navBtn_navBox = navBox.find(".navBox_navbtn")
var timed = 500;



//? 이벤트 -----------
navBtn_head.on('click', function(){
  navBox.stop().slideDown(timed);
})

navBtn_navBox.on('click', function(){
  navBox.stop().slideUp(timed);
})

}, 200) // setTimeout()

})(jQuery);