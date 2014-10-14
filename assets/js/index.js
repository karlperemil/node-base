console.log('index.js')
$(document).ready(function(){
  console.log('document ready')
  $(window).resize(onresize);
  onresize();
});

// RESIZE
function onresize(){
  console.log('resize')
  var winWidth = $(window).width()
  if(winWidth > 1280) winWidth = 1280
  $('.movie-feature-title').css('zoom',winWidth/1280)
}
