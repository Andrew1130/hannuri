// slideBox_slide.js



setTimeout(function() {

//? 구현할 기능 -----------
// 1. 슬라이드박스 양 옆 버튼을 누르면, 슬라이드 기능이 동작하도록 처리
// 2. 무한 슬라이드(요소 강제이동형) 적용


//? 변수 ------------
var slideBoxInner = document.querySelector(".slideBox_inner")
var slideBoxCards = slideBoxInner.children
var nextBtn = document.querySelector(".slideBox_nextbtn")
var prevBtn = document.querySelector(".slideBox_prevbtn")


//? 함수 ------------
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

var nextBtnFn = function(){
  nextBtn.disabled = true;
  prevBtn.disabled = true;

  slideNextAniFn(slideBoxInner) // 1: 왼쪽으로 한 칸 밀기
  setTimeout(function(){
    slideBoxInner.append(slideBoxCards[0]); 
    // 2: 맨 앞 카드 맨 뒤로 붙이기
    slideBoxInner.style.marginLeft = 0;
    // 1, 2로 인해 2칸 간 셈이므로, marginLeft = 0 처리해서 1칸 간 것으로 처리
    slideBoxCards = slideBoxInner.children
    // 함수 실행으로 인해 slideBoxCards의 순서가 변경되었으므로, 이 사실을 함수 외부의 변수인 slideBoxCards에 전달

    nextBtn.disabled = false;
    prevBtn.disabled = false;
  },800)
}

var prevBtnFn = function(){
  nextBtn.disabled = true;
  prevBtn.disabled = true;

  slideBoxInner.prepend(slideBoxCards[slideBoxCards.length-1]);
  // 1: 맨 뒤 카드 맨 앞으로 붙이기
  //! vanila JS의 prepend는 IE 지원되지 않는다. (IE의 경우 기존 Jqurey 스크립트를 불러오는 것으로 일단 처리)
  slideBoxInner.style.marginLeft = "-100%";
  // 애니메이션 처리를 위해 왼쪽으로 한 칸 밀어두기

  slidePrevAniFn(slideBoxInner);
  // 오른쪽으로 한 칸 미는 애니메이션 작동

  setTimeout(function(){
    slideBoxCards = slideBoxInner.children
    nextBtn.disabled = false;
    prevBtn.disabled = false;
  },800)
}


//? 이벤트 -----------
nextBtn.addEventListener('click', function(){
  nextBtnFn()
})

prevBtn.addEventListener('click', function(){
  prevBtnFn()
})


}, 400) // setTimeout()