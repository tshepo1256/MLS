// DocumentUpload.js
import React, { useState } from 'react';
import './DocumentUpload.css';

const DocumentUpload = ({ data, onUpdate }) => {
  const [localData, setLocalData] = useState(data);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = () => {
    if (file) {
      setLocalData((prevData) => [...prevData, file.name]);
      setFile(null);
    }
  };

  const handleSave = () => {
    onUpdate(localData);
  };

  return (
    <div className="document-upload">
      <h2>Upload Documents</h2>
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={uploadFile}>Upload Document</button>
      </div>
      <div className="uploaded-documents">
        {localData.map((doc, index) => (
          <div key={index}>{doc}</div>
        ))}
      </div>
      <button onClick={handleSave}>Save and Continue</button>
    </div>
  );
};

export default DocumentUpload;
