// common_import.js


//? 구현할 기능 -----------
// common 영역인 header와 footer를 외부에서 불러와 사용

(function($){
//? 변수 ------------
var headBox = $('#headBox')
var footBox = $('#footBox')
var baseUrl = "../page/common/"
var common_import_Arr = ["headBox.html", "footBox.html"]


//? 기능수행 -----------
headBox.load(baseUrl + common_import_Arr[0])
footBox.load(baseUrl + common_import_Arr[1])


//? 이벤트 -----------


})(jQuery);