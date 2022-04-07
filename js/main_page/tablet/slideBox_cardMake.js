// slideBox_cardMake.js



//? 구현할 기능 -----------
// js로 슬라이드 카드 내용 생성


(function() { 


var jsonData = $.getJSON('../json/main_page/slideBoxData.json');
jsonData.done(function(data){
  var slideBoxData = data;


//? 변수 ------------
var slideBoxInner = document.querySelector('.slideBox_inner')
var baseUrl = "../img/main_page/02_tablet/02_slidebox/"


//? 함수 ------------
var makeSlideCardsFn = function(img_description, title, contents, img_png, img_svg) {
  var makeDiv = document.createElement('div')
  makeDiv.innerHTML = '<div class="cards_img" role="img" alt='+ img_description +' aria-label='+ img_description +' tabindex="0"><div class="slideBox_total_contents"><h3 class="slideBox_title" tabindex="0">'+ title +'</h3><p class="slideBox_contents" tabindex="0">'+ contents +'</p><button type="button" class="slideBox_btn">바로가기</button></div></div>'

  var SelImgcon = makeDiv.querySelector('.cards_img')

  SelImgcon.style.backgroundImage = 'url('+ baseUrl +''+ img_png +')'
  SelImgcon.style.backgroundImage = 'url('+ baseUrl +''+ img_svg +')'

  slideBoxInner.appendChild(makeDiv)
}


//? 기능 실행 -----------
var i = 0;
for(; i<slideBoxData.length ; i+=1) {
  makeSlideCardsFn(slideBoxData[i].img_description, slideBoxData[i].title, slideBoxData[i].contents, slideBoxData[i].img_png, slideBoxData[i].img_svg)
}


}); // jsonData


}());