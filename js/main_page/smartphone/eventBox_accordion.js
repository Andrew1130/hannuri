// eventBox.accordion.js




$.ajax({
  url:"../json/main_page/eventBoxData.json",
  context: document.body
}).done(function(data){
  var eventBoxData = data;

setTimeout(function() {


//? 구현할 기능 -----------
// 이벤트 영역에 있는 작은 상자를 누르면, 그 상자가 펼쳐지면서 제목-내용-버튼이 보이게끔 하고, 펼쳐진 상자 외 나머지 상자는 접히면서 다시 작아지도록 하기



//? 변수 ------------
var eventBoxCardsTotal = document.querySelector(".eventBox_card_total")

// Jquery의 eventBoxCardsTotal.children('div')을 구현
var MakeDivSelect_Fn = function(){
  var Len = eventBoxCardsTotal.children.length
  var MakeDivArr = []
  var i = 2
  for(i; i<Len ; i++) {
    MakeDivArr.push(eventBoxCardsTotal.children[i])
  }
  return MakeDivArr
}
var eventBoxMakeDiv = MakeDivSelect_Fn()

var eventBoxCardWrap = eventBoxCardsTotal.querySelectorAll('.eventBox_card_wrap')
var eventBoxContentArea = eventBoxCardsTotal.querySelectorAll('.eventBox_content_area')
var j = 0



//? 함수 -----------
// jqeury .siblings() 구현 (es5)
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


//? 사전 처리 -----------
// 첫번째 박스는 펼쳐져 있고, 나머지 박스는 접혀 있도록 처리
eventBoxContentArea[1].classList.add('off')
eventBoxCardWrap[1].classList.add('off')
eventBoxContentArea[2].classList.add('off')
eventBoxCardWrap[2].classList.add('off')



//? 이벤트 -----------
for(; j<eventBoxMakeDiv.length ; j++){
  eventBoxMakeDiv[j].addEventListener('click', function(e){
    e.preventDefault()
    var onBoxWrap = this.children[0]
    var onBoxArea = this.children[0].children[1]


    /* $(this).siblings().find('.eventBox_card_wrap') 및
    $(this).siblings().find('.eventBox_content_area') 구현 */
    var Len = siblings(this).length
    var sibWrapArr = []
    var sibAreaArr = []
    var i = 2
    for(; i<Len ; i++){
      sibWrapArr.push(siblings(this)[i].children[0])
      sibAreaArr.push(siblings(this)[i].children[0].children[1])
    }
    var sibBoxWrap = sibWrapArr
    var sibBoxArea = sibAreaArr


    /* 
    onBoxWrap.animate({ height: 23.125 + 'rem' })
    onBoxArea.css({ display: 'block' })
    sibBoxWrap.animate({ height: 3.125 + 'rem' })
    sibBoxArea.css({ display: 'none' })  구현 
    */
  
    onBoxWrap.classList.add('on')
    onBoxWrap.classList.remove('off')
    
    var k = 0
    for(; k<Len-2 ; k++){
      sibBoxWrap[k].classList.add('off')
      sibBoxWrap[k].classList.remove('on')
      sibBoxArea[k].classList.add('off')
      sibBoxArea[k].classList.remove('on')
    }

    setTimeout(function(){
      onBoxArea.classList.remove('off')
      onBoxArea.classList.add('on')
    },300)

    console.log(eventBoxMakeDiv)
    console.log(eventBoxCardWrap)
  });

  eventBoxCardWrap[j].addEventListener('focus', function(e){
    e.preventDefault()
    var onBoxWrap = this
    var onBoxArea = this.children[1]


    /* $(this).siblings().find('.eventBox_card_wrap') 및
    $(this).siblings().find('.eventBox_content_area') 구현 */
    // var Len = siblings(this).length
    var Len = siblings(this.parentNode).length
    var sibWrapArr = []
    var sibAreaArr = []
    var i = 2
    for(; i<Len ; i++){
      sibWrapArr.push(siblings(this.parentNode)[i].children[0])
      sibAreaArr.push(siblings(this.parentNode)[i].children[0].children[1])
    }
    var sibBoxWrap = sibWrapArr
    var sibBoxArea = sibAreaArr


    /* 
    onBoxWrap.animate({ height: 23.125 + 'rem' })
    onBoxArea.css({ display: 'block' })
    sibBoxWrap.animate({ height: 3.125 + 'rem' })
    sibBoxArea.css({ display: 'none' })  구현 
    */
  
    onBoxWrap.classList.add('on')
    onBoxWrap.classList.remove('off')
    
    var k = 0
    for(; k<Len-2 ; k++){
      sibBoxWrap[k].classList.add('off')
      sibBoxWrap[k].classList.remove('on')
      sibBoxArea[k].classList.add('off')
      sibBoxArea[k].classList.remove('on')
    }

    setTimeout(function(){
      onBoxArea.classList.remove('off')
      onBoxArea.classList.add('on')
    },300)

    console.log(eventBoxMakeDiv)
    console.log(eventBoxCardWrap)
  });
}


}, 400) // setTimeout()

}) // $.ajax