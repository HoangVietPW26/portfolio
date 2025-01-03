import React, { useState, useEffect } from "react";
import "./About.scss";
import { motion } from "framer-motion";

import { urlFor, client } from "../../client";
import { AppWrap, MotionWrap } from "../../wrapper";

const About = () => {
  const [abouts, setAbouts] = useState([]);
  window.abouts = abouts;
  window.urlFor = urlFor;
  useEffect(() => {
    const query = '*[_type == "abouts"]';
    client.fetch(query).then((data) => {
      setAbouts(data);
    });
  }, []);

  if (abouts.length > 0) {
    console.log(abouts[0].imgUrl);
    console.log(urlFor(abouts[0].imgUrl).url());
  }

  return (
    <>
      <h2 className="head-text">
        I Know That <span>Good Apps</span>
        <br /> means <span>Good Business</span>
      </h2>
      <div className="app__profile">
        {abouts.map((about, index) => {
          console.log(urlFor(about.imgUrl));
          return (
            <motion.div
              whileInView={{ opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.5, type: "tween" }}
              className="app__profile-item"
              key={about.title + index}
            >
              <img src={urlFor(about.imgUrl)} alt={about.title} />
              <h2 className="bold-text" style={{ marginTop: 20 }}>
                {about.description}
              </h2>
            </motion.div>
          );
        })}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(About, "app__about"),
  "about",
  "app__whitebg"
);
