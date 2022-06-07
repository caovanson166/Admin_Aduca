


function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 2 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  let user = getCookie("username");
  if (user != "") {
    alert("Welcome again " + user);
  } else {
    user = prompt("Please enter your name:", "");
    if (user != "" && user != null) {
      setCookie("username", user, 365);
    }
  }
}
function delete_cookie(name) {
        console.log('delete');
    document.cookie = name + 
    '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
}
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
// function son(){
//         alert('sondz');
// }
const sidebarToggle = document.querySelector('#sidebarToggle');
    // sidebarToggle.addEventListener('click',function(){
    //     if (sidebarToggle) {
                // Uncomment Below to persist sidebar toggle between refreshes
                // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
                //     document.body.classList.toggle('sb-sidenav-toggled');
                // }
                try {
                    sidebarToggle.addEventListener('click', event => {
                        event.preventDefault();
                        document.body.classList.toggle('sb-sidenav-toggled');
                        localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
                    });
                } catch(e) {
                    // statements
                    console.log(e);
                }
    //         }
    // });
var logout = document.getElementById('logout');
logout.addEventListener('click',function(){

    const log = "https://api.duaca.top/api/admin/logout";

    var token = getUrlParameter('token');

    fetch(log, {
        method: "POST",
        headers: {
            Accept: "application/json, text/plain, */*",
            //"Content-Type": "application/json",
            'Authorization': 'Bearer '+token,
        },
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        if(data.message == ""){
            delete_cookie("token");
            window.location.href = 'login.html';
        }else{
            alert(data.message);
        }
        
    })
    .catch((err) => {
        console.log(err);
    });
})

