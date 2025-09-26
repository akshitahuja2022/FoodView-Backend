import React, { useState, useEffect, useContext } from "react";
import "../../Styles/PartnerProfile.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { assets } from "../../assets/assets";
import { FaTrashAlt } from "react-icons/fa";
import { handleError, handleSuccess } from "../Notification";
import { AuthContext } from "../../Context/authContext";
const PartnerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);

  const { setIsPartner, isPartner, partnerId } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/item/food-partner/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setProfile(response.data.foodPartner);
        setVideos(response.data.foodPartner.foodItems);
      });
  }, [id]);

  const handleDeleteVideo = (id) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/item/delete/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.success) {
          handleSuccess(response.data.message);
          setVideos((prev) => prev.filter((v) => v._id !== id));
        } else {
          handleError(response.data.message);
        }
      })
      .catch((err) => {
        handleError(err);
      });
  };

  const handleLogout = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/auth/food-partner/logout`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.success) {
          handleSuccess(response.data.message);
          setTimeout(() => navigate("/"), 1000);
          setIsPartner(false);
        } else {
          handleError(response.data.message);
        }
      })
      .catch((err) => {
        handleError(err);
      });
  };

  return (
    <main className="profile-page">
      <section className="profile-header">
        <div className="profile-meta">
          <img className="profile-avatar" src={assets.heroImg} alt="" />

          <div className="profile-info">
            <h1 className="profile-pill profile-business" title="Business name">
              {profile?.name}
            </h1>

            <div
              className="profile-pill profile-address details"
              title="Address"
            >
              <p className="profile-email">Email: {profile?.email} </p>
              <span> Phone No. : {profile?.phone}</span>
            </div>

            <p className="profile-pill profile-address" title="Address">
              {profile?.address}
            </p>

            {isPartner && partnerId === profile?._id && (
              <div onClick={handleLogout} className="buttons">
                <button className="btn">Logout</button>
              </div>
            )}
          </div>
        </div>

        <div className="profile-stats" role="list" aria-label="Stats">
          <div className="profile-stat" role="listitem">
            <span className="profile-stat-label">total meals</span>
            <span className="profile-stat-value">{videos.length}</span>
          </div>
          <div className="profile-stat" role="listitem">
            <span className="profile-stat-label">customer served</span>
            <span className="profile-stat-value">45K</span>
          </div>
        </div>
      </section>

      <section className="profile-grid" aria-label="Videos">
        {videos.map((v) => (
          <div key={v.id} className="profile-grid-item">
            <video
              key={v.id}
              className="profile-grid-video"
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
              src={v.video}
              muted
            />

            {isPartner && partnerId === profile?._id && (
              <div
                onClick={() => handleDeleteVideo(v._id)}
                className="delete-icon"
              >
                <FaTrashAlt />
              </div>
            )}
          </div>
        ))}
      </section>
    </main>
  );
};

export default PartnerProfile;
