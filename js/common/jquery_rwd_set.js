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
var agent = navigator.userAgent.toLowerCase(); 
// 익스플로러 감지를 위한 코드

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
if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
  // 익스플로러일 경우 호출되는 스크립트
  //! IE11에서는 win.width();이 실제 너비보다 17px 적게 잡히는 이슈가 있어, 익스플로러의 경우는 이를 반영하여 처리
  var deviceCheckFn = function(){
    var guideLen = deviceGuide.length;
    var i = guideLen-1;
    for(; i >= 0 ; i-=1 ) {
      if(winW + 17 >= deviceGuide[i].size){
        checkType = deviceGuide[i].type;
        break; // 조건문이 일치하는 경우 반복을 중지
      } else {
        checkType = deviceGuide[i].type;
      }
    }
    // console.log(checkType)
    return $.check_Type = checkType;
    //TODO : $.이름 = 
    //* 함수 내부의 값이라 하더라도 함수 외부 혹은 다른 js 파일에서 사용할 수 있도록 해 주는 기능
    //* 간혹 여기서 쓰는 이름이 jquery와 jquery ui에서 겹칠 수가 있으므로, 이를 방지하기 위해서는 이름을 짓기 전에 위 두개 파일에서 확인해봐야 한다.
    //* underbar와 camelcase를 같이 쓰면 사실상 겹치지 않는다.
    //* 추가적인 사항은 ../js/src/b_03_rwd_file.js 참조.
  
  }; //deviceCheckFn();

}
else {
  // 익스플로러가 아닐 경우 호출되는 스크립트
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
    //TODO : $.이름 = 
    //* 함수 내부의 값이라 하더라도 함수 외부 혹은 다른 js 파일에서 사용할 수 있도록 해 주는 기능
    //* 간혹 여기서 쓰는 이름이 jquery와 jquery ui에서 겹칠 수가 있으므로, 이를 방지하기 위해서는 이름을 짓기 전에 위 두개 파일에서 확인해봐야 한다.
    //* underbar와 camelcase를 같이 쓰면 사실상 겹치지 않는다.
    //* 추가적인 사항은 ../js/src/b_03_rwd_file.js 참조.
  
  }; //deviceCheckFn();

}


var beforeDevice = deviceCheckFn()
console.log(beforeDevice)
console.log(checkType)
console.log(win.width())

//? 이벤트 -----------
win.on('resize', function(){
  winW = win.width();
  // 디바이스가 달라지는 구간에서만 새로고침이 일어날 수 있도록, afterDevice와 beforeDevice를 나누어 처리
  var afterDevice = deviceCheckFn();
  console.log(afterDevice)
  console.log(win.width())
  if(beforeDevice !== afterDevice) {
    beforeDevice = afterDevice;
    
    setTimeout(function(){
      window.location.reload();
    });
    //* 파이어폭스에서는 location.reload(); 가 작동하지 않아서, 위와 같이 구문을 수정
    // 이벤트로 인해 checkType의 값이 변경되었을 경우, 그 값을 함수 외부에 전달하기 위해 새로고침 메서드를 사용
  }
});


}); // $.getJSON();

})(jQuery);