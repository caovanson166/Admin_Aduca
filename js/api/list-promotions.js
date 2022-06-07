var h ="";
var g ="";
var check = true;
function getBase64(file) {
   var reader = new window.FileReader();
   //file  = file.target.files[0];
   if(file==null){
   		alertDone('Thông Báo','Vui lòng chọn ảnh');
   }else{
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
}

var timeoutID;
var b1,b2,b3,b4,b5,b6="";
function delayedAlert(a1,a2,a3,a4,a5,a6) {
  b1=a1;b2=a2;b3=a3;b4=a4;b5=a5;b6=a6;
  alertDone("Thông báo","Đang chờ xử lý");
  timeoutID = setTimeout(showAlert, 3000);
}

function delete_user(id, user_code) {
	console.log(id);
	fetch("https://api.duaca.top/api/admin/remove-user", {
		method: "POST",
		headers: {
			Accept: "application/json, text/plain, */*",
			'Authorization': 'Bearer ' + getCookie('token'),
		},
		body: JSON.stringify({
			id: id,
			user_code: user_code,
		}),
	})
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			if (data.message == "") {
				console.log('đã xóa');
				console.log(data.message);
			} else {
				alert(data.message);
			}

		})
		.catch((err) => {
			console.log(err);
		});
}

listUser();
function listUser() {
	var html = ``;

	const login = 'https://api.duaca.top/api/admin/list-promotions';
	fetch(login, {
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
			data.payload.forEach(d => {
				html += "<tr>";
				html += "<td>" + d.title + "</td>";
				html += "<td>" + d.voucher_code + "</td> ";
				html += "<td>" + d.voucher_price + "</td> ";
				html += "<td>" + d.promotion_code + "</td> ";
				html += "<td>" + d.payments_flg + "</td> ";
				html += "<td>" + d.expiry_date + "</td> ";
				html += "<td style='text-align:center;'>"
					+ "<a href='javascript:void(0)' class='btn btn-warning edit_user' id='edit_user' data-id='" + d.id + "' data-detail='" + d.detail + "' data-payments_flg='" + d.payments_flg + "' data-expiry_date='" + d.expiry_date+ "'  data-minimum_price='" + d.minimum_price + "' data-promotion_code='" + d.promotion_code + "' data-title='" + d.title + "' data-voucher_code='" + d.voucher_code + "'  data-voucher_price='" + d.voucher_price+ "' >Sửa</a>"
					+ "<a href='javascript:void(0)' class='btn btn-info view_user' id='view_user' data-id='" + d.id + "' data-promotion_code='" + d.promotion_code + "'>Xem Chi Tiết</a>"
					+ "<a href='javascript:void(0)' class='btn btn-danger delete_user' data-id='" + d.id + "' data-promotion_code='" + d.promotion_code + "' >Xóa</a>"
					+ "</td> ";
				html += "</tr>";
			});
			document.getElementById('list-promotions').innerHTML = html;

			$(document).ready(function () {
				$('#datatablesSimple').DataTable({ "order": [[2, 'desc']] });
				//$('#some-id').trigger('click');

			});
			var delete_user = document.querySelectorAll('.delete_user');
			console.log(delete_user.length);
			for (var i = 0; i < delete_user.length; i++) {
				delete_user[i].addEventListener('click', function () {
					console.log(this.dataset.id);
					console.log(this.dataset.promotion_code);
					Swal.fire({
						title: 'Are you sure?',
						text: "You won't be able to revert this!",
						icon: 'warning',
						showCancelButton: true,
						confirmButtonColor: '#3085d6',
						cancelButtonColor: '#d33',
						confirmButtonText: 'Yes, delete it!'
					}).then((result) => {
						if (result.value) {
							fetch("https://api.duaca.top/api/admin/remove-promotion", {
								method: "POST",
								headers: {
									Accept: "application/json, text/plain, */*",
									"Content-Type": "application/json",
									'Authorization': 'Bearer ' + getCookie('token'),
								},
								body: JSON.stringify({
									id: this.dataset.id,
									promotion_code : this.dataset.promotion_code,
								}),
							})
								.then((response) => response.json())
								.then((data) => {
									console.log(data);
									if (data.message == "") {
										console.log('đã xóa');
										console.log(data.message);
										$(this).parent().parent().remove();
										Swal.fire(
											'Deleted!',
											'Your category has been deleted.',
											'success'
										)
									} else {
										alert(data.message);
									}

								})
								.catch((err) => {
									console.log(err);
								});

						}
					})

				});
			}
			// --------------------------------------------------
			var view_user = document.querySelectorAll('.view_user');
			console.log(view_user.length);
			for (var i = 0; i < view_user.length; i++) {
				view_user[i].addEventListener('click', function () {

					fetch("https://api.duaca.top/api/admin/detail-promotion?id=" + this.dataset.id, {
						method: "GET",
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
								Swal.fire({
									title: 'Detail Promotions!',
									width: 900,
									html: `
										<table>
											
											<tr>
												<td class="td1">id : </td>
												<td class="td2">`+ data.payload.id + `</td>
											</tr>
											<tr>
												<td class="td1">title : </td>
												<td class="td2">`+ data.payload.title + `</td>
											</tr>
											<tr>
												<td class="td1">promotion_code : </td>
												<td class="td2">`+ data.payload.promotion_code + `</td>
											</tr>
											<tr>
												<td class="td1">voucher_code : </td>
												<td class="td2">`+ data.payload.voucher_code + `</td>
											</tr>
											<tr>
												<td class="td1">voucher_price : </td>
												<td class="td2">`+ data.payload.voucher_price + `</td>
											</tr>
											<tr>
												<td class="td1">payments_flg : </td>
												<td class="td2">`+ data.payload.payments_flg + `</td>
											</tr>
											<tr>
												<td class="td1">minimum_price: </td>
												<td class="td2">`+ data.payload.minimum_price + `</td>
											</tr>
											<tr>
												<td class="td1">expiry_date: </td>
												<td class="td2">`+ data.payload.expiry_date + `</td>
											</tr>
											<tr>
												<td class="td1">detail: </td>
												<td class="td2">`+ data.payload.detail + `</td>
											</tr>

										 </table>
										 
										 `,
									imageUrl: data.payload.avatar,
								})
							} else {
								alert(data.message);
							}

						})
						.catch((err) => {
							console.log(err);
						});

						


				});
			}
			// ------------------------------------------------------
			var edit_user = document.querySelectorAll('.edit_user');
			console.log(edit_user.length);
			for (var i = 0; i < edit_user.length; i++) {
				edit_user[i].addEventListener('click', function () {

					console.log(this.dataset.id);
					$(document).ready(function() {
			              $('#summernote').summernote({
			                height: 200
			              });
			            });
					Swal.fire({
						title: 'Cập nhật khuyến mãi',
						width: 700,

				        showCancelButton: true,
				        showLoaderOnConfirm: true,
				        confirmButtonText: 'Xác Nhận Sửa',
						html: `
							<table class="row">
								<tr class="row">
									<td class="td1">Id : </td>
									<td class="td2"><input readonly class="form-control" id="id" value="` + this.dataset.id + `"></td>
								</tr>
								<tr class="row">
									<td class="td1">promotion_code : </td>
									<td class="td2"><input class="form-control" id="promotion_code" value="` + this.dataset.promotion_code + `" ></td>
								</tr>
								<tr class="row">
									<td class="td1">title : </td>
									<td class="td2"><input  class="form-control" id="title" value="` + this.dataset.title + `"></td>
								</tr>
								<tr class="row">
									<td class="td1">voucher_code : </td>
									<td class="td2"><input class="form-control" id="voucher_code" value="` + this.dataset.voucher_code + `"></td>
								</tr>
								<tr class="row">
									<td class="td1">voucher_price : </td>
									<td class="td2"><input class="form-control" id="voucher_price" value="` + this.dataset.voucher_price + `"></td>
								</tr>
								<tr class="row">
									<td class="td1">minimum_price : </td>
									<td class="td2"><input class="form-control" id="minimum_price" value="` + this.dataset.minimum_price+ `"></td>
								</tr>
								<tr class="row">
									<td class="td1">expiry_date : </td>
									<td class="td2"><input class="form-control" type="date" id="expiry_date" value="` + this.dataset.expiry_date+ `"></td>
								</tr>
								<tr class="row">
									<td class="td1">payments_flg : </td>
									<td class="td2">
										<select class="form-control form-control-lg" id="payments_flg"  value="` + this.dataset.payments_flg + `">
											<option value="01">Thanh toán Duaca</option>
											<option value="02">Tiền mặt</option>
										</select>
									</td>
								</tr>
								<tr class="row">
									<td class="td1">detail : </td>
									<td class="td2">
										<textarea class="form-control detail" id="summernote" name="editordata">` + this.dataset.detail + `</textarea>
									</td>
								</tr>
							 </table>
							 `,
						preConfirm: function() {
						    
						  }
					    })
					.then((result) => {
					        $(document).ready(function() {
			              $('#summernote').summernote({
			                height: 200
			              });
			            });

					    if (result.isConfirmed) {
					    	 console.log(document.getElementById('id').value);
										        console.log(document.getElementById('promotion_code').value);
										        console.log(document.getElementById('title').value);
										        console.log(document.getElementById('voucher_code').value);
										        console.log(document.getElementById('voucher_price').value);
										        console.log(document.getElementById('payments_flg').value);
										        console.log(document.getElementById('summernote').value);
										        console.log(document.getElementById('expiry_date').value);
										        if(document.getElementById('expiry_date').value==""){
										        	alertDone("ERROR",'Bạn vui lòng điền đầy đủ dữ liệu');
										        }else{
										        		fetch("https://api.duaca.top/api/admin/save-promotion", {
												method: "POST",
												headers: {
										            Accept: "application/json, text/plain, */*",
										            "Content-Type": "application/json",
										            'Authorization': 'Bearer '+ getCookie('token'),
										        },
										        body: JSON.stringify({
										        	  id: document.getElementById('id').value,
															  promotion_code: document.getElementById('promotion_code').value, 
															  title: document.getElementById('title').value,
															  voucher_code:  document.getElementById('voucher_code').value,
															  voucher_price: document.getElementById('voucher_price').value ,
															  minimum_price: document.getElementById('minimum_price').value,
															  payments_flg: document.getElementById('payments_flg').value,
															  detail: document.getElementById('summernote').value,
															  expiry_date: document.getElementById('expiry_date').value,
										        }),
										    })
										    .then(response => response.json()
										    )
										    .then((data) => {
										        console.log(data);
										       
										        if(data.message==""){
										        	alertDone('Thông Báo','Đã sửa thông báo thành công , nhấn vào refresh để làm mới dữ liệu');
										        }else{
										        	alertDone('ERROR',data.message);
										        }
										    })
										    .catch(error => {
										        console.log(error);
										        
										    })
										        }
					    			
										
				            
				        } 
						    	  
					        
					    })
		                
		        });
		    }
		    // ------------------------------------------
	})
	.catch((err) => {
		console.log(err);
	});
}


function showAlert(){
	
		
}