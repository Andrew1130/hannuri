// event.js


//? 구현할 기능 -----------
// 박스를 누르면 박스에 해당하는 모달 윈도우가 나타나도록 하기
// 모달 윈도우에서 x버튼 혹은 밑의 닫기버튼을 누르면 모달윈도우가 닫히도록 하기


(function() { 


var jsonData = $.getJSON('../json/sub_page/eventData.json');
jsonData.done(function(data){
  var eventData = data;
  // console.log(eventData);


//! Javascript -------------------------------------
//* 변수 -----------------------
var modalWindow = document.querySelector("#modalWindow");
var baseUrl = "../img/event_page/"


//* 함수 -----------------------
var makeModalWindowFn = function(id, event_type, event_type_id, title, contents_01, contents_02, contents_03, img_01, img_02){
  var makeDiv = document.createElement('div')
  makeDiv.innerHTML = '<span class="blind">'+ id +'</span><span class="blind">'+ event_type +'</span><span class="blind">'+ event_type_id +'</span><button class="modal_closebtn_title"><span class="blind">모달윈도우 상단 닫기버튼</span></button><div class="inner_title"><h2>'+ title +'</h2></div><div class="inner_contents"><p>'+ contents_01 +'</p><div class="img_01"><span class="blind">모달윈도우 첫번째 이미지</span></div><p>'+ contents_02 +'</p><div class="img_02"><span class="blind">모달윈도우 두번째 이미지</span></div><p>'+ contents_03 +'</p></div><button class="modal_closebtn_contents"><span class="blind">모달윈도우 하단 닫기버튼</span>닫기</button>'

  var SelImgcon_01 = makeDiv.querySelector(".img_01")
  var SelImgcon_02 = makeDiv.querySelector(".img_02")
  SelImgcon_01.style.backgroundImage = 'url('+ baseUrl +''+ img_01 +')'
  SelImgcon_02.style.backgroundImage = 'url('+ baseUrl +''+ img_02 +')'

  modalWindow.appendChild(makeDiv)
}


//* 반복문으로 여러번 만들기 ------------------
var i = 0
for(; i<eventData.length ; i+=1) {
  makeModalWindowFn(eventData[i].id, eventData[i].event_type, eventData[i].event_type_id, eventData[i].title, eventData[i].contents_01, eventData[i].contents_02, eventData[i].contents_03, eventData[i].img_01, eventData[i].img_02)
}




//! Jquery -------------------------------------
(function($){
//? 변수 ------------
// 모달바
var contentBoxwrap = $(".contentBox_wrap")

var eventLimit = contentBoxwrap.find(".event_limit")
var eventLimitLi = eventLimit.find("li")

var eventAnytime = contentBoxwrap.find(".event_anytime")
var eventAnytimeLi = eventAnytime.find("li")



// 모달윈도우
var modalWindow = $("#modalWindow");
var modalMakeDiv = modalWindow.children("div");

var modalCloseTitle = modalMakeDiv.find(".modal_closebtn_title");
var modalCloseContents = modalMakeDiv.find(".modal_closebtn_contents");



//? 이벤트 -----------
// 모달윈도우 이벤트
eventLimitLi.on('click', function(e){
  e.preventDefault()
  k = $(this).index()
  console.log(k)

  modalWindow.fadeIn()
  modalMakeDiv.eq(k).fadeIn()
  modalMakeDiv.eq(k).siblings().fadeOut()
})

eventAnytimeLi.on('click', function(e){
  e.preventDefault()

  j = eventLimitLi.length
  k = $(this).index() + j
  console.log(k)

  modalWindow.fadeIn()
  modalMakeDiv.eq(k).fadeIn()
  modalMakeDiv.eq(k).siblings().fadeOut()
})


// 모달윈도우 내부 버튼 이벤트
modalCloseContents.on('click', function(e){
  e.preventDefault()
  modalWindow.fadeOut()
  modalMakeDiv.fadeOut()
})

modalCloseTitle.on('click', function(e){
  e.preventDefault()
  modalWindow.fadeOut()
  modalMakeDiv.fadeOut()
})


})(jQuery);


}); // $.getJSON

}());