import React from "react";
import { BsInstagram, BsLinkedin, BsGithub } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { useState } from "react";

const SocialMedia = () => {
  return (
    <div className="app__social">
      <div className="app__social-link">
        <a href="https://www.linkedin.com/in/hoangviet2610/" target="_blank">
          <BsLinkedin />
        </a>
      </div>
      <div className="app__social-link">
        <a href="https://github.com/HoangVietPW26" target="_blank">
          <BsGithub />
        </a>
      </div>
      <div className="app__social-link">
        <a href="https://www.facebook.com/VietNguyen26.10/" target="_blank">
          <FaFacebookF />
        </a>
      </div>
    </div>
  );
};

export default SocialMedia;
