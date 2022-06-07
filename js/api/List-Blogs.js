var h ="";

function getBase64(file) {
   var reader = new window.FileReader();
   //file  = file.target.files[0];
   if(file==null){
   		alertDone('Thông Báo','Vui lòng chọn ảnh');
   }else{
   		reader.readAsDataURL(file);
		   reader.onload = function () {
		   		
		   			h += reader.result;
		   			check = false;
		   		
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



listUser();
function listUser() {
	var html = ``;

	const login = 'https://api.duaca.top/api/admin/list-blogs';
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
				html += "<td>" + d.title+ "</td>";
				html += "<td><img style='width: 90%;' src='" + d.image + "'></td> ";
				html += "<td>" + d.detail + "</td> ";
				html += "<td>" + d.count_views + "</td> ";
				html += "<td>" + d.category_search_code + "</td> ";
				html += "<td>" + d.blog_code + "</td> ";
				html += "<td style='text-align:center;'>"
					+ "<a href='javascript:void(0)' class='btn btn-warning edit_user' id='edit_user' data-id='" + d.id + "' data-image='" + d.image+ "' data-title='" + d.title+ "'  data-detail='" + d.detail + "' data-count_views='" + d.count_views + "' data-category_search_code='" + d.category_search_code + "' data-blog_code='" + d.blog_code + "' >Sửa</a>"
					+ "<a href='javascript:void(0)' class='btn btn-info view_user' id='view_user' data-id='" + d.id + "' data-blog_code='" + d.blog_code + "'>Xem Chi Tiết</a>"
					+ "<a href='javascript:void(0)' class='btn btn-danger delete_user' data-id='" + d.id + "' data-blog_code='" + d.blog_code + "' >Xóa</a>"
					+ "</td> ";
				html += "</tr>";
			console.log(d.full_name);

			});

			document.getElementById('blog_code').innerHTML = html;

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
							fetch("https://api.duaca.top/api/admin/remove-blog", {
								method: "POST",
								headers: {
									Accept: "application/json, text/plain, */*",
									"Content-Type": "application/json",
									'Authorization': 'Bearer ' + getCookie('token'),
								},
								body: JSON.stringify({
									id: this.dataset.id,
									blog_code: this.dataset.blog_code,
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

					fetch("https://api.duaca.top/api/admin/detail-blog?id=" + this.dataset.id, {
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
									title: 'Detail Blog',
									width: 900,
									html: `
										<table>
											
											
											<tr>
												<td class="td1">Id : </td>
												<td class="td2">`+ data.payload.id + `</td>
											</tr>
											<tr>
												<td class="td1">title : </td>
												<td class="td2">`+ data.payload.title + `</td>
											</tr>
											<tr>
												<td class="td1">detail : </td>
												<td class="td2">`+ data.payload.detail + `</td>
											</tr>
											<tr>
												<td class="td1">count_views : </td>
												<td class="td2">`+ data.payload.count_views + `</td>
											</tr>
											<tr>
												<td class="td1">category_search_code : </td>
												<td class="td2">`+ data.payload.category_search_code+ `</td>
											</tr>
											<tr>
												<td class="td1">blog_code : </td>
												<td class="td2">`+ data.payload.blog_code + `</td>
											</tr>
										 </table>
										 <div style="margin:10px 0">
										 	<img title="icon" alt="icon" style="width:30%" src="`+ data.payload.image + `">
										 </div>
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
									<td class="td1">blog_code : </td>
									<td class="td2"><input class="form-control" id="blcode" value="` + this.dataset.blog_code + `" ></td>
								</tr>
								<tr>
									<td class="td1">image : </td>
									<td class="td2">
									  <div class="custom-file">
									    <input type="file" class="form-control custom-file-input" id="imageBase64" value="` + this.dataset.image + `">
									    <label class="custom-file-label" for="validatedCustomFile">Chọn lại avatar</label>
									  </div>
									</td>
								</tr>
								<tr>
									<td class="td1">category blog search : </td>
									<td class="td2">
									    <select class="form-control" id="category_search_code" value="` + this.dataset.category_search_code+ `">

									    </select>
									</td>
								</tr>
								<tr>
									<td class="td1">title : </td>
									<td class="td2"><input class="form-control" id="title" value="` + this.dataset.title + `"></td>
								</tr>
								<tr>
									<td class="td1">detail : </td>
									<td class="td2"><input class="form-control" id="detail" value="` + this.dataset.detail + `"></td>
								</tr>
								<tr>
									<td class="td1">count_views : </td>
									<td class="td2"><input class="form-control" id="count_views" value="` + this.dataset.count_views + `"></td>
								</tr>
							 </table>
							 `,
						preConfirm: function() {
						    
						  }
					    })
					.then((result) => {
					        
					    if (result.isConfirmed) {
					    	getBase64(document.querySelector('#imageBase64').files[0]);

				            delayedAlert(document.getElementById('id').value , document.getElementById('blcode').value , document.getElementById('category_search_code').value,document.getElementById('count_views').value,document.getElementById('detail').value,document.getElementById('title').value,);
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
	console.log(b1);
	console.log(b2);
	console.log(b3);
	console.log(b4);
	console.log(b5);
	console.log(b6);
	if(h == null){
		alertDone('Thông Báo','Vui lòng chọn ảnh');
	}else{
		fetch("https://api.duaca.top/api/admin/save-blog", {
			method: "POST",
			headers: {
	            Accept: "application/json, text/plain, */*",
	            "Content-Type": "application/json",
	            'Authorization': 'Bearer '+ getCookie('token'),
	        },
	        body: JSON.stringify({
	        	  id: b1,
						  imageBase64: h,
						  blog_code: b2,
							category_search_code: b3,
							count_views: b4,
							detail: b5,
							title: b6,
	        }),
	    })
	    .then(response => response.json()
	    )
	    .then((data) => {
	        console.log(data);
	        if(data.message==""){
	        	alertDone('Thông Báo','Đã sửa Blog thành công , nhấn vào refresh để làm mới dữ liệu');
	        }else{
	        	alertDone('ERROR',data.message);
	        }
	    })
	    .catch(error => {
	        console.log(error);
	        
	    })
	}
}