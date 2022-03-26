// slideBox_cardMake.js



//? 구현할 기능 -----------
// js로 슬라이드 카드 내용 생성


var jsonData = $.getJSON('../json/main_page/slideBoxData.json');
jsonData.done(function(data){
  var slideBoxData = data;


//? 변수 ------------
var slideBoxInner = document.querySelector('.slideBox_inner')
var baseUrl = "../img/main_page/02_tablet/02_slidebox/"


//? 함수 ------------
var makeSlideCardsFn = function(title, contents, img_png, img_svg) {
  var makeDiv = document.createElement('div')
  makeDiv.innerHTML = '<div class="cards_img"><div class="slideBox_total_contents"><h3 class="slideBox_title">'+ title +'</h3><p class="slideBox_contents">'+ contents +'</p><div class="slideBox_btn" tabindex="0"><button type="button"><p>바로가기</p></button></div></div></div>'

  var SelImgcon = makeDiv.querySelector('.cards_img')

  SelImgcon.style.backgroundImage = 'url('+ baseUrl +''+ img_png +')'
  SelImgcon.style.backgroundImage = 'url('+ baseUrl +''+ img_svg +')'

  slideBoxInner.appendChild(makeDiv)
}


//? 기능 실행 -----------
var i = 0;
for(; i<slideBoxData.length ; i+=1) {
  makeSlideCardsFn(slideBoxData[i].title, slideBoxData[i].contents, slideBoxData[i].img_png, slideBoxData[i].img_svg)
}


}); // jsonData