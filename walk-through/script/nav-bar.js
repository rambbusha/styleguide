const contentWrapper = $('.wrapper');
const navigation = $('.navigation-wrapper');
$('.burger').click((e)=>{
  console.log(e.target)
  contentWrapper.addClass('translated');
  navigation.addClass('translated');
})

$('.black-overlay').click(()=>{
  contentWrapper.removeClass('translated');
  navigation.removeClass('translated');
})