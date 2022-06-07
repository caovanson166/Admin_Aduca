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

	const login = 'https://api.duaca.top/api/admin/list-notifications';
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
				html += "<td>" + d.full_name + "</td>";
				html += "<td><img style='width: 90%;' src='" + d.icon + "'></td> ";
				html += "<td><img style='width: 90%;' src='" + d.banner + "'></td> ";
				html += "<td>" + d.user_code + "</td> ";
				html += "<td>" + d.title + "</td> ";
				html += "<td>" + d.type + "</td> ";
				html += "<td>" + d.isRead + "</td> ";
				html += "<td style='text-align:center;'>"
					+ "<a href='javascript:void(0)' class='btn btn-warning edit_user' id='edit_user' data-id='" + d.id + "' data-payments_flg='" + d.payments_flg + "' data-content='" + d.content+ "'  data-title='" + d.title + "' data-code='" + d.notification_code + "' data-banner='" + d.banner + "' data-icon='" + d.icon + "'  data-type='" + d.type+ "' >Sửa</a>"
					+ "<a href='javascript:void(0)' class='btn btn-info view_user' id='view_user' data-id='" + d.id + "' data-code='" + d.notification_code + "'>Xem Chi Tiết</a>"
					+ "<a href='javascript:void(0)' class='btn btn-danger delete_user' data-id='" + d.id + "' data-code='" + d.notification_code + "' >Xóa</a>"
					+ "</td> ";
				html += "</tr>";
			});
			// data.payload.forEach(d => {
			// 	const para = document.createElement("tr");

			// 	const td = document.createElement("td");
			// 	td.innerHTML = d.full_name;
			// 	para.appendChild(td);
			// 	const td1 = document.createElement("td");
			// 	td1.innerHTML = d.phone;
			// 	para.appendChild(td1);
			// 	const td2 = document.createElement("td");
			// 	td2.innerHTML = d.user_code;
			// 	para.appendChild(td2);
			// 	const td3 = document.createElement("td");
			// 	td3.innerHTML = d.role;
			// 	para.appendChild(td3);
			// 	const td4 = document.createElement("td");

			// 	const a = document.createElement("a");
			// 	td4.appendChild(a);
			// 	a.className = 'btn btn-danger delete_user';
			// 	a.dataset.id = 'abc()';
			// 	a.innerHTML = "Xóa";
			// 	para.appendChild(td4);

			// 	document.getElementById('user').appendChild(para);
			// });
			document.getElementById('list-notifications').innerHTML = html;

			$(document).ready(function () {
				$('#datatablesSimple').DataTable({ "order": [[2, 'desc']] });
				//$('#some-id').trigger('click');

			});
			var delete_user = document.querySelectorAll('.delete_user');
			console.log(delete_user.length);
			for (var i = 0; i < delete_user.length; i++) {
				delete_user[i].addEventListener('click', function () {
					console.log(this.dataset.id);
					console.log(this.dataset.code);
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
							fetch("https://api.duaca.top/api/admin/remove-notification", {
								method: "POST",
								headers: {
									Accept: "application/json, text/plain, */*",
									"Content-Type": "application/json",
									'Authorization': 'Bearer ' + getCookie('token'),
								},
								body: JSON.stringify({
									id: this.dataset.id,
									notification_code: this.dataset.code,
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

					fetch("https://api.duaca.top/api/admin/detail-notification?id=" + this.dataset.id, {
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
									title: 'Detail Notification!',
									width: 900,
									html: `
										<table>
											
											
											<tr>
												<td class="td1">Id : </td>
												<td class="td2">`+ data.payload.id + `</td>
											</tr>
											<tr>
												<td class="td1">Full Name : </td>
												<td class="td2">`+ data.payload.full_name + `</td>
											</tr>
											<tr>
												<td class="td1">Content : </td>
												<td class="td2">`+ data.payload.content + `</td>
											</tr>
											<tr>
												<td class="td1">isRead : </td>
												<td class="td2">`+ data.payload.isRead + `</td>
											</tr>
											<tr>
												<td class="td1">Notification_Code : </td>
												<td class="td2">`+ data.payload.notification_code + `</td>
											</tr>
											<tr>
												<td class="td1">Payments_flg : </td>
												<td class="td2">`+ data.payload.payments_flg + `</td>
											</tr>
											<tr>
												<td class="td1">Title: </td>
												<td class="td2">`+ data.payload.title + `</td>
											</tr>
											<tr>
												<td class="td1">Type: </td>
												<td class="td2">`+ data.payload.type + `</td>
											</tr>
											<tr>
												<td class="td1">User_Code: </td>
												<td class="td2">`+ data.payload.user_code + `</td>
											</tr>	
										 </table>
										 <div class="" style="margin:10px 0">
										 	<img title="banner" alt="banner" style="width:30%" src="`+ data.payload.banner + `">
										 </div>
										 <div style="margin:10px 0">
										 	<img title="icon" alt="icon" style="width:30%" src="`+ data.payload.icon + `">
										 </div>
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
					Swal.fire({
						title: 'Sweet!',
						width: 900,
						// inputAttributes: {
				  //           autocapitalize: 'off'
				  //       },
				        showCancelButton: true,
				        showLoaderOnConfirm: true,
				        confirmButtonText: 'Xác Nhận Sửa',
						html: `
							<table>
								<tr>
									<td class="td1">Id : </td>
									<td class="td2"><input readonly class="form-control" id="id" value="` + this.dataset.id + `"></td>
								</tr>
								<tr>
									<td class="td1">notification_code : </td>
									<td class="td2"><input class="form-control" id="notification_code" value="` + this.dataset.code + `" ></td>
								</tr>
								<tr>
									<td class="td1">Banner : </td>
									<td class="td2">
									  <div class="custom-file">
									    <input type="file" class="form-control custom-file-input" id="banner" value="` + this.dataset.banner + `">
									    <label class="custom-file-label" for="validatedCustomFile">Chọn lại banner</label>
									  </div>
									</td>
								</tr>
								<tr>
									<td class="td1">Icon : </td>
									<td class="td2">
										<div class="custom-file">
										    <input type="file"  class="form-control custom-file-input" id="icon" value="` + this.dataset.icon + `" >
										    <label class="custom-file-label" for="validatedCustomFile">Chọn lại icon</label>
										  </div>
									</td>
								</tr>
								<tr>
									<td class="td1">Type : </td>
									<td class="td2"><input  class="form-control" id="type" value="` + this.dataset.type + `"></td>
								</tr>
								<tr>
									<td class="td1">Title : </td>
									<td class="td2"><input class="form-control" id="title" value="` + this.dataset.title + `"></td>
								</tr>
								<tr>
									<td class="td1">payments_flg : </td>
									<td class="td2">
										<select class="form-control form-control-lg" id="payments_flg"  value="` + this.dataset.payments_flg + `">
											<option value="01">Thanh toán Duaca</option>
											<option value="02">Tiền mặt</option>
										</select>
									</td>
								</tr>
								<tr>
									<td class="td1">content : </td>
									<td class="td2"><input  class="form-control" id="content" value="` + this.dataset.content + `"></td>
								</tr>
							 </table>
							 `,
						preConfirm: function() {
						    
						  }
					    })
					.then((result) => {
					        
					    if (result.isConfirmed) {
					    	getBase64(document.querySelector('#banner').files[0]);
							getBase64(document.querySelector('#icon').files[0]);
				            delayedAlert(document.getElementById('id').value,document.getElementById('notification_code').value,document.getElementById('type').value,document.getElementById('title').value,document.getElementById('payments_flg').value,document.getElementById('content').value,);
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
	if(h == null || g == null){
		alertDone('Thông Báo','Vui lòng chọn ảnh');
	}else{
		fetch("https://api.duaca.top/api/admin/save-notification", {
			method: "POST",
			headers: {
	            Accept: "application/json, text/plain, */*",
	            "Content-Type": "application/json",
	            'Authorization': 'Bearer '+ getCookie('token'),
	        },
	        body: JSON.stringify({
	        	  id: b1,
				  notification_code: b2, 
				  imageBannerBase64: h,
				  imageIconBase64:  g,
				  type: b3 ,
				  title: b4,
				  payments_flg: b5,
				  content: b6,
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