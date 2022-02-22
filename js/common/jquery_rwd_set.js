// b_03_responsive_js_set.js



(function($){
//? 구현할 기능 -----------
/*
- 각 디바이스 환경을 구축하여, 해당하는 디바이스 환경에 필요한 디바이스 크기를 체크하자.
1. 기준 디바이스 가이드를 불러오기 >> $.ajax() or $.getJSON()
2. 기준 크기를 확인 및 디바이스 크기 기준 수치를 설정
3. 브라우저 크기가 변경되면 변경된 크기를 파악하여, 기존 디바이스환경과 비교하여 다른 환경일 경우 변경할 처리를 체크
*/

// $.ajax({
//   url:'../data/device_type.json', 
//   content: document.body
// }).done(function(data){})

var jsonData = '../json/device_type.json'
$.getJSON(jsonData, function(data){
  var deviceGuide = data;
  // console.log(deviceGuide)


//? 변수 ------------
var win = $(window);
var winW = win.width();
var checkType;

//* 너비에 따른 기기 확인하기 : if문
/*
if(winW >= deviceGuide[3].size) {
  checkType = deviceGuide[3].type;
} else if(winW >= deviceGuide[2].size) {
  checkType = deviceGuide[2].type;
} else if (winW >= deviceGuide[1].size) {
  checkType = deviceGuide[1].type;
} else { 
  checkType = deviceGuide[0].type; 
}
console.log(checkType)
*/


//* 너비에 따른 기기 확인 : if문을 for 문으로
/*
var guideLen = deviceGuide.length;
var i = guideLen-1;
for(; i >= 0 ; i-=1 ) {
  if(winW >= deviceGuide[i].size){
    checkType = deviceGuide[i].type;
    break; // 조건문이 일치하는 경우 반복을 중지
  } else {
    checkType = deviceGuide[i].type;
  }
}
console.log(checkType)

>> 이 for-if 조합문을 함수로 사용
*/


//? 함수 -------------
var deviceCheckFn = function(){
  var guideLen = deviceGuide.length;
  var i = guideLen-1;
  for(; i >= 0 ; i-=1 ) {
    if(winW >= deviceGuide[i].size){
      checkType = deviceGuide[i].type;
      break; // 조건문이 일치하는 경우 반복을 중지
    } else {
      checkType = deviceGuide[i].type;
    }
  }
  // console.log(checkType)
  return $.check_Type = checkType;
  //TODO : &.이름 = 
  //* 함수 내부의 값이라 하더라도 함수 외부 혹은 다른 js 파일에서 사용할 수 있도록 해 주는 기능
  //* 간혹 여기서 쓰는 이름이 jquery와 jquery ui에서 겹칠 수가 있으므로, 이를 방지하기 위해서는 이름을 짓기 전에 위 두개 파일에서 확인해봐야 한다.
  //* underbar와 camelcase를 같이 쓰면 사실상 겹치지 않는다.
  //* 추가적인 사항은 ../js/src/b_03_rwd_file.js 참조.

}; //deviceCheckFn();

var beforeDevice = deviceCheckFn()
// console.log(beforeDevice)


//? 이벤트 -----------
win.on('resize', function(){
  winW = win.width();
  var afterDevice = deviceCheckFn();
  if(beforeDevice !== afterDevice) {
    beforeDevice = afterDevice;
    console.log(afterDevice);
    location.reload(); 
    // 새로고침
    // 외부 데이터를 불러오는 경우 쓸 수 있는 기법
  }
});


}); // $.getJSON();

})(jQuery);