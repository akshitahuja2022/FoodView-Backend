import axios from "axios";
import "../Styles/Recommand.css";
import React, { useContext, useEffect, useRef, useState } from "react";
import { handleError } from "./Notification";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/authContext";

function Recommand() {
  const navigate = useNavigate();
  const videoRefs = useRef(new Map());
  const [items, setItems] = useState([]);

  const { setIsNavbar } = useContext(AuthContext);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (!(video instanceof HTMLVideoElement)) return;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            if (!video.src && video.dataset.src) {
              video.src = video.dataset.src;
            }
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: [0, 0.25, 0.6, 0.9, 1] }
    );

    videoRefs.current.forEach((vid) => observer.observe(vid));
    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/item/getFood`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.success) {
          setItems(response.data.foodItems.slice(0, 4));
        } else {
          handleError(response.data.message);
        }
      });
  });

  const setVideoRef = (id) => (el) => {
    if (!el) {
      videoRefs.current.delete(id);
      return;
    }
    videoRefs.current.set(id, el);
  };

  return (
    <div className="recommand-container">
      <div className="heading">
        <h2>Recommanded For you</h2>
      </div>

      <div className="recommand-page">
        <div className="recommand-feed" role="list">
          {items.map((item) => (
            <section key={item._id} className="recommand" role="listitem">
              <video
                ref={setVideoRef(item._id)}
                className="recommand-video"
                data-src={item.video}
                preload="none"
                muted
                playsInline
                loop
              />
            </section>
          ))}
          <div
            onClick={() => {
              navigate("/reel");
              setIsNavbar(true);
            }}
            className="recommnad-btn"
          >
            <button className="btn">Watch More</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recommand;
