// booklist.js


//? 구현할 기능 -----------
// 인기 도서
//* 버튼을 누르면 슬라이드가 동작하도록 하기(무한 슬라이드, 요소 강제이동형)

// 도서 목록
//* 내비게이션 내부 버튼을 누르면, 버튼 내용에 해당하는 내용이 출력되도록 처리

// 인디케이터
//* 데이터의 양이 1페이지(=카드 12개)가 넘어갈 경우, 인디케이터를 작동시켜 다음 페이지를 볼 수 있도록 처리
//* 인디케이터가 1페이지당 1개씩 생성되도록 처리


(function() { 


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


// 인디케이터
var menuIndicatorWrap = document.querySelector(".menu_indicator_wrap")
var IndicatorUl = menuIndicatorWrap.querySelector('ul')



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


// 인디케이터
var makeIndicatorWrapFn = function(n){
  k=0
  for(; k<n; k+=1){
  var makeLi = document.createElement('li')
  makeLi.innerHTML = '<a href="#"></a>'
  IndicatorUl.appendChild(makeLi)
  }
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

// makeIndicatorWrapFn(1);


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


// 인디케이터
var menuCardsWrapLi = menuCardsWrapUl.children('li')
var menuIndicatorWrap = $(".menu_indicator_wrap")
var IndicatorUl = menuIndicatorWrap.children('ul')
var IndicatorLi = IndicatorUl.children('li')
var IndicatorA = IndicatorLi.children('a')




//? 함수 ---------------
// -------------------------------------------
// 슬라이드 (인기도서)
// -------------------------------------------
var nextBtnFn = function(){
  nextBtn.attr('disabled', true)
  console.log(nextBtn)

  slideInner.stop().animate({ marginLeft: -15.25 + 'rem'}, 
  function(){
    slideMakeDiv.eq(0).appendTo(slideInner)
    slideInner.css({ marginLeft: 0 })

    slideMakeDiv = slideInner.children('div')
  })

  nextBtn.attr('disabled', false)
}

var prevBtnFn = function(){
  prevBtn.attr('disabled', true)
  console.log(prevBtn)

  slideMakeDiv.eq(-1).prependTo(slideInner)
  slideInner.css({ marginLeft: -15.25 + 'rem' })
  slideInner.stop().animate({ marginLeft: 0 },
  function(){
    slideMakeDiv = slideInner.children('div')
    prevBtn.attr('disabled', false)
  })
}


// -------------------------------------------
// 탭메뉴 (도서목록)
// -------------------------------------------
var makeNewbookMenuFn = function(){
  menuCardsWrapUl.empty()
  menuCardsWrapUl.css({ transform: "translateY(0px)" })

  var j = 0;
  for(; j<BookListData.length ; j+=1) {
  if(BookListData[j].category === "새로나온책"){
  makeTabMenuCardsFn(BookListData[j].id, BookListData[j].category, BookListData[j].title, BookListData[j].author, BookListData[j].company, BookListData[j].price, BookListData[j].img_png, BookListData[j].img_svg)
    }
  }

  menuCardsWrapLi = menuCardsWrapUl.children('li')
  // 클릭에 의해 도서목록 내 카드 li가 변했다는 것을 전달해주어야 한다.(전달해주지 않으면 위 값에는 최초로 입력된 값만 저장되어 있게 된다.)
  // 아래의 인디케이터 함수 실행을 위해 필요

  IndiMakeFn()
  IndicatorLi.eq(0).addClass('on')
}

var makeSteadybookMenuFn = function(){
  menuCardsWrapUl.empty()
  menuCardsWrapUl.css({ transform: "translateY(0px)" })

  var j = 0;
  for(; j<BookListData.length ; j+=1) {
  if(BookListData[j].category === "스테디셀러"){
  makeTabMenuCardsFn(BookListData[j].id, BookListData[j].category, BookListData[j].title, BookListData[j].author, BookListData[j].company, BookListData[j].price, BookListData[j].img_png, BookListData[j].img_svg)
    }
  }

  menuCardsWrapLi = menuCardsWrapUl.children('li')
  IndiMakeFn()
}

var makeDomesticbookMenuFn = function(){
  menuCardsWrapUl.empty()
  menuCardsWrapUl.css({ transform: "translateY(0px)" })
  
  var j = 0;
  for(; j<BookListData.length ; j+=1) {
  if(BookListData[j].category === "국내도서"){
  makeTabMenuCardsFn(BookListData[j].id, BookListData[j].category, BookListData[j].title, BookListData[j].author, BookListData[j].company, BookListData[j].price, BookListData[j].img_png, BookListData[j].img_svg)
    }
  }

  menuCardsWrapLi = menuCardsWrapUl.children('li')
  IndiMakeFn()
}

var makeOverseebookMenuFn = function(){
  menuCardsWrapUl.empty()
  menuCardsWrapUl.css({ transform: "translateY(0px)" })
  
  var j = 0;
  for(; j<BookListData.length ; j+=1) {
  if(BookListData[j].category === "해외도서"){
  makeTabMenuCardsFn(BookListData[j].id, BookListData[j].category, BookListData[j].title, BookListData[j].author, BookListData[j].company, BookListData[j].price, BookListData[j].img_png, BookListData[j].img_svg)
    }
  }

  menuCardsWrapLi = menuCardsWrapUl.children('li')
  IndiMakeFn()
}

var makeMemberbookMenuFn = function(){
  menuCardsWrapUl.empty()
  menuCardsWrapUl.css({ transform: "translateY(0px)" })
  
  var j = 0;
  for(; j<BookListData.length ; j+=1) {
  if(BookListData[j].category === "회원출판도서"){
  makeTabMenuCardsFn(BookListData[j].id, BookListData[j].category, BookListData[j].title, BookListData[j].author, BookListData[j].company, BookListData[j].price, BookListData[j].img_png, BookListData[j].img_svg)
    }
  }

  menuCardsWrapLi = menuCardsWrapUl.children('li')
  IndiMakeFn()
}


// -------------------------------------------
// 인디케이터
// -------------------------------------------
var IndiMakeFn = function(){
  IndicatorUl.empty()

  var Lilen = menuCardsWrapLi.length
  // 도서목록 내 카드 개수가 12개보다 많을 때, 인디케이터 만드는 함수에 [카드 개수/12] 한 값의 정수값 +1 을 대입한다. (+1을 하지 않으면, 페이지 수에 비해 인디케이터가 1개 모자란다.)
  if(Lilen > 12){ 
    k = Math.floor(Lilen/12) // 첫 페이지를 제외한 초과된 페이지 수
    menuIndicatorWrap.css({ width: 50+110*k + "px" })
    /*
    50 : 첫번째 인디케이터가 들어갈 너비
    110 : 추가될 인디케이터가 들어갈 너비 (왼쪽마진 60px, 인디케이터 자체 너비 50px)
    */
    makeIndicatorWrapFn(k+1)
    // 첫 페이지에 대한 인디케이터도 있어야 하므로, k+1을 대입
  }

  IndicatorLi = IndicatorUl.children('li') 
  IndicatorA = IndicatorLi.children('a')
  // console.log(IndicatorLi) 
  // console.log(IndicatorA) 
  //! 여기서 만약에 IndicatorLi = IndicatorUl.children('li') 없이 그냥 console.log(IndicatorLi)만 찍으면 빈 값만 나온다. 왜냐면 그냥 썼다는 건 이 함수를 실행해서 li가 변화되었다는 것을 함수 외부의 전역변수에는 전달해주지 않은 것이므로, 전역변수는 초기 실행 당시 담긴 값(빈 값)만 가지고 있기 때문이다.


  IndicatorLi.eq(0).addClass('on')
  // 네비게이션 버튼을 눌러 인디케이터가 출력된 경우, 일단 첫번째 인디케이터가 동작하고 있는 것으로 보이게끔 처리

  IndiOperationFn()
  
}


var IndiOperationFn = function(){
  IndicatorA.on('click', function(e){

    e.preventDefault()
    k = $(this).parent().index()
    console.log(k)

    IndicatorLi.eq(k).addClass('on')
    IndicatorLi.eq(k).siblings().removeClass('on')

    menuCardsWrapUl.css({ transform: "translateY(" + (-1125 * k) + "px)" })

  })
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


// 인디케이터
IndicatorA.on('click', function(e){
  e.preventDefault()
  console.log($(this).parent().index())
})


})(jQuery);

}); // $.getJSON (jsonData_BookList)
}); // $.getJSON (jsonData_PopularBook)


}());