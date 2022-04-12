// booklistBox.js


//? 구현할 기능 -----------
// 좌우 버튼 누를때 각 방향으로 슬라이드 동작 (무한 슬라이드, 요소 강제이동형)
// 가운데 카드는 커지도록 하기


$.ajax({
  url:"../json/main_page/booklistBoxData.json",
  context: document.body

}).done(function(data){
  var booklistBoxData = data;
  

//! Javascript -------------------------------------
//* 변수 -----------------------
var cardsTotal = document.querySelector(".booklistBox_cards_total")
var baseUrl = "../img/booklist_page/"


//* 함수 -----------------------
//TODO : svg 미 적용시에는 png가 나타나도록 해보기
var makeBookListCardFn = function(img_description, title, img_png, img_svg){
  var makeDiv = document.createElement('div')
  makeDiv.innerHTML = '<div class="booklistBox_card" role="img" alt='+ img_description +' aria-label='+ img_description +' tabindex="0"><div class="booklistBox_card_img"></div><p class="booklistBox_card_title">'+ title +'</p></div>'

  var SelImgcon = makeDiv.querySelector('.booklistBox_card_img')
  SelImgcon.style.backgroundImage = 'url('+ baseUrl +''+ img_png +')'
  SelImgcon.style.backgroundImage = 'url('+ baseUrl +''+ img_svg +')'

  cardsTotal.appendChild(makeDiv)
}


//* 반복문으로 여러번 만들기 ---------------
var i = 0
for(; i<booklistBoxData.length ; i+=1 ) {
  makeBookListCardFn(booklistBoxData[i].img_description,booklistBoxData[i].title, booklistBoxData[i].img_png, booklistBoxData[i].img_svg)
}



//! Jquery -------------------------------------
(function($){
//? 변수 ------------
// 슬라이드 ---------------
var BookList_cardsTotal = $(".booklistBox_cards_total")
var BookList_cards = BookList_cardsTotal.children('div')

var nextBtn = $(".booklistBox_nextbtn")
var prevBtn = $(".booklistBox_prevbtn")

var permission = true;


// 카드 애니메이션 -----------------
var BookList = BookList_cardsTotal.find('.booklistBox_card')
var BookList_cardsImg = $(".booklistBox_card_img")
var BookList_cardsTitle = $(".booklistBox_card_title")

var i = 1
var timed = 0



//? 함수 -------------
// --------------------------------------
// 슬라이드 함수
// --------------------------------------
// 자세한 주석은 slideBox.js 참조
var nextBtnFn = function(){
  permission = false;

  BookList_cardsTotal.stop().animate({
    marginLeft : -17.5 + "rem"
  }, function(){
    BookList_cards.eq(0).appendTo(BookList_cardsTotal);
    BookList_cardsTotal.css ({ marginLeft: 0 })
    BookList_cards = BookList_cardsTotal.children('div')

  //* ------------------------------------------------
  //* (sol_1) 
  //* ------------------------------------------------
    //카드 애니메이션을 위한 부분
    // BookList = BookList_cardsTotal.find('.booklistBox_card')
    // BookList_cardsImg = BookList_cardsTotal.find('.booklistBox_card_img')
    // BookList_cardsTitle = BookList_cardsTotal.find('.booklistBox_card_title')

    permission = true;
  });

}

var prevBtnFn = function(){
  permission = false;

  BookList_cards.eq(-1).prependTo(BookList_cardsTotal);
  BookList_cardsTotal.css({ marginLeft: -17.5 + "rem" })
  BookList_cardsTotal.stop().animate({ marginLeft: 0 },
  function(){
    BookList_cards = BookList_cardsTotal.children('div')

    permission = true;
  });

}


// --------------------------------------
// 카드 애니메이션 함수
// --------------------------------------
//* 카드 애니메이션 함수 -----------------
var CardAniFn = function(n){
  BookList.eq(n).stop().animate({
    width: 16.25 + 'rem', height: 20.625 + 'rem',
    marginLeft: 0.625 + 'rem', marginRight: 0.625 + 'rem',
    paddingTop: 2.5 + 'rem'
  })
  BookList_cardsImg.eq(n).stop().animate({
    width: 14.75 + 'rem', height: 16.625 + 'rem',
  })
  BookList_cardsTitle.eq(n).stop().animate({
    width: 13.75 + 'rem', height: 2.5 + 'rem',
    fontSize: 1.75 + 'rem', fontWeight: 700
  })
}


//* 카드 애니메이션 초기화 함수 -----------------
var CardAniResetFn = function(p){
  BookList.eq(p).stop().animate({
    width: 14.375 + 'rem', height: 18.75 + 'rem',
    marginLeft: 1.5625 + 'rem', marginRight: 1.5625 + 'rem',
    paddingTop: 3.125 + 'rem'
  })
  BookList_cardsImg.eq(p).stop().animate({
    width: 11.875 + 'rem', height: 14.375 + 'rem',
  })
  BookList_cardsTitle.eq(p).stop().animate({
    width: 11.875 + 'rem', height: 1.375 + 'rem',
    fontSize: 1.375 + 'rem', fontWeight: 500
  })
}



//? 사전 실행 -------------
  CardAniFn(1)
  
  var k = 0
  for(; k<booklistBoxData.length ; k+=1){
    BookList_cards.eq(k).addClass(''+ k +'')
  }
  

//? 이벤트 -----------
nextBtn.on('click', function(){
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
  }
  console.log(i)
  CardAniFn(i)
  CardAniResetFn(i-1)

  // 단시간에 연속 클릭시 함수가 망가지는 문제 해결을 위해, 잠시 버튼을 비활성화했다가 다시 활성화한다.
  nextBtn.attr('disabled', true)
  setTimeout(function(){
    nextBtn.attr('disabled', false)
  }, 500);
  

  //* ------------------------------------------------
  //* (sol_1) 
  //* ------------------------------------------------
  // setTimeout(function(){
  //   CardAniFn(1)
  //   CardAniResetFn(0)
  // }, 500);

});

prevBtn.on('click', function(){

  prevBtnFn()
  // var i = 1
  i--
  if(i < 0){
    i = booklistBoxData.length-1
    CardAniResetFn(0)
  }
  console.log(i)
  CardAniFn(i)
  CardAniResetFn(i+1)

  prevBtn.attr('disabled', true)
  setTimeout(function(){
    prevBtn.attr('disabled', false)
  }, 500);

});


})(jQuery);


}); // $.ajax