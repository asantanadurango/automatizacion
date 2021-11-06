let pagination = document.getElementsByClassName('custom-select custom-select-sm form-control form-control-sm')[0];
let option = document.createElement('option');
option.value = 3000;
option.label = '3000';
pagination.appendChild(option);

let data = [];

// code;
let tables = document.getElementsByTagName('tbody');
let table = document.getElementsByTagName('tbody')[0];
let trs = [...table.getElementsByTagName('tr')];
let completeIdsPage = trs.map((tr) => tr.firstChild.innerText);
let campos = [...document.querySelectorAll('.form-control')];
let inp_tipdoc = campos[0];
let inp_identificacion = campos[1];
let inp_digVerif = campos[2];
let inp_razonSoc = campos[3];
let inp_direccion = campos[4];
let inp_telefono = campos[5];
let inp_email = campos[6];
let btn_agregar = document.querySelector('.botonBlanco');

let setearCampos = (data) => {
	inp_tipdoc.value = 'NIT';
	inp_identificacion.value = data.DOCUMENTO.slice(0, -2);
	inp_digVerif.value = data.DOCUMENTO[data.DOCUMENTO.length - 1];
	inp_razonSoc.value = data.CLIENTE;
	inp_direccion.value = data.DIRECCION;
	inp_telefono.value = data.TELEFONO;
	inp_email.value = data.EMAIL;
};

let delay = (ms) => new Promise((res) => setTimeout(res, ms));

let processResponse = async (dataProcess) => {
	console.log('working');
	console.log(dataProcess);
	data = dataProcess.formatted; // datos formateados [.........]

	for (let element of data) {
		if (!completeIdsPage.includes(element.DOCUMENTO)) {
			console.log('Cargando ', element);
			setearCampos(element);

			//TODO: Click en el boton agregar
			btn_agregar.click();
			// peticiones http -> post -> response -> lanza el modal
			//                   |_______________|
			//                        time?
			///                      wait 3seg -> 1seg > 3seg X
			// Modal -> Si -> Cancelar segunda modal
			//         |___|
			//          time?
			//          wait 1seg

			//TODO: Esperar 3seg
			await delay(1000);
			let btn_confirm_modal = document.getElementsByClassName('swal2-confirm swal2-styled swal2-default-outline')[0];
			//TODO: Click en el modal -> opcion si
			btn_confirm_modal.click();
			await delay(1000);

			//TODO: Cerrar modal
			let btn_close_modal = document.getElementsByClassName('button botonBlanco m-auto mt-1 float-right')[3];
			btn_close_modal.click();
			await delay(500);
		}
	}
};

fetch('http://localhost:3000/')
	.then((response) => response.json())
	.then(processResponse);
