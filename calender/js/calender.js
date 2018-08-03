  $(window).load(function(){
      
$("#jqxCalendar").jqxCalendar({
    width: '60%',
    height: 300,
    theme: 'energyblue',
	
});

$("#jqxButton").jqxButton({
    height: '30px',
    width: '120px',
    theme: 'energyblue'
});
$('#jqxCalendar ').jqxCalendar('setDate', new Date());
$('#jqxButton').on('click', function () {
    var today = $('#jqxCalendar').jqxCalendar('today');
});

    });
	
	
	 // tell the embed parent frame the height of the content
    if (window.parent && window.parent.parent){
      window.parent.parent.postMessage(["resultsFrame", {
        height: document.body.getBoundingClientRect().height,
        slug: "qn72L"
      }], "*")
    }
	
const transWrapper = $('.articles');
const profile = $('.calender-wrapper');
$('.calender').click(()=>{
  transWrapper.addClass('translated-left');
  profile.addClass('translated-left');
})

$('.close-calender').click(()=>{
  transWrapper.removeClass('translated-left');
  profile.removeClass('translated-left');
})