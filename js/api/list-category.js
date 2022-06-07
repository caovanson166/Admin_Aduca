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

		   			h += reader.result;
		   };
   }
}

var timeoutID;
var b1,b2,b3,b4,b5="";
function delayedAlert(a1,a2,a3,a4,a5) {
  b1=a1;b2=a2;b3=a3;b4=a4;b5=a5;
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

	const login = 'https://api.duaca.top/api/admin/list-category';
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
				html += "<td>" + d.id + "</td> ";
				html += "<td>" + d.category_name + "</td>";
				html += "<td><img style='width: 90%;' src='" + d.image + "'></td> ";
				html += "<td>" + d.category_code + "</td> ";
				html += "<td>" + d.description + "</td> ";
				html += "<td>" + d.have_user + "</td> ";
				html += "<td style='text-align:center;'>"
					+ "<a href='javascript:void(0)' class='btn btn-warning edit_user' id='edit_user' data-id='" + d.id + "' data-category_code='" + d.category_code + "' data-category_name='" + d.category_name+ "'  data-description='" + d.description + "' data-have_user='" + d.have_user + "' data-image='" + d.image + "' >Cập nhật</a>"
					//+ "<a href='javascript:void(0)' class='btn btn-info view_user' id='view_user' data-id='" + d.id + "' data-category_code='" + d.category_code + "'>Xem Chi Tiết</a>"
					+ "<a href='javascript:void(0)' class='btn btn-danger delete_user' data-id='" + d.id + "' data-category_code='" + d.category_code + "' >Xóa</a>"
					+ "</td> ";
				html += "</tr>";
			});
			document.getElementById('category').innerHTML = html;

			$(document).ready(function () {
				$('#datatablesSimple').DataTable({ "order": [[2, 'desc']] });
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
							fetch("https://api.duaca.top/api/admin/remove-category", {
								method: "POST",
								headers: {
									Accept: "application/json, text/plain, */*",
									"Content-Type": "application/json",
									'Authorization': 'Bearer ' + getCookie('token'),
								},
								body: JSON.stringify({
									id: this.dataset.id,
									category_code: this.dataset.category_code,
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

					fetch("https://api.duaca.top/api/admin/detail-category?id=" + this.dataset.id, {
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
												<td class="td1">category_name : </td>
												<td class="td2">`+ data.payload.category_name + `</td>
											</tr>
											<tr>
												<td class="td1">category_code : </td>
												<td class="td2">`+ data.payload.category_code + `</td>
											</tr>
											<tr>
												<td class="td1">description : </td>
												<td class="td2">`+ data.payload.description + `</td>
											</tr>
											<tr>
												<td class="td1">have_user : </td>
												<td class="td2">`+ data.payload.have_user + `</td>
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
										 	<img title="banner" alt="banner" style="width:30%" src="`+ data.payload.image + `">
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
									<td class="td1">category_code : </td>
									<td class="td2"><input class="form-control" id="category_code" value="` + this.dataset.category_code + `" ></td>
								</tr>
								<tr>
									<td class="td1">Image : </td>
									<td class="td2">
									  <div class="custom-file">
									    <input type="file" class="form-control custom-file-input" id="imageBase64" value="` + this.dataset.imageBase64 + `">
									    <label class="custom-file-label" for="validatedCustomFile">Chọn lại image</label>
									  </div>
									</td>
								</tr>
								<tr>
									<td class="td1">category_name : </td>
									<td class="td2"><input  class="form-control" id="category_name" value="` + this.dataset.category_name + `"></td>
								</tr>
								<tr>
									<td class="td1">description : </td>
									<td class="td2"><input class="form-control" id="description" value="` + this.dataset.description + `"></td>
								</tr>
								<tr>
									<td class="td1">have_user : </td>
									<td class="td2"><input  class="form-control" id="have_user" value="` + this.dataset.have_user + `"></td>
								</tr>
							 </table>
							 `,
						preConfirm: function() {
						    
						  }
					    })
					.then((result) => {
					        
					    if (result.isConfirmed) {
					    			getBase64(document.querySelector('#imageBase64').files[0]);
				            delayedAlert(document.getElementById('id').value,document.getElementById('category_code').value,document.getElementById('category_name').value,document.getElementById('description').value,document.getElementById('have_user').value);
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
		fetch("https://api.duaca.top/api/admin/save-category", {
			method: "POST",
			headers: {
	            Accept: "application/json, text/plain, */*",
	            "Content-Type": "application/json",
	            'Authorization': 'Bearer '+ getCookie('token'),
	        },
	        body: JSON.stringify({
	        	  id: b1,
						  category_code: b2, 
						  imageBannerBase64: h,
						  category_name: b3 ,
						  description: b4,
						  have_user: b5,
	        }),
	    })
	    .then(response => response.json()
	    )
	    .then((data) => {
	        console.log(data);
	        if(data.message==""){
	        	alertDone('Thông Báo','Đã sửa doanh mục thành công , nhấn vào refresh để làm mới dữ liệu');
	        }else{
	        	alertDone('ERROR',data.message);
	        }
	    })
	    .catch(error => {
	        console.log(error);
	        
	    })
	}
}