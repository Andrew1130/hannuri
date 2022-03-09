// booklist.js


//? 구현할 기능 -----------
// 인기 도서
//* 버튼을 누르면 슬라이드가 동작하도록 하기(무한 슬라이드, 요소 강제이동형)

// 도서 목록
//* 내비게이션 내부 버튼을 누르면, 버튼 내용에 해당하는 내용이 출력되도록 처리

// 인디케이터
//* 데이터의 양이 1페이지(=카드 12개)가 넘어갈 경우, 인디케이터를 작동시켜 다음 페이지를 볼 수 있도록 처리
//* 인디케이터가 1페이지당 1개씩 생성되도록 처리


var jsonData_PopularBook = $.getJSON('../json/main_page/booklistBoxData.json');
// 도서목록 페이지 내 인기 도서의 데이터는 메인페이지의 인기 도서와 동일
jsonData_PopularBook.done(function(data_PopularBook){
  var jsonData_BookList = $.getJSON('../json/sub_page/booklistData.json');
  jsonData_BookList.done(function(data_BookList){
    var PopularBookData = data_PopularBook
    var BookListData = data_BookList


//! Javascript -------------------------------------
//* 변수 -----------------------
// 슬라이드 (인기도서)
var slideInner = document.querySelector(".slideBox_slide_inner")
var baseUrl = "../img/booklist_page/"


// 탭메뉴 (도서목록)
var menuCardsWrap = document.querySelector(".menu_cards_wrap")
var menuCardsWrapUl = menuCardsWrap.querySelector('ul')


//* 함수 -----------------------
// 슬라이드 (인기도서)
var makeSlideCardsFn = function(title, img_png, img_svg){
  var makeDiv = document.createElement('div')
  makeDiv.innerHTML = '<div class="card_image"></div><p class="card_title">'+ title +'</p>'

  var SelImgcon = makeDiv.querySelector('.card_image')
  SelImgcon.style.backgroundImage = 'url('+ baseUrl +''+ img_png +')'
  SelImgcon.style.backgroundImage = 'url('+ baseUrl +''+ img_svg +')'

  slideInner.appendChild(makeDiv)
}


// 탭메뉴 (도서목록)
var makeTabMenuCardsFn = function(id, category, title, author, company, price, img_png, img_svg){
  var makeLi = document.createElement('li')
  makeLi.innerHTML = '<li><span class="blind">'+ id +'</span><span class="blind">'+ category +'</span><div class="card_image"></div><h3 class="card_title">'+ title +'</h3><p class="card_info"><span>'+ author +'</span> 지음, <span>'+ company +'</span> 출판, <br /><span>'+ price +'</span></p></li>'

  var SelImgcon = makeLi.querySelector('.card_image')
  SelImgcon.style.backgroundImage = 'url('+ baseUrl +''+ img_png +')'
  SelImgcon.style.backgroundImage = 'url('+ baseUrl +''+ img_svg +')'

  menuCardsWrapUl.appendChild(makeLi)
}



//* 반복문으로 여러번 만들기 ------------------
// 슬라이드 (인기도서)
var i = 0;
for(; i<PopularBookData.length ; i+=1) {
  makeSlideCardsFn(PopularBookData[i].title, PopularBookData[i].img_png, PopularBookData[i].img_svg)
}


// 탭메뉴 (도서목록)
//* 첫 화면에서는 새로나온책 카테고리만 나오도록 설정
var j = 0;
for(; j<BookListData.length ; j+=1) {
  if(BookListData[j].category === "새로나온책"){
  makeTabMenuCardsFn(BookListData[j].id, BookListData[j].category, BookListData[j].title, BookListData[j].author, BookListData[j].company, BookListData[j].price, BookListData[j].img_png, BookListData[j].img_svg)
  }
}


//! Jquery -------------------------------------
(function($){
//? 변수 ------------
// 슬라이드 (인기도서)
var slideInner = $('.slideBox_slide_inner')
var slideMakeDiv = slideInner.children('div')
var nextBtn = $('.slideBox_nextBtn')
var prevBtn = $('.slideBox_prevBtn')

var permission = true;


// 탭메뉴 (도서목록)
var menuCardsWrap = $(".menu_cards_wrap")
var menuCardsWrapUl = menuCardsWrap.children('ul')
var navArea = $('.nav_area')
var navContents = navArea.find('li')


//? 함수 ---------------
// 슬라이드 (인기도서)
var nextBtnFn = function(){
  permission = false;

  slideInner.animate({ marginLeft: -15.25 + 'rem'}, 
  function(){
    slideMakeDiv.eq(0).appendTo(slideInner)
    slideInner.css({ marginLeft: 0 })

    slideMakeDiv = slideInner.children('div')
  })

  permission = true;
}

var prevBtnFn = function(){
  permission = false;

  slideMakeDiv.eq(-1).prependTo(slideInner)
  slideInner.css({ marginLeft: -15.25 + 'rem' })
  slideInner.animate({ marginLeft: 0 },
  function(){
    slideMakeDiv = slideInner.children('div')
  })

  permission = true;
}


// 탭메뉴 (도서목록)
var makeNewbookMenuFn = function(){
  menuCardsWrapUl.empty()

  var j = 0;
  for(; j<BookListData.length ; j+=1) {
  if(BookListData[j].category === "새로나온책"){
  makeTabMenuCardsFn(BookListData[j].id, BookListData[j].category, BookListData[j].title, BookListData[j].author, BookListData[j].company, BookListData[j].price, BookListData[j].img_png, BookListData[j].img_svg)
    }
  }
}

var makeSteadybookMenuFn = function(){
  menuCardsWrapUl.empty()

  var j = 0;
  for(; j<BookListData.length ; j+=1) {
  if(BookListData[j].category === "스테디셀러"){
  makeTabMenuCardsFn(BookListData[j].id, BookListData[j].category, BookListData[j].title, BookListData[j].author, BookListData[j].company, BookListData[j].price, BookListData[j].img_png, BookListData[j].img_svg)
    }
  }
}

var makeDomesticbookMenuFn = function(){
  menuCardsWrapUl.empty()
  
  var j = 0;
  for(; j<BookListData.length ; j+=1) {
  if(BookListData[j].category === "국내도서"){
  makeTabMenuCardsFn(BookListData[j].id, BookListData[j].category, BookListData[j].title, BookListData[j].author, BookListData[j].company, BookListData[j].price, BookListData[j].img_png, BookListData[j].img_svg)
    }
  }
}

var makeOverseebookMenuFn = function(){
  menuCardsWrapUl.empty()
  
  var j = 0;
  for(; j<BookListData.length ; j+=1) {
  if(BookListData[j].category === "해외도서"){
  makeTabMenuCardsFn(BookListData[j].id, BookListData[j].category, BookListData[j].title, BookListData[j].author, BookListData[j].company, BookListData[j].price, BookListData[j].img_png, BookListData[j].img_svg)
    }
  }
}

var makeMemberbookMenuFn = function(){
  menuCardsWrapUl.empty()
  
  var j = 0;
  for(; j<BookListData.length ; j+=1) {
  if(BookListData[j].category === "회원출판도서"){
  makeTabMenuCardsFn(BookListData[j].id, BookListData[j].category, BookListData[j].title, BookListData[j].author, BookListData[j].company, BookListData[j].price, BookListData[j].img_png, BookListData[j].img_svg)
    }
  }
}


//? 이벤트 -----------
// 슬라이드 (인기도서)
nextBtn.on('click', function(){
  nextBtnFn()
})

prevBtn.on('click', function(){
  prevBtnFn()
})


// 탭메뉴 (도서목록)
navContents.on('click', function(e){
  e.preventDefault()
  $(this).addClass('on')
  $(this).siblings().removeClass('on')

  console.log($(this).index())

  if($(this).index() === 0){
    makeNewbookMenuFn()
  } else if($(this).index() === 1){
    makeSteadybookMenuFn()
  } else if($(this).index() === 2){
    makeDomesticbookMenuFn()
  } else if($(this).index() === 3){
    makeOverseebookMenuFn()
  } else if($(this).index() === 4){
    makeMemberbookMenuFn()    
  }

});


})(jQuery);

}); // $.getJSON (jsonData_BookList)
}); // $.getJSON (jsonData_PopularBook)