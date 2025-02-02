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
    id: 3,
    name: "React",
    image: "https://cdn-icons-png.flaticon.com/512/1126/1126012.png",
  },
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
    id: 6,
    name: "Tailwind CSS",
    image: "https://cdn-icons-png.flaticon.com/512/732/732190.png",
  },
  {
    id: 7,
    name: "Bootstrap",
    image: "https://cdn-icons-png.flaticon.com/512/732/732190.png",
  },
];

const backendAndDatabase = [
  {
    id: 8,
    name: "Node.js",
    image: "https://cdn-icons-png.flaticon.com/512/919/919825.png",
  },
  {
    id: 9,
    name: "Express.js",
    image: "https://cdn-icons-png.flaticon.com/512/919/919828.png",
  },
  {
    id: 10,
    name: "MongoDB",
    image: "https://cdn-icons-png.flaticon.com/512/919/919836.png",
  },
];

const librariesAndDevTools = [
  {
    id: 11,
    name: "Git",
    image: "https://cdn-icons-png.flaticon.com/512/919/919853.png",
  },
  {
    id: 12,
    name: "GitHub",
    image: "https://cdn-icons-png.flaticon.com/512/2111/2111432.png",
  },
  {
    id: 13,
    name: "Cloudinary",
    image: "https://cdn-icons-png.flaticon.com/512/919/919825.png",
  },
  {
    id: 14,
    name: "JWT",
    image: "https://cdn-icons-png.flaticon.com/512/919/919825.png",
  },
  {
    id: 15,
    name: "Redux",
    image: "https://cdn-icons-png.flaticon.com/512/919/919825.png",
  },
  {
    id: 16,
    name: "Firebase",
    image: "https://cdn-icons-png.flaticon.com/512/919/919825.png",
  },
];

const cloudAndDeployment = [
  {
    id: 17,
    name: "Netlify",
    image: "https://cdn-icons-png.flaticon.com/512/919/919825.png",
  },
  {
    id: 18,
    name: "Vercel",
    image: "https://cdn-icons-png.flaticon.com/512/919/919825.png",
  },
  {
    id: 19,
    name: "Render",
    image: "https://cdn-icons-png.flaticon.com/512/919/919825.png",
  },
  {
    id: 20,
    name: "DigitalOcean",
    image: "https://cdn-icons-png.flaticon.com/512/919/919825.png",
  },
];

const designAndContent = [
  {
    id: 21,
    name: "Photoshop",
    image: "https://cdn-icons-png.flaticon.com/512/919/919825.png",
  },
  {
    id: 22,
    name: "Figma",
    image: "https://cdn-icons-png.flaticon.com/512/919/919825.png",
  },
  {
    id: 23,
    name: "Microsoft Word",
    image: "https://cdn-icons-png.flaticon.com/512/919/919825.png",
  },
];

const paymentGateways = [
  {
    id: 24,
    name: "Razorpay",
    image: "https://cdn-icons-png.flaticon.com/512/919/919825.png",
  },
  {
    id: 25,
    name: "Stripe",
    image: "https://cdn-icons-png.flaticon.com/512/5968/5968553.png",
  },
];

export const projects = [
  {
    title: "CoinWatch - Crypto Tracker",
    image: "https://png.pngtree.com/thumb_back/fh260/background/20230704/pngtree-3d-render-of-crypto-currency-and-nft-composition-image_3828737.jpg",
    description:
      "A real-time cryptocurrency tracking application that fetches data from CoinGecko API. Users can search for coins, view historical data, and check live price changes.",
    tools: ["React", "Tailwind CSS", "CoinGecko API", "Chart.js"],
    github: "https://github.com/muhammad-ashiqe/CoinWatch",
    demo: "https://coinwatch.vercel.app",
  },
  {
    title: "QuickBite - Food Delivery App",
    image: "https://www.gloriafood.com/wp-content/uploads/2021/03/How_to_Improve_Your_Food_Delivery_Service_in_2022_-_fb.png",
    description:
      "QuickBite is a food delivery application with real-time order tracking and a seamless user interface. Features include a cart system and secure checkout.",
    tools: ["React", "Firebase", "Razorpay", "Tailwind CSS"],
    github: "https://github.com/muhammad-ashiqe/QuickBite",
    demo: "https://quickbite.vercel.app",
  },
  {
    title: "Fragrencia - E-commerce Store",
    image: "https://png.pngtree.com/thumb_back/fh260/background/20230328/pngtree-perfume-powder-purple-background-image_2120137.jpg",
    description:
      "An online perfume store with product filtering, cart management, and a seamless checkout experience. Admin panel for managing inventory.",
    tools: ["MERN Stack", "Redux", "Cloudinary", "Stripe"],
    github: "https://github.com/muhammad-ashiqe/Fragrancia",
    demo: "https://fragrancia.vercel.app",
  },
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
