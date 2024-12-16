// File: UploadImage.jsx
import React, { useState } from "react";
import "./UploadImage.scss";
const UploadImage = ({ onUpload }) => {
  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [open, setOpen] = useState(false);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setImages(files);

    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);

    // Call onUpload immediately after files are selected
    if (onUpload) {
      onUpload(files);
    }
  };

  const handleImageClick = (index) => {
    setSelectedImage(previewUrls[index]);
    setOpen(true);
  };

  return (
    <div className="upload-image">
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
      />

      <div className="preview">
        {previewUrls.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`preview-${index}`}
            style={{
              width: "100px",
              height: "100px",
              marginRight: "10px",
              cursor: "pointer",
            }}
            onClick={() => handleImageClick(index)}
          />
        ))}
      </div>

      {selectedImage && open && (
        <div className="selected-image">
          <h3>Selected Image Preview</h3>
          <img
            src={selectedImage}
            alt="Selected"
            style={{ width: "100%", height: "300px", marginTop: "20px" }}
            onClick={() => setOpen(false)}
          />
        </div>
      )}
    </div>
  );
};

export default UploadImage;

// Usage Example:
// <UploadImage onUpload={(images) => console.log(images)} />
