// booklistBox_slide.js




//? 구현할 기능 -----------
// 좌우 버튼 누를때 각 방향으로 슬라이드 동작 (무한 슬라이드, 요소 강제이동형)



setTimeout(function() {


//? 변수 ------------
var BookList_cardsTotal = document.querySelector(".booklistBox_cards_total")
var BookList_cards = BookList_cardsTotal.children

var nextBtn = document.querySelector(".booklistBox_nextbtn")
var prevBtn = document.querySelector(".booklistBox_prevbtn")


//? 함수 ------------
//* 슬라이드 애니메이션 함수
var slideNextAniFn = function(elem) {
  var left = 0
  var id = setInterval(frame, 1) // draw every 1ms

  function frame() {
      left--  // update parameters
      elem.style.marginLeft = left * 0.153125 + 'rem' // 카드 하나의 너비가 15.3125rem
      if (left == -100)  // check finish condition
          clearInterval(id)
  }    
}

var slidePrevAniFn = function(elem) {
  var left = -100
  var id = setInterval(frame, 1) // draw every 1ms

  function frame() {
      left++  // update parameters
      elem.style.marginLeft = left * 0.153125 + 'rem' // 카드 하나의 너비가 15.3125rem
      if (left == 0)  // check finish condition
          clearInterval(id)
  }    
}



//* 슬라이드 버튼 함수
var nextBtnFn = function(){
  nextBtn.disabled = true;
  prevBtn.disabled = true;

  slideNextAniFn(BookList_cardsTotal); // 1: 왼쪽으로 한 칸 밀기
  setTimeout(function() {
    BookList_cardsTotal.append(BookList_cards[0]);
    // 2: 맨 왼쪽의 카드를 맨 뒤로 붙이기
    BookList_cardsTotal.style.marginLeft = 0;
    // 3: 1, 2로 인해 2칸 간 셈이므로, marginLeft를 0으로 하여 1칸 간 것으로 처리

    BookList_cards = BookList_cardsTotal.children;
    // 1~3으로 인해 카드 순서가 변경된 사실을 함수 외부의 변수에 전달

    nextBtn.disabled = false;
    prevBtn.disabled = false;
  }, 500);

}

var prevBtnFn = function(){
  nextBtn.disabled = true;
  prevBtn.disabled = true;

  BookList_cardsTotal.prepend(BookList_cards[BookList_cards.length - 1])
  // 1: 맨 뒤 카드를 맨 앞으로 붙이기
  //! vanila JS의 prepend는 IE 지원되지 않는다. (IE의 경우 기존 Jqurey 스크립트를 불러오는 것으로 일단 처리)
  BookList_cardsTotal.style.marginLeft = -15.3125 + 'rem';
  // 2: 애니메이션 적용 위해 왼쪽으로 한칸 밀어두기
  slidePrevAniFn(BookList_cardsTotal);
  // 3: 오른쪽으로 한칸 밀기

  setTimeout(function() {
    BookList_cards = BookList_cardsTotal.children;
    // 1~3으로 인해 카드 순서가 변경된 사실을 함수 외부의 변수에 전달
    nextBtn.disabled = false;
    prevBtn.disabled = false;
  }, 500);

}


//? 이벤트 -----------
nextBtn.addEventListener('click', function(){
  nextBtnFn()
})

prevBtn.addEventListener('click', function(){
  prevBtnFn()
})


}, 400) // setTimeout()