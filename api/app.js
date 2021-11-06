const express = require('express');
var cors = require('cors');
const app = express();
const port = 3000;
const excelBusiness = require('./business/excel');

app.use(cors());
app.get('/', (req, res) => {
	const data = excelBusiness.GetDataFromExcel();

	const nits = data.map((d) => d.DOCUMENTO);

	console.log('Validando datos');

	console.log('Obteniendo duplicados');
	let duplicates = data.filter((d) => data.filter((d2) => d2.DOCUMENTO.toString() === d.DOCUMENTO.toString() && nits.includes(d.DOCUMENTO.toString())).length > 1);

	console.log('Formateando datos');
	let formatted = data.map((d) => ({
		...d,
		TELEFONO: (d.TELEFONO.toString().toUpperCase().includes('EXT') ? d.TELEFONO.toString().slice(0, d.TELEFONO.toString().toUpperCase().indexOf('EXT')) : d.TELEFONO).toString().trim(),
		DIRECCION: `${d.DIRECCION} - ${d.CIUDAD}`,
		EMAIL: d['CORREO ELECTRONICO'],
	}));
	let invalid = formatted.filter((f) => f.DIRECCION.toString().length > 100 || !f.EMAIL || !f.DOCUMENTO.toString().includes('-'));
	formatted = formatted.filter((f) => f.DIRECCION.toString().length <= 100 && f.EMAIL && f.DOCUMENTO.toString().includes('-'));

	console.log('Eliminando CORREO ELECTRONICO...');
	formatted.forEach((element) => {
		delete element['CORREO ELECTRONICO'];
	});

	res.send({
		formatted,
		data,
		invalid,
		duplicates,
	});
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
