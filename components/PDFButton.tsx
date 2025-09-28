'use client';
import Button from '@mui/material/Button';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

type Props = { tableId?: string; filename?: string; data?: any[]; columns?: { header: string, dataKey: string }[] };

export default function PDFButton({ tableId, filename = 'export.pdf', data, columns }: Props) {
  return (
    <Button variant="outlined" onClick={() => {
      const doc = new jsPDF();
      if (tableId) {
        autoTable(doc, { html: `#${tableId}` });
      } else if (data && columns) {
        autoTable(doc, { columns, body: data });
      } else {
        doc.text('No data', 14, 16);
      }
      doc.save(filename);
    }}>Export to PDF</Button>
  );
}
