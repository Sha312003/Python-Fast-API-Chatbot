import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';


const FileUploadButton = () => {
  const [isDropzoneOpen, setDropzoneOpen] = useState(false);

  const onDrop = useCallback(async (acceptedFiles) => {
    setDropzoneOpen(false); // Close the dropzone after submitting the file

    const file = acceptedFiles[0];
    const filePath = file.path;

    try {
        const response = await fetch('http://localhost:8000/set_csv',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({filePath}),   
            });

    } catch (error) {
      // Handle error
      console.error('Error sending file path:', error);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleClick = () => {
    setDropzoneOpen(true);
  };

  return (
    <div>
      <button onClick={handleClick}>Open Dropzone</button>

      {isDropzoneOpen && (
        <div>
          <div {...getRootProps()} style={dropzoneStyle}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the file here...</p>
            ) : (
              <p>Drag & drop a file here, or click to select one</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const dropzoneStyle = {
  width: '300px',
  height: '150px',
  border: '2px dashed #ccc',
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
};

export default FileUploadButton;
