import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import "../../Styles/CreateFood.css";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../Notification";
import { error } from "ajv/dist/vocabularies/applicator/dependencies";
import { AuthContext } from "../../Context/authContext";

const CreateFood = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [videoURL, setVideoURL] = useState("");
  const [fileError, setFileError] = useState("");
  const fileInputRef = useRef(null);

  const { isPartner } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!videoFile) {
      setVideoURL("");
      return;
    }
    const url = URL.createObjectURL(videoFile);
    setVideoURL(url);
    return () => URL.revokeObjectURL(url);
  }, [videoFile]);

  const onFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) {
      setVideoFile(null);
      setFileError("");
      return;
    }
    if (!file.type.startsWith("video/")) {
      setFileError("Please select a valid video file.");
      return;
    }
    setFileError("");
    setVideoFile(file);
  };

  const handleSubmit = async (e) => {
    if (!isPartner) {
      handleError("Please Login as a foodPartner");
      return navigate("/food-partner/login");
    }

    handleSuccess("Uploading your reel... Please wait a moment");

    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("video", videoFile);

    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/item/food`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      }
    );

    const { success, message } = response.data;
    console.log(response);
    if (success) {
      handleSuccess(message);
      navigate("/");
    } else {
      handleError(error);
    }
  };

  const isDisabled = useMemo(
    () => !name.trim() || !videoFile,
    [name, videoFile]
  );

  return (
    <>
      <div className="create-food-container">
        <form className="create-food-form" onSubmit={handleSubmit}>
          <h2>Create Food Item</h2>
          <label>
            Food Video
            <input
              ref={fileInputRef}
              type="file"
              name="video"
              accept="video/*"
              onChange={onFileChange}
              required
            />
          </label>
          {fileError && (
            <p className="error-text" role="alert">
              {fileError}
            </p>
          )}
          {videoURL && (
            <div className="video-preview">
              <video
                className="video-preview-el"
                src={videoURL}
                controls
                playsInline
                preload="metadata"
              />
            </div>
          )}
          <label>
            Food Title
            <input
              type="text"
              name="title"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter food title"
              required
            />
          </label>
          <label>
            Food Description
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter food description"
              rows={4}
              required
            />
          </label>

          <button type="submit" disabled={isDisabled}>
            Create Food
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateFood;
