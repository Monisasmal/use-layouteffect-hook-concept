import { Component, useState, useEffect, useRef, useLayoutEffect, } from "react";


function Defination(){
  return(
    <div style={{background:"pink", padding:"10px", borderRadius:"5px"}}>
    
      <h1>✅ What is useLayoutEffect?</h1>
     <p>useLayoutEffect is a react hook that run synchronously before the browser paints the screen.</p>
     <h2>✅ When to use useLayoutEffect?</h2>
     <ul>
      ✔ Measuring element size/position <br/>
      ✔ Scroll positioning / animation sync <br/>
      ✔ Avoiding visible layout shift
     </ul>
     <h2>🧠 Browser Rendering Steps (Simple)</h2>
     <table border="1" cellspacing="0" cellpadding="10">
  <tr>
    <th>Step</th>
    <th>Name</th>
    <th>Meaning</th>
  </tr>
  <tr>
    <td>1️⃣</td>
    <td><b>JS runs</b></td>
    <td>React prepares UI</td>
  </tr>
  <tr>
    <td>2️⃣</td>
    <td><b>DOM created</b></td>
    <td>Elements exist in memory</td>
  </tr>
  <tr>
    <td>3️⃣</td>
    <td><b>Layout 🔎</b></td>
    <td>Browser calculates size/position of each element (width, height, x, y)</td>
  </tr>
  <tr>
    <td>4️⃣</td>
    <td><b>Paint 🎨</b></td>
    <td>Browser draws everything on screen</td>
  </tr>
  <tr>
    <td>5️⃣</td>
    <td><b>Render</b></td>
    <td>Final visible UI to user ✅</td>
  </tr>
</table>
  
  
    </div>
  )
}


 {/* using useEffect what happen */}

 function EffectBox(){

  const boxRef = useRef();

  useEffect(()=>{
    setTimeout(()=>{
      boxRef.current.style.width="300px";
   boxRef.current.style.height="150px";
    },200)
  },[]);

     return(
      <div ref={boxRef} style={{width:"100px", height:"100px", background:"tomato", marginBottom:"10px"}}>
        UseEffectBox
      </div>
     )
   }




   {/* using useLayoutEffect what happen */}

  function LayoutEffectBox(){

  const boxRef = useRef();

  useLayoutEffect(()=>{
    
   boxRef.current.style.width="300px";
   boxRef.current.style.height="150px";
   
  },[]);

     return(
      <div ref={boxRef} style={{width:"100px", height:"100px", background:"tomato", marginBottom:"10px"}}>
        UseLayoutEffectBox
      </div>
     )
   }


const projects = [
  {
    category: "Basic",
    items: [
      {id:1, name: "Introduction", Component: <Defination />},
      {id:2, name: "usingUseEffect", Component: <EffectBox />},
      {id:3, name: "usingUseLayoutEffect", Component: <LayoutEffectBox />},
    ],
  },
  {
    category: "Intermediate",
    items: [

    ],
  },
  {
    category: "Advanced",
    items: [
      
    ],
  },
];


export default function App() {
  const [activeProject, setActiveProject] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Responsive handling for hamburger
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarStyle = {
    width: "250px",
    background: "#6200ea",
    color: "#fff",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    position: "fixed",
    left: isMobile ? (isSidebarOpen ? "0" : "-260px") : "0",
    top: 0,
    bottom: 0,
    overflowY: "auto",
    transition: "left 0.3s ease",
    zIndex: 2000,
  };

  const hamburgerStyle = {
    position: "fixed",
    top: 20,
    left: 20,
    background: "#6200ea",
    color: "#fff",
    border: "none",
    padding: "10px 12px",
    borderRadius: "5px",
    fontSize: "20px",
    cursor: "pointer",
    zIndex: 2500,
    display: isMobile ? "block" : "none",
  };

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.5)",
    display: isMobile && isSidebarOpen ? "block" : "none",
    zIndex: 1500,
  };

  const contentStyle = {
    flex: 1,
    marginLeft: isMobile ? "0" : "250px",
    padding: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "margin-left 0.3s ease",
    background: "#ffffffff",
    minHeight: "80vh",
    minWidth:"70vw"
  };

  const menuBtn = (isActive) => ({
    display: "block",
    width: "100%",
    textAlign: "left",
    padding: "8px 12px",
    background: isActive ? "#fff" : "#3700b3",
    color: isActive ? "#000" : "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "8px",
    transition: "0.3s",
  });

  const allItems = projects.flatMap((p) => p.items);
  const active = allItems.find((p) => p.id === activeProject)?.Component;

  return (
    <>
      <div style={overlayStyle} onClick={toggleSidebar}></div>
      <button style={hamburgerStyle} onClick={toggleSidebar}>
        ☰
      </button>

      <aside style={sidebarStyle}>
        <h2 style={{ textAlign: "center" }}>📂 useEffectLayout Projects</h2>
        {projects.map((group) => (
          <div key={group.category}>
            <div style={{ fontWeight: "bold", marginBottom: 10 }}>
              {group.category}
            </div>
            {group.items.map((item) => (
              <button
                key={item.id}
                style={menuBtn(activeProject === item.id)}
                onClick={() => {
                  setActiveProject(item.id);
                  if (isMobile) toggleSidebar();
                }}
              >
                {item.name}
              </button>
            ))}
          </div>
        ))}
      </aside>

      <main style={contentStyle}>{active}</main>
    </>
  );
}
