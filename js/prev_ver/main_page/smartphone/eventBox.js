// eventBox.js



//? 구현할 기능 -----------
// 이벤트 영역에 있는 작은 상자를 누르면, 그 상자가 펼쳐지면서 제목-내용-버튼이 보이게끔 하고, 펼쳐진 상자 외 나머지 상자는 접히면서 다시 작아지도록 하기


$.ajax({
  url:"../json/main_page/eventBoxData.json",
  context: document.body
}).done(function(data){
  var eventBoxData = data;

//! Javascript -------------------------------------
//* 변수 -----------------------
var eventBoxCardsTotal = document.querySelector(".eventBox_card_total")
var baseUrl = "../img/main_page/01_smartphone/05_eventbox/"


//* 함수 -----------------------
//TODO : svg 미 적용시에는 png가 나타나도록 해보기
var makeEventCardsFn = function(title, contents, img_png, img_svg){
  var makeDiv = document.createElement('div')
  makeDiv.innerHTML = '<div class="eventBox_card_wrap"><div class="eventBox_img_area"></div><div class="eventBox_content_area"><h3 class="eventBox_card_title">'+ title +'</h3><p class="eventBox_card_contents">'+ contents +'</p><button type="button" class="eventBox_card_viewbtn">자세히보기</button><button type="button" class="eventBox_card_joinbtn">참여하기</button></div></div>'

  var SelImgcon = makeDiv.querySelector('.eventBox_card_wrap')
  SelImgcon.style.backgroundImage = 'url('+ baseUrl +''+ img_png +')'
  // SelImgcon.style.backgroundImage = 'url('+ baseUrl +''+ img_svg +')'
  //* 휴대폰 내 삼성 인터넷 앱에서 svg를 지원하지 않아 일단 png로 처리

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


//? 함수 ------------



//? 사전 처리 -----------
// 첫번째 박스는 펼쳐져 있고, 나머지 박스는 접혀 있도록 처리
eventBoxContentArea[1].classList.add('off')
eventBoxCardWrap[1].classList.add('off')
eventBoxContentArea[2].classList.add('off')
eventBoxCardWrap[2].classList.add('off')


//? 이벤트 -----------
eventBoxMakeDiv.on('click', function(e){
  e.preventDefault()
  var onBoxWrap = $(this).find('.eventBox_card_wrap')
  var onBoxArea = $(this).find('.eventBox_content_area')
  var sibBoxWrap =  $(this).siblings().find('.eventBox_card_wrap')
  var sibBoxArea =  $(this).siblings().find('.eventBox_content_area')

  onBoxWrap.animate({ height: 23.125 + 'rem' })
  onBoxArea.css({ display: 'block' })
  sibBoxWrap.animate({ height: 3.125 + 'rem' })
  sibBoxArea.css({ display: 'none' })

})


})(jQuery);

}) // $.ajax