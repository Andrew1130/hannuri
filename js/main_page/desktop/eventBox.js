// eventBox.js



//? 구현할 기능 -----------
// 이전, 다음 버튼 누를시 fadeIn, fadeOut으로 작동하도록 처리


$.ajax({
  url:"../json/main_page/eventBoxData.json",
  context: document.body
}).done(function(data){
  var eventBoxData = data;

//! Javascript -------------------------------------
//* 변수 -----------------------
var eventBoxCardsTotal = document.querySelector(".eventBox_card_total")
var baseUrl = "../img/main_page/03_laptop/05_eventbox/"
// desktop은 laptop과 디자인이 거의 유사하여, laptop의 이미지를 그대로 사용


//* 함수 -----------------------
//TODO : svg 미 적용시에는 png가 나타나도록 해보기
var makeEventCardsFn = function(title, contents, img_png, img_svg){
  var makeDiv = document.createElement('div')
  makeDiv.innerHTML = '<div class="eventBox_card_wrap"><div class="eventBox_img_area"></div><div class="eventBox_content_area"><h3 class="eventBox_card_title">'+ title +'</h3><p class="eventBox_card_contents">'+ contents +'</p><button type="button" class="eventBox_card_viewbtn">자세히보기</button><button type="button" class="eventBox_card_joinbtn">참여하기</button></div></div>'

  var SelImgcon = makeDiv.querySelector('.eventBox_img_area')
  SelImgcon.style.backgroundImage = 'url('+ baseUrl +''+ img_png +')'
  SelImgcon.style.backgroundImage = 'url('+ baseUrl +''+ img_svg +')'

  eventBoxCardsTotal.appendChild(makeDiv)
}


//* 반복문으로 여러번 만들기 ---------------
var i = 0
for(; i<eventBoxData.length; i+=1) {
  makeEventCardsFn(eventBoxData[i].title, eventBoxData[i].contents, eventBoxData[i].img_png, eventBoxData[i].img_svg)
}


//! Jquery -------------------------------------
(function($){
//? 변수 ------------
var eventBoxCardsTotal = $(".eventBox_card_total")
var eventBoxMakeDiv = eventBoxCardsTotal.children('div')
var eventBoxCardWrap = eventBoxCardsTotal.find('.eventBox_card_wrap')
var eventBoxContentArea = eventBoxCardsTotal.find('.eventBox_content_area')
var eventBoxImgArea = eventBoxCardsTotal.find('.eventBox_img_area')

var nextBtn = $('.eventBox_nextbtn')
var prevBtn = $('.eventBox_prevbtn')
var i = 0;


//? 함수 ------------
var nextBtnFn = function(){
  i++
  if(i >= eventBoxData.length) {
    i = 0
  }
  eventBoxMakeDiv.eq(i).stop().fadeIn()
  eventBoxMakeDiv.eq(i).siblings('div').stop().fadeOut()
}

var prevBtnFn = function(){
  i--
  if(i < 0) {
    i = eventBoxData.length-1
  }
  eventBoxMakeDiv.eq(i).stop().fadeIn()
  eventBoxMakeDiv.eq(i).siblings('div').stop().fadeOut()
}


//? 사전 처리 -----------
eventBoxMakeDiv.eq(1).css({ display: "none" })
eventBoxMakeDiv.eq(2).css({ display: "none" })


//? 이벤트 -----------
nextBtn.on('click', function(){
  nextBtnFn()
})

prevBtn.on('click', function(){
  prevBtnFn()
})


})(jQuery);

}) // $.ajax