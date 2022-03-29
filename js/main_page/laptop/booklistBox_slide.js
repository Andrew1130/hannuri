// booklistBox_slide.js




//? 구현할 기능 -----------
// 좌우 버튼 누를때 각 방향으로 슬라이드 동작 (무한 슬라이드, 요소 강제이동형)
// 가운데 카드는 커지도록 하기



$.ajax({
  url:"../json/main_page/booklistBoxData.json",
  context: document.body

}).done(function(data){
  var booklistBoxData = data;


setTimeout(function() {


//? 변수 ------------
// 슬라이드 ---------------
var BookList_cardsTotal = document.querySelector(".booklistBox_cards_total")
var BookList_cards = BookList_cardsTotal.children

var nextBtn = document.querySelector(".booklistBox_nextbtn")
var prevBtn = document.querySelector(".booklistBox_prevbtn")



// 카드 애니메이션 -----------------
var BookList = BookList_cardsTotal.querySelectorAll('.booklistBox_card')
var BookList_cardsImg = BookList_cardsTotal.querySelectorAll(".booklistBox_card_img")
var BookList_cardsTitle = BookList_cardsTotal.querySelectorAll(".booklistBox_card_title")

var i = 1



//? 함수 ------------
// --------------------------------------
// 슬라이드 애니메이션 함수
// --------------------------------------
var slideNextAniFn = function(elem) {
  var left = 0
  var id = setInterval(frame, 1) // draw every 1ms

  function frame() {
      left--  // update parameters
      elem.style.marginLeft = left * 0.175 + 'rem' // 카드 하나의 너비가 17.5rem
      if (left == -100)  // check finish condition
          clearInterval(id)
  }
  
}

var slidePrevAniFn = function(elem) {
  var left = -100
  var id = setInterval(frame, 1) // draw every 1ms

  function frame() {
      left++  // update parameters
      elem.style.marginLeft = left * 0.175 + 'rem' // 카드 하나의 너비가 17.5rem
      if (left == 0)  // check finish condition
          clearInterval(id)
  }    
}


// --------------------------------------
// 슬라이드 버튼 함수
// --------------------------------------
// 자세한 주석은 slideBox.js 참조
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

  //* ------------------------------------------------
  //* (sol_1) 
  //* ------------------------------------------------
    //카드 애니메이션을 위한 부분
    // BookList = BookList_cardsTotal.find('.booklistBox_card')
    // BookList_cardsImg = BookList_cardsTotal.find('.booklistBox_card_img')
    // BookList_cardsTitle = BookList_cardsTotal.find('.booklistBox_card_title')

    nextBtn.disabled = false;
    prevBtn.disabled = false;
  }, 800);
}

var prevBtnFn = function(){
  nextBtn.disabled = true;
  prevBtn.disabled = true;

  BookList_cardsTotal.prepend(BookList_cards[BookList_cards.length - 1])
  // 1: 맨 뒤 카드를 맨 앞으로 붙이기
  //! vanila JS의 prepend는 IE 지원되지 않는다. (IE의 경우 기존 Jqurey 스크립트를 불러오는 것으로 일단 처리)
  BookList_cardsTotal.style.marginLeft = -17.5 + 'rem';
  // 2: 애니메이션 적용 위해 왼쪽으로 한칸 밀어두기
  slidePrevAniFn(BookList_cardsTotal);
  // 3: 오른쪽으로 한칸 밀기

  setTimeout(function() {
    BookList_cards = BookList_cardsTotal.children;
    // 1~3으로 인해 카드 순서가 변경된 사실을 함수 외부의 변수에 전달
    nextBtn.disabled = false;
    prevBtn.disabled = false;
  }, 800);
}


// --------------------------------------
// 카드 애니메이션 함수
// --------------------------------------
//* 카드 애니메이션 함수 -----------------
var CardAniFn = function(n){
  BookList[n].classList.add('on')
  BookList_cardsImg[n].classList.add('on')
  BookList_cardsTitle[n].classList.add('on')
}

//* 카드 애니메이션 초기화 함수 -----------------
var CardAniResetFn = function(p){
  BookList[p].classList.remove('on')
  BookList_cardsImg[p].classList.remove('on')
  BookList_cardsTitle[p].classList.remove('on')
}



//? 사전 기능 실행 ------------
CardAniFn(1)
  
var k = 0
for(; k<booklistBoxData.length ; k+=1){
  BookList_cards[k].classList.add(''+ k +'')
}



//? 이벤트 -----------
nextBtn.addEventListener('click', function(){
  nextBtnFn()


  //! 카드 애니메이션은 최초의 div 순서로 인식한다. 
  /*
  1. 최초의 div 순서로 인식되는 이유
  버튼 함수로 인해 있는 BookList_cards = BookList_cardsTotal.children('div')에 대해 갱신이 일어나더라도,  
  애니메이션 함수에서 쓰이는 BookList, BookList_cardsImg, BookList_cardsTitle 이 세 변수는 최초의 div 순서를 기준으로 하여 작성되었기 때문에 eq 또한 최초 div 순서 기준으로 인식되는 것.

  2. 해결책(sol_1) 및 해결책의 문제점
  따라서 BookList, BookList_cardsImg, BookList_cardsTitle 이 세 변수가 갱신되도록 하려면 이 각 변수에 대해서도 버튼 함수 쪽에서 갱신을 해 주어야 한다. 단 그렇게 하면 버튼 함수들의 구조상 애니메이션이 완결되고 나서야 카드 애니메이션이 작동 가능하므로 조금 어색하다.

  3. 새로운 해결책(sol_2)
  그래서 여기서는 조금 직관적이지 못하더라도, 카드 애니메이션은 버튼을 눌렀을 때 div 순서들이 변하는 것과는 무관하게 최초의 div 순서 기준(0-1-2-3-4-5-6 ...)으로 작동하도록 처리하려고 한다.
  */


  // ------------------------------------------------
  // (sol_2) 
  // ------------------------------------------------
  i++
  if(i >= booklistBoxData.length){
    i=0
    CardAniResetFn(booklistBoxData.length-1)
  }

  CardAniFn(i)
  // CardAniResetFn(1)
  if( i !== 0 ){
    CardAniResetFn(i-1)
  }
  
  //* ---------------------------------------------
  //* (sol_1) 
  //* ------------------------------------------------
  // setTimeout(function(){
  //   CardAniFn(1)
  //   CardAniResetFn(0)
  // }, 500);

});

prevBtn.addEventListener('click', function(){

  prevBtnFn()

  i--
  if(i < 0){
    i = booklistBoxData.length-1
    CardAniResetFn(0)
  }
  CardAniFn(i)

  if( i !== booklistBoxData.length-1 ){
    CardAniResetFn(i+1)
  }

});


}, 400) // setTimeout()


}); // $.ajax