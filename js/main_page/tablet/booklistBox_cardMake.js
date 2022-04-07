// booklistBox_cardMake.js




//? 구현할 기능 -----------
// js로 booklistBox 내부에 카드 생성


$.ajax({
  url:"../json/main_page/booklistBoxData.json",
  context: document.body

}).done(function(data){
  var booklistBoxData = data;


//? 변수 ------------
var cardsTotal = document.querySelector(".booklistBox_cards_total")
var baseUrl = "../img/booklist_page/"


//? 함수 ------------
//TODO : svg 미 적용시에는 png가 나타나도록 해보기
var makeBookListCardFn = function(img_description, title, img_png, img_svg){
  var makeDiv = document.createElement('div')
  makeDiv.innerHTML = '<div class="booklistBox_card" role="img" alt='+ img_description +' aria-label='+ img_description +' tabindex="0"><div class="booklistBox_card_img"></div><p class="booklistBox_card_title">'+ title +'</p></div>'

  var SelImgcon = makeDiv.querySelector('.booklistBox_card_img')
  SelImgcon.style.backgroundImage = 'url('+ baseUrl +''+ img_png +')'
  SelImgcon.style.backgroundImage = 'url('+ baseUrl +''+ img_svg +')'

  cardsTotal.appendChild(makeDiv)
}


//? 기능 실행 ------------
var i = 0
for(; i<booklistBoxData.length ; i+=1 ) {
  makeBookListCardFn(booklistBoxData[i].img_description, booklistBoxData[i].title, booklistBoxData[i].img_png, booklistBoxData[i].img_svg)
}


}); // $.ajax