
$(document).ready(function () {
	var $disabledResults = $("#user_code");
	$disabledResults.select2();
	// $(".#user_code").select2({
	//   maximumSelectionLength: 2
	// });
});
var html ="";
fetch("https://api.duaca.top/api/admin/list-users", {
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
				html+="<option value='"+d.user_code+"'>"+d.id+"."+d.user_code+" - "+d.full_name+"</option>";
			});
		document.getElementById('user_code').innerHTML = html;
	} else {
		console.log(data.message);
		alertDone('Thông Báo',data.message);
	}
})
.catch((err) => {
	console.log(err);
});

var h ="";
var g ="";
var check = true;
function getBase64(file) {
   var reader = new window.FileReader();
   //file  = file.target.files[0];
   reader.readAsDataURL(file);
   reader.onload = function () {
   		if(check == true){
   			h += reader.result;
   			check = false;
   		}else{
   			g += reader.result;
   			check = true;
   		}
   };
}
 
// var file = document.querySelector('#icon').files[0];
// getBase64(file); 

var timeoutID;

function delayedAlert() {
  alertDone("Thông báo","Đang chờ xử lý");
  timeoutID = setTimeout(showAlert, 3000);
}

function showAlert() {
  fetch("https://api.duaca.top/api/admin/save-notification", {
		method: "POST",
		headers: {
			Accept: "application/json, text/plain, */*",
			"Content-Type": "application/json",
			'Authorization': 'Bearer ' + getCookie('token'),
		},
		body: JSON.stringify({
			imageBannerBase64  : h,
			imageIconBase64  : g,
			type : document.getElementById('type').value,
			title : document.getElementById('title').value,
			payments_flg : document.getElementById('payments_flg').value,
			content : document.getElementById('content').value,
			users: [document.querySelector('#user_code').value] ,
		}),
	})
	.then((response) => response.json())
	.then((data) => {
		console.log(data);
		if (data.message == "") {
			alertDone('Thông Báo','Đã thêm 1 thông báo mới');
			
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
	getBase64(document.querySelector('#banner').files[0]);
	getBase64(document.querySelector('#icon').files[0]);
	console.log(h);
	delayedAlert();
	// alertDone('Thông Báo','Đang xử lý');
	
	//console.log(h);
})