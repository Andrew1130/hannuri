// eventBox_slide.js




//? 구현할 기능 -----------
/* 이전 및 다음 버튼을 누를 때마다
그 순서에 해당하는 슬라이드 카드가 밝아지면서 나타나고, 나머지 슬라이드 카드는 흐려지면서 사라지도록 만들기 */


$.ajax({
  url:"../json/main_page/eventBoxData.json",
  context: document.body
}).done(function(data){
  var eventBoxData = data;


setTimeout(function() {


//? 변수 ------------
var eventBoxCardsTotal = document.querySelector(".eventBox_card_total")
var eventBoxMakeDivFn = function(){
  var Len = eventBoxCardsTotal.children.length;
  var DivArr = [];
  var k = 2;
  
  for(; k<Len; k++) {
    DivArr.push(eventBoxCardsTotal.children[k])
    /* 
    eventBoxCardsTotal.children = [
      button, button, div, div ...
    ] 
    >> 버튼 제외 div만 DivArr이라는 리스트에 담는다.
    */
  }

  return DivArr
}
var eventBoxMakeDiv = eventBoxMakeDivFn()

var nextBtn = $('.eventBox_nextbtn')
var prevBtn = $('.eventBox_prevbtn')

var i = 0;


//? 함수 ------------
// 바닐라 js로 jqeury .siblings() 구현하기 (es5)
var siblings = function(t) {
  var children = t.parentElement.children;
  var tempArr = [];

  for (var i = 0; i < children.length; i++) {
    tempArr.push(children[i]);
  }

  return tempArr.filter(function(e){
    // 여기서 e는 해당 함수 스코프 내에서 지금까지 발생한 이벤트를 의미
    return e != t;
    // 모든 형제 중에서 자신과 같지 않은 것들만을 반환
    
  });
}

// Z-index 컨트롤 함수
//* opacity=1인 카드에 Z-index를 높게 주어 버튼 클릭이 가능하도록 처리
var ZIndexControlFn = function(i) {
  eventBoxMakeDiv[i].style.zIndex = 10; // opacity = 1 인 카드

  var Len = siblings(eventBoxMakeDiv[i]).length
  var j = 2
  /*
  siblings(eventBoxMakeDiv[i]) = [button, button, div, div ...] 이므로 button의 zIndex는 유지하고 opacity = 0인 다른 카드들(div)의 z-Index만 0으로 만들기 위해, j를 2부터 시작하도록 설정
  */
  for(; j<Len; j++){
    siblings(eventBoxMakeDiv[i])[j].style.zIndex = 0;
  }
}


// 슬라이드 버튼 함수
var nextBtnFn = function(){
  i++
  if(i >= eventBoxData.length) {
    i = 0
  }
  eventBoxMakeDiv[i].classList.add('on');
  ZIndexControlFn(i)

  var Len = siblings(eventBoxMakeDiv[i]).length;
  var j = 2;
  for(; j<Len; j++){
    siblings(eventBoxMakeDiv[i])[j].classList.remove('on')
  }
}

var prevBtnFn = function(){
  i--
  if(i < 0) {
    i = eventBoxData.length-1
  }
  eventBoxMakeDiv[i].classList.add('on');
  ZIndexControlFn(i)

  var Len = siblings(eventBoxMakeDiv[i]).length;
  var j = 2;
  for(; j<Len; j++){
    siblings(eventBoxMakeDiv[i])[j].classList.remove('on')
  }
}


//? 사전 처리 ------------
eventBoxMakeDiv[0].classList.add('on'); // 맨 첫번째 카드
eventBoxMakeDiv[0].style.zIndex = 10; 
eventBoxCardsTotal.children[0].style.zIndex = 15; // 다음버튼
eventBoxCardsTotal.children[1].style.zIndex = 15; // 이전버튼


//? 이벤트 -----------
nextBtn.on('click', function(){
  nextBtnFn()
})

prevBtn.on('click', function(){
  prevBtnFn()
})


}, 400) // setTimeout()


}) // $.ajax