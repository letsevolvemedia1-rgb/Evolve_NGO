import "server-only";

import ExcelJS from "exceljs";

export type ExportColumn<T> = {
  header: string;
  key: string;
  width?: number;
  numFmt?: string;
  value: (row: T) => string | number | boolean | Date | null | undefined;
};

export type BuildWorkbookOptions<T> = {
  sheetName: string;
  columns: ExportColumn<T>[];
  rows: T[];
};

export async function buildWorkbookBuffer<T>({
  sheetName,
  columns,
  rows,
}: BuildWorkbookOptions<T>): Promise<Buffer> {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "Evolve Sangh Foundation";
  workbook.created = new Date();

  const sheet = workbook.addWorksheet(sheetName, {
    views: [{ state: "frozen", ySplit: 1 }],
  });

  sheet.columns = columns.map((col) => ({
    header: col.header,
    key: col.key,
    width: col.width ?? 18,
    style: col.numFmt ? { numFmt: col.numFmt } : undefined,
  }));

  for (const row of rows) {
    const values: Record<string, string | number | boolean | Date | null> = {};
    for (const col of columns) {
      const v = col.value(row);
      values[col.key] = v === undefined ? null : v;
    }
    sheet.addRow(values);
  }

  const headerRow = sheet.getRow(1);
  headerRow.font = { bold: true, color: { argb: "FFFFFFFF" }, size: 12 };
  headerRow.alignment = { vertical: "middle", horizontal: "left" };
  headerRow.height = 22;
  headerRow.eachCell((cell) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF0067A5" },
    };
    cell.border = {
      bottom: { style: "thin", color: { argb: "FF003056" } },
    };
  });

  const arrayBuffer = await workbook.xlsx.writeBuffer();
  return Buffer.from(arrayBuffer as ArrayBuffer);
}

export function exportFilename(prefix: string) {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${prefix}-${y}-${m}-${day}_${hh}${mm}.xlsx`;
}
