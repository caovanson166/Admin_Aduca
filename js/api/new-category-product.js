
var newuser = document.querySelector('.newuser');
newuser.addEventListener('click',function(){
	fetch("https://api.duaca.top/api/admin/save-category-product", {
		method: "POST",
		headers: {
			Accept: "application/json, text/plain, */*",
			"Content-Type": "application/json",
			'Authorization': 'Bearer ' + getCookie('token'),
		},
		body: JSON.stringify({
        	category_products_name :  document.getElementById('name').value,
		}),
	})
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			if (data.message == "") {
				alertDone('Thông Báo','Đã thêm 1 category product mới');
			} else {
				console.log(data.message);
				alertDone('Thông Báo',data.message);
			}
		})
		.catch((err) => {
			console.log(err);
		});
})