/**
 * Projects data
 * Contains all project information for the portfolio
 */

const projects = [
  {
    id: 1,
    title: "EduEngine.in",
    description: "Fully responsive company website built with Next.js and Tailwind; improved UI/UX and deployed as the official site of EduEngine Technologies.",
    tech: ["Next.js", "Tailwind CSS"],
    liveUrl: "https://eduengine.in",
    image: "/assets/projects/eduengine.png", 
    video: "", 
    
  },
  {
    id: 2,
    title: "MingleBite",
    description: "Kotlin-based Android app implementing order management, cart functionality and live tracking for cloud kitchen flows.",
    tech: ["Kotlin", "Android Studio"],
    liveUrl: "",
    image: "/assets/projects/minglebite.png", 
    video: "", 
    
  },
  {
    id: 3,
    title: "Property Dealing Web App",
    description: "React.js platform for buying, selling and renting properties with search filters and responsive UI.",
    tech: ["React.js"],
    liveUrl: "",
    image: "", 
    video: "/assets/projects/real_state_webapp.mp4", 
  },
  {
    id: 4,
    title: "Weather App",
    description: "Real-time weather app using OpenWeather API, with city search, favorites and animated UI.",
    tech: ["React.js", "OpenWeather API"],
    liveUrl: "",
    image: "", 
    video: "/assets/projects/weather_web_app.mp4", 
  },
  {
    id: 5,
    title: "AI-Powered Chatbot",
    description: "Interactive chatbot built with HTML/CSS/JS; prototype for conversational flows and demos.",
    tech: ["HTML", "JavaScript"],
    liveUrl: "",
    image: "", 
    video: "/assets/projects/chatbot.mp4", 
  },
  {
  id: 6,
  title: "AI Automation Workflows",
  description:
    "AI Voice Agent for lead calling, end-to-end voice workflow automation (Retell AI → Make.com → Airtable → Twilio), and a Mini AI CRM for logging chat/call records.",
  tech: ["Retell AI", "Make.com", "Airtable", "Twilio"],
  liveUrl: "",
  image: "/assets/projects/voice-agent-flow.png",
  video: ""
}


]

export default projects
