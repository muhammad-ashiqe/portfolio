const programmingLanguages = [
  {
    id: 1,
    name: "JavaScript",
    image: "https://cdn-icons-png.flaticon.com/512/5968/5968292.png",
  },
  {
    id: 2,
    name: "TypeScript",
    image: "https://cdn-icons-png.flaticon.com/512/5968/5968381.png",
  },
];

const frontendDevelopment = [
  {
    id: 4,
    name: "HTML",
    image: "https://cdn-icons-png.flaticon.com/512/174/174854.png",
  },
  {
    id: 5,
    name: "CSS",
    image: "https://cdn-icons-png.flaticon.com/512/732/732190.png",
  },
  {
    id: 3,
    name: "React",
    image: "https://cdn-icons-png.flaticon.com/512/1126/1126012.png",
  },
  {
    id: 6,
    name: "Tailwind",
    image: "https://icon.icepanel.io/Technology/svg/Tailwind-CSS.svg",
  },
  {
    id: 7,
    name: "Bootstrap",
    image: "https://icon.icepanel.io/Technology/svg/Bootstrap.svg",
  },
];

const backendAndDatabase = [
  {
    id: 8,
    name: "Node.js",
    image: "https://icon.icepanel.io/Technology/svg/Node.js.svg",
  },
  {
    id: 9,
    name: "Express.js",
    image: "https://icon.icepanel.io/Technology/png-shadow-512/Express.png",
  },
  {
    id: 10,
    name: "MongoDB",
    image: "https://icon.icepanel.io/Technology/svg/MongoDB.svg",
  },
];

const librariesAndDevTools = [
  {
    id: 11,
    name: "Git",
    image: "https://icon.icepanel.io/Technology/svg/Git.svg",
  },
  {
    id: 12,
    name: "GitHub",
    image: "https://icon.icepanel.io/Technology/png-shadow-512/GitHub.png",
  },
  {
    id: 13,
    name: "Cloudinary",
    image:
      "https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/1/cloudinary-icon-ug0qqy8ms6ozyzy6cntbll.png/cloudinary-icon-hz05evx1htrghud89kpab4.png?_a=DAJFJtWIZAAC",
  },
  {
    id: 14,
    name: "JWT",
    image: "https://img.icons8.com/?size=512&id=rHpveptSuwDz&format=png",
  },
  {
    id: 15,
    name: "Redux",
    image:
      "https://static-00.iconduck.com/assets.00/redux-icon-512x486-1n8k02rk.png",
  },
  {
    id: 16,
    name: "Firebase",
    image:
      "https://cdn4.iconfinder.com/data/icons/google-i-o-2016/512/google_firebase-2-512.png",
  },
];

const cloudAndDeployment = [
  {
    id: 17,
    name: "Netlify",
    image: "https://www.svgrepo.com/show/376339/netlify.svg",
  },
  {
    id: 18,
    name: "Vercel",
    image: "https://icon.icepanel.io/Technology/png-shadow-512/Vercel.png",
  },
  {
    id: 19,
    name: "Render",
    image:
      "https://camo.githubusercontent.com/25d25cd0312f9e81b653fbdd33d2b04c49f03dede7fe5c89d4aeabb9a83ec739/68747470733a2f2f63646e2e73616e6974792e696f2f696d616765732f3334656e74386c792f70726f64756374696f6e2f656333376133363630373034653166613262343234366339613031616233346531343531393461642d383234783832342e706e67",
  },
];

const designAndContent = [
  {
    id: 21,
    name: "Photoshop",
    image: "https://icon.icepanel.io/Technology/svg/Adobe-Photoshop.svg",
  },
  {
    id: 22,
    name: "Figma",
    image: "https://icon.icepanel.io/Technology/svg/Figma.svg",
  },
  {
    id: 23,
    name: "Word",
    image: "https://img.icons8.com/color/512/ms-word.png",
  },
];

const paymentGateways = [
  {
    id: 24,
    name: "Razorpay",
    image:
      "https://stickypng.com/wp-content/uploads/2023/07/62cc1d95150d5de9a3dad5fa.png",
  },
  {
    id: 25,
    name: "Stripe",
    image: "https://www.svgrepo.com/show/331592/stripe-v2.svg",
  },
];

export const projects = [
  {
    title: "TechTribe - Social media platform",
    image:
      "https://images.theconversation.com/files/543273/original/file-20230817-40322-o38kim.jpg?ixlib=rb-4.1.0&rect=888%2C630%2C7698%2C3849&q=45&auto=format&w=668&h=324&fit=crop",
    description:
      "TechTribe is a social media platform designed to connect tech professionals across diverse industries. Built with the MERN stack (MongoDB, Express.js, React, Node.js), it enables users to share posts, engage with others' content, and foster meaningful interactions within the tech community.",
    tools: ["MERN Stack", "contextApi","tailwind css"],
    github: "https://github.com/muhammad-ashiqe/TechTribe",
    demo: "",
  },
  {
    title: "Fragrencia - E-commerce Store",
    image:
      "https://png.pngtree.com/thumb_back/fh260/background/20230328/pngtree-perfume-powder-purple-background-image_2120137.jpg",
    description:
      "An online perfume store offering a curated selection of fragrances with advanced product filtering, intuitive cart management, and a seamless checkout experience. Includes a robust admin panel for inventory management. Built using the MERN stack, integrated with Cloudinary for image handling and Razorpay for secure payments.",
    tools: ["MERN Stack", "Cloudinary","Razorpay"],
    github: "https://github.com/muhammad-ashiqe/Fragrencia",
    demo: "https://fragrencia-frontend.vercel.app/",
  },
  {
    title: "QuickBite - Food Delivery App",
    image:
      "https://www.gloriafood.com/wp-content/uploads/2021/03/How_to_Improve_Your_Food_Delivery_Service_in_2022_-_fb.png",
    description:
      "QuickBite is a modern food delivery application featuring  order tracking, a smooth and responsive user interface, an intuitive cart system, and secure checkout. Built with the MERN stack, styled using Tailwind CSS, and integrated with Stripe for reliable payment processing.",
    tools: ["MERN",  "Stripe", "Tailwind css"],
    github: "https://github.com/muhammad-ashiqe/Quick-Bite",
    demo: "https://quick-bite-frontend-m5gq.onrender.com/",
  },
  
  {
    title: "ConnectU - Realtime chat ",
    image:
      "https://plus.unsplash.com/premium_photo-1720032304972-1f1142e73253?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2hhdCUyMGFwcHxlbnwwfHwwfHx8MA%3D%3D",
    description:
      "ConnectU is a real-time chat application enabling seamless live communication between users. Built with the MERN stack, styled with Tailwind CSS, and powered by Socket.IO for instant messaging and responsive interactions.",
    tools: ["MERN", "Tailwind CSS", "Socket.IO"],
    github: "https://github.com/muhammad-ashiqe/ConnectU",
    demo: "https://connect-u-ruddy.vercel.app/",
  },
  {
    title: "MovieMap - Find your choice",
    image:
      "https://img.freepik.com/premium-photo/flying-popcorn-3d-glasses-film-reel-clapboard-yellow-background-cinema-movie-concept-3d_989822-1302.jpg?semt=ais_hybrid&w=740",
    description:
      "MovieMap is a movie discovery platform where users can search for films by name and view detailed information on both the latest and classic titles. Built with a responsive design to ensure a smooth user experience across all devices. Developed using React, styled with Tailwind CSS, and powered by the TMDB API for accurate movie data.",
    tools: ["React", "Tailwind CSS", "TMDB api"],
    github: "https://github.com/muhammad-ashiqe/MovieMap",
    demo: "https://movie-map-rouge.vercel.app/",
  },{
    title: "CoinWatch - Crypto Tracker",
    image:
      "https://png.pngtree.com/thumb_back/fh260/background/20230704/pngtree-3d-render-of-crypto-currency-and-nft-composition-image_3828737.jpg",
    description:
      "A real-time cryptocurrency tracking application that allows users to search for coins, monitor live price changes, and view historical data through interactive charts. Built with React and styled using Tailwind CSS, it leverages the CoinGecko API for accurate market data and Chart.js for dynamic visualizations.",
    tools: ["React", "Tailwind CSS", "CoinGecko API", "Chart.js"],
    github: "https://github.com/muhammad-ashiqe/CoinWatch",
    demo: "https://coin-watch-nine.vercel.app/",
  },
  {
    title: "Media player - track videos",
    image:
      "https://img.freepik.com/free-vector/clean-video-player-template-with-simple-buttons_1017-27217.jpg",
    description:
      "A media player application that allows users to add and track their favorite YouTube videos. Built with React and styled using Bootstrap, it uses a JSON Web Server for managing and storing user data.",
    tools: ["React", "Bootstrap", "JsonWebserver"],
    github: "https://github.com/muhammad-ashiqe/Media-Player",
    demo: "https://media-player-frontend.onrender.com/",
  },
  {
    title: "Random Quote Generator",
    image:
      "https://quotes-generator.com/library/gfx/images/quote-img.jpg",
    description:
      "Random Quote Generator is a React-based application that displays inspirational quotes sourced from the DummyJSON Quotes API. It enhances the experience by fetching author images from Unsplash API, offering a visually engaging way to discover motivational content.",
    tools: ["React", "dummyJson", "Unsplash API"],
    github: "https://github.com/muhammad-ashiqe/Random_Quote_Generator",
    demo: "https://random-quote-generator-2025.netlify.app/",
  }
  ,
  {
    title: "Resturent - Redux Async Thunk",
    image:
      "https://plus.unsplash.com/premium_photo-1661883237884-263e8de8869b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
    description:
      "Restaurant - Redux Async Thunk is a restaurant management application built with React and Redux. It leverages Redux Async Thunk for handling asynchronous actions, enabling smooth operations for fetching menus, processing orders, and managing customer data efficiently.",
    tools: ["React", "Bootstrap", "ReduxAsyncThunk"],
    github: "https://github.com/muhammad-ashiqe/Redux-AsyncThunk-project",
    demo: "https://redux-async-thunk-project.vercel.app/",
  },
  {
    title: "Counter using Redux",
    image:
      "https://media.istockphoto.com/id/1225034279/vector/green-plus-and-red-minus-symbols-round-thin-line-vector-signs.jpg?s=612x612&w=0&k=20&c=akji0of2-hiyYiG6RMEau8Ubv7KSJc4_kL3YzY4bBv0=",
    description:
      "Counter using Redux is a simple application built with React and Redux to demonstrate state management. It allows users to increment, decrement, and reset a counter value using Redux for efficient state handling.",
    tools: ["React", "Bootstrap", "Redux"],
    github: "https://github.com/muhammad-ashiqe/Counter-Redux",
    demo: "https://counter-redux-two-chi.vercel.app/",
  }
  
  ,

  {
    title: "DropBox clone",
    image:
      "https://images.ctfassets.net/lzny33ho1g45/4gdjyG2SF19KQfXbcRBz04/105b83c584c0167893c4b35ed0e67bb1/app-tips-dropbox-00-hero.png",
    description:
      "DropBox Clone is a visually appealing website design created using HTML and CSS. The layout mimics the look of the popular Dropbox platform, with a focus on a clean, responsive design for a seamless user experience, without any added functionality.",
    tools: ["HTML", "CSS","GitHub Pages"],
    github: "https://github.com/muhammad-ashiqe/DropBox-clone",
    demo: "https://muhammad-ashiqe.github.io/DropBox-clone/",
  },
  {
    title: "Quiz App",
    image:
      "https://canopylab.io/wp-content/uploads/2023/01/Blog-Creating-multiple-choice-quizzes-with-the-CanopyLAB-Quiz-engine.jpg",
    description:
      "Quiz App is an interactive quiz application built with React. It allows users to answer multiple-choice questions, view their score at the end, and navigate through questions with a smooth, responsive interface.",
    tools: ["React", "Custom Css"],
    github: "https://github.com/muhammad-ashiqe/CognoRise-Infotech/tree/main/quiz%20app",
    demo: "https://quiz-app-rho-henna-52.vercel.app/", 
  
  } ,
  {
    title: "Currency Converter",
    image:
      "https://fcsapi.com/blog/wp-content/uploads/2019/09/currency-converter-fcsapi.com_-750x410.jpg",
    description:
      "Currency Converter is a React-based application that allows users to easily convert currencies in real-time. It fetches exchange rates from external APIs and displays flag images for each currency, providing a visually engaging and user-friendly experience.",
    tools: ["React", "Currency Api", "Flag Api"],
    github: "https://github.com/muhammad-ashiqe/CognoRise-Infotech/tree/main/currency/",
    demo: "https://currency-convertor-red-gamma.vercel.app/", 
  }
  ,
  {
    title: "QR Code Generator",
    image:
      "https://content-management-files.canva.com/cdn-cgi/image/f=auto,q=70/e7cf8333-91b1-481c-9544-3e7aa7d89db4/header_QR-code-generator_2x.png",
    description:
      "QR Code Generator is a simple web application built with HTML, CSS, and JavaScript that allows users to generate QR codes for any given text or URL. The app provides a clean, responsive interface for easy input and instant QR code creation.",
    tools: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/muhammad-ashiqe/Qr-generator",
    demo: "https://muhammad-ashiqe.github.io/Qr-generator/",
  }
 
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
