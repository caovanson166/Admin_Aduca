
listUser();
function listUser() {
	var html = ``;

	const login = 'https://api.duaca.top/api/admin/list-allergic-food';
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
				html += "<td>" + d.id + "</td>";
				html += "<td>" + d.allergic_food_name + "</td> ";
				html += "<td>" + d.allergic_food_code+ "</td> ";
				html += "<td style='text-align:center;'>"
					+ "<a href='javascript:void(0)' class='btn btn-warning edit_user' id='edit_user' data-id='" + d.id + "' data-allergic_food_name='" + d.allergic_food_name + "' data-allergic_food_code='" + d.allergic_food_code  + "'>Cập nhật</a>"
					+ "<a href='javascript:void(0)' class='btn btn-danger delete_user' data-id='" + d.id + "' data-code='" + d.allergic_food_code + "' >Xóa</a>"
					+ "</td> ";
				html += "</tr>";
			});
			document.getElementById('list-alleergic').innerHTML = html;

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
							fetch("https://api.duaca.top/api/admin/remove-allergic-food", {
								method: "POST",
								headers: {
									Accept: "application/json, text/plain, */*",
									"Content-Type": "application/json",
									'Authorization': 'Bearer ' + getCookie('token'),
								},
								body: JSON.stringify({
									id : this.dataset.id ,
									allergic_food_code : this.dataset.code ,
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

					fetch("https://api.duaca.top/api/admin/detail-user?id=" + this.dataset.id, {
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
									title: 'Sweet!',
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
												<td class="td1">Email : </td>
												<td class="td2">`+ data.payload.email + `</td>
											</tr>
											<tr>
												<td class="td1">Is_inactived : </td>
												<td class="td2">`+ data.payload.is_inactived + `</td>
											</tr>
											<tr>
												<td class="td1">OTP_CODE : </td>
												<td class="td2">`+ data.payload.otp_code + `</td>
											</tr>
											<tr>
												<td class="td1">Phone Number : </td>
												<td class="td2">`+ data.payload.phone + `</td>
											</tr>
											<tr>
												<td class="td1">User_code : </td>
												<td class="td2">`+ data.payload.user_code + `</td>
											</tr>
											<tr>
												<td class="td1">Token: </td>
												<td class="td2">`+ data.payload.token + `</td>
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
					console.log(this.dataset.code);
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
									<td class="td1">Allergic food name : </td>
									<td class="td2"><input  class="form-control" id="name" value="` + this.dataset.allergic_food_name + `"></td>
								</tr>
								<tr>
									<td class="td1">Allergic food code : </td>
									<td class="td2"><input  class="form-control" id="code" value="` + this.dataset.allergic_food_code + `"></td>
								</tr>
							 </table>
							 `,
						preConfirm: function() {
						    
						  }
					    })
					.then((result) => {
					        
					    if (result.isConfirmed) {
				            fetch("https://api.duaca.top/api/admin/save-allergic-food", {
									method: "POST",
									headers: {
							            Accept: "application/json, text/plain, */*",
							            "Content-Type": "application/json",
							            'Authorization': 'Bearer '+ getCookie('token'),
							        },
							        body: JSON.stringify({
							        	id: document.getElementById('id').value,
							        	allergic_food_code:  document.getElementById('code').value,
							        	allergic_food_name:  document.getElementById('name').value,
							        }),
							    })
				                .then(response => response.json()
				                )
				                .then((data) => {
				                    console.log(data);
				                    if(data.message==""){
				                    	alertDone('Thông Báo','Đã sửa thực phẩm thành công , nhấn vào refresh hoặc tải lại trang để làm mới dữ liệu');
				                    }else{
				                    	alertDone('ERROR',data.message);
				                    }
				                })
				                .catch(error => {
				                    console.log(error);
				                    
				                })
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


