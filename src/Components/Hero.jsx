import React from "react";
import Divider from './Divider'

const Hero = () => {
  return (
    <div className="px-[30%] mt-10">
      <div className="profile-image flex items-center justify-center">
        <div className="w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[300px] md:h-[300px] border-2 border-green-500 rounded-full overflow-hidden shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl">
          <img
            className="w-full h-full object-cover"
            src="https://img.freepik.com/free-photo/artist-white_1368-3543.jpg?t=st=1738512624~exp=1738516224~hmac=ee0455f85b80d9c9fec2fe2d89045b9fd6c5b5e826be98dad013e20ac5c508b0&w=740"
            alt="Profile"
          />
        </div>
      </div>
      <div className="profile-description text-center mt-8 px-4">
        <h1 className="text-4xl font-bold text-white mb-2">
          Hi, I'm <span className="text-green-600">Ashiqe</span>
        </h1>
        <p className="text-xl text-white mb-6 mt-6">
          Fullstack Web Developer specializing in the MERN stack with <br />expertise
          in JavaScript, React, Node.js, and MongoDB.
        </p>

        <div className="resume mb-6">
          <a
            href="/path/to/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-2 bg-inherit border border-dotted divide-dotted text-white font-semibold rounded-lg hover:bg-green-600 transition-all"
          >
            View My Resume
          </a>
        </div>
      </div>

      <div className="connect text-center mt-8 px-4 ">
        <h3 className="text-lg font-semibold text-white mb-4">
          Connect with me
        </h3>
        <div className="flex justify-center gap-6 mb-6 ">
          <a
            href="https://github.com/your-username"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-green-500 transition-all"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/muhammad-ashiqe"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-green-500 transition-all"
          >
            LinkedIn
          </a>
          <a
            href="mailto:ashiqe.dev@gmail.com"
            className="text-white hover:text-green-500 transition-all"
          >
            Gmail
          </a>
        </div>

        <p className="text-white mb-2">Or</p>
        <p className="text-white font-semibold mb-4">ashiqe.dev@gmail.com</p>
        <p className="text-white font-semibold">Request a call</p>

        <Divider />
      </div>
    </div>
  );
};

export default Hero;
