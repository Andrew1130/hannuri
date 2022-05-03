// slideBox_modal.js


setTimeout(function(){

(function($){
//? 구현할 기능 -----------
// 슬라이드 박스 내 바로가기 버튼을 누르면 해당하는 모달 윈도우가 나타나도록 하기
// 모달윈도우의 닫기 버튼을 누르면 모달윈도우가 사라지도록 하기
// '모임 참여' 모달윈도우에서 작성목적 이하 항목을 클릭하면, 클릭된 항목의 아이콘 색깔이 변경되고 글씨도 진해지도록 하기. 또한 질문사항은 '질문이 있습니다' 항목이 선택되었을 때만 나타나도록 하기
//TODO : '도서 제작' 모달윈도우 내 각 아이콘을 누르면 파일 혹은 링크 첨부가 가능하도록 하기
//TODO : '도서 제작', '모임 참여' 모달윈도우 내 간단 설명 및 질문사항에서 텍스트 오버플로우 발생시 밑줄이 내려가며 추가정보 입력이 가능하도록 하기  



//? 변수 ------------
// 모달윈도우 전체 
var slideBox_btn = $(".slideBox_btn")
var Main_ModalWindow = $("#modalWindow")
var Main_ModalBox = $(".modalBox")
var Slide_Modal_bookRequest = $(".book_request")
var Slide_Modal_bookMake = $(".book_make")
var Slide_Modal_meeting = $(".meeting")
var Slide_Modal_closebtn_title = $(".modal_closebtn_title")

console.log(slideBox_btn)

// 개별 모달윈도우
//* 도서 제작


//* 모임 참여
var Meeting_Object_Join = $(".Object_Join")
var Meeting_Object_Question = $(".Object_Question")
var MeetingQ_Container = $(".meeting_question_container")


//? 함수 -------------


//? 이벤트 -----------
// 도서 신청 (책을 신청하세요)
slideBox_btn.eq(0).on("click", function(e){
  e.preventDefault()
  Slide_Modal_bookMake.hide()
  Slide_Modal_meeting.hide()
  Main_ModalWindow.fadeIn()
  Main_ModalBox.fadeIn()
}) 

// 도서 제작 (책을 만드세요) 
slideBox_btn.eq(1).on("click", function(e){
  e.preventDefault()
  Slide_Modal_bookRequest.hide()
  Slide_Modal_meeting.hide()
  Main_ModalWindow.fadeIn()
  Main_ModalBox.fadeIn()
}) 

// 모임 참여 (글로 표현하세요)
//* 모달윈도우
slideBox_btn.eq(2).on("click", function(e){
  e.preventDefault()
  Slide_Modal_bookRequest.hide()
  Slide_Modal_bookMake.hide()
  Main_ModalWindow.fadeIn()
  Main_ModalBox.fadeIn()
}) 

//* 작성목적(체크박스)
Meeting_Object_Join.on("click", function(e){
  // e.preventDefault();
  $(this).css('fontWeight','700')
  $(this).siblings().css('fontWeight','500')
  MeetingQ_Container.slideUp()
})

Meeting_Object_Question.on("click", function(e){
  // e.preventDefault();
  $(this).css('fontWeight','700')
  $(this).siblings().css('fontWeight','500')
  MeetingQ_Container.slideDown()
})

// 이벤트 박스로 이동 (다양한 사람들을 만나세요)
slideBox_btn.eq(3).on("click", function(e){
  e.preventDefault()
  var offset = $("#eventBox").offset(); // 해당 위치 반환
  $("html, body").animate({scrollTop: offset.top}, 400); // 선택한 위치로 이동. 두번째 인자는 0.4초를 의미한다.
}) 

// 닫기 버튼
Slide_Modal_closebtn_title.on("click", function(e){
  e.preventDefault()
  Main_ModalWindow.fadeOut()
  Main_ModalBox.fadeOut()
  setTimeout(function(){
    Slide_Modal_bookRequest.show()
    Slide_Modal_bookMake.show()
    Slide_Modal_meeting.show()
  }, 500);
})

})(jQuery);

}, 800); // setTimeout()