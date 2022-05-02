// common_import.js


//? 구현할 기능 -----------
// common 영역인 header와 footer를 외부에서 불러와 사용

(function($){
//? 변수 ------------
var headBox = $('#headBox')
var footBox = $('#footBox')
var modalWindow_slideBox = $('.modalWindow_slideBox')
console.log(modalWindow_slideBox)
var baseUrl = "../page/common/"
var common_import_Arr = ["headBox.html", "footBox.html", "modal_slidebox.html"]


//? 기능수행 -----------
headBox.load(baseUrl + common_import_Arr[0])
footBox.load(baseUrl + common_import_Arr[1])
modalWindow_slideBox.load(baseUrl + common_import_Arr[2])


//? 이벤트 -----------


})(jQuery);