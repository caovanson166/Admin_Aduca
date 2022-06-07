



var newuser = document.querySelector('.newuser');
newuser.addEventListener('click',function(){
	console.log(document.getElementById("title").value);
	console.log(document.getElementById("voucher_code").value);
	console.log(document.getElementById("voucher_price").value);
	console.log(document.getElementById("minimum_price").value);
	console.log(document.getElementById("expiry_date").value);
	console.log(document.getElementById("payments_flg").value);
	console.log(document.getElementById("summernote").value);
	fetch("https://api.duaca.top/api/admin/save-promotion", {
		method: "POST",
		headers: {
			Accept: "application/json, text/plain, */*",
			"Content-Type": "application/json",
			'Authorization': 'Bearer ' + getCookie('token'),
		},
		body: JSON.stringify({
			title: document.getElementById("title").value,
		  voucher_code:  document.getElementById("voucher_code").value,
		  voucher_price:  document.getElementById("voucher_price").value,
		  minimum_price:  document.getElementById("minimum_price").value,
		  expiry_date:  document.getElementById("expiry_date").value,
		  payments_flg:  document.getElementById("payments_flg").value,
		  detail:  document.getElementById("summernote").value,
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
	
})