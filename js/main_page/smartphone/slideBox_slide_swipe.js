// slideBox_slide.js
//! slideBox.js의 슬라이드 기능을 순수 js로 변환 (코드에 대한 자세한 해설은 prev_ver/main_page/smartphone/slideBox.js 참조)



setTimeout(function() {
/* 이 스크립트가 정상 실행되는 전제는, slideBox_slidecardMake.js 스크립트가 먼저 실행이 완료되는 것이므로, 위 스크립트의 실행이 끝난 후에 이 스크립트(slideBox_slide.js)를 실행하기 위하여 setTimeout을 설정 */

//? -------------------------------------------
//? 변수 
//? -------------------------------------------
var slideBox = document.querySelector("#slideBox");
var slideBoxWrap = slideBox.querySelector(".slideBox_wrap");
var slideBoxInner = document.querySelector(".slideBox_inner");
var slideBoxCards = slideBoxInner.children
var nextBtn = slideBoxWrap.querySelector(".slideBox_nextbtn");
var prevBtn = slideBoxWrap.querySelector(".slideBox_prevbtn");
var swipeGuideArea = document.querySelector(".swipe_guide_area")
var permission = true;


// 스와이프 기능 관련
var startX, endX
var swipeGuideArea = document.querySelector(".swipe_guide_area");
var slideBoxWrap = slideBox.querySelector(".slideBox_wrap");




//? -------------------------------------------
//? 함수 
//? -------------------------------------------
//* 슬라이드 애니메이션 함수
var slideNextAniFn = function(elem) {
  var left = 0
  var id = setInterval(frame, 1) // draw every 1ms

  function frame() {
      left--  // update parameters
      elem.style.marginLeft = left + '%' // show frame
      if (left == -100)  // check finish condition
          clearInterval(id)
  }    
}

var slidePrevAniFn = function(elem) {
  var left = -100
  var id = setInterval(frame, 1) // draw every 1ms

  function frame() {
      left++  // update parameters
      elem.style.marginLeft = left + '%' // show frame
      if (left == 0)  // check finish condition
          clearInterval(id)
  }    
}


//* 슬라이드 버튼 함수
var nextBtnFn = function(){
  nextBtn.disabled = true;
  prevBtn.disabled = true;

  swipeGuideArea.classList.add('none'); // 스와이프 안내문구 지우기
  slideNextAniFn(slideBoxInner);
  setTimeout(function() {
    slideBoxInner.append(slideBoxCards[0]);
    slideBoxInner.style.marginLeft = 0;
    slideBoxCards = slideBoxInner.children;

    nextBtn.disabled = false;
    prevBtn.disabled = false;
  }, 800);
    
};

var prevBtnFn = function(){
  nextBtn.disabled = true;
  prevBtn.disabled = true;

  swipeGuideArea.classList.add('none'); // 스와이프 안내문구 지우기
  slideBoxInner.prepend(slideBoxCards[slideBoxCards.length - 1])
  //! vanila JS의 prepend는 IE 지원되지 않는다. (IE의 경우 기존 Jqurey 스크립트를 불러오는 것으로 일단 처리)
  slideBoxInner.style.marginLeft = -100 + '%';
  slidePrevAniFn(slideBoxInner);

  setTimeout(function() {
    slideBoxCards = slideBoxInner.children;
    nextBtn.disabled = false;
    prevBtn.disabled = false;
  }, 800);
}


//? -------------------------------------------
//? 이벤트
//? -------------------------------------------
// 버튼을 눌렀을 때의 이벤트 (슬라이드 기능)
nextBtn.addEventListener('click', function(){
  nextBtnFn()
})
prevBtn.addEventListener('click', function(){
  prevBtnFn()
})


// 스와이프 기능
slideBoxWrap.addEventListener('touchstart', function(e){
  startX = parseInt(e.changedTouches[0].clientX)
});

slideBoxWrap.addEventListener('touchend', function(e){
  endX = parseInt(e.changedTouches[0].clientX)
  var resultX = startX - endX;

  if(resultX > 100) {
    nextBtnFn()
  } else if ( resultX < -100 ) {
    prevBtnFn()
  }

});


}, 400) // setTimeout()

