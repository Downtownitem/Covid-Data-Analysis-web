import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

pdfjs.GlobalWorkerOptions.workerSrc = `cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.j`;

interface PDFViewerProps {
  fileUrl: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ fileUrl }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const goToPrevPage = () => setPageNumber((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () =>
    setPageNumber((prev) => Math.min(prev + 1, numPages || prev));

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <div style={{ marginTop: "10px" }}>
        <button onClick={goToPrevPage} disabled={pageNumber === 1}>
          Previous
        </button>
        <span style={{ margin: "0 10px" }}>
          Page {pageNumber} of {numPages}
        </span>
        <button onClick={goToNextPage} disabled={pageNumber === numPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default function About() {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <PDFViewer fileUrl="/informe.pdf" />
    </div>
  );
}
