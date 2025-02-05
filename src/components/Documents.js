import * as pdfjsLib from "pdfjs-dist";
import React, { useEffect, useState } from "react";
import "./Documents.css";

function Documents() {
  const [pdfUrl, setPdfUrl] = useState("https://www.w3.org/WAI/WCAG21/quickref/pdf/sample.pdf");

  const canvasRef = React.createRef();

  useEffect(() => {
    const fetchPdf = async () => {
      const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
      const page = await pdf.getPage(1);
      const scale = 1.5;
      const viewport = page.getViewport({ scale });

      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      page.render(renderContext);
    };

    fetchPdf();
  }, [pdfUrl]);

  return (
    <div id="documents">
      <h1>Manage Your Documents</h1>
      <div className="upload-section">
        <input
          type="text"
          placeholder="Enter PDF URL"
          value={pdfUrl}
          onChange={(e) => setPdfUrl(e.target.value)}
        />
        <button onClick={() => alert("Simulated document upload")}>Upload</button>
      </div>

      <div className="doc-viewer">
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
}

export default Documents;
