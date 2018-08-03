const contentWrapper = $('.wrapper');
const navigation = $('.navigation-wrapper');
const searchLabel = $('.search-label');
const searchWrapper = $('.nav-bar-right .search');

$('.burger').click((e) => {
  console.log(e.target)
  contentWrapper.addClass('translated');
  navigation.addClass('translated');
})

$('.black-overlay').click(() => {
  contentWrapper.removeClass('translated');
  navigation.removeClass('translated');
})

searchLabel.click(()=>{
  searchWrapper.addClass('expanded')
})

$('#nav-search').blur((e)=>searchWrapper.removeClass('expanded'))