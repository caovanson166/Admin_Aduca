var html = ``;
listUser();
function listUser() {
	

	const login = 'https://api.duaca.top/api/admin/list-media';
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
				html += "<td>" + d.category_search_code + "</td> ";
				html += "<td>" + d.detail + "</td> ";
				html += "<td>" + d.link + "</td> ";
				html += "<td>" + d.media_code+ "</td> ";
				html += "<td>" + d.title + "</td> ";
				html += "<td>" + d.title_sub + "</td> ";
				html += "<td style='text-align:center;'>"
					+ "<a href='javascript:void(0)' class='btn btn-warning edit_user' id='edit_user' data-id='" + d.id + "' data-link='" + d.link + "' data-media_code='" + d.media_code + "' data-title='" + d.title + "' data-title_sub='" + d.title_sub + "' data-category_search_code='" + d.category_search_code + "' data-detail='" + d.detail  + "'>Cập nhật</a>"
					+ "<a href='javascript:void(0)' class='btn btn-info view_user' id='view_user' data-id='" + d.id + "' data-media_code='" + d.media_code + "'>Xem Chi Tiết</a>"
					+ "<a href='javascript:void(0)' class='btn btn-danger delete_user' data-id='" + d.id + "' data-media_code='" + d.media_code+ "' >Xóa</a>"
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
							fetch("https://api.duaca.top/api/admin/remove-media", {
								method: "POST",
								headers: {
									Accept: "application/json, text/plain, */*",
									"Content-Type": "application/json",
									'Authorization': 'Bearer ' + getCookie('token'),
								},
								body: JSON.stringify({
									id : this.dataset.id ,
									media_code : this.dataset.media_code ,
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

						

					fetch("https://api.duaca.top/api/admin/detail-media?id=" + this.dataset.id, {
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
									title: 'Detail Media',
									width: 900,
									html: `
										<table>
											<tr>
												<td class="td1">Id : </td>
												<td class="td2">`+ data.payload.id + `</td>
											</tr>
											<tr>
												<td class="td1">category_search_code : </td>
												<td class="td2">`+ data.payload.category_search_code+ `</td>
											</tr>
											<tr>
												<td class="td1">detail : </td>
												<td class="td2">`+ data.payload.detail + `</td>
											</tr>
											<tr>
												<td class="td1">link : </td>
												<td class="td2">`+ data.payload.link + `</td>
											</tr>
											<tr>
												<td class="td1">media_code : </td>
												<td class="td2">`+ data.payload.media_code+ `</td>
											</tr>
											<tr>
												<td class="td1">title: </td>
												<td class="td2">`+ data.payload.title + `</td>
											</tr>
											<tr>
												<td class="td1">title_sub : </td>
												<td class="td2">`+ data.payload.title_sub + `</td>
											</tr>
										 </table>
										 `,
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




					console.log(this.dataset.id);
					console.log(this.dataset.code);
					Swal.fire({
						title: 'Cập nhật bệnh nền',
						width: 900,
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
									<td class="td1">category_search_code : </td>
									<td class="td2">
									
										<select class="form-control" id="category_search_code" value="` + this.dataset.category_search_code + `">

										</select>
									</td>
								</tr>
								<tr>
									<td class="td1">detail : </td>
									<td class="td2"><input  class="form-control" id="detail" value="` + this.dataset.detail + `"></td>
								</tr>
								<tr>
									<td class="td1">link : </td>
									<td class="td2"><input  class="form-control" id="link" value="` + this.dataset.link + `"></td>
								</tr>
								<tr>
									<td class="td1">media_code : </td>
									<td class="td2"><input  class="form-control" id="media_code" value="` + this.dataset.media_code + `"></td>
								</tr>
								<tr>
									<td class="td1">title : </td>
									<td class="td2"><input  class="form-control" id="title" value="` + this.dataset.title + `"></td>
								</tr>
								<tr>
									<td class="td1">title_sub : </td>
									<td class="td2"><input  class="form-control" id="title_sub" value="` + this.dataset.title_sub + `"></td>
								</tr>
							 </table>
							 `,
						preConfirm: function() {
						    
						  }
					    })
					.then((result) => {
					        
					    if (result.isConfirmed) {
				            fetch("https://api.duaca.top/api/admin/save-media", {
									method: "POST",
									headers: {
							            Accept: "application/json, text/plain, */*",
							            "Content-Type": "application/json",
							            'Authorization': 'Bearer '+ getCookie('token'),
							        },
							        body: JSON.stringify({
										id: document.getElementById('id').value,
										category_search_code: document.getElementById('category_search_code').value,
										detail: document.getElementById('detail').value,
										link: document.getElementById('link').value,
										media_code:document.getElementById('media_code').value ,
										title: document.getElementById('title').value,
										title_sub: document.getElementById('title_sub').value,
							        }),
							    })
				                .then(response => response.json()
				                )
				                .then((data) => {
				                    console.log(data);
				                    if(data.message==""){
				                    	alertDone('Thông Báo','Đã sửa Media thành công , nhấn vào refresh hoặc tải lại trang để làm mới dữ liệu');
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


