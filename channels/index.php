<!DOCTYPE html>
<html lang="en">

<head>
  <title>channels</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" type='text/css' href="css/nav-bar.css">
  <link rel="stylesheet" type='text/css' href="css/channels.css">
  <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet">
</head>

<body>
  <div class='app-wrapper'>
    <div class='navigation-wrapper'>
      <div class='navigation-bg'>
      </div>
      <ul class='navigation'>
        <li class='navigation-link'>
          <a href='#'>
            <svg class='navigation-icon' version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <use xlink:href='svgs/symbol-defs#news'></use>
            </svg>
            <h2>NEWS</h2>
          </a>
        </li>
        <li class='navigation-link'>
          <a href='#'>
            <svg class='navigation-icon' version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <use xlink:href='svgs/symbol-defs#channels'></use>
            </svg>
            <h2>CHANNELS</h2>
          </a>
        </li>
        <li class='navigation-link'>
          <a href='#'>
            <svg class='navigation-icon' version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <use xlink:href='svgs/symbol-defs#bookmarks'></use>
            </svg>
            <h2>BOOKMARKS</h2>
          </a>
        </li>
        <li class='navigation-link'>
          <a href='#'>
            <svg class='navigation-icon' version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <use xlink:href='svgs/symbol-defs#overview'></use>
            </svg>
            <h2>OVERVIEW</h2>
          </a>
        </li>
        <li class='navigation-link'>
          <a href='#'>
            <svg class='navigation-icon' version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <use xlink:href='svgs/symbol-defs#calendar'></use>
            </svg>
            <h2>CALENDAR</h2>
          </a>
        </li>
        <li class='navigation-link'>
          <a href='#'>
            <svg class='navigation-icon' version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <use xlink:href='svgs/symbol-defs#timeline'></use>
            </svg>
            <h2>TIMELINE</h2>
          </a>
        </li>
        <li class='navigation-link'>
          <a href='#'>
            <svg class='navigation-icon' version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <use xlink:href='svgs/symbol-defs#profile'></use>
            </svg>
            <h2>PROFILE</h2>
          </a>
        </li>
        <li class='navigation-link'>
          <a href='#'>
            <svg class='navigation-icon' version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <use xlink:href='svgs/symbol-defs#widgets'></use>
            </svg>
            <h2>WIDGETS</h2>
          </a>
        </li>
        <li class='navigation-link'>
          <a href='#'>
            <svg class='navigation-icon' version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <use xlink:href='svgs/symbol-defs#settings'></use>
            </svg>
            <h2>SETTINGS</h2>
          </a>
        </li>
        <li class='navigation-link line-over big-screen'>
          <a href='#'>
            <svg class='navigation-icon' version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <use xlink:href='svgs/symbol-defs#email'></use>
            </svg>
            <h2>CONTACT US</h2>
          </a>
        </li>
        <li class='navigation-link big-screen'>
          <a href='#'>
            <svg class='navigation-icon' version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <use xlink:href='svgs/symbol-defs#name-lines'></use>
            </svg>
            <h2>TERMS</h2>
          </a>
        </li>
      </ul>
      <div class='navigation-profile'>
        <div class='navigation-profile-info'>
          <a href='#'>LOG OUT</a>
          <p>Thomas Schneider</p>
        </div>
        <div class='navigation-profile-avatar'>

        </div>
      </div>
    </div>
    
    <div class='wrapper'>
      <div class='black-overlay'></div>
      <div class='nav-bar-wrapper'>
        <div class='burger'>
          <span class='burger-line'></span>
          <span class='burger-line-small'></span>
          <span class='burger-line'></span>
        </div>
         <div class='logo'>
          <svg class='logo' version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <use xlink:href='#logo'></use>
          </svg>
        </div>
        <div class='nav-bar-right'>
           <div class='search'>
            <svg class='search' version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <use xlink:href='#search'></use>
            </svg>
          </div>
         <div class='nav-avatar'>
            <img src='images/profile.jpg' alt='avatar'>
          </div>
        </div>
      </div>
      <!-- REPLACE UNDER -->
   <div class='background'></div>
       <div class='channel-outer-wrapper'> 
          <div class="button-wrap">
                   <input type='button' value='Following'>
                   <input type='button' value='Popular'>
                   <input type='button' value='Explore'>
          </div>
           <div class="channels-section">
           <?php include("includes/channel-sections.php"); ?>
           </div>
     </div>
      
      
      <!-- REPLACE ON TOP -->
    </div>
  </div>
  <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha256-3edrmyuQ0w65f8gfBsqowzjJe2iM6n0nKciPUp8y+7E="
    crossorigin="anonymous"></script>
  <script type='text/javascript' src='js/channels.js'></script>
   <script type='text/javascript' src='js/svgs-loader.js'></script>
  <script type='text/javascript' src='js/nav-bar.js'></script>
</body>

</html>