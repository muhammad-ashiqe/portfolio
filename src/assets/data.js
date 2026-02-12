import {
  SiJavascript,
  SiTypescript,
  SiDart,
  SiHtml5,
  SiCss3,
  SiReact,
  SiTailwindcss,
  SiBootstrap,
  SiFlutter,
  SiNodedotjs,
  SiExpress,
  SiNestjs,
  SiMongodb,
  SiMysql,
  SiGit,
  SiGithub,
  SiCloudinary,
  SiJsonwebtokens,
  SiRedux,
  SiPrisma,
  SiFirebase,
  SiPostman,
  SiNetlify,
  SiVercel,
  SiRender,
  SiAdobephotoshop,
  SiFigma,
  SiRazorpay,
  SiStripe,
} from "react-icons/si";
import { FaJava, FaFileWord } from "react-icons/fa";

const programmingLanguages = [
  { id: 1, name: "JavaScript", icon: SiJavascript, color: "#f7df1e" },
  { id: 2, name: "TypeScript", icon: SiTypescript, color: "#3178c6" },
  { id: 3, name: "Dart", icon: SiDart, color: "#0175c2" },
  { id: 99, name: "Java", icon: FaJava, color: "#007396" },
];

const frontendDevelopment = [
  { id: 4, name: "HTML", icon: SiHtml5, color: "#e34f26" },
  { id: 5, name: "CSS", icon: SiCss3, color: "#1572b6" },
  { id: 3, name: "React", icon: SiReact, color: "#61dafb" },
  { id: 6, name: "Tailwind", icon: SiTailwindcss, color: "#38b2ac" },
  { id: 7, name: "Bootstrap", icon: SiBootstrap, color: "#7952b3" },
  { id: 8, name: "Flutter", icon: SiFlutter, color: "#02569b" },
];

const backendAndDatabase = [
  { id: 8, name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { id: 9, name: "Express.js", icon: SiExpress, color: "#000000" }, // Express icon is usually black/white
  { id: 10, name: "Nest.js", icon: SiNestjs, color: "#e0234e" },
  { id: 11, name: "MongoDB", icon: SiMongodb, color: "#47a248" },
  { id: 12, name: "MySql", icon: SiMysql, color: "#4479a1" },
];

const librariesAndDevTools = [
  { id: 11, name: "Git", icon: SiGit, color: "#f05032" },
  { id: 12, name: "GitHub", icon: SiGithub, color: "#181717" },
  { id: 13, name: "Cloudinary", icon: SiCloudinary, color: "#3448c5" },
  { id: 14, name: "JWT", icon: SiJsonwebtokens, color: "#000000" },
  { id: 15, name: "Redux", icon: SiRedux, color: "#764abc" },
  { id: 16, name: "Prisma", icon: SiPrisma, color: "#2d3748" },
  { id: 17, name: "Firebase", icon: SiFirebase, color: "#ffca28" },
  { id: 18, name: "Postman", icon: SiPostman, color: "#ff6c37" },
];

const cloudAndDeployment = [
  { id: 17, name: "Netlify", icon: SiNetlify, color: "#00c7b7" },
  { id: 18, name: "Vercel", icon: SiVercel, color: "#000000" },
  { id: 19, name: "Render", icon: SiRender, color: "#46e3b7" },
];

const designAndContent = [
  { id: 21, name: "Photoshop", icon: SiAdobephotoshop, color: "#31a8ff" },
  { id: 22, name: "Figma", icon: SiFigma, color: "#f24e1e" },
  { id: 23, name: "Word", icon: FaFileWord, color: "#2b579a" },
];

const paymentGateways = [
  { id: 24, name: "Razorpay", icon: SiRazorpay, color: "#3395ff" },
  { id: 25, name: "Stripe", icon: SiStripe, color: "#008cdd" },
];

export const projects = [
  {
    title: "TechTribe - Social media platform",
    image: "/projects/techtribe.svg",
    description:
      "TechTribe is a social media platform designed to connect tech professionals across diverse industries. Built with the MERN stack (MongoDB, Express.js, React, Node.js), it enables users to share posts, engage with others' content, and foster meaningful interactions within the tech community.",
    tools: ["MERN Stack", "tailwind css", "nodemailer"],
    github: "https://github.com/muhammad-ashiqe/TechTribe",
    demo: "https://techtribe-frontend.onrender.com/",
  },
  {
    title: "Fragrencia - E-commerce Store",
    image: "/projects/fragrencia.svg",
    description:
      "An online perfume store offering a curated selection of fragrances with advanced product filtering, intuitive cart management, and a seamless checkout experience. Includes a robust admin panel for inventory management. Built using the MERN stack, integrated with Cloudinary for image handling and Razorpay for secure payments.",
    tools: ["MERN Stack", "Cloudinary", "Razorpay"],
    github: "https://github.com/muhammad-ashiqe/Fragrencia",
    demo: "https://fragrencia-frontend.vercel.app/",
  },
  {
    title: "QuickBite - Food Delivery App",
    image: "/projects/quickbite.svg",
    description:
      "QuickBite is a modern food delivery application featuring  order tracking, a smooth and responsive user interface, an intuitive cart system, and secure checkout. Built with the MERN stack, styled using Tailwind CSS, and integrated with Stripe for reliable payment processing.",
    tools: ["MERN", "Stripe", "Tailwind css"],
    github: "https://github.com/muhammad-ashiqe/Quick-Bite",
    demo: "https://quick-bite-frontend-m5gq.onrender.com/",
  },

  {
    title: "ConnectU - Realtime chat ",
    image: "/projects/connectu.svg",
    description:
      "ConnectU is a real-time chat application enabling seamless live communication between users. Built with the MERN stack, styled with Tailwind CSS, and powered by Socket.IO for instant messaging and responsive interactions.",
    tools: ["MERN", "Tailwind CSS", "Socket.IO"],
    github: "https://github.com/muhammad-ashiqe/ConnectU",
    demo: "https://connect-u-ruddy.vercel.app/",
  },
  {
    title: "MovieMap - Find your choice",
    image: "/projects/moviemap.svg",
    description:
      "MovieMap is a movie discovery platform where users can search for films by name and view detailed information on both the latest and classic titles. Built with a responsive design to ensure a smooth user experience across all devices. Developed using React, styled with Tailwind CSS, and powered by the TMDB API for accurate movie data.",
    tools: ["React", "Tailwind CSS", "TMDB api"],
    github: "https://github.com/muhammad-ashiqe/MovieMap",
    demo: "https://movie-map-rouge.vercel.app/",
  },
  {
    title: "CoinWatch - Crypto Tracker",
    image: "/projects/coinwatch.svg",
    description:
      "A real-time cryptocurrency tracking application that allows users to search for coins, monitor live price changes, and view historical data through interactive charts. Built with React and styled using Tailwind CSS, it leverages the CoinGecko API for accurate market data and Chart.js for dynamic visualizations.",
    tools: ["React", "Tailwind CSS", "CoinGecko API", "Chart.js"],
    github: "https://github.com/muhammad-ashiqe/CoinWatch",
    demo: "https://coin-watch-nine.vercel.app/",
  },
  // {
  //   title: "Media player - track videos",
  //   image: "/projects/mediaplayer.svg",
  //   description:
  //     "A media player application that allows users to add and track their favorite YouTube videos. Built with React and styled using Bootstrap, it uses a JSON Web Server for managing and storing user data.",
  //   tools: ["React", "Bootstrap", "JsonWebserver"],
  //   github: "https://github.com/muhammad-ashiqe/Media-Player",
  //   demo: "https://media-player-frontend.onrender.com/",
  // },
  // {
  //   title: "Random Quote Generator",
  //   image: "/projects/quotegen.svg",
  //   description:
  //     "Random Quote Generator is a React-based application that displays inspirational quotes sourced from the DummyJSON Quotes API. It enhances the experience by fetching author images from Unsplash API, offering a visually engaging way to discover motivational content.",
  //   tools: ["React", "dummyJson", "Unsplash API"],
  //   github: "https://github.com/muhammad-ashiqe/Random_Quote_Generator",
  //   demo: "https://random-quote-generator-2025.netlify.app/",
  // },
  // {
  //   title: "Resturent - Redux Async Thunk",
  //   image: "/projects/restaurant.svg",
  //   description:
  //     "Restaurant - Redux Async Thunk is a restaurant management application built with React and Redux. It leverages Redux Async Thunk for handling asynchronous actions, enabling smooth operations for fetching menus, processing orders, and managing customer data efficiently.",
  //   tools: ["React", "Bootstrap", "ReduxAsyncThunk"],
  //   github: "https://github.com/muhammad-ashiqe/Redux-AsyncThunk-project",
  //   demo: "https://redux-async-thunk-project.vercel.app/",
  // },
  // {
  //   title: "Counter using Redux",
  //   image: "/projects/counter.svg",
  //   description:
  //     "Counter using Redux is a simple application built with React and Redux to demonstrate state management. It allows users to increment, decrement, and reset a counter value using Redux for efficient state handling.",
  //   tools: ["React", "Bootstrap", "Redux"],
  //   github: "https://github.com/muhammad-ashiqe/Counter-Redux",
  //   demo: "https://counter-redux-two-chi.vercel.app/",
  // },

  // {
  //   title: "DropBox clone",
  //   image: "/projects/dropbox.svg",
  //   description:
  //     "DropBox Clone is a visually appealing website design created using HTML and CSS. The layout mimics the look of the popular Dropbox platform, with a focus on a clean, responsive design for a seamless user experience, without any added functionality.",
  //   tools: ["HTML", "CSS", "GitHub Pages"],
  //   github: "https://github.com/muhammad-ashiqe/DropBox-clone",
  //   demo: "https://muhammad-ashiqe.github.io/DropBox-clone/",
  // },
  // {
  //   title: "Quiz App",
  //   image: "/projects/quiz.svg",
  //   description:
  //     "Quiz App is an interactive quiz application built with React. It allows users to answer multiple-choice questions, view their score at the end, and navigate through questions with a smooth, responsive interface.",
  //   tools: ["React", "Custom Css"],
  //   github:
  //     "https://github.com/muhammad-ashiqe/CognoRise-Infotech/tree/main/quiz%20app",
  //   demo: "https://quiz-app-rho-henna-52.vercel.app/",
  // },
  // {
  //   title: "Currency Converter",
  //   image: "/projects/currency.svg",
  //   description:
  //     "Currency Converter is a React-based application that allows users to easily convert currencies in real-time. It fetches exchange rates from external APIs and displays flag images for each currency, providing a visually engaging and user-friendly experience.",
  //   tools: ["React", "Currency Api", "Flag Api"],
  //   github:
  //     "https://github.com/muhammad-ashiqe/CognoRise-Infotech/tree/main/currency/",
  //   demo: "https://currency-convertor-red-gamma.vercel.app/",
  // },
  // {
  //   title: "QR Code Generator",
  //   image: "/projects/qrcode.svg",
  //   description:
  //     "QR Code Generator is a simple web application built with HTML, CSS, and JavaScript that allows users to generate QR codes for any given text or URL. The app provides a clean, responsive interface for easy input and instant QR code creation.",
  //   tools: ["HTML", "CSS", "JavaScript"],
  //   github: "https://github.com/muhammad-ashiqe/Qr-generator",
  //   demo: "https://muhammad-ashiqe.github.io/Qr-generator/",
  // },
];

export {
  programmingLanguages,
  frontendDevelopment,
  backendAndDatabase,
  librariesAndDevTools,
  cloudAndDeployment,
  designAndContent,
  paymentGateways,
};
