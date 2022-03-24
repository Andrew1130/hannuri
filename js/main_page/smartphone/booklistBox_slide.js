// booklistBox_slide.js


//? -----------------------------------
//? 구현할 기능 
//? -----------------------------------
// 좌우 버튼 누를때 각 방향으로 슬라이드 동작 (무한 슬라이드, 요소 강제이동형)



setTimeout(function() {


//? -----------------------------------
//? 변수 
//? -----------------------------------
var BookList_cardsTotal = document.querySelector(".booklistBox_cards_total")
var BookList_cards = BookList_cardsTotal.children

var nextBtn = document.querySelector(".booklistBox_nextbtn")
var prevBtn = document.querySelector(".booklistBox_prevbtn")



//? -----------------------------------
//? 함수 
//? -----------------------------------
//* 슬라이드 애니메이션 함수
var slideNextAniFn = function(elem) {
  var left = 0
  var id = setInterval(frame, 1) // draw every 10ms

  function frame() {
      left--  // update parameters
      elem.style.marginLeft = left + '%' // show frame
      if (left == -100)  // check finish condition
          clearInterval(id)
  }    
}

var slidePrevAniFn = function(elem) {
  var left = -100
  var id = setInterval(frame, 1) // draw every 10ms

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

  slideNextAniFn(BookList_cardsTotal);
  setTimeout(function() {
    BookList_cardsTotal.append(BookList_cards[0]);
    BookList_cardsTotal.style.marginLeft = 0;

    BookList_cards = BookList_cardsTotal.children;

    nextBtn.disabled = false;
    prevBtn.disabled = false;
  }, 500);
    
};

var prevBtnFn = function(){
  nextBtn.disabled = true;
  prevBtn.disabled = true;

  BookList_cardsTotal.prepend(BookList_cards[BookList_cards.length - 1])
  //! vanila JS의 prepend는 IE 지원되지 않는다. (IE의 경우 기존 Jqurey 스크립트를 불러오는 것으로 일단 처리)
  BookList_cardsTotal.style.marginLeft = -100 + '%';
  slidePrevAniFn(BookList_cardsTotal);

  setTimeout(function() {
    BookList_cards = BookList_cardsTotal.children;

    nextBtn.disabled = false;
    prevBtn.disabled = false;
  }, 500);

}


//? -----------------------------------
//? 이벤트
//? -----------------------------------
nextBtn.addEventListener('click', function(){
  nextBtnFn()
})

prevBtn.addEventListener('click', function(){
  prevBtnFn()
})


}, 400) // setTimeout()