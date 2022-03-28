// booklistBox.js


//? 구현할 기능 -----------
// 좌우 버튼 누를때 각 방향으로 슬라이드 동작 (무한 슬라이드, 요소 강제이동형)


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
var makeBookListCardFn = function(title, img_png, img_svg){
  var makeDiv = document.createElement('div')
  makeDiv.innerHTML = '<div class="booklistBox_card"><div class="booklistBox_card_img"></div><p class="booklistBox_card_title">'+ title +'</p></div>'

  var SelImgcon = makeDiv.querySelector('.booklistBox_card_img')
  SelImgcon.style.backgroundImage = 'url('+ baseUrl +''+ img_png +')'
  SelImgcon.style.backgroundImage = 'url('+ baseUrl +''+ img_svg +')'

  cardsTotal.appendChild(makeDiv)
}


//* 반복문으로 여러번 만들기 ---------------
var i = 0
for(; i<booklistBoxData.length ; i+=1 ) {
  makeBookListCardFn(booklistBoxData[i].title, booklistBoxData[i].img_png, booklistBoxData[i].img_svg)
}



//! Jquery -------------------------------------
(function($){
//? 변수 ------------
var BookList_cardsTotal = $(".booklistBox_cards_total")
var BookList_cards = BookList_cardsTotal.children('div')

var nextBtn = $(".booklistBox_nextbtn")
var prevBtn = $(".booklistBox_prevbtn")

var permission = true;


//? 함수 -------------
// 자세한 주석은 slideBox.js 참조
var nextBtnFn = function(){
  permission = false;

  BookList_cardsTotal.stop().animate({
    marginLeft : -15.3125 + "rem"
  }, function(){
    BookList_cards.eq(0).appendTo(BookList_cardsTotal);
    BookList_cardsTotal.css ({ marginLeft: 0 })
    BookList_cards = BookList_cardsTotal.children('div')

    permission = true;
  });

}

var prevBtnFn = function(){
  permission = false;

  BookList_cards.eq(-1).prependTo(BookList_cardsTotal);
  BookList_cardsTotal.css({ marginLeft: -15.3125 + "rem" })
  BookList_cardsTotal.stop().animate({ marginLeft: 0 },
  function(){
    BookList_cards = BookList_cardsTotal.children('div')

    permission = true;
  });

}


//? 이벤트 -----------
nextBtn.on('click', function(){
  nextBtnFn()

  nextBtn.attr('disabled', true)
  setTimeout(function(){
    nextBtn.attr('disabled', false)
  }, 500);
})

prevBtn.on('click', function(){
  prevBtnFn()

  prevBtn.attr('disabled', true)
  setTimeout(function(){
    prevBtn.attr('disabled', false)
  }, 500);
})


})(jQuery);


}); // $.ajax