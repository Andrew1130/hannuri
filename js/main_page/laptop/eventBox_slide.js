// eventBox.slide.js



//? 구현할 기능 -----------
// 이전, 다음 버튼 누를시 jQuery의 .fadeIn(), .fadeOut()으로 작동하도록 처리


$.ajax({
  url:"../json/main_page/eventBoxData.json",
  context: document.body
}).done(function(data){
  var eventBoxData = data;

setTimeout(function() {



//? 변수 ------------
var eventBoxCardsTotal = document.querySelector(".eventBox_card_total")

var eventBoxMakeDivFn = function(){
  var Len = eventBoxCardsTotal.children.length
  var MakeDivArr = []
  var i = 2
  for(; i<Len ; i++) {
    MakeDivArr.push(eventBoxCardsTotal.children[i])
  }

  return MakeDivArr
}
var eventBoxMakeDiv = eventBoxMakeDivFn()

var nextBtn = document.querySelector('.eventBox_nextbtn')
var prevBtn = document.querySelector('.eventBox_prevbtn')
var i = 0;



//? 함수 -----------
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


var ZIndexControlFn = function() {
    eventBoxMakeDiv[i].style.zIndex = 10; // opacity=1인 카드
    

    var card_length = siblings(eventBoxMakeDiv[0]).length
    var k = 2
    for(; k<card_length ; k++) {
      //* console.log(siblings(eventBoxMakeDiv[i]))의 결과는 [button.eventBox_nextbtn, button.eventBox_prevbtn, div, div] 라는 점을 활용하여 아래와 같이 작성 (여기서 div는 eventBoxMakeDiv[i]외의 div들을 의미)
      siblings(eventBoxMakeDiv[i])[k].style.zIndex = 0; 
      // opacity=0인 카드
    }
}


var nextBtnFn = function(){
  i++
  if(i >= eventBoxData.length) {
    i = 0
  }

  var card_length = siblings(eventBoxMakeDiv[0]).length
  var k = 2
  eventBoxMakeDiv[i].classList.add('on')
  
  for(; k<card_length ; k++) {
    siblings(eventBoxMakeDiv[i])[k].classList.remove('on');
  }

  ZIndexControlFn()
  // opacity는 단순히 눈에 보이는 부분만을 조절할 뿐이고, opacity 0이라 해도 요소는 화면상에 그대로 남아있기 때문에, Z-index로 opacity가 1이 된 카드가 실제로 맨 앞에 위치하도록 컨트롤
}

var prevBtnFn = function(){
  i--
  if(i < 0) {
    i = eventBoxData.length-1
  }

  var card_length = siblings(eventBoxMakeDiv[0]).length
  var k = 2
  eventBoxMakeDiv[i].classList.add('on')
  for(; k<card_length ; k++) {
    siblings(eventBoxMakeDiv[i])[k].classList.remove('on');
  }

  ZIndexControlFn()
}



//? 사전 처리 -----------
eventBoxMakeDiv[0].classList.add('on') // 맨 앞 카드
eventBoxMakeDiv[0].style.zIndex = 10;
siblings(eventBoxMakeDiv[i])[0].style.zIndex = 15; // 다음버튼
siblings(eventBoxMakeDiv[i])[1].style.zIndex = 15; // 이전버튼



//? 이벤트 -----------
nextBtn.addEventListener('click', function(){
  nextBtnFn()
})

prevBtn.addEventListener('click', function(){
  prevBtnFn()
})


}, 400) // setTimeout()

}) // $.ajax