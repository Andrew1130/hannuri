// slideBox_cardMake.js




//? 구현할 기능 -----------
// slideBox내 카드들을 js로 생성


(function() { 

var jsonData = $.getJSON('../json/main_page/slideBoxData.json');
jsonData.done(function(data){
  var slideBoxData = data;


//? 변수 ------------
var slideBoxInner = document.querySelector('.slideBox_inner')
var baseUrl = "../img/main_page/03_laptop/02_slidebox/"
// 데스크탑의 경우 디자인은 laptop과 거의 유사하므로, laptop의 이미지를 그대로 사용


//? 함수 ------------
var makeSlideCardsFn = function(img_description, title, contents, img_svg) {
  var makeDiv = document.createElement('div')
  makeDiv.innerHTML = '<div role="img" tabindex="0" class="cards_img" alt='+ img_description +' aria-label='+ img_description +'><div class="slideBox_total_contents"><h3 class="slideBox_title" tabindex="0">'+ title +'</h3><p class="slideBox_contents" tabindex="0">'+ contents +'</p><button type="button" class="slideBox_btn">바로가기</button></div></div>'

  var SelImgcon = makeDiv.querySelector('.cards_img')

  SelImgcon.style.backgroundImage = 'url('+ baseUrl +''+ img_svg +')'

  slideBoxInner.appendChild(makeDiv)
}


//? 기능 실행 ------------
var i = 0;
for(; i<slideBoxData.length ; i+=1) {
  makeSlideCardsFn(slideBoxData[i].img_description, slideBoxData[i].title, slideBoxData[i].contents, slideBoxData[i].img_svg)
}


}); // jsonData

}());