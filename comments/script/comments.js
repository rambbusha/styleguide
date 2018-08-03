const commentForm = document.querySelector('.comment-form');
const commentInput = document.querySelector('.comment-message');
const commentsHoldere = document.querySelector('ul.comments');
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const createComment = (text,authorInfo)=>{
  const date = new Date();
  let li = document.createElement('li');

  li.classList.add('comment');
  li.classList.add('new-comment');
  let content = `<div class="comment-avatar"><img src="${authorInfo.avatarUrl}" alt="avatar"></div>`;
      content+= `<div class="comments-no-avatar-wrapper"><div class="comment-info"><h4 class="author">${authorInfo.name}</h4>` 
      content+= `<div class="comment-statistics"><div class="date"><div class="like-date-icon"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><use xlink:href="#clock"></use></svg></div>`  
      content+= `<p class="date">${months[date.getMonth()]} ${date.getDate()}, <span class="time-gray">${amPm(date)}</span></p></div><div class="likes"><div class="like-date-icon">`
      content+= `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><use xlink:href="#hearth"></use></svg></div>`
      content+= `<p>12</p></div></div></div><div class="comment-text"><p>${text}</p></div></div></li>`
  
  li.innerHTML = content;
  return li;       
}


commentForm.addEventListener('submit', (e) => {
  e.preventDefault();
  commentsHoldere.appendChild(createComment(commentInput.value , {'name' : 'Thomas Schneider'  , 'avatarUrl' : 'images/profile.jpg'}));
  commentInput.value = '';
  window.scrollTo(0,window.scrollY + 200);
})



function amPm(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var type = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; 
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  var time =`${hours}:${minutes}${type}`;
  return time;
}