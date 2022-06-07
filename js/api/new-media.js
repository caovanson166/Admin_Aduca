
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




  


var newuser = document.querySelector('.newuser');
newuser.addEventListener('click',function(){
			fetch("https://api.duaca.top/api/admin/save-media", {
		method: "POST",
		headers: {
			Accept: "application/json, text/plain, */*",
			"Content-Type": "application/json",
			'Authorization': 'Bearer ' + getCookie('token'),
		},
		body: JSON.stringify({
			  category_search_code: document.getElementById('category_search_code').value,
			  title: document.getElementById('title').value,
			  title_sub:document.getElementById('title_sub').value,
			  link: document.getElementById('link').value,
			  detail:document.getElementById('detail').value,
		}),
	})
	.then((response) => response.json())
	.then((data) => {
		console.log(data);
		if (data.message == "") {
			alertDone('Thông Báo','Đã thêm 1 media mới');
			
			//console.log(getBase64(document.querySelector('#banner').files[0]));
		} else {
			console.log(data.message);
			alertDone('Thông Báo',data.message);
		}
	})
	.catch((err) => {
		console.log(err);
	});

})