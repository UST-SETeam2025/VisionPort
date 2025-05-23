import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Link } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";

// 優化的圖片元件
const OptimizedImage = ({ src, alt, className, sizes, style = {} }) => {
  return (
    <img
      src={src}
      alt={alt || ""}
      className={className || ""}
      style={{ willChange: 'transform', ...style }}
      loading="lazy"
      sizes={sizes || "(max-width: 600px) 500px, (max-width: 1200px) 800px, 1200px"}
    />
  );
};

const Newpage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeSections, setActiveSections] = useState({
    intro: false,
    tutorial: false,
    mission: false,
    free: false,
  });
  const [windowHeight, setWindowHeight] = useState(0);
  const [loaderVisible, setLoaderVisible] = useState(true);

  // 團隊選擇器的狀態
  const [selectedCharacter, setSelectedCharacter] = useState(0);
  const dragStartX = useRef(0);

  // 歷史部分所需的狀態
  const [selectedYear, setSelectedYear] = useState(1950);

  // 計算年份索引 - 使用useMemo優化
  const yearIndex = useMemo(() => 
    [1950, 1970, 1990, 2010].indexOf(selectedYear),
    [selectedYear]
  );

  // 年份導航函數 - 使用useCallback優化
  const navigateYear = useCallback((direction) => {
    const years = [1950, 1970, 1990, 2010];
    const currentIndex = years.indexOf(selectedYear);

    if (direction === "next" && currentIndex < years.length - 1) {
      setSelectedYear(years[currentIndex + 1]);
    } else if (direction === "prev" && currentIndex > 0) {
      setSelectedYear(years[currentIndex - 1]);
    }
  }, [selectedYear]);

  // 歷史數據 - 使用useMemo優化
  const historyData = useMemo(() => ({
    1950: {
      image: `${process.env.PUBLIC_URL}/history/h4.png`,
      location: "Victoria Harbor",
      progress: 25,
      throughput: "3 million tons",
      terminals: 2,
      ranking: 12,
      description:
        "In the 1950s, Hong Kong's port primarily handled transshipment cargo with simple terminal facilities that relied heavily on manual labor. During this period, Hong Kong's port already demonstrated its unique geographic advantage, becoming an important node connecting East-West trade.",
    },
    1970: {
      image: `${process.env.PUBLIC_URL}/history/h6.png`,
      location: "Kwai Chung Container Terminal",
      progress: 45,
      throughput: "8 million tons",
      terminals: 5,
      ranking: 8,
      description:
        "With the arrival of the containerization revolution in the 1970s, Hong Kong began building modern container terminals. In 1972, Hong Kong's first container terminal was completed in Kwai Chung, greatly improving port handling efficiency and laying the foundation for Hong Kong as an international shipping center.",
    },
    1990: {
      image: `${process.env.PUBLIC_URL}/history/h11.jpg`,
      location: "Tsing Yi Container Terminal",
      progress: 75,
      throughput: "80 million tons",
      terminals: 9,
      ranking: 1,
      description:
        "The 1990s were the golden era for Hong Kong's port, with container throughput ranking first in the world for many consecutive years. Port facilities continued to expand, and the Kwai Tsing Container Terminal became the busiest container port in the world at that time. During this period, Hong Kong also became the main gateway connecting mainland China with the world.",
    },
    2010: {
      image: `${process.env.PUBLIC_URL}/history/h12.jpg`,
      location: "Modern Container Terminal",
      progress: 95,
      throughput: "240 million tons",
      terminals: 12,
      ranking: 5,
      description:
        "Entering the 21st century, Hong Kong's port faced competition from ports in Shenzhen, Shanghai, and other cities, but still maintained a leading global position. Port operations became highly automated, with advanced technology improving efficiency. Hong Kong focused on developing high value-added shipping services to consolidate its position as an international shipping center.",
    },
  }), []);

  // Create individual refs
  const introRef = useRef(null);
  const tutorialRef = useRef(null);
  const missionRef = useRef(null);
  const freeRef = useRef(null);

  // 創建 refs 對象
  const sectionRefs = useMemo(() => ({
    intro: introRef,
    tutorial: tutorialRef,
    mission: missionRef,
    free: freeRef,
  }), []);
  
  // 團隊成員數據 - 使用useMemo優化
  const teamMembers = useMemo(() => [
    {
      id: 1,
      name: "Project Manager",
      photo: `${process.env.PUBLIC_URL}/team/Edmond.jpg`,
      role: "LEUNG Kar Cheong",
      email: "info@hktrpg.com",
      stats: {
        total: 85,
        body: 66,
        intelligence: 95,
        knowledge: 95,
      },
      skills: [
        "Project Management",
        "Requirements Analysis",
        "User Experience",
        "Team Coordination",
      ],
      description:
        "Responsible for managing and coordinating the entire project, ensuring development goals are completed on time. Has extensive experience in port logistics and simulator development, and is familiar with virtual reality technology applications.",
    },
    {
      id: 2,
      name: "3D Modeler",
      photo: `${process.env.PUBLIC_URL}/team/Bella.jpg`,
      role: "POON Ka Yi",
      email: "3d@stu.vtc.edu.hk",
      stats: {
        total: 70,
        body: 66,
        intelligence: 76,
        knowledge: 69,
      },
      skills: [
        "Model Creation",
        "Texture Design",
        "Lighting Effects",
        "Environment Modeling",
      ],
      description:
        "Responsible for the creation and optimization of all 3D models, including cranes, containers, and port environments. Expert in high-precision model creation and texture optimization, ensuring the realism and performance of simulation scenes.",
    },
    {
      id: 3,
      name: "Unity Developer",
      photo: `${process.env.PUBLIC_URL}/team/Samuel.jpg`,
      role: "LI Chun Tat",
      email: "dev@stu.vtc.edu.hk",
      stats: {
        total: 78,
        body: 77,
        intelligence: 85,
        knowledge: 72,
      },
      skills: [
        "C# Programming",
        "Physics Simulation",
        "Performance Optimization",
        "VR Integration",
      ],
      description:
        "Responsible for developing the core physics engine and implementing the operating system. Has developed dynamic physical models under various weather conditions, achieving a highly realistic crane operation experience.",
    },
    {
      id: 4,
      name: "VR Specialist",
      photo: `${process.env.PUBLIC_URL}/team/Raymond.jpg`,
      role: "WONG Hoi Ming",
      email: "vr@stu.vtc.edu.hk",
      stats: {
        total: 80,
        body: 86,
        intelligence: 75,
        knowledge: 78,
      },
      skills: [
        "VR Interaction Design",
        "Motion Capture",
        "Perception Testing",
        "Hardware Integration",
      ],
      description:
        "Focuses on interactive design and optimization of virtual reality experiences. Ensures smooth and natural user operations in VR environments, providing immersive training experiences while reducing the risk of motion sickness.",
    },
  ], []);

  // 定義 marqueItems 陣列 - 使用useMemo優化
  const marqueItems = useMemo(() => [
    `${process.env.PUBLIC_URL}/carousel/h1.png`,
    `${process.env.PUBLIC_URL}/carousel/h2.png`,
    `${process.env.PUBLIC_URL}/carousel/h3.png`,
    `${process.env.PUBLIC_URL}/carousel/h4.png`,
    `${process.env.PUBLIC_URL}/carousel/h5.png`,
    `${process.env.PUBLIC_URL}/carousel/h6.png`,
    `${process.env.PUBLIC_URL}/carousel/h7.png`,
    `${process.env.PUBLIC_URL}/carousel/h8.png`,
  ], []);

  // 導航欄高度（用於調整遮罩位置）
  const navbarHeight = 54; // 根據你的導航欄高度調整，通常是16的倍數

  // 模擬加載器效果
  useEffect(() => {
    // 使用 setTimeout 優化不必要的重新渲染
    const timer = setTimeout(() => {
      setLoaderVisible(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // 初始化窗口高度 - 使用 ResizeObserver 來優化效能
  useEffect(() => {
    setWindowHeight(window.innerHeight);

    // 使用 ResizeObserver 替代事件監聽，以減少事件觸發頻率
    const resizeObserver = new ResizeObserver(entries => {
      // 使用 requestAnimationFrame 限制更新頻率
      window.requestAnimationFrame(() => {
        setWindowHeight(window.innerHeight);
      });
    });
    
    // 觀察 document.body
    resizeObserver.observe(document.body);
    
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // 跟踪滾動位置用於背景效果，使用 requestAnimationFrame 優化效能
  useEffect(() => {
    let ticking = false; // 用於節流處理
    let lastScrollY = 0;
    
    const handleScroll = () => {
      lastScrollY = window.scrollY;
      
      if (!ticking) {
        // 使用 requestAnimationFrame 限制更新頻率
        window.requestAnimationFrame(() => {
          setScrollY(lastScrollY);
          ticking = false;
        });
        
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true }); // 使用 passive 選項提升效能
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 使用 IntersectionObserver 檢測當前活動區塊
  useEffect(() => {
    const options = {
      root: null,
      // 調整 rootMargin 使觀察器提前偵測到元素
      rootMargin: "30% 0px", // 增加上方邊距，使元素在進入視窗前就開始準備
      threshold: 0.1, // 降低閾值，使元素僅需顯示一小部分就觸發
    };

    // 使用集中處理的 handleIntersect 函數，減少重複程式碼
    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id.replace("section", "");
          let sectionKey = "";
          
          switch (sectionId) {
            case "1": sectionKey = "intro"; break;
            case "2": sectionKey = "tutorial"; break;
            case "3": sectionKey = "mission"; break;
            case "4": sectionKey = "free"; break;
            default: return;
          }
          
          // 移除延遲，立即顯示元素
          if (sectionKey) {
            setActiveSections(prev => ({ ...prev, [sectionKey]: true }));
          }

          // 保持觀察，不要取消觀察，以便在元素重新進入視圖時再次觸發
          // observer.unobserve(entry.target); -- 移除這一行
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, options);

    // 批量處理觀察對象
    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      observer.disconnect(); // 使用 disconnect 一次性清理，而非一個一個清理
    };
  }, [sectionRefs]);

  // 預加載區段內容，確保一開始就準備好顯示
  useEffect(() => {
    // 頁面加載後立即預備首個區段
    const timer = setTimeout(() => {
      setActiveSections(prev => ({ ...prev, intro: true }));
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // 計算漸變色罩的位置 - 使用 useMemo 來優化計算
  const calculateOverlayPosition = useCallback(() => {
    if (!windowHeight) return 0;
    const progress = Math.min(1, Math.max(0, scrollY / (windowHeight * 1.2)));
    return progress * 100;
  }, [scrollY, windowHeight]);

  const overlayPosition = useMemo(() => calculateOverlayPosition(), [calculateOverlayPosition]);

  return (
    <div id="page-top" className="text-white font-sans overflow-x-hidden">
      {/* Game Loading Screen */}
      {loaderVisible && (
        <div className="fixed inset-0 bg-black z-[9999] flex items-center justify-center transition-opacity duration-1000">
          <div className="loader-container relative w-[500px] h-[300px] flex flex-col items-center justify-center">
            {/* Main Title Animation */}
            <div className="mb-10 relative">
              <h1 className="text-5xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 animate-pulse transform-gpu" // 使用 transform-gpu 啟用 GPU 加速
              style={{ animationDuration: "2s", willChange: "opacity" }}>
                VisionPort
              </h1>
              <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent animate-pulse transform-gpu" // 使用 transform-gpu 啟用 GPU 加速
              style={{ animationDuration: "2s", willChange: "opacity" }}></div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              {/* Top Left Decoration */}
              <div className="absolute top-0 left-0 w-16 h-16">
                <div className="absolute top-0 left-0 w-12 h-1 bg-yellow-700"></div>
                <div className="absolute top-0 left-0 w-1 h-12 bg-yellow-700"></div>
              </div>

              {/* Top Right Decoration */}
              <div className="absolute top-0 right-0 w-16 h-16">
                <div className="absolute top-0 right-0 w-12 h-1 bg-yellow-700"></div>
                <div className="absolute top-0 right-0 w-1 h-12 bg-yellow-700"></div>
              </div>

              {/* Bottom Left Decoration */}
              <div className="absolute bottom-0 left-0 w-16 h-16">
                <div className="absolute bottom-0 left-0 w-12 h-1 bg-yellow-700"></div>
                <div className="absolute bottom-0 left-0 w-1 h-12 bg-yellow-700"></div>
              </div>

              {/* Bottom Right Decoration */}
              <div className="absolute bottom-0 right-0 w-16 h-16">
                <div className="absolute bottom-0 right-0 w-12 h-1 bg-yellow-700"></div>
                <div className="absolute bottom-0 right-0 w-1 h-12 bg-yellow-700"></div>
              </div>
            </div>

            {/* Screen Noise Effect */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJub2lzZSIgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giIHNlZWQ9IjUwIi8+PGZlQmxlbmQgbW9kZT0ic2NyZWVuIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-30 mix-blend-overlay animate-pulse transform-gpu" // 使用 transform-gpu 啟用 GPU 加速
            style={{ animationDuration: "3s" }}></div>
          </div>
        </div>
      )}

      {/* Fixed Navigation - 將導航欄的z-index提高到超過所有遮罩 */}
      <nav className="fixed top-0 z-[10000] w-full bg-black bg-opacity-80 shadow-md backdrop-blur-sm border-b border-yellow-900/30">
        <div className="max-w-5xl mx-auto flex justify-center space-x-8 py-4">
          <Link
            to="page-top"
            smooth={true}
            duration={800}
            className="text-yellow-500 hover:text-yellow-400 font-semibold transition cursor-pointer"
          >
            Home
          </Link>
          <Link
            to="section1"
            smooth={true}
            duration={800}
            className="text-yellow-500 hover:text-yellow-400 font-semibold transition cursor-pointer"
          >
            Game Introduction
          </Link>
          <Link
            to="history"
            smooth={true}
            duration={800}
            className="text-yellow-500 hover:text-yellow-400 font-semibold transition cursor-pointer"
          >
            History
          </Link>
          <Link
            to="about"
            smooth={true}
            duration={800}
            className="text-yellow-500 hover:text-yellow-400 font-semibold transition cursor-pointer"
          >
            About Us
          </Link>
          <RouterLink
            to="/credit"
            className="text-yellow-500 hover:text-yellow-400 font-semibold transition cursor-pointer"
          >
            Credits
          </RouterLink>
          <RouterLink
            to="/privacy"
            className="text-yellow-500 hover:text-yellow-400 font-semibold transition cursor-pointer"
          >
            Privacy
          </RouterLink>
        </div>
      </nav>

      {/* First Section Fixed in Background */}
      <div className="fixed inset-0 w-full h-full bg-gradient-to-b from-gray-900 to-black">
        {/* Marquee Background */}
        <div className="absolute inset-0 flex justify-between items-stretch opacity-50 pointer-events-none">
          <div
            className="marqee-column animate-marqee-up transform-gpu" // 使用 transform-gpu 啟用 GPU 加速
            style={{ animationDuration: "126s", willChange: "transform" }}
          >
            {marqueItems.map((item, index) => (
              <div
                key={`col1-${index}`}
                className="marqee-item w-60 h-48 m-2 bg-center bg-cover opacity-50"
                style={{ backgroundImage: `url(${item})` }}
              ></div>
            ))}
            {marqueItems.map((item, index) => (
              <div
                key={`col1-dup-${index}`}
                className="marqee-item w-60 h-48 m-2 bg-center bg-cover opacity-50"
                style={{ backgroundImage: `url(${item})` }}
              ></div>
            ))}
          </div>

          <div
            className="marqee-column animate-marqee-down transform-gpu" // 使用 transform-gpu 啟用 GPU 加速
            style={{ animationDuration: "110s", willChange: "transform" }}
          >
            {marqueItems.map((item, index) => (
              <div
                key={`col2-${index}`}
                className="marqee-item w-60 h-48 m-2 bg-center bg-cover opacity-50"
                style={{ backgroundImage: `url(${item})` }}
              ></div>
            ))}
            {marqueItems.map((item, index) => (
              <div
                key={`col2-dup-${index}`}
                className="marqee-item w-60 h-48 m-2 bg-center bg-cover opacity-50"
                style={{ backgroundImage: `url(${item})` }}
              ></div>
            ))}
          </div>

          <div
            className="marqee-column animate-marqee-up transform-gpu" // 使用 transform-gpu 啟用 GPU 加速
            style={{ animationDuration: "118s", willChange: "transform" }}
          >
            {marqueItems.map((item, index) => (
              <div
                key={`col3-${index}`}
                className="marqee-item w-60 h-48 m-2 bg-center bg-cover opacity-50"
                style={{ backgroundImage: `url(${item})` }}
              ></div>
            ))}
            {marqueItems.map((item, index) => (
              <div
                key={`col3-dup-${index}`}
                className="marqee-item w-60 h-48 m-2 bg-center bg-cover opacity-50"
                style={{ backgroundImage: `url(${item})` }}
              ></div>
            ))}
          </div>
        </div>

        {/* Hero Section (Fixed in Background) */}
        <header
          id="hero"
          className="h-screen flex items-center justify-center bg-black pt-16" // 添加 pt-16 為導航欄留出空間
        >
          {/* Background Video - 優化視頻加載 */}
          <video
            className="w-full h-full object-cover rounded-lg shadow-lg transform-gpu" // 使用 transform-gpu 啟用 GPU 加速
            src={`${process.env.PUBLIC_URL}/Terminal.mp4`}
            autoPlay
            loop
            muted
            playsInline
            preload="auto" // 預加載視頻
            style={{ willChange: 'transform' }} // 優化視頻動畫效能
          ></video>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/20 pointer-events-none"></div>

          {/* Main Content */}
          <div className="relative z-10 text-center px-6 mt-16">
            <h1 className="text-6xl font-extrabold text-yellow-400 tracking-widest drop-shadow-stone-800 text-shadow-xl">
              VisionPort
            </h1>
            <p className="mt-4 text-lg text-gray-100 drop-shadow-lg text-shadow-md">
              Redefining crane operation with immersive technology
            </p>
            <div className="mt-8 flex justify-center space-x-6 filter drop-shadow-lg">
              <Link
                to="section1"
                smooth={true}
                duration={1200}
                className="animate-bounce cursor-pointer"
              >
                <div className="flex flex-col items-center text-white">
                  <svg
                    className="w-14 h-14 mt-16 filter drop-shadow-xl"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </header>
      </div>

      {/* News Section */}
      <section className="relative z-40 py-16 bg-black/80 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-yellow-500 mb-4">Latest News</h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
          </div>

          {/* App Store Link Card */}
          <div className="bg-slate-900/60 border border-yellow-700/30 rounded-lg p-6 mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-500/10 rounded-full filter blur-3xl"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">VisionPort Now Available on App Store!</h3>
              <p className="text-gray-300 mb-6">Experience the future of port operations training with our state-of-the-art VR simulator. Download now and start your journey!</p>
              <a 
                href="https://apps.apple.com/us/app/vision-port/id6745158373"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-600 to-yellow-500 text-white rounded-lg hover:from-yellow-500 hover:to-yellow-400 transition-all duration-300 transform hover:scale-105"
              >
                <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                Download on App Store
              </a>
            </div>
          </div>

          {/* Purchase Milestones */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Milestone 1 */}
            <div className="bg-slate-900/60 border border-yellow-700/30 rounded-lg p-6 relative overflow-hidden group hover:border-yellow-500/50 transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full filter blur-2xl group-hover:bg-yellow-500/10 transition-all duration-300"></div>
              <div className="relative z-10">
                <div className="text-4xl mb-4">🎉</div>
                <h3 className="text-xl font-bold text-yellow-400 mb-2">Goal: New Map</h3>
                <p className="text-gray-300">Unlock at 5+ purchases</p>
                <div className="mt-4 h-1 bg-yellow-500/20 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500 rounded-full" style={{ width: '2%' }}></div>
                </div>
              </div>
            </div>

            {/* Milestone 2 */}
            <div className="bg-slate-900/60 border border-yellow-700/30 rounded-lg p-6 relative overflow-hidden group hover:border-yellow-500/50 transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full filter blur-2xl group-hover:bg-yellow-500/10 transition-all duration-300"></div>
              <div className="relative z-10">
                <div className="text-4xl mb-4">🌦</div>
                <h3 className="text-xl font-bold text-yellow-400 mb-2">Goal: Weather Features</h3>
                <p className="text-gray-300">Unlock at 10+ purchases</p>
                <div className="mt-4 h-1 bg-yellow-500/20 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500 rounded-full" style={{ width: '2%' }}></div>
                </div>
              </div>
            </div>

            {/* Milestone 3 */}
            <div className="bg-slate-900/60 border border-yellow-700/30 rounded-lg p-6 relative overflow-hidden group hover:border-yellow-500/50 transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full filter blur-2xl group-hover:bg-yellow-500/10 transition-all duration-300"></div>
              <div className="relative z-10">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-yellow-400 mb-2">Goal: More Tasks</h3>
                <p className="text-gray-300">Unlock at 50+ purchases</p>
                <div className="mt-4 h-1 bg-yellow-500/20 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500 rounded-full" style={{ width: '2%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add custom text shadow classes */}
      <style>{`
        .text-shadow-md {
          text-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
        }
        .text-shadow-xl {
          text-shadow: 0 8px 16px rgba(0, 0, 0, 0.8),
            0 4px 8px rgba(0, 0, 0, 0.6);
        }
      `}</style>

      {/* Black Gradient Overlay - Pull-up Effect - 修改起始位置在導航欄下方 */}
      <div
        className="fixed z-20 pointer-events-none"
        style={{
          top: `${navbarHeight}px`, // 從導航欄下方開始
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.95) 100%)",
          transform: `translateY(${100 - overlayPosition}%)`,
          opacity: overlayPosition > 0 ? 1 : 0,
          transition: "transform 0.8s ease-out, opacity 0.8s ease-out",
        }}
      ></div>

      {/* Additional Black Gradient Overlay - For Richer Layering - 同樣調整位置 */}
      <div
        className="fixed z-19 pointer-events-none"
        style={{
          top: `${navbarHeight}px`, // 從導航欄下方開始
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(circle at center, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.8) 100%)",
          opacity: Math.min(0.7, overlayPosition / 70),
          transition: "opacity 1s ease-out",
        }}
      ></div>

      {/* Top Gradient Mask - 移除，因為我們不希望遮擋導航欄 */}
      {/* <div
        className="fixed top-0 left-0 right-0 z-30 pointer-events-none h-[119px]"
        style={{
          background: "linear-gradient(180deg, black, transparent)",
          opacity: overlayPosition > 50 ? 0.8 : 0,
          transition: "opacity 0.8s ease",
        }}
      ></div> */}

      {/* Scrolling Content Container */}
      <div className="relative min-h-[500vh]">
        {/* Placeholder Space */}
        <div style={{ height: `${windowHeight}px` }}></div>

        {/* First Section - Game Introduction */}
        <section
          id="section1"
          className="min-h-screen relative z-40 flex items-center justify-center"
          ref={introRef}
        >
          <div className="w-full flex items-center justify-center px-4">
            <div className="max-w-5xl w-full">
              <h2
                className="left-0 text-3xl md:text-4xl font-bold text-yellow-500 mb-10 text-center transition-all duration-500 ease-out relative transform-gpu" 
                style={{
                  opacity: activeSections.intro ? 1 : 0,
                  transform: activeSections.intro
                    ? "translateY(0)"
                    : "translateY(30px)",
                  transitionDelay: "0.2s",
                  willChange: "transform, opacity",
                }}
              >
                <span className="relative inline-block">
                  <span
                    className="absolute -bottom-2 left-0 w-full h-0.5 bg-yellow-500 transform scale-x-0 origin-left transition-transform duration-500 ease-out"
                    style={{
                      transform: activeSections.intro
                        ? "scaleX(1)"
                        : "scaleX(0)",
                      transitionDelay: "0.4s",
                      willChange: "transform",
                    }}
                  ></span>
                </span>
              </h2>

              <div className="flex flex-col md:flex-row items-stretch">
                {/* Left Text Section - 1/3 - Placed on Top Layer */}
                <div
                  className="w-full md:w-1/3 z-10 flex flex-col justify-center transition-all duration-800 ease-out relative transform-gpu"
                  style={{
                    opacity: activeSections.intro ? 1 : 0,
                    transform: activeSections.intro
                      ? "translateX(0)"
                      : "translateX(-300px)",
                    transitionDelay: "0.2s",
                    willChange: "transform, opacity",
                  }}
                >
                  {/* Title */}
                  <h2
                    className="translate-x-10 text-3xl md:text-4xl font-bold text-yellow-500 mb-10 text-center transition-all duration-500 ease-out relative -ml-18 transform-gpu"
                    style={{
                      opacity: activeSections.intro ? 1 : 0,
                      transform: activeSections.intro
                        ? "translateY(0)"
                        : "translateY(30px)",
                      transitionDelay: "0.3s",
                      willChange: "transform, opacity",
                    }}
                  >
                    <span className="relative inline-block">
                      Game Introduction
                      <span
                        className="absolute -bottom-2 left-0 w-full h-0.5 bg-yellow-500 transform scale-x-0 origin-left transition-transform duration-500 ease-out"
                        style={{
                          transform: activeSections.intro
                            ? "scaleX(1)"
                            : "scaleX(0)",
                          transitionDelay: "0.4s",
                          willChange: "transform",
                        }}
                      ></span>
                    </span>
                  </h2>

                  {/* Using Background Image as Content Block Background */}
                  <div
                    className="relative p-[38px_50px_36px_53px] w-[425px] h-[384px] bg-no-repeat bg-center bg-contain transform-gpu"
                    style={{
                      backgroundImage:
                        "url('https://tw.hicdn.beanfun.com/beanfun/GamaWWW/CSO/official2021/assets/img/game-mode/mode/mode-content-wrapper-lg.png')",
                      transform: activeSections.intro
                        ? "translateX(0)" 
                        : "translateX(-50px)",
                      opacity: activeSections.intro ? 1 : 0,
                      transition: "all 0.5s ease-out 0.4s",
                      willChange: "transform, opacity",
                    }}
                  >
                    <h3 className="text-3xl font-normal text-white mb-[25px] max-w-[250px] leading-[42px]">
                      Port Simulation
                    </h3>

                    <p className="text-[15px] leading-[29px] font-light text-white">
                      Experience Hong Kong's busiest port virtually, where
                      thousands of containers are handled daily. Learn complex
                      crane operations in a risk-free environment without the
                      costs of real-world training. Our simulator recreates
                      authentic terminal environments and operational workflows.
                    </p>
                  </div>
                </div>

                {/* Right Video Section - 2/3 */}
                <div
                  className="w-full md:w-2/3 mt-20 md:-ml-[30px] h-[383px] flex-grow overflow-hidden transition-all duration-800 ease-out relative group cursor-pointer bg-gradient-to-br from-slate-950/30 to-slate-900/90 transform-gpu"
                  style={{
                    opacity: activeSections.intro ? 1 : 0,
                    transform: activeSections.intro
                      ? "translateX(0)"
                      : "translateX(300px)",
                    transitionDelay: "0.3s",
                    willChange: "transform, opacity",
                  }}
                >
                  {/* Content Area */}
                  <div className="h-full w-full flex items-center justify-center">
                    <div className="w-4/5 h-4/5 transition-transform duration-[0.58s] ease group-hover:scale-105 transform-gpu"
                    style={{
                      willChange: "transform",
                    }}>
                      <div className="w-full h-full object-cover rounded-lg shadow-lg ml-11 bg-slate-900/80 p-8 transform-gpu"
                      style={{
                        willChange: "transform",
                      }}>
                        <h3 className="text-2xl font-bold text-yellow-400 mb-4">Welcome to VisionPort</h3>
                        <p className="text-gray-300 text-lg leading-relaxed">
                          Experience the future of port operations training with our state-of-the-art VR simulator. 
                          Our platform combines cutting-edge technology with realistic port environments to provide 
                          an immersive learning experience for crane operators.
                        </p>
                        <p className="text-gray-300 text-lg leading-relaxed mt-4">
                          Whether you're a beginner looking to learn the basics or an experienced operator 
                          seeking to enhance your skills, VisionPort offers a comprehensive training solution 
                          that adapts to your needs.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Second Section - Tutorial Mode (Reversed Layout) */}
        <section
          id="section2"
          className="min-h-screen relative z-40 flex items-center justify-center"
          ref={tutorialRef}
        >
          <div className="w-full flex items-center justify-center px-4">
            <div className="max-w-5xl w-full">
              <h2
                className="left-0 text-3xl md:text-4xl font-bold text-blue-400 mb-10 text-center transition-all duration-1000 ease-out relative"
                style={{
                  opacity: activeSections.tutorial ? 1 : 0,
                  transform: activeSections.tutorial
                    ? "translateY(0)"
                    : "translateY(30px)",
                  transitionDelay: "0.4s",
                }}
              >
                <span className="relative inline-block">
                  <span
                    className="absolute -bottom-2 left-0 w-full h-0.5 bg-blue-400 transform scale-x-0 origin-left transition-transform duration-1000 ease-out"
                    style={{
                      transform: activeSections.tutorial
                        ? "scaleX(1)"
                        : "scaleX(0)",
                      transitionDelay: "0.8s",
                    }}
                  ></span>
                </span>
              </h2>

              <div className="flex flex-col md:flex-row-reverse items-stretch">
                {/* Right Text Section - 1/3 - Placed on Top Layer */}
                <div
                  className="w-full md:w-1/3 z-10 flex flex-col justify-center transition-all duration-2000 ease-out relative"
                  style={{
                    opacity: activeSections.tutorial ? 1 : 0,
                    transform: activeSections.tutorial
                      ? "translateX(0)"
                      : "translateX(300px)",
                    transitionDelay: "0.7s",
                  }}
                >
                  {/* Title */}
                  <h2
                    className="translate-x-10 text-3xl md:text-4xl font-bold text-blue-400 mb-10 text-center transition-all duration-1000 ease-out relative ml-20"
                    style={{
                      opacity: activeSections.tutorial ? 1 : 0,
                      transform: activeSections.tutorial
                        ? "translateY(0)"
                        : "translateY(30px)",
                      transitionDelay: "0.4s",
                    }}
                  >
                    <span className="relative inline-block">
                      Tutorial Mode
                      <span
                        className="absolute -bottom-2 left-0 w-full h-0.5 bg-blue-400 transform scale-x-0 origin-left transition-transform duration-1000 ease-out"
                        style={{
                          transform: activeSections.tutorial
                            ? "scaleX(1)"
                            : "scaleX(0)",
                          transitionDelay: "0.8s",
                        }}
                      ></span>
                    </span>
                  </h2>

                  {/* Using Background Image for Content Block - Horizontally Flipped */}
                  <div
                    className="relative p-[38px_50px_36px_53px] w-[425px] h-[384px] bg-no-repeat bg-center bg-contain transform scale-x-[-1] -ml-[89px] "
                    style={{
                      backgroundImage:
                        "url('https://tw.hicdn.beanfun.com/beanfun/GamaWWW/CSO/official2021/assets/img/game-mode/mode/mode-content-wrapper-lg.png')",
                    }}
                  >
                    {/* Content Not Flipped */}
                    <div className="transform scale-x-[-1] mr-10">
                      <h3 className="text-3xl font-normal text-white mb-[25px] max-w-[280px] leading-[42px]">
                        Progressive Learning
                      </h3>

                      <p className="text-[15px] leading-[29px] font-light text-white">
                        Designed specifically for beginners with carefully
                        structured progressive exercises and instantaneous
                        feedback. Detailed guidance and demonstrations help you
                        understand each control device and master fundamental
                        techniques. From basic equipment familiarization to
                        complex coordinated movements.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Left Video Section - 2/3 */}
                <div
                  className="w-full md:w-2/3 mt-20 h-[383px] flex-grow overflow-hidden transition-all duration-2000 ease-out relative group cursor-pointer bg-gradient-to-br from-slate-950/30 to-slate-900/90"
                  style={{
                    opacity: activeSections.tutorial ? 1 : 0,
                    transform: activeSections.tutorial
                      ? "translateX(0)"
                      : "translateX(-300px)",
                    transitionDelay: "0.7s",
                  }}
                >
                  {/* Content Area */}
                  <div className="h-full w-full flex items-center justify-center">
                    <div className="w-4/5 h-4/5 transition-transform duration-[0.58s] ease group-hover:scale-105">
                      <iframe
                        className="w-full h-full object-cover rounded-lg shadow-lg -ml-9"
                        src="https://www.youtube.com/embed/z43TE84aY9g"
                        title="Tutorial Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Third Section - Mission Mode */}
        <section
          id="section3"
          className="min-h-screen relative z-40 flex items-center justify-center"
          ref={missionRef}
        >
          <div className="w-full flex items-center justify-center px-4">
            <div className="max-w-5xl w-full">
              <h2
                className="left-0 text-3xl md:text-4xl font-bold text-green-400 mb-10 text-center transition-all duration-1000 ease-out relative"
                style={{
                  opacity: activeSections.mission ? 1 : 0,
                  transform: activeSections.mission
                    ? "translateY(0)"
                    : "translateY(30px)",
                  transitionDelay: "0.4s",
                }}
              >
                <span className="relative inline-block">
                  <span
                    className="absolute -bottom-2 left-0 w-full h-0.5 bg-green-400 transform scale-x-0 origin-left transition-transform duration-1000 ease-out"
                    style={{
                      transform: activeSections.mission
                        ? "scaleX(1)"
                        : "scaleX(0)",
                      transitionDelay: "0.8s",
                    }}
                  ></span>
                </span>
              </h2>

              <div className="flex flex-col md:flex-row items-stretch">
                {/* Left Text Section - 1/3 - Placed on Top Layer */}
                <div
                  className="w-full md:w-1/3 z-10 flex flex-col justify-center transition-all duration-2000 ease-out relative"
                  style={{
                    opacity: activeSections.mission ? 1 : 0,
                    transform: activeSections.mission
                      ? "translateX(0)"
                      : "translateX(-300px)",
                    transitionDelay: "0.7s",
                  }}
                >
                  {/* Title */}
                  <h2
                    className="translate-x-10 text-3xl md:text-4xl font-bold text-green-400 mb-10 text-center transition-all duration-1000 ease-out relative -ml-20"
                    style={{
                      opacity: activeSections.mission ? 1 : 0,
                      transform: activeSections.mission
                        ? "translateY(0)"
                        : "translateY(30px)",
                      transitionDelay: "0.4s",
                    }}
                  >
                    <span className="relative inline-block">
                      Mission Mode
                      <span
                        className="absolute -bottom-2 left-0 w-full h-0.5 bg-green-400 transform scale-x-0 origin-left transition-transform duration-1000 ease-out"
                        style={{
                          transform: activeSections.mission
                            ? "scaleX(1)"
                            : "scaleX(0)",
                          transitionDelay: "0.8s",
                        }}
                      ></span>
                    </span>
                  </h2>

                  {/* Using Taller Background Image to Accommodate Longer Text */}
                  <div
                    className="relative p-[38px_50px_36px_53px] w-[425px] h-[384px] bg-no-repeat bg-center bg-contain"
                    style={{
                      backgroundImage:
                        "url('https://tw.hicdn.beanfun.com/beanfun/GamaWWW/CSO/official2021/assets/img/game-mode/mode/mode-content-wrapper-lg.png')",
                    }}
                  >
                    <h3 className="text-3xl font-normal text-white mb-[25px] max-w-[180px] leading-[42px]">
                      Challenges
                    </h3>

                    <p className="text-[15px] leading-[29px] font-light text-white">
                      Face a variety of timed challenges with diverse cargo
                      scenarios that test your technical proficiency and
                      decision-making abilities. Handle different container
                      types, respond to changing weather conditions, and manage
                      emergency situations under pressure. Complete missions to
                      earn performance ratings.
                    </p>
                  </div>
                </div>

                {/* Right Video Section - 2/3 */}
                <div
                  className="w-full md:w-2/3 mt-20 md:-ml-[30px] h-[383px] flex-grow overflow-hidden transition-all duration-2000 ease-out relative group cursor-pointer bg-gradient-to-br from-slate-950/30 to-slate-900/90"
                  style={{
                    opacity: activeSections.mission ? 1 : 0,
                    transform: activeSections.mission
                      ? "translateX(0)"
                      : "translateX(300px)",
                    transitionDelay: "0.7s",
                  }}
                >
                  {/* Content Area */}
                  <div className="h-full w-full flex items-center justify-center">
                    <div className="w-4/5 h-4/5 transition-transform duration-[0.58s] ease group-hover:scale-105">
                      <iframe
                        className="w-full h-full object-cover rounded-lg shadow-lg ml-11"
                        src="https://www.youtube.com/embed/KGDmR7h7NQE"
                        title="Mission Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Fourth Section - Free Mode (Reversed Layout) */}
        <section
          id="section4"
          className="min-h-screen relative z-40 flex items-center justify-center"
          ref={freeRef}
        >
          <div className="w-full flex items-center justify-center px-4">
            <div className="max-w-5xl w-full">
              <h2
                className="left-0 text-3xl md:text-4xl font-bold text-purple-400 mb-10 text-center transition-all duration-1000 ease-out relative"
                style={{
                  opacity: activeSections.free ? 1 : 0,
                  transform: activeSections.free
                    ? "translateY(0)"
                    : "translateY(30px)",
                  transitionDelay: "0.4s",
                }}
              >
                <span className="relative inline-block">
                  <span
                    className="absolute -bottom-2 left-0 w-full h-0.5 bg-purple-400 transform scale-x-0 origin-left transition-transform duration-1000 ease-out"
                    style={{
                      transform: activeSections.free
                        ? "scaleX(1)"
                        : "scaleX(0)",
                      transitionDelay: "0.8s",
                    }}
                  ></span>
                </span>
              </h2>

              <div className="flex flex-col md:flex-row-reverse items-stretch">
                {/* Right Text Section - 1/3 - Placed on Top Layer */}
                <div
                  className="w-full md:w-1/3 z-10 flex flex-col justify-center transition-all duration-2000 ease-out relative"
                  style={{
                    opacity: activeSections.free ? 1 : 0,
                    transform: activeSections.free
                      ? "translateX(0)"
                      : "translateX(300px)",
                    transitionDelay: "0.7s",
                  }}
                >
                  {/* Title */}
                  <h2
                    className="translate-x-10 text-3xl md:text-4xl font-bold text-purple-400 mb-10 text-center transition-all duration-1000 ease-out relative ml-20"
                    style={{
                      opacity: activeSections.free ? 1 : 0,
                      transform: activeSections.free
                        ? "translateY(0)"
                        : "translateY(30px)",
                      transitionDelay: "0.4s",
                    }}
                  >
                    <span className="relative inline-block">
                      Free Mode
                      <span
                        className="absolute -bottom-2 left-0 w-full h-0.5 bg-purple-400 transform scale-x-0 origin-left transition-transform duration-1000 ease-out"
                        style={{
                          transform: activeSections.free
                            ? "scaleX(1)"
                            : "scaleX(0)",
                          transitionDelay: "0.8s",
                        }}
                      ></span>
                    </span>
                  </h2>

                  {/* Using Taller Background Image to Accommodate More Text - Horizontally Flipped */}
                  <div
                    className="relative p-[38px_50px_36px_53px] w-[425px] h-[384px] bg-no-repeat bg-center bg-contain transform scale-x-[-1] -ml-[89px] "
                    style={{
                      backgroundImage:
                        "url('https://tw.hicdn.beanfun.com/beanfun/GamaWWW/CSO/official2021/assets/img/game-mode/mode/mode-content-wrapper-lg.png')",
                    }}
                  >
                    {/* Content Not Flipped */}
                    <div className="transform scale-x-[-1] mr-10">
                      <h3 className="text-3xl font-normal text-white mb-[25px] max-w-[280px] leading-[42px] ">
                        Free Exploration
                      </h3>
                      <div className="h-6"></div>
                      <p className="text-[15px] leading-[29px] font-light text-white">
                        Operate the crane freely without time constraints or
                        mission objectives. Explore the detailed port
                        environment at your own pace, experiment with different
                        operating techniques, and develop your personal workflow
                        strategies. This mode is ideal for experienced operators
                        looking to refine their skills.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Left Video Section - 2/3 */}
                <div
                  className="w-full md:w-2/3 mt-20 h-[383px] flex-grow overflow-hidden transition-all duration-2000 ease-out relative group cursor-pointer bg-gradient-to-br from-slate-950/30 to-slate-900/90"
                  style={{
                    opacity: activeSections.free ? 1 : 0,
                    transform: activeSections.free
                      ? "translateX(0)"
                      : "translateX(-300px)",
                    transitionDelay: "0.7s",
                  }}
                >
                  <div className="h-full w-full flex items-center justify-center">
                    <div className="w-4/5 h-4/5 transition-transform duration-[0.58s] ease group-hover:scale-105">
                      <iframe
                        className="w-full h-full object-cover rounded-lg shadow-lg -ml-9"
                        src="https://www.youtube.com/embed/6lTKJSAmFM8"
                        title="Free Mode Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* History Images Section - Game Style Version */}
        <section
          id="history"
          className="min-h-screen relative z-30 flex flex-col items-center justify-center py-16 bg-black/60 backdrop-blur-sm"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.85), rgba(0,0,0,0.9))",
            backgroundSize: "cover",
          }}
        >
          <div className="w-full max-w-6xl mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-yellow-500 text-center mb-6">
              Hong Kong Port History
            </h2>
            <p className="text-lg text-gray-300 text-center max-w-3xl mx-auto mb-12">
              From a small fishing port to today's world-class container hub,
              the development of Hong Kong's port has witnessed the prosperity
              and changes of this city.
            </p>

            {/* Game-Style Timeline */}
            <div className="history-timeline relative mb-8">
              {/* Timeline Center Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-yellow-600/10 via-yellow-500/50 to-yellow-600/10"></div>

              {/* Timeline Points */}
              <div className="flex justify-center space-x-12 md:space-x-20 mb-4">
                {[1950, 1970, 1990, 2010].map((year, idx) => (
                  <div
                    key={idx}
                    className={`timeline-year relative cursor-pointer ${
                      selectedYear === year ? "active" : ""
                    }`}
                    onClick={() => setSelectedYear(year)}
                  >
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-5 h-5 rounded-full border-2 ${
                          selectedYear === year
                            ? "bg-yellow-500 border-yellow-300"
                            : "bg-slate-800 border-yellow-700"
                        } transition-all duration-300 hover:bg-yellow-600`}
                      ></div>
                      <div
                        className={`text-lg font-mono mt-2 transition-all duration-300 ${
                          selectedYear === year
                            ? "text-yellow-400 scale-110"
                            : "text-yellow-700"
                        }`}
                      >
                        {year}
                      </div>
                    </div>
                    {selectedYear === year && (
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full">
                        <svg
                          className="w-8 h-8 text-yellow-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* History Showcase - Game UI Style */}
            <div className="history-showcase bg-slate-900/40 border border-yellow-700/30 rounded-lg p-6 relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-60 h-60 bg-yellow-500/5 rounded-full filter blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-60 h-60 bg-yellow-700/5 rounded-full filter blur-3xl"></div>

              {/* Game UI Top Bar */}
              <div className="flex justify-between items-center mb-6 border-b border-yellow-900/30 pb-3">
                <div className="flex items-center">
                  <div className="w-3 h-8 bg-yellow-500 mr-3"></div>
                  <h3 className="text-2xl font-bold text-yellow-400">
                    Port Development File
                  </h3>
                </div>
                <div className="flex items-center text-yellow-600/70 font-mono text-sm">
                  <span>File Number: HKP-{selectedYear}</span>
                  <span className="ml-4 px-2 py-1 bg-yellow-900/30 rounded">
                    Security Level: Public
                  </span>
                </div>
              </div>

              {/* History Content - Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Side - Image - 優化成使用高效能的圖片元件 */}
                <div className="relative border-2 border-yellow-700/30 rounded-lg overflow-hidden group">
                  <OptimizedImage
                    src={historyData[selectedYear].image}
                    alt={`Hong Kong Port ${selectedYear}`}
                    className="w-full h-[300px] object-cover"
                    style={{
                      transform: 'translate3d(0,0,0)', // 強制啟用GPU加速
                      willChange: 'transform', // 優化動畫效能
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                  {/* Game-Style Image Corner Mark */}
                  <div className="absolute top-0 right-0 bg-yellow-600/90 text-black px-3 py-1 font-mono text-xs">
                    {selectedYear} Image
                  </div>

                  {/* Image Bottom Caption */}
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-white text-sm">
                      Location: {historyData[selectedYear].location}
                    </p>
                  </div>

                  {/* Image Border Decorations */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-yellow-500/50"></div>
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-yellow-500/50"></div>
                </div>

                {/* Right Side - Text Information */}
                <div className="bg-slate-900/50 rounded-lg p-4 border border-yellow-900/20">
                  {/* Progress Bar */}
                  <div className="flex justify-between items-center mb-4 text-sm text-yellow-400/80 font-mono">
                    <span>Development Stage</span>
                    <span>{historyData[selectedYear].progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden mb-4">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-full transform-gpu" // 使用 transform-gpu 啟用 GPU 加速
                      style={{
                        width: `${historyData[selectedYear].progress}%`,
                        willChange: 'width', // 優化進度條動畫過渡
                        transition: 'width 0.4s cubic-bezier(0.22, 1, 0.36, 1)', // 使用更流暢的緩動函數
                      }}
                    ></div>
                  </div>

                  {/* Statistics */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-slate-800/50 p-3 rounded border border-yellow-900/20">
                      <div className="text-xs text-gray-400 mb-1">
                        Annual Throughput
                      </div>
                      <div className="text-yellow-400 font-mono text-lg">
                        {historyData[selectedYear].throughput}
                      </div>
                    </div>
                    <div className="bg-slate-800/50 p-3 rounded border border-yellow-900/20">
                      <div className="text-xs text-gray-400 mb-1">
                        Terminal Count
                      </div>
                      <div className="text-yellow-400 font-mono text-lg">
                        {historyData[selectedYear].terminals}
                      </div>
                    </div>
                    <div className="bg-slate-800/50 p-3 rounded border border-yellow-900/20">
                      <div className="text-xs text-gray-400 mb-1">
                        Global Ranking
                      </div>
                      <div className="text-yellow-400 font-mono text-lg">
                        #{historyData[selectedYear].ranking}
                      </div>
                    </div>
                  </div>

                  {/* Description Text */}
                  <div>
                    <h4 className="text-sm uppercase text-gray-400 mb-2 flex items-center">
                      <span className="w-1 h-4 bg-yellow-500 mr-2"></span>
                      Historical Overview
                    </h4>
                    <p className="text-gray-300 text-sm leading-relaxed border-l-2 border-yellow-900/30 pl-3">
                      {historyData[selectedYear].description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Navigation */}
              <div className="flex justify-between mt-6 pt-4 border-t border-yellow-900/30">
                <button
                  className="flex items-center text-yellow-500 hover:text-yellow-400 transition disabled:text-yellow-900/40 disabled:cursor-not-allowed"
                  onClick={() => navigateYear("prev")}
                  disabled={selectedYear === 1950}
                >
                  <svg
                    className="w-5 h-5 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Previous Stage
                </button>

                <div className="text-yellow-600/70 font-mono">
                  File {yearIndex + 1}/4
                </div>

                <button
                  className="flex items-center text-yellow-500 hover:text-yellow-400 transition disabled:text-yellow-900/40 disabled:cursor-not-allowed"
                  onClick={() => navigateYear("next")}
                  disabled={selectedYear === 2010}
                >
                  Next Stage
                  <svg
                    className="w-5 h-5 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Background Decorations */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30 z-0">
            <div
              className="absolute top-10 left-10 w-64 h-64 rounded-full border border-yellow-500/10 animate-pulse"
              style={{ animationDuration: "4s" }}
            ></div>
            <div
              className="absolute bottom-20 right-20 w-80 h-80 rounded-full border border-yellow-500/5 animate-pulse"
              style={{ animationDuration: "7s" }}
            ></div>

            {/* Decorative Grid Background */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMwZjE3MmEiIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzcuNSAzMGMwIDQuMTQyLTMuMzU4IDcuNS03LjUgNy41LTQuMTQyIDAtNy41LTMuMzU4LTcuNS03LjUgMC00LjE0MiAzLjM1OC03LjUgNy41LTcuNSA0LjE0MiAwIDcuNSAzLjM1OCA3LjUgNy41eiIgc3Ryb2tlLW9wYWNpdHk9Ii4wNSIgc3Ryb2tlPSIjZWFiMzA4IiBmaWxsLW9wYWNpdHk9Ii4wMiIgZmlsbD0iI2VhYjMwOCIvPjxwYXRoIGQ9Ik0zMCAwdjYwTTYwIDMwSDAiIHN0cm9rZS1vcGFjaXR5PSIuMDUiIHN0cm9rZT0iI2VhYjMwOCIvPjwvZz48L3N2Zz4=')] opacity-10"></div>
          </div>
        </section>

        {/* About Us Section - Game Character Selection Style (Yellow Theme) */}
        <section
          id="about"
          className="min-h-screen relative z-40 flex items-center justify-center bg-black/80 backdrop-blur-sm py-16"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.95))",
            backgroundSize: "cover",
          }}
        >
          <div className="w-full max-w-7xl mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-yellow-500 text-center mb-12">
              Development Team
            </h2>

            {/* Game Selection Interface - Changed to Left-Right Layout */}
            <div className="character-selection relative flex flex-col md:flex-row">
              {/* Left Character Carousel Area (70%) */}
              <div className="w-full md:w-[70%] character-carousel relative">
                {/* Character Carousel Container */}
                <div className="carousel-container relative h-[500px] mx-auto">
                  {/* Team Member Data */}
                  {teamMembers.map((member, index) => (
                    // 僅渲染可見範圍內的成員卡片，優化性能
                    Math.abs(index - selectedCharacter) <= 2 && (
                      <div
                        key={index}
                        className="character-card absolute transition-all duration-500 w-[350px] cursor-pointer transform-gpu" // 使用 transform-gpu 啟用 GPU 加速
                        style={{
                          '--translateX': `${(index - selectedCharacter) * 150}px`,
                          '--scale': index === selectedCharacter ? '1' : '0.85',
                          '--zIndex': index === selectedCharacter ? '10' : `${10 - Math.abs(index - selectedCharacter)}`,
                          '--opacity': Math.abs(index - selectedCharacter) > 2 ? '0' : '1',
                          left: `calc(50% - 175px)`,
                          transform: `translateX(var(--translateX)) scale(var(--scale)) translateZ(${index === selectedCharacter ? '50px' : '0'})`,
                          zIndex: `var(--zIndex)`,
                          opacity: `var(--opacity)`,
                          willChange: 'transform, opacity', // 優化動畫效能
                          pointerEvents: Math.abs(index - selectedCharacter) > 2 ? "none" : "auto",
                        }}
                        onClick={() => setSelectedCharacter(index)}
                        draggable="true"
                        onDragStart={(e) => {
                          // Record starting position when drag starts
                          dragStartX.current = e.clientX;
                          e.dataTransfer.setDragImage(new Image(), 0, 0); // Hide default drag image
                        }}
                        onDrag={(e) => {
                          if (e.clientX === 0) return; // Ignore invalid events
                          const diff = e.clientX - dragStartX.current;
                          if (Math.abs(diff) > 50) {
                            // Drag exceeds threshold
                            const direction = diff > 0 ? -1 : 1; // Left drag switches right, right drag switches left
                            const newIndex = Math.max(
                              0,
                              Math.min(3, selectedCharacter + direction)
                            );
                            if (newIndex !== selectedCharacter) {
                              setSelectedCharacter(newIndex);
                              dragStartX.current = e.clientX;
                            }
                          }
                        }}
                      >
                        {/* Character Card Frame */}
                        <div className="border-2 border-yellow-500/40 rounded-lg overflow-hidden bg-slate-900/80 shadow-lg shadow-yellow-500/20 transition-all duration-300">
                          {/* Character Photo */}
                          <div className="h-[320px] overflow-hidden">
                            <OptimizedImage
                              src={member.photo}
                              alt={member.name}
                              className="w-full h-full bg-center bg-cover transition-all duration-500 transform-gpu" // 使用 OptimizedImage 和 transform-gpu
                              style={{
                                willChange: 'transform', // 優化動畫效能
                              }}
                            />
                          </div>

                          {/* Character Basic Info */}
                          <div className="px-3 py-2 bg-gradient-to-b from-slate-900/90 to-black border-t border-yellow-800/40">
                            <h3 className="text-xl font-bold text-yellow-400">
                              {member.name}
                            </h3>
                            <div className="text-xs text-yellow-300/70 font-mono">
                              {member.role}
                            </div>
                          </div>

                          {/* Selection Indicator - Only Shown on Active Card */}
                          {index === selectedCharacter && (
                            <div className="absolute top-0 left-0 right-0 h-1 bg-yellow-500"></div>
                          )}
                        </div>
                      </div>
                    )
                  ))}

                  {/* Left-Right Arrow Controls */}
                  <button
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 text-yellow-500 p-2 rounded-full hover:bg-yellow-900/50 transition-all duration-300"
                    onClick={() =>
                      setSelectedCharacter((prev) => Math.max(0, prev - 1))
                    }
                    disabled={selectedCharacter === 0}
                    style={{ opacity: selectedCharacter === 0 ? 0.5 : 1 }}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 text-yellow-500 p-2 rounded-full hover:bg-yellow-900/50 transition-all duration-300"
                    onClick={() =>
                      setSelectedCharacter((prev) => Math.min(3, prev + 1))
                    }
                    disabled={selectedCharacter === 3}
                    style={{ opacity: selectedCharacter === 3 ? 0.5 : 1 }}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>

                  {/* Carousel Navigation Indicators */}
                  <div className="absolute bottom-[-30px] left-0 right-0 flex justify-center space-x-2">
                    {[0, 1, 2, 3].map((idx) => (
                      <button
                        key={idx}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          idx === selectedCharacter
                            ? "bg-yellow-500 w-6"
                            : "bg-yellow-800/50"
                        }`}
                        onClick={() => setSelectedCharacter(idx)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Skills Info Area (30%) */}
              <div className="w-full md:w-[30%] character-stats mt-12 md:mt-0 pl-0 md:pl-6">
                <div className="bg-slate-900/60 border border-yellow-700/30 rounded-lg p-5 h-full relative overflow-hidden">
                  {/* Decorative Background Elements */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-500/10 rounded-full filter blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-yellow-700/10 rounded-full filter blur-3xl"></div>

                  {/* Character Info */}
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-yellow-500 mb-1">
                      {teamMembers[selectedCharacter].name}
                    </h3>
                    <div className="text-sm text-yellow-400/80 mb-4">
                      {teamMembers[selectedCharacter].role}
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 text-sm mb-6 leading-relaxed border-l-2 border-yellow-500/50 pl-3">
                      {teamMembers[selectedCharacter].description}
                    </p>

                    {/* Ability Values */}
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-400 text-xs uppercase tracking-wider">
                          Total Ability
                        </span>
                        <span className="text-yellow-400 font-mono">
                          {teamMembers[selectedCharacter].stats.total}
                          <span className="text-gray-500 text-xs">/100</span>
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden mb-4">
                        <div
                          className="h-full bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-full"
                          style={{
                            width: `${teamMembers[selectedCharacter].stats.total}%`,
                          }}
                        ></div>
                      </div>

                      {/* Detailed Ability Values */}
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-slate-900/80 p-2 rounded border border-yellow-900/30">
                          <div className="flex items-center justify-between">
                            <svg
                              className="w-4 h-4 text-yellow-500"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20Z" />
                              <path d="M12 6C9.794 6 8 7.794 8 10C8 11.858 9.28 13.55 11 13.92V18H13V13.92C14.72 13.55 16 11.858 16 10C16 7.794 14.206 6 12 6Z" />
                            </svg>
                            <span className="text-yellow-500 font-mono text-sm">
                              {teamMembers[selectedCharacter].stats.body}
                            </span>
                          </div>
                          <div className="text-gray-400 text-xs mt-1 text-center">
                            Technical <br /> Expertise
                          </div>
                        </div>

                        <div className="bg-slate-900/80 p-2 rounded border border-yellow-900/30">
                          <div className="flex items-center justify-between">
                            <svg
                              className="w-4 h-4 text-yellow-500"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20Z" />
                              <path d="M13 7H11V9H13V7Z" />
                              <path d="M11 11V17H13V11H11Z" />
                            </svg>
                            <span className="text-yellow-500 font-mono text-sm">
                              {
                                teamMembers[selectedCharacter].stats
                                  .intelligence
                              }
                            </span>
                          </div>
                          <div className="text-gray-400 text-xs mt-1 text-center">
                            Problem <br /> Solving
                          </div>
                        </div>

                        <div className="bg-slate-900/80 p-2 rounded border border-yellow-900/30">
                          <div className="flex items-center justify-between">
                            <svg
                              className="w-4 h-4 text-yellow-500"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20Z" />
                              <path d="M10 13.414L7.293 10.707L5.879 12.121L10 16.242L18.121 8.121L16.707 6.707L10 13.414Z" />
                            </svg>
                            <span className="text-yellow-500 font-mono text-sm">
                              {teamMembers[selectedCharacter].stats.knowledge}
                            </span>
                          </div>
                          <div className="text-gray-400 text-xs mt-1 text-center">
                            Experience
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Skills List */}
                    <div className="mb-4">
                      <h4 className="text-sm uppercase text-gray-400 mb-2 flex items-center">
                        <span className="w-1 h-4 bg-yellow-500 mr-2"></span>
                        Professional Skills
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {teamMembers[selectedCharacter].skills.map(
                          (skill, idx) => (
                            <div
                              key={idx}
                              className="bg-slate-900/50 px-3 py-1 rounded border border-yellow-900/20 text-gray-300 text-sm flex items-center"
                            >
                              <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-2"></span>
                              {skill}
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className="mt-4 pt-4 border-t border-yellow-900/30">
                      <div className="flex items-center text-yellow-500/70 text-sm">
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                        </svg>
                        <span className="font-mono">
                          {teamMembers[selectedCharacter].email}
                        </span>
                      </div>

                      {/* Contact Button */}
                      <a 
                        href={`mailto:${teamMembers[selectedCharacter].email}`}
                        className="contact-button relative block transform-gpu" // 使用 transform-gpu 啟用 GPU 加速
                      >
                        {/* 添加發光效果層，分離動畫複雜度 */}
                        <div className="button-glow animate-rotate"></div>
                        <div className="bg-gradient-to-r from-yellow-900/80 to-yellow-700/80 text-white px-6 py-2 rounded border border-yellow-500/50 shadow-lg shadow-yellow-500/20 transform-gpu" // 使用 transform-gpu 啟用 GPU 加速
                        style={{
                          willChange: 'transform', // 優化動畫效能
                        }}>
                          <span className="text-lg font-bold tracking-wider">
                            CONTACT
                          </span>
                        </div>
                      </a>

                      {/* Bottom Identifier */}
                      <div className="flex justify-between mt-3 text-xs text-yellow-600/70 font-mono">
                        <div>2023-2025</div>
                        <div>{15 + selectedCharacter * 10}/50</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Statistics */}
            <div className="team-stats mt-12 bg-slate-900/40 border border-yellow-900/20 rounded-lg p-4">
              <div className="flex flex-wrap justify-between items-center">
                <div className="email-section flex items-center text-yellow-500 mb-2 md:mb-0">
                  <span className="mr-2 font-mono text-sm">TEAM EMAIL:</span>
                  <a 
                    href={`mailto:${teamMembers[selectedCharacter].email}`}
                    className="font-mono text-sm hover:text-yellow-400 transition-colors"
                  >
                    {teamMembers[selectedCharacter].email}
                  </a>
                </div>

                {/* Team Overall Statistics */}
                <div className="flex flex-wrap items-center space-x-0 md:space-x-4 space-y-2 md:space-y-0">
                  <div className="stat-item flex items-center space-x-2">
                    <svg
                      className="w-5 h-5 text-yellow-500/70"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20Z" />
                      <path d="M12 6C9.794 6 8 7.794 8 10C8 11.858 9.28 13.55 11 13.92V18H13V13.92C14.72 13.55 16 11.858 16 10C16 7.794 14.206 6 12 6Z" />
                    </svg>
                    <div className="font-mono">
                      <div className="text-yellow-500 text-sm">
                        45<span className="text-gray-500 text-xs">/60</span>
                      </div>
                      <div className="text-gray-400 text-xs">Physical</div>
                    </div>
                  </div>

                  <div className="stat-item flex items-center space-x-2">
                    <svg
                      className="w-5 h-5 text-yellow-500/70"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20Z" />
                      <path d="M13 7H11V9H13V7Z" />
                      <path d="M11 11V17H13V11H11Z" />
                    </svg>
                    <div className="font-mono">
                      <div className="text-yellow-500 text-sm">
                        56<span className="text-gray-500 text-xs">/60</span>
                      </div>
                      <div className="text-gray-400 text-xs">Intelligence</div>
                    </div>
                  </div>

                  <div className="stat-item flex items-center space-x-2">
                    <svg
                      className="w-5 h-5 text-yellow-500/70"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20Z" />
                      <path d="M10 13.414L7.293 10.707L5.879 12.121L10 16.242L18.121 8.121L16.707 6.707L10 13.414Z" />
                    </svg>
                    <div className="font-mono">
                      <div className="text-yellow-500 text-sm">
                        64<span className="text-gray-500 text-xs">/80</span>
                      </div>
                      <div className="text-gray-400 text-xs">Knowledge</div>
                    </div>
                  </div>

                  {/* Contact Button */}
                  <a 
                    href={`mailto:${teamMembers[selectedCharacter].email}`}
                    className="contact-button relative block transform-gpu" // 使用 transform-gpu 啟用 GPU 加速
                  >
                    {/* 添加發光效果層，分離動畫複雜度 */}
                    <div className="button-glow animate-rotate"></div>
                    <div className="bg-gradient-to-r from-yellow-900/80 to-yellow-700/80 text-white px-6 py-2 rounded border border-yellow-500/50 shadow-lg shadow-yellow-500/20 transform-gpu" // 使用 transform-gpu 啟用 GPU 加速
                    style={{
                      willChange: 'transform', // 優化動畫效能
                    }}>
                      <span className="text-lg font-bold tracking-wider">
                        CONTACT
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Add Some Background Pattern Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30 z-0">
            <div
              className="absolute top-10 left-10 w-64 h-64 rounded-full border border-yellow-500/20 animate-pulse"
              style={{ animationDuration: "4s" }}
            ></div>
            <div
              className="absolute bottom-20 right-20 w-80 h-80 rounded-full border border-yellow-500/10 animate-pulse"
              style={{ animationDuration: "7s" }}
            ></div>
            <div
              className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full border border-yellow-500/20 animate-pulse"
              style={{ animationDuration: "5s" }}
            ></div>

            {/* Decorative Grid Background */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMwZjE3MmEiIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzcuNSAzMGMwIDQuMTQyLTMuMzU4IDcuNS03LjUgNy41LTQuMTQyIDAtNy41LTMuMzU4LTcuNS03LjUgMC00LjE0MiAzLjM1OC03LjUgNy41LTcuNSA0LjE0MiAwIDcuNSAzLjM1OCA3LjUgNy41eiIgc3Ryb2tlLW9wYWNpdHk9Ii4wNSIgc3Ryb2tlPSIjZWFiMzA4IiBmaWxsLW9wYWNpdHk9Ii4wMiIgZmlsbD0iI2VhYjMwOCIvPjxwYXRoIGQ9Ik0zMCAwdjYwTTYwIDMwSDAiIHN0cm9rZS1vcGFjaXR5PSIuMDUiIHN0cm9rZT0iI2VhYjMwOCIvPjwvZz48L3N2Zz4=')] opacity-10"></div>
          </div>
        </section>

        {/* Footer Area */}
        <footer className="relative z-40 bg-black py-8 border-t border-gray-800">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <h2 className="text-2xl font-bold text-yellow-500">
                  Port Crane Simulator
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  © 2025, LEUNG Kar Cheong, POON Ka Yi, LI Chun Tat, WONG Hoi Ming
                </p>
              </div>

              <div className="flex space-x-6">
                <button
                  type="button"
                  className="text-gray-400 hover:text-yellow-500 transition"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="text-gray-400 hover:text-yellow-500 transition"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="text-gray-400 hover:text-yellow-500 transition"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.441 16.892c-2.102.144-6.784.144-8.883 0C5.282 16.736 5.017 15.622 5 12c.017-3.629.285-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0C18.718 7.264 18.982 8.378 19 12c-.018 3.629-.285 4.736-2.559 4.892zM10 9.658l4.917 2.338L10 14.342V9.658z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Add CSS Animations */}
      <style>{`
        /* 定義 CSS 變數供動畫使用 */
        :root {
          --animate-duration: 120s;
          --animate-duration-slow: 130s;
          --marquee-width: 100%;
        }

        @keyframes marqee-animation {
          0% {
            transform: translate3d(0, 0, 0); /* 使用 translate3d 啟用 GPU 加速 */
          }
          100% {
            transform: translate3d(0, -100%, 0); /* 使用 translate3d 啟用 GPU 加速 */
          }
        }

        @keyframes breath {
          0%,
          100% {
            opacity: 1;
          }
          40% {
            opacity: 0.6;
          }
        }

        @keyframes text-revealer {
          0%,
          50% {
            transform-origin: 0 50%;
          }
          60%,
          100% {
            transform-origin: 100% 50%;
          }
          60% {
            transform: scaleX(1);
          }
          100% {
            transform: scaleX(0);
          }
        }

        .animate-marqee-up {
          animation: marqee-animation var(--animate-duration) linear infinite;
          will-change: transform; /* 提示瀏覽器此元素將進行變換 */
          transform: translate3d(0, 0, 0); /* 強制啟用 GPU 加速 */
        }

        .animate-marqee-down {
          animation: marqee-animation var(--animate-duration-slow) linear infinite reverse;
          will-change: transform; /* 提示瀏覽器此元素將進行變換 */
          transform: translate3d(0, 0, 0); /* 強制啟用 GPU 加速 */
        }

        .animate-breath {
          animation: breath 3s infinite;
          will-change: opacity; /* 提示瀏覽器此元素將改變不透明度 */
        }

        .marqee-column {
          display: flex;
          flex-direction: column;
          height: 100vh;
          transform: translate3d(0, 0, 0); /* 強制啟用 GPU 加速 */
          backface-visibility: hidden; /* 防止 3D 變換時出現閃爍 */
          perspective: 1000px; /* 提供 3D 透視效果 */
        }

        .font-cs {
          font-family: "CsRegular", sans-serif;
        }

        /* Marquee New CSS */
        .marquee-container {
          width: var(--marquee-width);
          overflow: hidden;
          position: relative;
          height: 220px;
        }

        .marquee-content {
          display: flex;
          position: absolute;
          animation: marquee-slide 40s linear infinite;
          /* Ensure content is long enough, at least twice the width of the container to ensure no gaps during scrolling */
          width: max-content;
          will-change: transform; /* 提示瀏覽器此元素將進行變換 */
          transform: translate3d(0, 0, 0); /* 強制啟用 GPU 加速 */
        }

        .marquee-content:hover {
          animation-play-state: paused;
        }

        .marquee-item {
          position: relative;
          flex-shrink: 0;
          margin: 0 8px;
          transform: translate3d(0, 0, 0); /* 強制啟用 GPU 加速 */
        }

        @keyframes marquee-slide {
          0% {
            transform: translate3d(0, 0, 0); /* 使用 translate3d 啟用 GPU 加速 */
          }
          100% {
            /* This value should be negative half the width of the container content to ensure seamless looping */
            transform: translate3d(calc(-100% / 2), 0, 0); /* 使用 translate3d 啟用 GPU 加速 */
          }
        }

        .character-carousel {
          perspective: 1000px;
          transform-style: preserve-3d;
        }

        .carousel-container {
          transform-style: preserve-3d;
          will-change: transform; /* 提示瀏覽器此元素將進行變換 */
        }

        /* 優化角色卡片的動畫效能 */
        .character-card {
          backface-visibility: hidden;
          transform-style: preserve-3d;
          will-change: transform, opacity; /* 提示瀏覽器此元素將進行變換和不透明度的改變 */
          transition: transform 0.5s cubic-bezier(0.2, 0, 0.2, 1), opacity 0.5s ease-out;
        }

        @keyframes pulse {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(234, 179, 8, 0.4);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(234, 179, 8, 0);
          }
        }

        .character-selection {
          background: linear-gradient(
            to bottom,
            rgba(2, 6, 23, 0),
            rgba(2, 6, 23, 0.7),
            rgba(2, 6, 23, 0)
          );
          padding: 20px;
          border-radius: 8px;
        }

        /* 優化聯絡按鈕的動畫效能 */
        .contact-button {
          position: relative;
          transform: translate3d(0, 0, 0); /* 強制啟用 GPU 加速 */
          transition: transform 0.3s ease;
        }
        
        .contact-button:hover {
          transform: scale(1.05) translate3d(0, 0, 0); /* 直接在 hover 時改變變換，而非使用 ::before */
        }

        /* 替代原先的 ::before 旋轉動畫，以減少 GPU 負擔 */
        .contact-button .button-glow {
          position: absolute;
          inset: -2px;
          border-radius: 0.5rem;
          background: linear-gradient(45deg, #eab308, transparent, #eab308);
          opacity: 0;
          z-index: -1;
          transition: opacity 0.3s ease;
        }

        .contact-button:hover .button-glow {
          opacity: 1;
        }

        /* 將旋轉動畫從 ::before 中分離出來，單獨給一個元素使用，減少複合動畫 */
        @keyframes rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        
        .animate-rotate {
          animation: rotate 2s linear infinite;
          will-change: transform; /* 提示瀏覽器此元素將進行變換 */
        }

        /* 優化圖片懶加載過渡效果 */
        img.lazy-load {
          opacity: 0;
          transition: opacity 0.3s ease-in;
        }
        
        img.lazy-load.loaded {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default Newpage;
