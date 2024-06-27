import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const StyledFileUploader = ({ thumbnail ,onFileUpload }) => {
  const [preview, setPreview] = useState(thumbnail || null);

  useEffect(() => {
    if (thumbnail && typeof thumbnail === 'string') {
      setPreview(`http://localhost:3000/${thumbnail}`);
    }
  }, [thumbnail]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const uploadedFile = acceptedFiles[0];
      if (onFileUpload) {
        onFileUpload(uploadedFile);
      }
      setPreview(URL.createObjectURL(uploadedFile)) 
      // const reader = new FileReader();
      // reader.onload = () => {
      //   setPreview(reader.result);
      // };
      // reader.readAsDataURL(uploadedFile);
    },
    [onFileUpload]
  );



  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className="upload-container"
      style={{
        border: "2px dashed #ddd",
        borderRadius: "12px",
        padding: "40px",
        textAlign: "center",
        cursor: "pointer",
        background: "#f9f9f9",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "200px",
      }}
    >
      <input {...getInputProps()} />
      {preview ? (
        <img
          src={preview}
          alt="Preview"
          style={{
            objectFit: "contain",
            maxHeight: "100%",
          }}
        />
      ) : (
        <div className="upload-icon" style={{ marginBottom: "16px" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M12 12V4m0 8l-3-3m3 3l3-3"
            />
          </svg>
        </div>
      )}
      {!preview && (
        <p style={{ color: "#555", fontSize: "16px" }}>Upload File</p>
      )}
    </div>
  );
};

export default StyledFileUploader;
