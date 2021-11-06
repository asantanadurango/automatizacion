var XLSX = require('xlsx');
var path = require('path');

exports.GetDataFromExcel = () => {
	console.log('Consultando datos desde archivo de excel');
	const excelPath = path.join(__dirname, '..', 'database', 'database.xlsx');
	const excel = XLSX.readFile(excelPath);
	var nombreHoja = excel.SheetNames;
	const datos = XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[0]]);
	return datos;
};
