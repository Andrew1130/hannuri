// slideBox_slide.js
//! slideBox.js의 슬라이드 기능을 순수 js로 변환 (코드에 대한 자세한 해설은 prev_ver/main_page/smartphone/slideBox.js 참조)



setTimeout(function() {
/* 이 스크립트가 정상 실행되는 전제는, slideBox_slidecardMake.js 스크립트가 먼저 실행이 완료되는 것이므로, 위 스크립트의 실행이 끝난 후에 이 스크립트(slideBox_slide.js)를 실행하기 위하여 setTimeout을 설정 */
// 전역변수의 사용을 억제하는 효과도 있다.

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
  slideNextAniFn(slideBoxInner); // 1: 왼쪽으로 한 칸 밀기 (marginLeft = -100)
  setTimeout(function() {
    slideBoxInner.append(slideBoxCards[0]); // 2: 맨 왼쪽의 카드를 맨 뒤로 붙이기
    slideBoxInner.style.marginLeft = 0; 
    // 3: 1,2로 인해 왼쪽으로 2칸 간 셈이므로, marginLeft = 0;으로 하여 1칸 간 것으로 만들기
    slideBoxCards = slideBoxInner.children;
    // 1~3으로 인해 카드들의 순서가 변경되었으므로, 이 사실을 함수 외부의 변수에 전달

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
    nextBtn.click();
  } else if ( resultX < -100 ) {
    prevBtn.click();
  }

});


}, 400) // setTimeout()


