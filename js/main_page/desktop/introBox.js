// introBox.js



//? 구현할 기능 -----------
/*
1.
javascript로 introBox 내부에 카드 생성

2.
11시 방향 버튼을 이전, 5시 방향 버튼을 다음으로 하여
fade-in, fade-out으로 작동하도록 처리
*/


var jsonData = $.getJSON('../json/main_page/introBoxData.json');
jsonData.done(function(data){
  var introBoxData = data;

//! Javascript -------------------------------------
//* 변수 -----------------------
var introBoxCardWrap = document.querySelector('.introBox_card_wrap')
var baseUrl = "../img/main_page/03_laptop/03_introbox/"


//* 함수 -----------------------
//TODO : svg 미 적용시에는 png가 나타나도록 해보기
var makeIntroCardFn = function(title, contents, img_png, img_svg) {
  var makeDiv = document.createElement('div')
  makeDiv.innerHTML = '<div class="introBox_contents"><h3 class="introBox_card_title">'+ title +'</h3><p class="introBox_card_contents">'+ contents +'</p><button type="button" class="introBox_card_btn">자세히보기</button></div>'

  var SelImgcon = makeDiv.querySelector('.introBox_contents')
  SelImgcon.style.backgroundImage = 'url('+ baseUrl +''+ img_png +')'
  SelImgcon.style.backgroundImage = 'url('+ baseUrl +''+ img_svg +')'

  introBoxCardWrap.appendChild(makeDiv)
}


//* 반복문으로 여러번 만들기 ---------------
var i = 0;
for(; i<introBoxData.length ; i+=1) {
  makeIntroCardFn(introBoxData[i].title, introBoxData[i].contents, introBoxData[i].img_png, introBoxData[i].img_svg)
}


//* 사전 기능 실행 ---------------



//! Jquery -------------------------------------
(function($){


// console.log(introBoxData)
// console.log(introBoxData.length)


//? 변수 ------------
var introBoxContents = $('.introBox_contents')
var makeDiv = introBoxContents.parent('div')

var nextBtn = $('.introBox_nextbtn')
var prevBtn = $('.introBox_prevbtn')
var SetNum = 0;
var i = 1;


//? 함수 ------------
var actionFn = function(i){
  var IntroC = introBoxContents.eq(i)
  IntroC.stop().fadeIn()
  IntroC.parent().siblings().children('div').stop().fadeOut()
}

var actionNumSetFn = function(n){
  if(n >= introBoxData.length){
    n = 0;
    SetNum = n;
  } else if (n < 0){
    n = introBoxData.length-1;
    SetNum = n;
  }
  actionFn(n);
}


//? 사전 기능 실행 ------------
makeDiv.css({ 
  Width: 58.75 + 'rem', height: 23.125 + 'rem',
  position: 'absolute', top: 0, bottom: 0, left: 0, right: 0
})
introBoxContents.eq(0).addClass('on')


//? 이벤트 -----------
nextBtn.on('click', function(e){
  e.preventDefault();
  SetNum+=1;
  actionNumSetFn(SetNum);

  console.log(SetNum)
})

prevBtn.on('click', function(e){
  e.preventDefault();
  SetNum-=1;
  actionNumSetFn(SetNum);

  console.log(SetNum)
})


})(jQuery);


}); // jsonData