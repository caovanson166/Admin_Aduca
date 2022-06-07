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

	const login = 'https://api.duaca.top/api/admin/list-users';
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
				html += "<td>" + d.phone + "</td> ";
				html += "<td>" + d.user_code + "</td> ";
				html += "<td>" + d.role + "</td> ";
				html += "<td style='text-align:center;'>"
					+ "<a href='javascript:void(0)' class='btn btn-warning edit_user' id='edit_user' data-id='" + d.id + "' data-name='" + d.full_name + "' data-code='" + d.user_code + "'  data-email='" + d.email + "'>Sửa</a>"
					+ "<a href='javascript:void(0)' class='btn btn-info view_user' id='view_user' data-id='" + d.id + "' data-code='" + d.user_code + "'>Xem Chi Tiết</a>"
					+ "<a href='javascript:void(0)' class='btn btn-danger delete_user' data-id='" + d.id + "' data-code='" + d.user_code + "' >Xóa</a>"
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
			document.getElementById('user').innerHTML = html;

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
							fetch("https://api.duaca.top/api/admin/remove-user", {
								method: "POST",
								headers: {
									Accept: "application/json, text/plain, */*",
									"Content-Type": "application/json",
									'Authorization': 'Bearer ' + getCookie('token'),
								},
								body: JSON.stringify({
									id: this.dataset.id,
									user_code: this.dataset.code,
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
									<td class="td1">Full Name : </td>
									<td class="td2"><input  class="form-control" id="full_name" value="` + this.dataset.name + `"></td>
								</tr>
								<tr>
									<td class="td1">Email : </td>
									<td class="td2"><input  class="form-control" id="email" value="` + this.dataset.email + `"></td>
								</tr>
								<tr>
									<td class="td1">User_code : </td>
									<td class="td2"><input  class="form-control" id="user_code" value="` + this.dataset.code + `"></td>
								</tr>
							 </table>
							 `,
						preConfirm: function() {
						    
						  }
					    })
					.then((result) => {
					        
					    if (result.isConfirmed) {
				            fetch("https://api.duaca.top/api/admin/save-user", {
									method: "POST",
									headers: {
							            Accept: "application/json, text/plain, */*",
							            "Content-Type": "application/json",
							            'Authorization': 'Bearer '+ getCookie('token'),
							        },
							        body: JSON.stringify({
							        	id: document.getElementById('id').value,
							        	user_code:  document.getElementById('user_code').value,
							        	email:  document.getElementById('email').value,
							        	full_name:  document.getElementById('full_name').value,
							        }),
							    })
				                .then(response => response.json()
				                )
				                .then((data) => {
				                    console.log(data);
				                    if(data.message==""){
				                    	alertDone('Thông Báo','Đã sửa user thành công , nhấn vào refresh để làm mới dữ liệu');
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


