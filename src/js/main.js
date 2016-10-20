$(function() {
  $(window).on('load', function() {
    stickyFooter();
  });
  $(window).on('resize', function() {
    stickyFooter();
  });
});
  // Functions
function stickyFooter(){  
  var windowHeight = $(window).height();
  if(windowHeight > $('#footer').height() + $('#header').height() + $('#main').height()){
    $('#footer').addClass('sticky');
  } else {
    $('#footer').removeClass('sticky');
  }
  $('#footer').removeClass('invisible');
}