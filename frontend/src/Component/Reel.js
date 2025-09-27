import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/Reel.css";
import axios from "axios";
import { handleError } from "./Notification";
import { AuthContext } from "../Context/authContext";

const Reel = () => {
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
      .get(`${process.env.REACT_APP_BACKEND_URL}/item/getFood`)
      .then((response) => {
        if (response.data.success) {
          setItems(response.data.foodItems);
        } else {
          handleError(response.data.message);
        }
      });
  }, []);

  const setVideoRef = (id) => (el) => {
    if (!el) {
      videoRefs.current.delete(id);
      return;
    }
    videoRefs.current.set(id, el);
  };

  return (
    <div className="reels-page">
      <div className="reels-feed" role="list">
        {items.map((item) => (
          <section key={item._id} className="reel" role="listitem">
            <video
              ref={setVideoRef(item._id)}
              className="reel-video"
              data-src={item.video}
              preload="none"
              muted
              playsInline
              loop
            />

            <div className="reel-content">
              <p className="reel-name" title={item.name}>
                {item.name}
              </p>
              <p className="reel-description" title={item.description}>
                {item.description}
              </p>
              {item.foodPartner && (
                <Link
                  onClick={() => setIsNavbar(false)}
                  className="reel-btn"
                  to={"/food-partner/" + item.foodPartner}
                  aria-label="Visit store"
                >
                  Visit store
                </Link>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Reel;
