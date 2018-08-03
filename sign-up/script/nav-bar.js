const contentWrapper = $('.wrapper');
const navigation = $('.navigation-wrapper');
$('.burger').click(() => {
  contentWrapper.addClass('translated');
  navigation.addClass('translated');
})

$('.black-overlay').click(() => {
  contentWrapper.removeClass('translated');
  navigation.removeClass('translated');
})