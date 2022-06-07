
var newuser = document.querySelector('.newuser');
newuser.addEventListener('click',function(){
	fetch("https://api.duaca.top/api/admin/save-user", {
		method: "POST",
		headers: {
			Accept: "application/json, text/plain, */*",
			"Content-Type": "application/json",
			'Authorization': 'Bearer ' + getCookie('token'),
		},
		body: JSON.stringify({
        	phone:  document.getElementById('phone').value,
        	email:  document.getElementById('email').value,
        	full_name:  document.getElementById('name').value,
		}),
	})
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			if (data.message == "") {
				alertDone('Thông Báo','Đã thêm 1 user mới');
			} else {
				console.log(data.message);
				alertDone('Thông Báo',data.message);
			}
		})
		.catch((err) => {
			console.log(err);
		});
})

var newuser = document.querySelector('.newuser');
newuser.addEventListener('click',function(){
	fetch("https://api.duaca.top/api/admin/change-password", {
		method: "POST",
		headers: {
			Accept: "application/json, text/plain, */*",
			"Content-Type": "application/json",
			'Authorization': 'Bearer ' + getCookie('token'),
		},
		body: JSON.stringify({
        	password:  document.getElementById('pass').value,
        	newPassword:  document.getElementById('new-pass').value,
		}),
	})
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			if (data.message == "") {
				alertDone('Thông Báo','Đã đổi mật khẩu');
			} else {
				console.log(data.message);
				alertDone('Thông Báo',data.message);
			}
		})
		.catch((err) => {
			console.log(err);
		});
})