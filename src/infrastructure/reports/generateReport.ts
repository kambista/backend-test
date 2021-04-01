import { Workbook } from 'exceljs';

export const generateReportDebtResident = (nameReport: string, data) => {
	let exportParams = ParamsExportReport(nameReport);
	exportParams['data'] = data;
	return ExportXlsx(exportParams);
};

const ParamsExportReport = (sheetName: string) => {
	let infoHeader: Array<object> = [ [ `Reporte de deuda de Residentes` ] ];
	let dataHeader: Array<string> = [ 'Núm. placa', 'Tiempo estacionado (min.)', 'Cantidad a pagar' ];

	let dataModel: Array<object> = [
		{ key: 'licensePlate', width: 20 },
		{ key: 'totalMinutesParking', width: 30 },
		{ key: 'debt', width: 25 }
	];

	return {
		sheetName,
		infoHeader,
		dataHeader,
		dataModel
	};
};

function ExportXlsx(exportParams: any) {
	const workbook = new Workbook();
	let sheet = workbook.addWorksheet(exportParams.sheetName);
	let infoSheetHeader = exportParams.infoHeader;
	sheet.addRows(infoSheetHeader);
	sheet.getRow(8).height = 35;
	sheet.getRow(8).alignment = { vertical: 'middle', horizontal: 'center' };
	sheet.getRow(8).font = { name: 'Tahoma', size: 9 };
	sheet.getRow(8).values = exportParams.dataHeader;
	sheet.columns = exportParams.dataModel;
	sheet.addRows(exportParams.data);
	sheet.getRow(8).alignment = { vertical: 'middle', horizontal: 'center' };
	return workbook.xlsx;
}
