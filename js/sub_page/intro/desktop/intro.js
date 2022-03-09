// intro.js



//? 구현할 기능 -----------
// 박스를 누르면 박스에 해당하는 모달 윈도우가 나타나도록 하기
// 모달 윈도우에서 x버튼 혹은 밑의 닫기버튼을 누르면 모달윈도우가 닫히도록 하기


var jsonData = $.getJSON('../json/sub_page/introData.json');
jsonData.done(function(data){
  var introData = data;
  // console.log(introData);

//! Javascript -------------------------------------
//* 변수 -----------------------
var modalWindow = document.querySelector('#modalWindow')
var baseUrl = "../img/intro_page/"


//* 함수 -----------------------
//TODO : svg 미 적용시에는 png가 나타나도록 해보기
var makeModalWrapFn = function(title, contents_01, contents_02, contents_03, img_01_png, img_01_svg, img_02_png, img_02_svg) {
  var makeDiv = document.createElement('div')
  makeDiv.innerHTML = '<button type="button"class="modal_closebtn_title"></button><div class="title_area"><h2>'+ title +'</h2></div><div class="contents_area"><p>'+ contents_01 +'</p><div class="img_01"></div><p>'+ contents_02 +'</p><div class="img_02"></div><p>'+ contents_03 +'</p><button type="button" class="modal_closebtn_contents">닫기</button></div>'

  var SelImgcon_01 = makeDiv.querySelector(".img_01")
  var SelImgcon_02 = makeDiv.querySelector(".img_02")
  SelImgcon_01.style.backgroundImage = 'url('+ baseUrl +''+ img_01_png +')'
  SelImgcon_01.style.backgroundImage = 'url('+ baseUrl +''+ img_01_svg +')'
  SelImgcon_02.style.backgroundImage = 'url('+ baseUrl +''+ img_02_png +')'
  SelImgcon_02.style.backgroundImage = 'url('+ baseUrl +''+ img_02_svg +')'

  modalWindow.appendChild(makeDiv)
}


//* 반복문으로 여러번 만들기 ------------------
var i = 0;
for(; i<introData.length ; i+=1) {
  makeModalWrapFn(introData[i].title, introData[i].contents_01, introData[i].contents_02, introData[i].contents_03, introData[i].img_01_png, introData[i].img_01_svg, introData[i].img_02_png, introData[i].img_02_svg)
}



//! Jquery -------------------------------------
(function($){
//? 변수 ------------
// 모달바
var introArea = $(".contentBox_intro_area")
var modalBar = introArea.children('button')

// 모달윈도우
var modalWindow = $("#modalWindow")
var modalMakeDiv = modalWindow.children('div')
var modalCloseTitle = modalMakeDiv.find('.modal_closebtn_title')
var modalCloseContents = modalMakeDiv.find('.modal_closebtn_contents')



//? 이벤트 -----------
modalBar.on('click', function(e){
  e.preventDefault()
  console.log($(this).index())

  modalWindow.fadeIn()
  modalMakeDiv.eq($(this).index()).fadeIn()
})

modalCloseTitle.on('click', function(e){
  e.preventDefault()
  modalWindow.fadeOut()
  modalMakeDiv.fadeOut()
})
modalCloseContents.on('click', function(e){
  e.preventDefault()
  modalWindow.fadeOut()
  modalMakeDiv.fadeOut()
})


})(jQuery);


}); // $.getJSON