
$(document).ready(function () {
	var $disabledResults = $("#user_code");
	$disabledResults.select2();
});

var h ="";
var g ="";
var check = true;
function getBase64(file) {
   try {
   	var reader = new window.FileReader();
	   //file  = file.target.files[0];
	   reader.readAsDataURL(file);
	   reader.onload = function () {
	   			h += reader.result;
	   };
   } catch(e) {
   	alertDone("ERROR","Vui lòng chọn ảnh");
   	console.log(e);
   }
}
 
// var file = document.querySelector('#icon').files[0];
// getBase64(file); 

var timeoutID;

function delayedAlert() {
  alertDone("Thông báo","Đang chờ xử lý");
  timeoutID = setTimeout(showAlert, 2000);
}

function showAlert() {
  fetch("https://api.duaca.top/api/admin/save-category", {
		method: "POST",
		headers: {
			Accept: "application/json, text/plain, */*",
			"Content-Type": "application/json",
			'Authorization': 'Bearer ' + getCookie('token'),
		},
		body: JSON.stringify({
			imageBase64 : h,
			category_name : document.getElementById('category_name').value,
			description : document.getElementById('description').value,
			have_user : document.getElementById('have_user').value,
		}),
	})
	.then((response) => response.json())
	.then((data) => {
		console.log(data);
		if (data.message == "") {
			alertDone('Thông Báo','Đã thêm 1 doanh mục mới');
			
			//console.log(getBase64(document.querySelector('#banner').files[0]));
		} else {
			console.log(data.message);
			console.log(h);
			console.log(document.getElementById('category_name').value);
			console.log(document.getElementById('description').value);
			console.log(document.getElementById('have_user').value);
			alertDone('Thông Báo',data.message);
		}
	})
	.catch((err) => {
		console.log(err);
	});
}

function clearAlert() {
  clearTimeout(timeoutID);
}

var newuser = document.querySelector('.newuser');
newuser.addEventListener('click',function(){
	getBase64(document.querySelector('#imageBase64').files[0]);
	console.log(h);
	delayedAlert();
})