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
    image: "https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/1/cloudinary-icon-ug0qqy8ms6ozyzy6cntbll.png/cloudinary-icon-hz05evx1htrghud89kpab4.png?_a=DAJFJtWIZAAC",
  },
  {
    id: 14,
    name: "JWT",
    image: "https://img.icons8.com/?size=512&id=rHpveptSuwDz&format=png",
  },
  {
    id: 15,
    name: "Redux",
    image: "https://static-00.iconduck.com/assets.00/redux-icon-512x486-1n8k02rk.png",
  },
  {
    id: 16,
    name: "Firebase",
    image: "https://cdn4.iconfinder.com/data/icons/google-i-o-2016/512/google_firebase-2-512.png",
  },
]

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
    image: "https://camo.githubusercontent.com/25d25cd0312f9e81b653fbdd33d2b04c49f03dede7fe5c89d4aeabb9a83ec739/68747470733a2f2f63646e2e73616e6974792e696f2f696d616765732f3334656e74386c792f70726f64756374696f6e2f656333376133363630373034653166613262343234366339613031616233346531343531393461642d383234783832342e706e67",
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
    image: "https://stickypng.com/wp-content/uploads/2023/07/62cc1d95150d5de9a3dad5fa.png",
  },
  {
    id: 25,
    name: "Stripe",
    image: "https://www.svgrepo.com/show/331592/stripe-v2.svg",
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
    tools: ["React", "Firebase", "Razorpay", "Tailwind css"],
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
