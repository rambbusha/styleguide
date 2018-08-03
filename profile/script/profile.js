const transWrapper = $('.profile-articles');
const profile = $('.profile-outer-wrapper');
$('.nav-avatar').click(()=>{
  transWrapper.addClass('translated-left');
  profile.addClass('translated-left');
})

$('.close-profile').click(()=>{
  transWrapper.removeClass('translated-left');
  profile.removeClass('translated-left');
})