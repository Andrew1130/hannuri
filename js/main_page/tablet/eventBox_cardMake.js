// eventBox_cardMake.js




//? 구현할 기능 -----------
// eventBox 내부에 js로 카드 생성



$.ajax({
  url:"../json/main_page/eventBoxData.json",
  context: document.body
}).done(function(data){
  var eventBoxData = data;


//? 변수 ------------
var eventBoxCardsTotal = document.querySelector(".eventBox_card_total")
var baseUrl = "../img/main_page/02_tablet/05_eventbox/"


//? 함수 ------------
//TODO : svg 미 적용시에는 png가 나타나도록 해보기
var makeEventCardsFn = function(img_description, title, contents, img_png, img_svg){
  var makeDiv = document.createElement('div')
  makeDiv.innerHTML = '<div class="eventBox_card_wrap" role="img" alt='+ img_description +' aria-label='+ img_description +' tabindex="0"><div class="eventBox_img_area"></div><div class="eventBox_content_area"><h3 class="eventBox_card_title">'+ title +'</h3><p class="eventBox_card_contents" tabindex="0">'+ contents +'</p><button type="button" class="eventBox_card_viewbtn">자세히보기</button><button type="button" class="eventBox_card_joinbtn">참여하기</button></div></div>'

  var SelImgcon = makeDiv.querySelector('.eventBox_card_wrap')
  SelImgcon.style.backgroundImage = 'url('+ baseUrl +''+ img_png +')'
  // SelImgcon.style.backgroundImage = 'url('+ baseUrl +''+ img_svg +')'
  //* 휴대폰 내 삼성 인터넷 앱에서 svg를 지원하지 않아 일단 png로 처리

  eventBoxCardsTotal.appendChild(makeDiv)
}


//? 기능 실행 ------------
var i = 0
for(; i<eventBoxData.length; i+=1) {
  makeEventCardsFn(eventBoxData[i].img_description, eventBoxData[i].title, eventBoxData[i].contents, eventBoxData[i].img_png, eventBoxData[i].img_svg)
}


}) // $.ajax