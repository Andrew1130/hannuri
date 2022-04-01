// main_import.js




(function($){
//? 구현할 기능 -----------
// 너비가 변함에 따라 기기 및 css가 변하는 것에 맞추어, 각 기기 및 css에 적합한 자바스크립트가 동작할 수 있도록 처리



/*
jquery_rwd_set.js보다 이 js(main_import.js)가 늦게 실행되어야 하므로
[main_import.js의 정상 작동의 전제 중 하나는 jquery_rwd_set.js에서 쓰이는 checkType 변수가 작동하는 것이므로],
setTimeout을 걸어 jquery_rwd_set.js가 먼저 실행 완료되도록 한다.
*/

setTimeout(function(){


//? 변수 ------------
//* 전체 공통
var deviceCk = $.check_Type;
var body = $('body')
var agent = navigator.userAgent.toLowerCase(); 
// 익스플로러 감지를 위한 코드

//* main 각 영역
var headBox = $('#headBox')
var slideBox = $('#slideBox')
var introBox = $('#introBox')
var booklistBox = $('#booklistBox')
var eventBox = $('#eventBox')
var footBox = $('#footBox')

//* url 및 배열
var baseUrl = "../page/common/"
var common_import_Arr = ["headBox.html", "footBox.html"]


//? 기능 수행 -----------
// common 영역 호출 -----------------
headBox.load(baseUrl + common_import_Arr[0], function(){

  //* 스크립트 변수 
  var navBtnScript = '<script src="../js/src/navbtn_vanilaJS.js" class="navBtnScript"></script>'

  // console.log(deviceCk)
  if(deviceCk === 'smartphone' || deviceCk === 'tablet'){
    body.append(navBtnScript)
  } else {
    body.remove($('.navBtnScript'));
  }
});
footBox.load(baseUrl + common_import_Arr[1])


// 기기 변화에 맞추어, 그에 맞는 js 호출하기 ---------------

if(deviceCk === 'smartphone'){
  body.remove($('.desktop_js'));
  body.remove($('.labtop_js'));
  body.remove($('.tablet_js'));


  if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) || (agent.indexOf("firefox") != -1)  ) {
      // 익스플로러, 파이어폭스의 경우 호출되는 스크립트
      //* 익스플로러의 : 지원하지 않는 메소드 문제 때문에 기존 스크립트(jqeury) 호출. 
      //* 파이어폭스 : 기존 스크립트가 더 자연스러운 연출로 보임
      body.append('<script src="../js/prev_ver/main_page/smartphone/slideBox.js" class="slideBox_smartphone smartphone_js"></script>')
      body.append('<script src="../js/prev_ver/main_page/smartphone/booklistBox.js" class="slideBox_smartphone smartphone_js"></script>')
    } else {
      // 익스플로러가 아닐 경우 호출되는 스크립트
      body.append('<script src="../js/main_page/smartphone/slideBox_cardMake.js" class="slideBox_smartphone smartphone_js"></script>')
      body.append('<script src="../js/main_page/smartphone/slideBox_slide_swipe.js" class="slideBox_smartphone smartphone_js"></script>')
      body.append('<script src="../js/main_page/smartphone/booklistBox_cardMake.js" class="booklistBox_smartphone smartphone_js"></script>')
      body.append('<script src="../js/main_page/smartphone/booklistBox_slide.js" class="booklistBox_smartphone smartphone_js"></script>')
    }


  body.append('<script src="../js/main_page/smartphone/introBox_cardMake.js" class="introBox_smartphone smartphone_js"></script>')
  body.append('<script src="../js/main_page/smartphone/introBox_slide.js" class="introBox_smartphone smartphone_js"></script>')
  body.append('<script src="../js/main_page/smartphone/eventBox_cardMake.js" class="eventBox_smartphone smartphone_js"></script>')
  body.append('<script src="../js/main_page/smartphone/eventBox_accordion.js" class="eventBox_smartphone smartphone_js"></script>')


} else if (deviceCk === 'tablet') {
  body.remove($('.desktop_js'));
  body.remove($('.labtop_js'));
  body.remove($('.smartphone_js'));

  
  if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) || (agent.indexOf("firefox") != -1) ) {
    // 익스플로러 및 파이어폭스의 경우 호출되는 스크립트
    body.append('<script src="../js/prev_ver/main_page/tablet/slideBox.js" class="slideBox_tablet tablet_js"></script>')
    body.append('<script src="../js/prev_ver/main_page/tablet/booklistBox.js" class="booklistBox_tablet tablet_js"></script>')
  }
  else {
    // 익스플로러가 아닐 경우 호출되는 스크립트
    body.append('<script src="../js/main_page/tablet/slideBox_cardMake.js" class="slideBox_tablet tablet_js"></script>')
    body.append('<script src="../js/main_page/tablet/slideBox_slide.js" class="slideBox_tablet tablet_js"></script>')
    body.append('<script src="../js/main_page/tablet/booklistBox_cardMake.js" class="booklistBox_tablet tablet_js"></script>')
    body.append('<script src="../js/main_page/tablet/booklistBox_slide.js" class="booklistBox_tablet tablet_js"></script>')
  }
  
  body.append('<script src="../js/main_page/tablet/introBox_cardMake.js" class="introBox_tablet tablet_js"></script>')
  body.append('<script src="../js/main_page/tablet/introBox_slide.js" class="introBox_tablet tablet_js"></script>')
  
  body.append('<script src="../js/main_page/tablet/eventBox_cardMake.js" class="eventBox_tablet tablet_js"></script>')
  body.append('<script src="../js/main_page/tablet/eventBox_slide.js" class="eventBox_tablet tablet_js"></script>')


} else if (deviceCk === 'laptop') {
  body.remove($('.desktop_js'))
  body.remove($('.tablet_js'));
  body.remove($('.smartphone_js'));

  if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) || (agent.indexOf("firefox") != -1) ) {
    // 익스플로러 및 파이어폭스일 경우 호출되는 스크립트
    body.append('<script src="../js/prev_ver/main_page/laptop/slideBox.js" class="slideBox_labtop labtop_js"></script>')
  }
  else {
    // 익스플로러가 아닐 경우 호출되는 스크립트
    body.append('<script src="../js/main_page/laptop/slideBox_cardMake.js" class="slideBox_labtop labtop_js"></script>')
    body.append('<script src="../js/main_page/laptop/slideBox_slide.js" class="slideBox_labtop labtop_js"></script>')
    // body.append('<script src="../js/main_page/laptop/booklistBox_cardMake.js" class="booklistBox_labtop labtop_js"></script>')
    // body.append('<script src="../js/main_page/laptop/booklistBox_slide.js" class="booklistBox_labtop labtop_js"></script>')
    //* 작동해본 결과 이 부분은 기존 제이쿼리 코드가 더 자연스러운 것 같아, 기존 버전을 일단 그대로 유지
  }

  body.append('<script src="../js/main_page/laptop/introBox_cardMake.js" class="introBox_labtop labtop_js"></script>')
  body.append('<script src="../js/main_page/laptop/introBox_slide.js" class="introBox_labtop labtop_js"></script>')

  body.append('<script src="../js/prev_ver/main_page/laptop/booklistBox.js" class="booklistBox_labtop labtop_js"></script>')

  body.append('<script src="../js/main_page/laptop/eventBox_cardMake.js" class="eventBox_labtop labtop_js"></script>')
  body.append('<script src="../js/main_page/laptop/eventBox_slide.js" class="eventBox_labtop labtop_js"></script>')


} else if (deviceCk === 'desktop') {
  body.remove($('.labtop_js'));
  body.remove($('.tablet_js'));
  body.remove($('.smartphone_js'));

  if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) || (agent.indexOf("firefox") != -1) ) {
    // 익스플로러 및 파이어폭스일 경우 호출되는 스크립트
    body.append('<script src="../js/prev_ver/main_page/desktop/slideBox.js" class="slideBox_desktop desktop_js"></script>')
  }
  else {
    // 익스플로러가 아닐 경우 호출되는 스크립트
    body.append('<script src="../js/main_page/desktop/slideBox_cardMake.js" class="slideBox_desktop desktop_js"></script>')
    body.append('<script src="../js/main_page/desktop/slideBox_slide.js" class="slideBox_desktop desktop_js"></script>')
  }

  body.append('<script src="../js/main_page/desktop/introBox_cardMake.js" class="introBox_desktop desktop_js"></script>')
  body.append('<script src="../js/main_page/desktop/introBox_slide.js" class="introBox_desktop desktop_js"></script>')
  body.append('<script src="../js/main_page/desktop/booklistBox.js" class="booklistBox_desktop desktop_js"></script>')
  body.append('<script src="../js/main_page/desktop/eventBox_cardMake.js" class="eventBox_desktop desktop_js"></script>')
  body.append('<script src="../js/main_page/desktop/eventBox_slide.js" class="eventBox_desktop desktop_js"></script>')
}

}, 1000); // setTimeout()

})(jQuery);
