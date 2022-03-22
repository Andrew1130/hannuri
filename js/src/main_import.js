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

  body.append('<script src="../js/main_page/smartphone/slideBox_cardMake.js" class="slideBox_smartphone smartphone_js"></script>')
  body.append('<script src="../js/main_page/smartphone/slideBox_slide_swipe.js" class="slideBox_smartphone smartphone_js"></script>')
  body.append('<script src="../js/main_page/smartphone/introBox_cardMake.js" class="introBox_smartphone smartphone_js"></script>')
  body.append('<script src="../js/main_page/smartphone/introBox_slide.js" class="introBox_smartphone smartphone_js"></script>')
  body.append('<script src="../js/main_page/smartphone/booklistBox.js" class="booklistBox_smartphone smartphone_js"></script>')
  body.append('<script src="../js/main_page/smartphone/eventBox.js" class="eventBox_smartphone smartphone_js"></script>')


} else if (deviceCk === 'tablet') {
  body.remove($('.desktop_js'));
  body.remove($('.labtop_js'));
  body.remove($('.smartphone_js'));

  body.append('<script src="../js/main_page/tablet/slideBox.js" class="slideBox_tablet tablet_js"></script>')
  body.append('<script src="../js/main_page/tablet/introBox.js" class="introBox_tablet tablet_js"></script>')
  body.append('<script src="../js/main_page/tablet/booklistBox.js" class="booklistBox_tablet tablet_js"></script>')
  body.append('<script src="../js/main_page/tablet/eventBox.js" class="eventBox_tablet tablet_js"></script>')


} else if (deviceCk === 'laptop') {
  body.remove($('.desktop_js'))
  body.remove($('.tablet_js'));
  body.remove($('.smartphone_js'));

  body.append('<script src="../js/main_page/laptop/slideBox.js" class="slideBox_labtop labtop_js"></script>')
  body.append('<script src="../js/main_page/laptop/introBox.js" class="introBox_labtop labtop_js"></script>')
  body.append('<script src="../js/main_page/laptop/booklistBox.js" class="booklistBox_labtop labtop_js"></script>')
  body.append('<script src="../js/main_page/laptop/eventBox.js" class="eventBox_labtop labtop_js"></script>')


} else if (deviceCk === 'desktop') {
  body.remove($('.labtop_js'));
  body.remove($('.tablet_js'));
  body.remove($('.smartphone_js'));

  body.append('<script src="../js/main_page/desktop/slideBox.js" class="slideBox_desktop desktop_js"></script>')
  body.append('<script src="../js/main_page/desktop/introBox.js" class="introBox_desktop desktop_js"></script>')
  body.append('<script src="../js/main_page/desktop/booklistBox.js" class="booklistBox_desktop desktop_js"></script>')
  body.append('<script src="../js/main_page/desktop/eventBox.js" class="eventBox_desktop desktop_js"></script>')
}

}, 400); // setTimeout()

})(jQuery);
