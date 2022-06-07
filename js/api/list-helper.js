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
function delayedAlert(a1,a2,a3,a4,a5,a6,a7,a8) {
  b1=a1;b2=a2;b3=a3;b4=a4;b5=a5;b6=a6;b7=a7;b8=a8;
  alertDone("Thông báo","Đang chờ xử lý");
  timeoutID = setTimeout(showAlert, 3000);
}



listUser();
function listUser() {
	var html = ``;

	const login = 'https://api.duaca.top/api/admin/list-helpers';
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
				html += "<td><img style='width: 90%;' src='" + d.avatar + "'></td> ";
				html += "<td>" + d.category_name + "</td> ";
				html += "<td>" + d.detail + "</td> ";
				html += "<td>" + d.phone + "</td> ";
				html += "<td>" + d.orders_received + "</td> ";
				html += "<td style='text-align:center;'>"
					+ "<a href='javascript:void(0)' class='btn btn-warning edit_user' id='edit_user' data-id='" + d.id + "' data-avatar='" + d.avatar + "' data-category_code='" + d.category_code+ "'  data-category_name='" + d.category_name + "' data-detail='" + d.detail + "' data-full_name='" + d.full_name + "' data-star='" + d.star + "' data-phone='" + d.phone + "' data-helper_code='" + d.helper_code + "'  data-orders_received='" + d.orders_received+ "' >Sửa</a>"
					+ "<a href='javascript:void(0)' class='btn btn-info view_user' id='view_user' data-id='" + d.id + "' data-helper_code='" + d.helper_code + "'>Xem Chi Tiết</a>"
					+ "<a href='javascript:void(0)' class='btn btn-danger delete_user' data-id='" + d.id + "' data-helper_code='" + d.helper_code + "' >Xóa</a>"
					+ "</td> ";
				html += "</tr>";
			console.log(d.full_name);

			});

			document.getElementById('helper').innerHTML = html;

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
							fetch("https://api.duaca.top/api/admin/remove-helper", {
								method: "POST",
								headers: {
									Accept: "application/json, text/plain, */*",
									"Content-Type": "application/json",
									'Authorization': 'Bearer ' + getCookie('token'),
								},
								body: JSON.stringify({
									id: this.dataset.id,
									helper_code: this.dataset.helper_code,
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

					fetch("https://api.duaca.top/api/admin/detail-helper?id=" + this.dataset.id, {
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
									title: 'Detail helper',
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
												<td class="td1">category_name : </td>
												<td class="td2">`+ data.payload.category_name + `</td>
											</tr>
											<tr>
												<td class="td1">category_code : </td>
												<td class="td2">`+ data.payload.category_code + `</td>
											</tr>
											<tr>
												<td class="td1">detail : </td>
												<td class="td2">`+ data.payload.detail + `</td>
											</tr>
											<tr>
												<td class="td1">helper_code : </td>
												<td class="td2">`+ data.payload.helper_code + `</td>
											</tr>
											<tr>
												<td class="td1">orders_received : </td>
												<td class="td2">`+ data.payload.orders_received + `</td>
											</tr>
											<tr>
												<td class="td1">phone : </td>
												<td class="td2">`+ data.payload.phone + `</td>
											</tr>
											<tr>
												<td class="td1">star : </td>
												<td class="td2">`+ data.payload.star + `</td>
											</tr>	
										 </table>
										 <div style="margin:10px 0">
										 	<img title="icon" alt="icon" style="width:30%" src="`+ data.payload.avatar + `">
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
					fetch("https://api.duaca.top/api/admin/list-category", {
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
									if(d.have_user == '1'){
										html+="<option value='"+d.category_code+"'>"+d.category_code+"</option>";
									}
								});
							document.getElementById('category_code').innerHTML = html;
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
									<td class="td1">helper_code : </td>
									<td class="td2"><input class="form-control" id="helper_code" value="` + this.dataset.helper_code + `" ></td>
								</tr>
								<tr>
									<td class="td1">avatar : </td>
									<td class="td2">
									  <div class="custom-file">
									    <input type="file" class="form-control custom-file-input" id="imageBase64" value="` + this.dataset.banner + `">
									    <label class="custom-file-label" for="validatedCustomFile">Chọn lại avatar</label>
									  </div>
									</td>
								</tr>
								<tr>
									<td class="td1">category_code : </td>
									<td class="td2">
									    <select class="form-control" id="category_code" value="` + this.dataset.category_code + `">

									    </select>
									</td>
								</tr>
								<tr>
									<td class="td1">full_name : </td>
									<td class="td2"><input class="form-control" id="full_name" value="` + this.dataset.full_name + `"></td>
								</tr>
								<tr>
									<td class="td1">phone : </td>
									<td class="td2"><input class="form-control" id="phone" value="` + this.dataset.phone + `"></td>
								</tr>
								<tr>
									<td class="td1">detail : </td>
									<td class="td2"><input class="form-control" id="detail" value="` + this.dataset.detail + `"></td>
								</tr>
								<tr>
									<td class="td1">star : </td>
									<td class="td2"><input class="form-control" id="star" value="` + this.dataset.star + `"></td>
								</tr>
								<tr>
									<td class="td1">orders_received : </td>
									<td class="td2"><input  class="form-control" id="orders_received" value="` + this.dataset.orders_received + `"></td>
								</tr>
							 </table>
							 `,
						preConfirm: function() {
						    
						  }
					    })
					.then((result) => {
					        
					    if (result.isConfirmed) {
					    	getBase64(document.querySelector('#imageBase64').files[0]);
					    	console.log(document.getElementById('star').value);
				            delayedAlert(document.getElementById('id').value,document.getElementById('helper_code').value,document.getElementById('category_code').value,document.getElementById('full_name').value,document.getElementById('phone').value,document.getElementById('detail').value,document.getElementById('star').value,document.getElementById('orders_received').value,);
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
	if(h == null){
		alertDone('Thông Báo','Vui lòng chọn ảnh');
	}else{
		fetch("https://api.duaca.top/api/admin/save-helper", {
			method: "POST",
			headers: {
	            Accept: "application/json, text/plain, */*",
	            "Content-Type": "application/json",
	            'Authorization': 'Bearer '+ getCookie('token'),
	        },
	        body: JSON.stringify({
	        	  id: b1,
						  helper_code: b2,
						  category_code: b3,
						  imageBase64: h,
						  full_name: b4,
						  phone: b5,
						  detail: b6,
						  star: b7,
						  orders_received: b8,
	        }),
	    })
	    .then(response => response.json()
	    )
	    .then((data) => {
	        console.log(data);
	        if(data.message==""){
	        	alertDone('Thông Báo','Đã sửa helper thành công , nhấn vào refresh để làm mới dữ liệu');
	        }else{
	        	alertDone('ERROR',data.message);
	        }
	    })
	    .catch(error => {
	        console.log(error);
	        
	    })
	}
}