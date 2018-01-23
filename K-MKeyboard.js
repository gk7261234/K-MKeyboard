/**
 * Created by GK on 2018/1/23.
 */
$(function () {

  //默认配置项
  var defaults = {
    keyboardName: '自定义安全键盘',
    slideButton: '完成',
    keyboardColor: 'gray'
  };
  function renderHtml() {
    var _html = '';
    _html += '<div class="keyboard" style="display: none;">';
    _html += '<div class="keyboard title">'+defaults.keyboardName+'<span class="slide-down">'+defaults.slideButton+'</span></div>';
    _html += '<table><tbody>';
    _html += '<tr><td>1</td><td>2</td><td>3</td></tr>';
    _html += '<tr><td>4</td><td>5</td><td>6</td></tr>';
    _html += '<tr><td>7</td><td>8</td><td>9</td></tr>';
    _html += '<tr><td>.</td><td>0</td><td>X</td></tr>';
    _html += '</table></tbody>';
    _html += '</div>';
    $('body').append(_html);
  };
  var focusObj,clickObj;

  //输入框聚焦时调出键盘
  $("input").on('focus', function () {
    $(".keyboard").slideDown();
  });

  //键盘输入时焦点聚焦在输入框
  $("input").on('blur', function (e) {
    if (typeof($(clickObj).attr("keyboard-type")) == "undefined") {
      if (focusObj){
        focusObj.focus();
      }
    }
  });

  //判断点击区域
  $(document).mousedown(function (e) {
    e = window.event || e;
    var obj = e.srcElement || e.target;
    clickObj = obj;
    if ($(obj).is(".keyboard table tbody tr td")) {
      focusObj = $("input:focus");
      var getClickText = $(obj).text();
      var currentValue = $("input:focus").val();
      if (getClickText == 'X') {
        currentValue = currentValue.substr(0, currentValue.length - 1);
        $("input:focus").val(currentValue);
      } else {
        $("input:focus").val(currentValue + getClickText);
      }
    } else if ($(obj).text() == defaults.slideButton) {
      $(".keyboard").slideUp();
    }
  });

  renderHtml();

  //修改背景颜色
  if(defaults.keyboardColor!='gray'){
    console.log("什么鬼");
    $('.keyboard').css('background',defaults.keyboardColor);
  }



});