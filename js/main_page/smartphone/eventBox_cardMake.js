// eventBox_cardMake.js



//? 구현할 기능 -----------
//js로 eventBox 내 카드 내용 입력


$.ajax({
  url:"../json/main_page/eventBoxData.json",
  context: document.body
}).done(function(data){
  var eventBoxData = data;


//? 변수 ------------
var eventBoxCardsTotal = document.querySelector(".eventBox_card_total")
var baseUrl = "../img/main_page/01_smartphone/05_eventbox/"


//? 함수 ------------
var makeEventCardsFn = function(title, contents, img_png, img_svg){
  var makeDiv = document.createElement('div')
  makeDiv.innerHTML = '<div class="eventBox_card_wrap"><div class="eventBox_img_area"></div><div class="eventBox_content_area"><h3 class="eventBox_card_title">'+ title +'</h3><p class="eventBox_card_contents">'+ contents +'</p><button type="button" class="eventBox_card_viewbtn">자세히보기</button><button type="button" class="eventBox_card_joinbtn">참여하기</button></div></div>'

  var SelImgcon = makeDiv.querySelector('.eventBox_card_wrap')
  SelImgcon.style.backgroundImage = 'url('+ baseUrl +''+ img_png +')'
  // SelImgcon.style.backgroundImage = 'url('+ baseUrl +''+ img_svg +')'
  //* 휴대폰 내 삼성 인터넷 앱에서 svg를 지원하지 않아 일단 png로 처리

  eventBoxCardsTotal.appendChild(makeDiv)
}


//? 기능 실행 -----------
var i = 0
for(; i<eventBoxData.length; i+=1) {
  makeEventCardsFn(eventBoxData[i].title, eventBoxData[i].contents, eventBoxData[i].img_png)
}


}) // $.ajax