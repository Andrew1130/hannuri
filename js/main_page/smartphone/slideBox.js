// slideBox.js


//? 구현할 기능 -----------
// 1. 슬라이드박스 양 옆 버튼을 누르면, 슬라이드 기능이 동작하도록 처리
// 2. 무한 슬라이드(요소 강제이동형) 적용
// 3. 스와이프 기능 적용 (스마트폰에서 버튼 누르기 힘든 경우가 있으므로, 이를 대비하기 위함)


var jsonData = $.getJSON('../json/main_page/slideBoxData.json');
jsonData.done(function(data){
  var slideBoxData = data;

//! Javascript -------------------------------------
//* 변수 -----------------------
var slideBoxInner = document.querySelector('.slideBox_inner')
var baseUrl = "../img/main_page/01_smartphone/02_slidebox/"


//* 함수 -----------------------
//TODO : svg 미 적용시에는 png가 나타나도록 해보기
var makeSlideCardsFn = function(title, contents, img_png, img_svg) {
  var makeDiv = document.createElement('div')
  makeDiv.innerHTML = '<div class="cards_img"><div class="slideBox_total_contents"><h3 class="slideBox_title">'+ title +'</h3><p class="slideBox_contents">'+ contents +'</p><div class="slideBox_btn" tabindex="0"><button type="button"><p>바로가기</p></button></div></div></div>'

  var SelImgcon = makeDiv.querySelector('.cards_img')

  SelImgcon.style.backgroundImage = 'url('+ baseUrl +''+ img_png +')'
  SelImgcon.style.backgroundImage = 'url('+ baseUrl +''+ img_svg +')'

  slideBoxInner.appendChild(makeDiv)
}


//* 반복문으로 여러번 만들기 ---------------
var i = 0;
for(; i<slideBoxData.length ; i+=1) {
  makeSlideCardsFn(slideBoxData[i].title, slideBoxData[i].contents, slideBoxData[i].img_png, slideBoxData[i].img_svg)
}



//! Jquery -------------------------------------
(function($){
//? 변수 ------------
var slideBox = $("#slideBox")
var slideBoxWrap = slideBox.find(".slideBox_wrap")
var slideBoxInner = $(".slideBox_inner")
var slideBoxCards = slideBoxInner.children('div')
// console.log(slideBoxCards)

var nextBtn = $(".slideBox_nextbtn")
var prevBtn = $(".slideBox_prevbtn")

var permission = true;

//* 스와이프 기능 관련
var startX, endX
var swipeGuideArea = $(".swipe_guide_area")
console.log(swipeGuideArea)
var pointer = swipeGuideArea.find(".pointer")


//? 함수 -------------
var nextBtnFn = function(){
  permission = false; // 출입 패스권 (승인취소)

  swipeGuideArea.hide()
  slideBoxInner.stop().animate({ 
    marginLeft : -100 + "%" // a : 왼쪽으로 한 칸 밀기
  }, function(){ 
    slideBoxCards.eq(0).appendTo(slideBoxInner); 
    // b: 맨 앞의 요소를 맨 뒤로 붙이기
    slideBoxInner.css ({ marginLeft: 0 })
    // c : a와 b로 인해 결국 2칸 가는 셈이므로, margin-left를 0으로 하여 1칸 간 것으로 보이도록 하기
  
    slideBoxCards = slideBoxInner.children('div')
    // 함수 외부의 slideBoxCards에, a~c가 실행되어 div들의 순서가 변경된 것을 알려 주기 (알려주지 않으면 슬라이드가 작동하지 않는다.)
    // b_step_06의 test.html 참조

    permission = true;

  });
}

var prevBtnFn = function(){
  permission = false;

  swipeGuideArea.hide()
  slideBoxCards.eq(-1).prependTo(slideBoxInner); 
  // a : 맨 뒤 요소를 맨 앞으로 붙이기
  slideBoxInner.css({ marginLeft: -100 + '%' })
  // b : 왼쪽으로 한 칸 밀기
  slideBoxInner.stop().animate({ marginLeft: 0 },
  // c : 오른쪽으로 한 칸 밀기(애니메이션)
  //* a, b 없이 c만 하면 하얀 빈 칸만 나올 것이다.
  function(){
    slideBoxCards = slideBoxInner.children('div');
    // 함수 외부의 slideBoxCards에, a~c가 실행되어 div들의 순서가 변경된 것을 알려 주기 (알려주지 않으면 슬라이드가 작동하지 않는다.)
    
    permission = true;
  });

}


//? 사전 기능 실행 -----------
// 스와이프 기능 안내
setTimeout(function(){
swipeGuideArea.fadeIn()
}, 2000); // setTimeout()


//? 이벤트 -----------
// 버튼을 눌렀을 때의 이벤트
nextBtn.on('click', function(){
  nextBtnFn()
})

prevBtn.on('click', function(){
  prevBtnFn()
})


// -------------------------------------------------------------
// e.originalEvent.changedTouches[0] 내 값을 이용한 swipe 구현 
// -------------------------------------------------------------
//* e.originalEvent.changedTouches[0] 내 각 값의 특성 ---------
  /*
  - screenX, screenY -> 모니터의 좌표
  - clientX, clientY -> 보이는 화면(브라우저의 보이는 그 자체)의 좌표
  - pageX, pageY -> 스크롤값을 포함한 브라우저 화면의 좌표
  */

slideBoxWrap.on('touchstart', function(e){
  startX = parseInt(e.originalEvent.changedTouches[0].clientX)
  // console.log(e.originalEvent)
});

slideBoxWrap.on('touchend', function(e){
  endX = parseInt(e.originalEvent.changedTouches[0].clientX)
  var resultX = startX - endX;

  if(resultX > 100) {
    nextBtnFn()
  } else if ( resultX < -100 ) {
    prevBtnFn()
  }

});

})(jQuery);


}); // jsonData