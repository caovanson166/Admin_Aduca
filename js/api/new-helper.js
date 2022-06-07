
$(document).ready(function () {
	var $disabledResults = $("#user_code");
	$disabledResults.select2();
	// $(".#user_code").select2({
	//   maximumSelectionLength: 2
	// });
});
var html ="";
fetch("https://api.duaca.top/api/admin/list-category", {
	method: "get",
	headers: {
		Accept: "application/json, text/plain, */*",
		"Content-Type": "application/json",
		'Authorization': 'Bearer ' + getCookie('token'),
	},
})
.then((response) => response.json())
.then((data) => {
	console.log(data);
	if (data.message == "") {
		data.payload.forEach(d => {
				if(d.have_user == '1'){
					html+="<option value='"+d.category_code+"'>"+d.category_code+"</option>";
				}
			});
		document.getElementById('category_code').innerHTML = html;
	} else {
		console.log(data.message);
		alertDone('Thông Báo',data.message);
	}
})
.catch((err) => {
	console.log(err);
});

var h ="";
function getBase64(file) {
   var reader = new window.FileReader();
   //file  = file.target.files[0];
   reader.readAsDataURL(file);
   reader.onload = function () {

   			h += reader.result;

   };
}
 
// var file = document.querySelector('#icon').files[0];
// getBase64(file); 

var timeoutID;

function delayedAlert() {
  alertDone("Thông báo","Đang chờ xử lý");
  timeoutID = setTimeout(showAlert, 2000);
}

function showAlert() {
  fetch("https://api.duaca.top/api/admin/save-helper", {
		method: "POST",
		headers: {
			Accept: "application/json, text/plain, */*",
			"Content-Type": "application/json",
			'Authorization': 'Bearer ' + getCookie('token'),
		},
		body: JSON.stringify({
			  category_code: document.getElementById('category_code').value,
			  imageBase64: h,
			  full_name: document.getElementById('full_name').value,
			  phone: document.getElementById('phone').value,
			  detail: document.getElementById('detail').value,
			  star: document.getElementById('star').value,
			  orders_received: document.getElementById('orders_received').value,
		}),
	})
	.then((response) => response.json())
	.then((data) => {
		console.log(data);
		if (data.message == "") {
			alertDone('Thông Báo','Đã thêm 1 helper mới');
			
			//console.log(getBase64(document.querySelector('#banner').files[0]));
		} else {
			console.log(data.message);
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
	// alertDone('Thông Báo','Đang xử lý');
	
	//console.log(h);
})