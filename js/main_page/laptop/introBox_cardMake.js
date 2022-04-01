// introBox_cardMake.js




//? 구현할 기능 -----------
// introBox 내 카드를 js로 생성



(function() { 

var jsonData = $.getJSON('../json/main_page/introBoxData.json');
jsonData.done(function(data){
  var introBoxData = data;


//? 변수 ------------
var introBoxCardWrap = document.querySelector('.introBox_card_wrap')
var baseUrl = "../img/main_page/03_laptop/03_introbox/"


//? 함수 ------------
//TODO : svg 미 적용시에는 png가 나타나도록 해보기
var makeIntroCardFn = function(title, contents, img_png, img_svg) {
  var makeDiv = document.createElement('div')
  makeDiv.innerHTML = '<div class="introBox_contents"><h3 class="introBox_card_title">'+ title +'</h3><p class="introBox_card_contents">'+ contents +'</p><button type="button" class="introBox_card_btn">자세히보기</button></div>'

  var SelImgcon = makeDiv.querySelector('.introBox_contents')
  SelImgcon.style.backgroundImage = 'url('+ baseUrl +''+ img_png +')'
  SelImgcon.style.backgroundImage = 'url('+ baseUrl +''+ img_svg +')'

  introBoxCardWrap.appendChild(makeDiv)
}


//? 기능 실행 ------------
var i = 0;
for(; i<introBoxData.length ; i+=1) {
  makeIntroCardFn(introBoxData[i].title, introBoxData[i].contents, introBoxData[i].img_png, introBoxData[i].img_svg)
}


}); // jsonData

}());
