import React, { useState } from "react";
import "./AddCompanyForm.scss";
import UploadImage from "../UploadImage/UploadImage";
import axios from "axios";
import { useSelector } from "react-redux";

function AddCompanyForm({ className, onClose }) {
  const [name, setName] = useState("");
  const [mainField, setMainField] = useState("");
  const [address, setAddress] = useState("");
  const [link, setLink] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [news, setNews] = useState([]);
  const [images, setImages] = useState([]);
  const [uploadComponents, setUploadComponents] = useState([]);

  const token = useSelector((state) => state.token);

  const handleNewsChange = (index, field, value) => {
    const updatedNews = [...news];
    updatedNews[index][field] = value;
    setNews(updatedNews);
  };

  const addNews = () => {
    setNews([
      ...news,
      {
        id: news.length,
        title: "",
        imageurl: [""],
        images: [""],
        content: [""],
        dateCreated: new Date().toISOString(),
        dateModified: new Date().toISOString(),
        companyId: 0,
        company: "",
      },
    ]);
  };

  const removeNews = (id) => {
    setNews(news.filter((_, index) => index !== id));
  };

  const addInput = () => {
    setUploadComponents([
      ...uploadComponents,
      {
        id: uploadComponents.length,
        component: (
          <UploadImage
            key={uploadComponents.length}
            onUpload={(files) => handleUpload(files, uploadComponents.length)}
          />
        ),
      },
    ]);
  };

  const handleUpload = (files, id) => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      newImages[id] = files;
      return newImages.flat();
    });
  };

  const removeInput = (id) => {
    setUploadComponents(uploadComponents.filter((item) => item.id !== id));
    setImages((prevImages) => prevImages.filter((_, index) => index !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const companyData = {
      name,
      mainField,
      address,
      link,
      images,
      phone,
      email,
      description,
    };
    console.log(companyData);

    const formData = new FormData();
    //formData.append("Id", 0);
    formData.append("name", name);
    formData.append("mainField", mainField);
    formData.append("address", address);
    formData.append("link", link);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("description", description);

    images.forEach((image, index) => {
      formData.append("images", image);
    });

    console.log(formData);

    try {
      const response = await axios.post(
        "https://localhost:7215/api/Companies",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token.value}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        alert("Company added successfully!");
        onClose();
      }
    } catch (error) {
      alert("Failed to add company.");
      console.error("Error adding company:", error);
    }
  };

  return (
    <div className={`add-company-form ${className}`}>
      <div className="form-content">
        <h1>Add Company</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="mainField">Main Field</label>
            <input
              type="text"
              id="mainField"
              value={mainField}
              onChange={(e) => setMainField(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="link">Website Link</label>
            <input
              type="url"
              id="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="upload-section">
            <h2>Images</h2>
            <button type="button" onClick={addInput} className="add-field-btn">
              Add Image
            </button>
            {uploadComponents.map((item) => (
              <div className="input-group" key={item.id}>
                {item.component}
                <button
                  className="delete"
                  type="button"
                  onClick={() => removeInput(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="news-section">
            <h2>News</h2>
            <button type="button" onClick={addNews}>
              Add News
            </button>
            {news.map((item, index) => (
              <div key={index} className="news-item">
                <label htmlFor={`news-title-${index}`}>Title</label>
                <input
                  type="text"
                  id={`news-title-${index}`}
                  value={item.title}
                  onChange={(e) =>
                    handleNewsChange(index, "title", e.target.value)
                  }
                />

                <label htmlFor={`news-content-${index}`}>Content</label>
                <textarea
                  id={`news-content-${index}`}
                  value={item.content}
                  onChange={(e) =>
                    handleNewsChange(index, "content", e.target.value)
                  }
                ></textarea>

                <button type="button" onClick={() => removeNews(index)}>
                  Remove News
                </button>
              </div>
            ))}
          </div>

          <div className="form-actions">
            <button type="submit">Submit</button>
            <button type="button" onClick={onClose} className="close-btn">
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCompanyForm;
