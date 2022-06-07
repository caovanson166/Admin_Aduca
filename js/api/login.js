
var loginform = document.querySelector('.loginform');

loginform.addEventListener('click',function(){
	var name = document.getElementById("inputEmail").value;
	var password = document.getElementById("inputPassword").value;
	login(name,password);
})
// $(document).ready(function(){
//   $("p").click(function(){
//     $(this).hide();
//   });
// });
console.log(getCookie('token'));
function login(name,password){
	const login = 'https://api.duaca.top/api/admin/login';
		console.log(name);
		console.log(password);

	fetch(login, {
		method: "POST",
		headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
        	user_name: name,
        	password: password,
        }),
    })
	.then((response) => response.json())
	.then((data) => {
		console.log(data);
		if(data.message == ""){
			console.log('Đăng nhập thành công');
			var token = getUrlParameter('token');
			token = data.payload.token;

			setCookie("token", data.payload.token ,1);
			window.location.href = 'index.html';
		}else{
			alert(data.message);
		}
		
	})
	.catch((err) => {
		console.log(err);
	});
}