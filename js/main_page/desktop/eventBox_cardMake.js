// eventBox.cardMake.js


//? 구현할 기능 -----------
// 이벤트박스 내 이미지와 카드를 js로 자동 생성


$.ajax({
  url:"../json/main_page/eventBoxData.json",
  context: document.body
}).done(function(data){
  var eventBoxData = data;


//? 변수 ------------
var eventBoxCardsTotal = document.querySelector(".eventBox_card_total")
var baseUrl = "../img/main_page/03_laptop/05_eventbox/"
// desktop은 laptop과 디자인이 거의 유사하여, laptop의 이미지를 그대로 사용


//? 함수 -----------
var makeEventCardsFn = function(img_description, title, contents, img_svg){
  var makeDiv = document.createElement('div')
  makeDiv.innerHTML = '<div class="eventBox_card_wrap"><div class="eventBox_img_area" role="img" alt='+ img_description +' aria-label='+ img_description +' tabindex="0"></div><div class="eventBox_content_area"><h3 class="eventBox_card_title">'+ title +'</h3><p class="eventBox_card_contents">'+ contents +'</p><button type="button" class="eventBox_card_viewbtn">자세히보기</button><button type="button" class="eventBox_card_joinbtn">참여하기</button></div></div>'

  var SelImgcon = makeDiv.querySelector('.eventBox_img_area')
  SelImgcon.style.backgroundImage = 'url('+ baseUrl +''+ img_svg +')'

  eventBoxCardsTotal.appendChild(makeDiv)
}


//? 기능 실행 ---------------
var i = 0
for(; i<eventBoxData.length; i+=1) {
  makeEventCardsFn(eventBoxData[i].img_description, eventBoxData[i].title, eventBoxData[i].contents, eventBoxData[i].img_svg)
}


}) // $.ajax