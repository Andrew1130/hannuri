// slideBox_slidecardMake.js
//! slideBox.js의 슬라이드 기능을 순수 js로 변환 (코드에 대한 자세한 해설은 prev_ver/main_page/smartphone/slideBox.js 참조)
//! 기존에는 슬라이드 카드 생성, 슬라이드 동작, 스와이프가 모두 1개의 js에 합쳐져 있었으나, 업데이트 하면서 이들을 각각 분리



//? -------------------------------------------
//? 구현할 기능 
//? -------------------------------------------
// json과 js를 이용하여 슬라이드 내부 카드를 자동으로 생성


var jsonData = $.getJSON('../json/main_page/slideBoxData.json');
jsonData.done(function(data){
  var slideBoxData = data;



//? -------------------------------------------
//? 변수 
//? -------------------------------------------
// 슬라이드 카드 생성 관련
var slideBoxInner = document.querySelector('.slideBox_inner')
var baseUrl = "../img/main_page/01_smartphone/02_slidebox/"

// 스와이프 기능 관련
var startX, endX
var swipeGuideArea = document.querySelector(".swipe_guide_area")


//? -------------------------------------------
//? 함수 
//? -------------------------------------------
// 슬라이드 카드 생성 관련
var makeSlideCardsFn = function(title, contents, img_png, img_svg) {
  var makeDiv = document.createElement('div')
  makeDiv.innerHTML = '<div class="cards_img"><div class="slideBox_total_contents"><h3 class="slideBox_title">'+ title +'</h3><p class="slideBox_contents">'+ contents +'</p><div class="slideBox_btn" tabindex="0"><button type="button"><p>바로가기</p></button></div></div></div>'

  var SelImgcon = makeDiv.querySelector('.cards_img')

  SelImgcon.style.backgroundImage = 'url('+ baseUrl +''+ img_png +')'
  SelImgcon.style.backgroundImage = 'url('+ baseUrl +''+ img_svg +')'

  slideBoxInner.appendChild(makeDiv)
}



//? -------------------------------------------
//? 사전 기능 실행 
//? -------------------------------------------
// 슬라이드 카드 생성 관련
var i = 0;
for(; i<slideBoxData.length ; i+=1) {
  makeSlideCardsFn(slideBoxData[i].title, slideBoxData[i].contents, slideBoxData[i].img_png, slideBoxData[i].img_svg)
}


// 스와이프 기능 안내
setTimeout(function(){
  swipeGuideArea.classList.add('fadeIn');
  }, 2000); // setTimeout()



//? -------------------------------------------
//? 이벤트
//? -------------------------------------------

// 스와이프 기능
slideBoxWrap.addEventListener('touchstart', function(e){
  startX = parseInt(e.originalEvent.changedTouches[0].clientX)
});

slideBoxWrap.addEventListener('touchend', function(e){
  endX = parseInt(e.originalEvent.changedTouches[0].clientX)
  var resultX = startX - endX;

  if(resultX > 100) {
    nextBtnFn()
  } else if ( resultX < -100 ) {
    prevBtnFn()
  }

});

*/


}); // jsonData