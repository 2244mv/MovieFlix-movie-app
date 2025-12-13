import { useEffect, useState } from "react";

import Banner1 from "../assets/banner1.jpg";
import Banner2 from "../assets/banner2.jpg";
import Banner3 from "../assets/banner3.jpg";

const banners = [Banner1, Banner2, Banner3];

const FeaturedBanner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000); // change slide every 4s

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="featured-banner">
      {/* Images */}
      {banners.map((img, index) => (
        <img
          key={index}
          src={img}
          alt="Banner"
          className={`banner-img ${index === current ? "visible" : "hidden"}`}
        />
      ))}

      {/* Overlay */}
      <div className="banner-overlay" />

      {/* Content */}
      <div className="banner-content">
        <h1>Unlimited Movies</h1>
        <p>Action • Drama • Comedy • Horror</p>
        <button className="banner-btn">Explore</button>
      </div>
    </div>
  );
};

export default FeaturedBanner;
