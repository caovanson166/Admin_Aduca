
$(document).ready(function () {
	var $disabledResults = $("#user_code");
	$disabledResults.select2();
	// $(".#user_code").select2({
	//   maximumSelectionLength: 2
	// });
});
var html ="";
fetch("https://api.duaca.top/api/admin/list-category-blog-search", {
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
				
					html+="<option value='"+d.category_search_code+"'>"+d.category_search_name+"</option>";
				
			});
		document.getElementById('category_search_code').innerHTML = html;
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
 

var timeoutID;

function delayedAlert() {
  alertDone("Thông báo","Đang chờ xử lý");
  timeoutID = setTimeout(showAlert, 2000);
}

function showAlert() {
  fetch("https://api.duaca.top/api/admin/save-blog", {
		method: "POST",
		headers: {
			Accept: "application/json, text/plain, */*",
			"Content-Type": "application/json",
			'Authorization': 'Bearer ' + getCookie('token'),
		},
		body: JSON.stringify({

			  imageBase64: h,
			  category_search_code:  document.getElementById('category_search_code').value,
			  title:  document.getElementById('title').value,
			  detail:  document.getElementById('detail').value,
			  count_views:  document.getElementById('count_views').value,
		}),
	})
	.then((response) => response.json())
	.then((data) => {
		console.log(data);
		if (data.message == "") {
			alertDone('Thông Báo','Đã thêm 1 Blog mới');
			
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