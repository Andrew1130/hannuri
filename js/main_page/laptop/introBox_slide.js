// introBox_slide.js



var jsonData = $.getJSON('../json/main_page/introBoxData.json');
jsonData.done(function(data){
  var introBoxData = data;


setTimeout(function() {


//? 구현할 기능 -----------
/* 11시 방향 버튼을 이전, 5시 방향 버튼을 다음으로 하여
fade-in, fade-out으로 작동하도록 처리 */


//? 변수 ------------
var introBoxContents = document.querySelectorAll('.introBox_contents')
// var makeDivFn = function(){
//   var Len = introBoxContents[0].parentNode.length;
//   var DivArr = [];
//   var j = 3;

//   for(; j<Len; j++) {
//     DivArr.push(introBoxContents[0].parentNode[j])
//   }

//   return DivArr
// }
// var makeDiv = makeDivFn()
var nextBtn = document.querySelector('.introBox_nextbtn')
var prevBtn = document.querySelector('.introBox_prevbtn')
var SetNum = 0;


//? 함수 ------------
// 바닐라 js로 jqeury .siblings() 구현하기 (es5)
var siblings = function(t) {
  var children = t.parentElement.children;
  var tempArr = [];

  for (var i = 0; i < children.length; i++) {
    if(i>=3) { children[i].classList.add('card_css') }
    //* 생성된 div에 css 적용을 위해 .card_css라는 클래스를 추가 (위 if문은 siblings 기능과는 무관)
    tempArr.push(children[i]);
  } 

  return tempArr.filter(function(e){
    //* 여기서 e는 해당 함수 스코프 내에서 지금까지 발생한 이벤트를 의미
    return e != t;
    //* 모든 형제 중에서 자신과 같지 않은 것들만을 반환
    
  });
}

siblings(introBoxContents[0].parentNode)
//* card_css 클래스를 추가시키기 위해 임의로 1번 작동시킴

console.log(introBoxContents[0].parentNode)
console.log(introBoxContents[0].parentElement)



// Z-index 컨트롤 함수
//* opacity=1 인 카드에 z-index를 높게 부여하고, opacity=0인 카드에는 낮게 부여하여 opacity=1인 카드 내 버튼 등 콘텐츠가 선택 가능하도록 처리
var ZIndexControlFn = function(i) {
  var IntroC = introBoxContents[i]
  IntroC.style.zIndex = 10; //* opacity=1인 카드
  IntroC.parentNode.style.zIndex = 10; //* opacity=1인 카드를 감싸고 있는 div

  var card_length = siblings(introBoxContents[0].parentNode).length
  var k = 3
  for(; k<card_length ; k++) {
    //* siblings(IntroC.parentNode) 의 결과는 [div.introBox_nextbtn_area, div.introBox_prevbtn_area, div.dividing_box, div, div] 이므로, 카드에 해당하는 3번째 div부터 효과를 적용 (여기서 div는 introBoxContents[i]외의 div들을 의미)
    siblings(IntroC.parentNode)[k].children[0].style.zIndex = 0;
    //* opacity=0인 카드
    siblings(IntroC.parentNode)[k].style.zIndex = 0;
    //* opacity=0인 카드를 감싸고 있는 div
  }
}


var actionFn = function(i){
  var card_length = siblings(introBoxContents[0].parentNode).length
  var k = 3
  var IntroC = introBoxContents[i]
  IntroC.classList.add('on');

  // siblings(IntroC.parentNode) 의 결과는 [div.introBox_nextbtn_area, div.introBox_prevbtn_area, div.dividing_box, div, div...] 이므로, 카드에 해당하는 3번째 div부터 효과를 적용
  for(; k<card_length ; k++) {
    siblings(IntroC.parentNode)[k].children[0].classList.remove('on');
  }
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
  ZIndexControlFn(n);
}


//? 사전 기능 실행 ------------
introBoxContents[0].classList.add('on'); // 맨 첫번째 카드
introBoxContents[0].style.zIndex = 10; 
introBoxContents[0].parentNode.style.zIndex = 10;
siblings(introBoxContents[0].parentNode)[0].style.zIndex = 15; // 다음버튼
siblings(introBoxContents[0].parentNode)[1].style.zIndex = 15; // 이전버튼


//? 이벤트 -----------
nextBtn.addEventListener('click', function(e){
  e.preventDefault();
  SetNum+=1;
  actionNumSetFn(SetNum);
})

prevBtn.addEventListener('click', function(e){
  e.preventDefault();
  SetNum-=1;
  actionNumSetFn(SetNum);
})


}, 400) // setTimeout()


}); // jsonData