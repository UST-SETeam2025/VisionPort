import React, { useState, useEffect, useRef } from "react";
import { Link as RouterLink } from "react-router-dom";

const CreditsPage = () => {
  // 創建一個音頻管理系統
  const [audioInstances, setAudioInstances] = useState({});
  const [playingId, setPlayingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAllSounds, setShowAllSounds] = useState(false);
  const [bgmPlaying, setBgmPlaying] = useState(false);
  const bgmRef = useRef(null);

  // Sound Effects Data
  const soundEffects = [
    {
      id: "button",
      title: "Button Click",
      description: "Used for interface interactions throughout the simulation.",
      source: "By Kolombooo on FreeSound",
      sourceUrl: "https://freesound.org/people/Kolombooo/sounds/629020/",
      file: "/sound/629020__kolombooo__button-click.mp3",
    },
    {
      id: "crane",
      title: "Industrial Crane Movement",
      description: "Primary sound for crane operation in the simulation.",
      source: "By decibelphantomx on Audio.com",
      sourceUrl:
        "https://audio.com/decibelphantomx/audio/movement-of-industrial-crane-047847",
      file: "/sound/movement-of-industrial-crane-047847.mp3",
    },
    {
      id: "mouse",
      title: "Mouse Click",
      description: "Used for secondary interface elements and selections.",
      source: "From Pixabay",
      sourceUrl: "https://pixabay.com/sound-effects/mouse-click-104737/",
      file: "/sound/mouse-click-104737.mp3",
    },
    {
      id: "waves",
      title: "Ocean Waves",
      description: "Ambient background sound for the port environment.",
      source: "From Pixabay",
      sourceUrl:
        "https://pixabay.com/sound-effects/ocean-sea-soft-waves-121349/",
      file: "/sound/ocean-sea-soft-waves-121349.mp3",
    },
    {
      id: "truck",
      title: "Truck Driving",
      description: "Used for container truck movements in the simulation.",
      source: "From Pixabay",
      sourceUrl: "https://pixabay.com/sound-effects/truck-driving-6412/",
      file: "/sound/truck-driving-6412.mp3",
    },
    {
      id: "lock",
      title: "Key Lock",
      description: "Used for confirmation actions and security sequences.",
      source: "From Pixabay",
      sourceUrl: "https://pixabay.com/sound-effects/key-twist-in-lock-47832/",
      file: "/sound/key-twist-in-lock-47832.mp3",
    },
    {
      id: "ui-click",
      title: "UI Click",
      description: "Standard interface sound effect",
      source: "From Pixabay",
      sourceUrl: "https://pixabay.com/sound-effects/ui-click-97915/",
      file: "/sound/ui-click-97915.mp3",
    },
    {
      id: "pick",
      title: "Pick Sound",
      description: "Used for selection actions",
      source: "From Pixabay",
      sourceUrl: "https://pixabay.com/sound-effects/pick-92276/",
      file: "/sound/pick-92276.mp3",
    },
    {
      id: "door-lock1",
      title: "Door Lock 1",
      description: "Used for container locking sounds",
      source: "From Pixabay",
      sourceUrl: "https://pixabay.com/sound-effects/door-lock-82542/",
      file: "/sound/door-lock-82542.mp3",
    },
    {
      id: "door-lock2",
      title: "Door Lock 2",
      description: "Alternative door locking sound",
      source: "From Pixabay",
      sourceUrl: "https://pixabay.com/it/sound-effects/door-lock-98655/",
      file: "/sound/door-lock-98655.mp3",
    },
    {
      id: "key-twist",
      title: "Key Twist in Lock",
      description: "Used for security access points",
      source: "From Pixabay",
      sourceUrl:
        "https://pixabay.com/it/sound-effects/key-twist-in-lock-47832/",
      file: "/sound/key-twist-in-lock-47832.mp3",
    },
    {
      id: "ocean-fast",
      title: "Ocean Wave Fast",
      description: "High tide wave sounds",
      source: "From Pixabay",
      sourceUrl: "https://pixabay.com/sound-effects/ocean-wave-fast-236009",
      file: "/sound/ocean-wave-fast-236009.mp3",
    },
    {
      id: "ocean-medium",
      title: "Ocean Wave Medium",
      description: "Medium wave intensity sounds",
      source: "From Pixabay",
      sourceUrl: "https://pixabay.com/sound-effects/ocean-wave-medium-236012",
      file: "/sound/ocean-wave-medium-236012.mp3",
    },
    {
      id: "ocean-slow",
      title: "Ocean Wave Slow",
      description: "Gentle wave sounds for calm seas",
      source: "From Pixabay",
      sourceUrl: "https://pixabay.com/sound-effects/ocean-wave-slowly-236010",
      file: "/sound/ocean-wave-slowly-236010.mp3",
    },
    {
      id: "waves-harbor",
      title: "Harbor Waves",
      description: "Specific harbor water sounds",
      source: "From Pixabay",
      sourceUrl:
        "https://pixabay.com/sound-effects/waves-med-sloshy-bell-harbour-sound-low-tide-saint-john-190924-51371",
      file: "/sound/waves-med-sloshy-bell-harbour-sound-low-tide-saint-john-190924-51371.mp3",
    },
    {
      id: "ui-click2",
      title: "UI Click Alternative",
      description: "Alternative UI click sound",
      source: "From Pixabay",
      sourceUrl: "https://pixabay.com/sound-effects/ui-click-43196/",
      file: "/sound/ui-click-43196.mp3",
    },
  ];

  // All sound URLs for the full audio list
  const allSoundUrls = [
    "https://pixabay.com/sound-effects/mouse-click-104737/",
    "https://pixabay.com/sound-effects/pick-92276/",
    "https://pixabay.com/sound-effects/key-twist-in-lock-47832/",
    "https://freesound.org/people/Kolombooo/sounds/629020/",
    "https://pixabay.com/sound-effects/ui-click-43196/",
    "https://pixabay.com/sound-effects/ui-click-97915/",
    "https://audio.com/decibelphantomx/audio/movement-of-industrial-crane-047847",
    "https://pixabay.com/sound-effects/door-lock-82542/",
    "https://pixabay.com/it/sound-effects/door-lock-98655/",
    "https://pixabay.com/it/sound-effects/key-twist-in-lock-47832/",
    "https://pixabay.com/sound-effects/truck-driving-6412/",
    "https://pixabay.com/sound-effects/ocean-sea-soft-waves-121349/",
    "https://pixabay.com/sound-effects/ocean-wave-fast-236009",
    "https://pixabay.com/sound-effects/ocean-wave-medium-236012",
    "https://pixabay.com/sound-effects/ocean-wave-slowly-236010",
    "https://pixabay.com/sound-effects/waves-med-sloshy-bell-harbour-sound-low-tide-saint-john-190924-51371",
    "https://pixabay.com/music/rock-promo-action-beat-velvet-162609/",
  ];

  // 初始化和清理音頻實例
  useEffect(() => {
    return () => {
      // 組件卸載時停止所有音頻
      Object.values(audioInstances).forEach((audio) => {
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
        }
      });

      if (bgmRef.current) {
        bgmRef.current.pause();
        bgmRef.current.currentTime = 0;
      }
    };
  }, [audioInstances]);

  // 音效播放函數
  const toggleSound = (soundId) => {
    setError(null);

    // 如果當前正在播放這個音效，則暫停它
    if (playingId === soundId) {
      const currentAudio = audioInstances[soundId];
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
      setPlayingId(null);
      return;
    }

    // 停止當前正在播放的任何音效
    if (playingId && audioInstances[playingId]) {
      audioInstances[playingId].pause();
      audioInstances[playingId].currentTime = 0;
    }

    setLoading(true);

    // 查找要播放的音效數據
    const soundEffect = soundEffects.find((sound) => sound.id === soundId);

    if (!soundEffect) {
      setError("Sound not found");
      setLoading(false);
      return;
    }

    // 檢查是否已經有這個音效的實例
    let audio = audioInstances[soundId];

    if (!audio) {
      // 創建新的音頻實例
      audio = new Audio(soundEffect.file);

      // 設置事件監聽器
      audio.addEventListener("canplaythrough", () => {
        setLoading(false);
      });

      audio.addEventListener("error", (e) => {
        console.error(`無法加載音效: ${soundEffect.file}`, e);
        setLoading(false);
        setError(`無法加載音效: ${soundEffect.title}`);
        setPlayingId(null);

        // 從實例中移除有問題的音頻
        const updatedInstances = { ...audioInstances };
        delete updatedInstances[soundId];
        setAudioInstances(updatedInstances);
      });

      audio.addEventListener("ended", () => {
        if (playingId === soundId) {
          setPlayingId(null);
        }
      });

      // 保存新創建的音頻實例
      setAudioInstances((prev) => ({
        ...prev,
        [soundId]: audio,
      }));
    }

    // 嘗試播放音頻
    audio.currentTime = 0;
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setPlayingId(soundId);
          setLoading(false);
        })
        .catch((err) => {
          console.error("播放失敗:", err);
          setLoading(false);
          setError(`播放失敗: ${soundEffect.title}`);
          setPlayingId(null);
        });
    }
  };

  // BGM 播放控制
  const toggleBgm = () => {
    if (!bgmRef.current) {
      // 第一次播放時創建音頻實例
      bgmRef.current = new Audio("/sound/promo-action-beat_velvet-162609.mp3");
      bgmRef.current.loop = true;
      bgmRef.current.volume = 0.7;

      bgmRef.current.addEventListener("error", (e) => {
        console.error("背景音樂加載錯誤:", e);
        setBgmPlaying(false);
        setError("無法加載背景音樂");
      });
    }

    if (!bgmPlaying) {
      // 播放背景音樂
      const playPromise = bgmRef.current.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setBgmPlaying(true);
          })
          .catch((err) => {
            console.error("背景音樂播放失敗:", err);
            setBgmPlaying(false);
            setError("背景音樂播放失敗，請再試一次");
          });
      }
    } else {
      // 暫停背景音樂
      bgmRef.current.pause();
      setBgmPlaying(false);
    }
  };

  // 音頻可視化效果
  useEffect(() => {
    const visualizer = document.getElementById("music-visualizer");
    if (!visualizer) return;

    // 清空現有的條形
    visualizer.innerHTML = "";

    // 創建新的條形
    for (let i = 0; i < 40; i++) {
      const bar = document.createElement("div");
      bar.className = "visualization-bar";
      bar.style.width = "4px";
      bar.style.backgroundColor = "#eab308";
      bar.style.borderRadius = "2px";
      bar.style.marginRight = "2px";
      bar.style.height = bgmPlaying ? `${20 + Math.random() * 80}%` : "10%";
      bar.style.transition = "height 0.2s ease";
      visualizer.appendChild(bar);
    }

    // 動畫更新函數
    let animationId;
    const animateBars = () => {
      if (bgmPlaying) {
        const bars = visualizer.querySelectorAll(".visualization-bar");
        bars.forEach((bar) => {
          bar.style.height = `${20 + Math.random() * 80}%`;
        });
        animationId = requestAnimationFrame(animateBars);
      }
    };

    if (bgmPlaying) {
      animationId = requestAnimationFrame(animateBars);
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [bgmPlaying]);

  // 用於波形動畫的效果
  useEffect(() => {
    const wave1 = document.getElementById("wave1");
    const wave2 = document.getElementById("wave2");
    const wave3 = document.getElementById("wave3");

    if (!wave1 || !wave2 || !wave3) return;

    function getWavePoints(height, length, complexity) {
      const points = [];
      const baseY = height / 2;

      for (let x = 0; x <= length; x += 5) {
        let y = baseY;
        for (let i = 1; i <= complexity; i++) {
          y +=
            Math.sin((x / length) * Math.PI * i + (Date.now() / 1000) * i) *
            (height / (i * 4));
        }
        points.push(`${x},${y}`);
      }

      return points.join(" ");
    }

    function animateWaves() {
      wave1.setAttribute("d", `M0,100 ${getWavePoints(50, 1200, 2)} 1200,100`);
      wave2.setAttribute("d", `M0,100 ${getWavePoints(70, 1200, 3)} 1200,100`);
      wave3.setAttribute("d", `M0,100 ${getWavePoints(90, 1200, 4)} 1200,100`);

      requestAnimationFrame(animateWaves);
    }

    const animationId = requestAnimationFrame(animateWaves);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="bg-black text-white font-sans overflow-x-hidden">
      {/* CSS Styles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes marqee-animation {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-100%);
          }
        }

        /* Credit columns */
        .credit-column {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .credit-column.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Sound visualization */
        .visualization-container {
          display: flex;
          align-items: flex-end;
          justify-content: center;
          height: 40px;
          width: 100%;
          padding: 0 10px;
        }

        .visualization-bar {
          background: linear-gradient(to top, #f59e0b, #f59e0b99);
          margin: 0 1px;
          height: 5px;
          border-radius: 1px;
          transition: height 0.2s ease;
        }

        /* Marquee animation */
        .marquee-wrapper {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          overflow: hidden;
          z-index: -1;
        }

        .marquee-column {
          position: absolute;
          width: 160px;
          top: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
        }

        .marquee-column:nth-child(1) {
          left: 0%;
          animation: marqee-animation 120s linear infinite;
        }

        .marquee-column:nth-child(2) {
          left: 25%;
          animation: marqee-animation 100s linear infinite reverse;
        }

        .marquee-column:nth-child(3) {
          left: 50%;
          animation: marqee-animation 140s linear infinite;
        }

        .marquee-column:nth-child(4) {
          left: 75%;
          animation: marqee-animation 160s linear infinite reverse;
        }

        .marquee-item {
          flex-shrink: 0;
          width: 160px;
          height: 120px;
          margin: 10px 0;
          background-size: cover;
          background-position: center;
          opacity: 0.15;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        /* Audio player */
        @keyframes rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .music-icon.active {
          color: #f59e0b;
          opacity: 1;
          animation: rotate 2s linear infinite;
        }
        
        /* Animation for additional sound cards */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }

        /* Staggered animations for cards */
        .sound-card {
          animation: fadeIn 0.5s ease-out forwards;
          opacity: 0;
        }
        
        .sound-card:nth-child(1) { animation-delay: 0.05s; }
        .sound-card:nth-child(2) { animation-delay: 0.1s; }
        .sound-card:nth-child(3) { animation-delay: 0.15s; }
        .sound-card:nth-child(4) { animation-delay: 0.2s; }
        .sound-card:nth-child(5) { animation-delay: 0.25s; }
        .sound-card:nth-child(6) { animation-delay: 0.3s; }
        .sound-card:nth-child(7) { animation-delay: 0.35s; }
        .sound-card:nth-child(8) { animation-delay: 0.4s; }
        .sound-card:nth-child(9) { animation-delay: 0.45s; }
        .sound-card:nth-child(10) { animation-delay: 0.5s; }
        .sound-card:nth-child(11) { animation-delay: 0.55s; }
        .sound-card:nth-child(12) { animation-delay: 0.6s; }
        .sound-card:nth-child(13) { animation-delay: 0.65s; }
        .sound-card:nth-child(14) { animation-delay: 0.7s; }
        .sound-card:nth-child(15) { animation-delay: 0.75s; }
        .sound-card:nth-child(16) { animation-delay: 0.8s; }

        /* Active sound button glow */
        .sound-btn.playing {
          background-color: #f59e0b;
          color: #000;
          box-shadow: 0 0 8px 2px rgba(245, 158, 11, 0.5);
        }

        .text-shadow-xl {
          text-shadow: 0 8px 16px rgba(0, 0, 0, 0.8), 0 4px 8px rgba(0, 0, 0, 0.6);
        }

        .text-shadow-md {
          text-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
        }
      `,
        }}
      />

      {/* Fixed Navigation */}
      <nav className="fixed top-0 z-[10000] w-full bg-black bg-opacity-80 shadow-md backdrop-blur-sm border-b border-yellow-900/30">
        <div className="max-w-5xl mx-auto flex justify-center space-x-8 py-4">
          <RouterLink
            to="/"
            className="text-yellow-500 hover:text-yellow-400 font-semibold transition cursor-pointer"
          >
            Home
          </RouterLink>
          <a
            href="#sound-effects"
            className="text-yellow-500 hover:text-yellow-400 font-semibold transition cursor-pointer"
          >
            Sound Effects
          </a>
          <a
            href="#background-music"
            className="text-yellow-500 hover:text-yellow-400 font-semibold transition cursor-pointer"
          >
            Background Music
          </a>
          <a
            href="#licenses"
            className="text-yellow-500 hover:text-yellow-400 font-semibold transition cursor-pointer"
          >
            Licenses
          </a>
        </div>
      </nav>

      {/* Background Decorations */}
      <div className="fixed inset-0 w-full h-full bg-gradient-to-b from-gray-900 to-black">
        {/* Marquee Background */}
        <div className="absolute inset-0 flex justify-between items-stretch opacity-50 pointer-events-none">
          <div
            className="marqee-column animate-marqee-up"
            style={{ animationDuration: "126s" }}
          >
            {/* Use sound wave or audio visualization images as background */}
            <div
              className="marqee-item w-60 h-48 m-2 bg-center bg-cover opacity-50"
              style={{
                backgroundImage:
                  "url('https://placehold.co/600x400/1a1a1a/333333?text=Sound+Wave')",
              }}
            ></div>
            <div
              className="marqee-item w-60 h-48 m-2 bg-center bg-cover opacity-50"
              style={{
                backgroundImage:
                  "url('https://placehold.co/600x400/1a1a1a/333333?text=Audio')",
              }}
            ></div>
            <div
              className="marqee-item w-60 h-48 m-2 bg-center bg-cover opacity-50"
              style={{
                backgroundImage:
                  "url('https://placehold.co/600x400/1a1a1a/333333?text=SFX')",
              }}
            ></div>
            {/* Duplicated for continuous scrolling */}
            <div
              className="marqee-item w-60 h-48 m-2 bg-center bg-cover opacity-50"
              style={{
                backgroundImage:
                  "url('https://placehold.co/600x400/1a1a1a/333333?text=Sound+Wave')",
              }}
            ></div>
            <div
              className="marqee-item w-60 h-48 m-2 bg-center bg-cover opacity-50"
              style={{
                backgroundImage:
                  "url('https://placehold.co/600x400/1a1a1a/333333?text=Audio')",
              }}
            ></div>
            <div
              className="marqee-item w-60 h-48 m-2 bg-center bg-cover opacity-50"
              style={{
                backgroundImage:
                  "url('https://placehold.co/600x400/1a1a1a/333333?text=SFX')",
              }}
            ></div>
          </div>

          <div
            className="marqee-column animate-marqee-down"
            style={{ animationDuration: "110s" }}
          >
            <div
              className="marqee-item w-60 h-48 m-2 bg-center bg-cover opacity-50"
              style={{
                backgroundImage:
                  "url('https://placehold.co/600x400/1a1a1a/333333?text=Music')",
              }}
            ></div>
            <div
              className="marqee-item w-60 h-48 m-2 bg-center bg-cover opacity-50"
              style={{
                backgroundImage:
                  "url('https://placehold.co/600x400/1a1a1a/333333?text=Wave')",
              }}
            ></div>
            <div
              className="marqee-item w-60 h-48 m-2 bg-center bg-cover opacity-50"
              style={{
                backgroundImage:
                  "url('https://placehold.co/600x400/1a1a1a/333333?text=Audio')",
              }}
            ></div>
            {/* Duplicated for continuous scrolling */}
            <div
              className="marqee-item w-60 h-48 m-2 bg-center bg-cover opacity-50"
              style={{
                backgroundImage:
                  "url('https://placehold.co/600x400/1a1a1a/333333?text=Music')",
              }}
            ></div>
            <div
              className="marqee-item w-60 h-48 m-2 bg-center bg-cover opacity-50"
              style={{
                backgroundImage:
                  "url('https://placehold.co/600x400/1a1a1a/333333?text=Wave')",
              }}
            ></div>
            <div
              className="marqee-item w-60 h-48 m-2 bg-center bg-cover opacity-50"
              style={{
                backgroundImage:
                  "url('https://placehold.co/600x400/1a1a1a/333333?text=Audio')",
              }}
            ></div>
          </div>

          <div
            className="marqee-column animate-marqee-up"
            style={{ animationDuration: "118s" }}
          >
            <div
              className="marqee-item w-60 h-48 m-2 bg-center bg-cover opacity-50"
              style={{
                backgroundImage:
                  "url('https://placehold.co/600x400/1a1a1a/333333?text=Effect')",
              }}
            ></div>
            <div
              className="marqee-item w-60 h-48 m-2 bg-center bg-cover opacity-50"
              style={{
                backgroundImage:
                  "url('https://placehold.co/600x400/1a1a1a/333333?text=Sound')",
              }}
            ></div>
            <div
              className="marqee-item w-60 h-48 m-2 bg-center bg-cover opacity-50"
              style={{
                backgroundImage:
                  "url('https://placehold.co/600x400/1a1a1a/333333?text=BGM')",
              }}
            ></div>
            {/* Duplicated for continuous scrolling */}
            <div
              className="marqee-item w-60 h-48 m-2 bg-center bg-cover opacity-50"
              style={{
                backgroundImage:
                  "url('https://placehold.co/600x400/1a1a1a/333333?text=Effect')",
              }}
            ></div>
            <div
              className="marqee-item w-60 h-48 m-2 bg-center bg-cover opacity-50"
              style={{
                backgroundImage:
                  "url('https://placehold.co/600x400/1a1a1a/333333?text=Sound')",
              }}
            ></div>
            <div
              className="marqee-item w-60 h-48 m-2 bg-center bg-cover opacity-50"
              style={{
                backgroundImage:
                  "url('https://placehold.co/600x400/1a1a1a/333333?text=BGM')",
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Header Section - 更具音感的設計 */}
      <header className="relative z-40 min-h-screen flex flex-col items-center justify-center pt-24 overflow-hidden">
        {/* 動態波紋背景 */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 to-black/90 z-10"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full">
              {/* 同心圓波紋動畫 */}
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-yellow-500/30"
                  style={{
                    width: `${(i + 1) * 15}%`,
                    height: `${(i + 1) * 15}%`,
                    animationName: "soundWave",
                    animationDuration: `${8 + i * 0.5}s`,
                    animationIterationCount: "infinite",
                    animationTimingFunction: "ease-out",
                    animationDelay: `${i * 0.5}s`,
                    opacity: 0.3 - i * 0.05,
                  }}
                ></div>
              ))}
            </div>
          </div>

          {/* 音波粒子背景 */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <div className="sound-particles-container w-full h-full">
              {[...Array(50)].map((_, i) => (
                <div
                  key={i}
                  className="sound-particle absolute bg-yellow-400/30"
                  style={{
                    width: `${Math.random() * 10 + 2}px`,
                    height: `${Math.random() * 10 + 2}px`,
                    borderRadius: "50%",
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationName: "floatParticle",
                    animationDuration: `${Math.random() * 8 + 5}s`,
                    animationIterationCount: "infinite",
                    animationTimingFunction: "ease-in-out",
                    animationDelay: `${Math.random() * 5}s`,
                    opacity: Math.random() * 0.5 + 0.1,
                    boxShadow: "0 0 8px 2px rgba(234, 179, 8, 0.2)",
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* 音頻波形圖 - 頂部 */}
        <div className="relative w-full h-32 mb-8">
          <svg
            className="w-full h-full"
            viewBox="0 0 1200 100"
            preserveAspectRatio="none"
          >
            <path
              d="M0,50 C150,20 300,80 450,50 C600,20 750,80 900,50 C1050,20 1200,80 1200,50 V100 H0 V50 Z"
              fill="rgba(234, 179, 8, 0.1)"
            ></path>
            <path
              d="M0,50 C150,30 300,70 450,50 C600,30 750,70 900,50 C1050,30 1200,70 1200,50"
              fill="none"
              stroke="rgba(234, 179, 8, 0.4)"
              strokeWidth="1"
            ></path>
          </svg>
        </div>

        {/* 主標題區域 - 音符圖標和動態效果 */}
        <div className="relative mb-8 z-10">
          {/* 音樂圖標環繞效果 */}
          <div className="absolute -left-20 -top-16">
            <svg
              className="w-16 h-16 text-yellow-500/30 animate-float-slow"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19.952 6.993c-1.521-.244-3.045-.393-4.571-.446l.642-3.5A1 1 0 0 0 15.074 2H8.926a1 1 0 0 0-.949 1.047l.642 3.5c-1.526.053-3.05.202-4.571.446a1 1 0 0 0-.837 1.173l3.143 17a1 1 0 0 0 1.171.834c2.862-.46 5.75-.69 8.638-.69s5.776.23 8.638.69a1 1 0 0 0 1.171-.834l3.143-17a1 1 0 0 0-.837-1.173zM18.245 11h-4.5A.75.75 0 0 0 13 11.75a.75.75 0 0 0 .745.75h4.5a.75.75 0 0 0 .745-.75.75.75 0 0 0-.745-.75zm0 3h-4.5A.75.75 0 0 0 13 14.75a.75.75 0 0 0 .745.75h4.5a.75.75 0 0 0 .745-.75.75.75 0 0 0-.745-.75zm0 3h-4.5A.75.75 0 0 0 13 17.75a.75.75 0 0 0 .745.75h4.5a.75.75 0 0 0 .745-.75.75.75 0 0 0-.745-.75z" />
            </svg>
          </div>
          <div className="absolute -right-16 -top-8">
            <svg
              className="w-12 h-12 text-yellow-500/30 animate-float"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          </div>
          <div className="absolute right-12 -bottom-12">
            <svg
              className="w-10 h-10 text-yellow-500/20 animate-pulse"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
          </div>

          {/* 主標題 - 帶有更吸引人的設計 */}
          <h1 className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-600 mb-4 tracking-tighter">
            Sound Credits
          </h1>

          {/* 頻譜圖示 - 模擬聲波 */}
          <div className="spectrum-visualizer flex justify-center items-end h-16 mb-6 mt-4 mx-auto w-80">
            {[...Array(32)].map((_, i) => (
              <div
                key={i}
                className="spectrum-bar w-1.5 mx-0.5 rounded-t-sm bg-gradient-to-t from-yellow-600 to-yellow-300"
                style={{
                  height: `${15 + Math.sin(i * 0.4) * 35}%`,
                  animationName: "spectrumDance",
                  animationDuration: `${1.5 + Math.random()}s`,
                  animationIterationCount: "infinite",
                  animationDirection: "alternate",
                  animationTimingFunction: "ease-in-out",
                  animationDelay: `${i * 0.05}s`,
                  opacity: 0.7 + Math.sin(i * 0.3) * 0.3,
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* 副標題 - 更優雅的設計 */}
        <p className="relative z-10 text-xl text-gray-100 font-light leading-relaxed max-w-2xl text-center mb-10 px-4 tracking-wide">
          <span className="text-yellow-400">♪</span> Honoring the talented
          creators whose audio work
          <span className="relative">
            <span className="px-1">brings</span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></span>
          </span>
          our virtual port to life <span className="text-yellow-400">♪</span>
        </p>

        {/* 音頻均衡器視覺效果 */}
        <div className="relative z-10 w-full max-w-xl h-24 mb-12 overflow-hidden">
          <div className="equalizer flex justify-center items-end h-full gap-1">
            {[...Array(40)].map((_, i) => (
              <div
                key={i}
                className="equalizer-bar w-1.5 rounded-t bg-yellow-500/80"
                style={{
                  height: `${10 + Math.random() * 70}%`,
                  animationName: "equalizerBar",
                  animationDuration: `${0.5 + Math.random() * 1}s`,
                  animationIterationCount: "infinite",
                  animationDirection: "alternate",
                  animationTimingFunction: "ease-in-out",
                  animationDelay: `${i * 0.03}s`,
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* 向下滾動指示器 - 更具音樂感 */}
        <div className="relative z-10 flex justify-center space-x-6 mt-4">
          <a href="#sound-effects" className="scroll-indicator group">
            <div className="flex flex-col items-center text-white">
              <span className="text-yellow-500/70 font-light text-sm mb-2 group-hover:text-yellow-400 transition-all">
                Explore Sounds
              </span>
              <div className="relative h-12 w-12 flex items-center justify-center">
                <span className="absolute inset-0 rounded-full border-2 border-yellow-500/30 animate-ping-slow"></span>
                <svg
                  className="w-10 h-10 text-yellow-500/70 group-hover:text-yellow-400 transition-all animate-bounce"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                </svg>
              </div>
            </div>
          </a>
        </div>

        {/* 音頻波形圖 - 底部 */}
        <div className="absolute bottom-0 left-0 right-0 h-32">
          <svg
            className="w-full h-full"
            viewBox="0 0 1200 100"
            preserveAspectRatio="none"
          >
            <path
              d="M0,50 C150,80 300,20 450,50 C600,80 750,20 900,50 C1050,80 1200,20 1200,50 V0 H0 V50 Z"
              fill="rgba(234, 179, 8, 0.1)"
            ></path>
            <path
              d="M0,50 C150,70 300,30 450,50 C600,70 750,30 900,50 C1050,70 1200,30 1200,50"
              fill="none"
              stroke="rgba(234, 179, 8, 0.4)"
              strokeWidth="1"
            ></path>
          </svg>
        </div>

        {/* CSS 動畫定義 */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
        @keyframes soundWave {
          0% {
            transform: translate(-50%, -50%) scale(0.9);
            opacity: 0.5;
          }
          50% {
            opacity: 0.2;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 0;
          }
        }
        
        @keyframes floatParticle {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(-15px);
          }
          75% {
            transform: translateY(-25px) translateX(5px);
          }
        }
        
        @keyframes spectrumDance {
          0% {
            height: 10%;
          }
          100% {
            height: 85%;
          }
        }
        
        @keyframes equalizerBar {
          0% {
            height: 10%;
          }
          100% {
            height: 90%;
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        @keyframes ping-slow {
          0% {
            transform: scale(0.8);
            opacity: 0.8;
          }
          70%, 100% {
            transform: scale(1.7);
            opacity: 0;
          }
        }
        
        /* 增加響應式處理 */
        @media (max-width: 640px) {
          .spectrum-visualizer {
            width: 90%;
          }
          .spectrum-bar {
            width: 1px;
            margin: 0 1px;
          }
          .equalizer-bar {
            width: 1px;
          }
        }
      `,
          }}
        />
      </header>

      {/* Main Content */}
      <main className="relative z-40">
        {/* Sound Effects Section */}
        <section id="sound-effects" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center mb-16">
              <div className="w-3 h-12 bg-yellow-500 mr-5"></div>
              <h2 className="text-4xl font-bold text-yellow-400">
                Sound Effects
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Display first 6 sound effects */}
              {soundEffects.slice(0, 6).map((sound) => (
                <div
                  key={sound.id}
                  className="sound-card credit-card bg-slate-900/40 border border-yellow-700/30 rounded-lg overflow-hidden"
                >
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-yellow-400 mb-2">
                      {sound.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-4">
                      {sound.description}
                    </p>

                    <div className="flex justify-between items-center">
                      <a
                        href={sound.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 text-sm"
                      >
                        {sound.source}
                      </a>

                      <div className="flex space-x-2">
                        <button
                          className={`sound-btn relative p-2 rounded-lg transition ${
                            playingId === sound.id
                              ? "bg-yellow-500 text-black playing"
                              : "bg-slate-800 text-yellow-500 hover:bg-slate-700"
                          } ${loading ? "opacity-50" : ""}`}
                          onClick={() => toggleSound(sound.id)}
                          disabled={loading}
                        >
                          {loading && playingId === sound.id ? (
                            <svg
                              className="w-6 h-6 animate-spin"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                          ) : playingId === sound.id ? (
                            <svg
                              className="w-6 h-6"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : (
                            <svg
                              className="w-6 h-6"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                    {error && playingId === sound.id && (
                      <p className="text-red-400 text-xs mt-2">{error}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* View All Button */}
            <div className="mt-10 flex justify-center">
              <button
                className="bg-slate-800 hover:bg-slate-700 border border-yellow-700/30 text-yellow-500 px-8 py-3 rounded-lg transition transform hover:scale-105"
                onClick={() => setShowAllSounds(!showAllSounds)}
              >
                {showAllSounds
                  ? "Hide Sound Effects"
                  : "View All Sound Effects"}
              </button>
            </div>

            {/* Additional sound effects that appear when showAllSounds is true */}
            {showAllSounds && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {soundEffects.slice(6).map((sound) => (
                  <div
                    key={sound.id}
                    className="sound-card credit-card bg-slate-900 p-5 rounded-xl border border-slate-800 hover:border-yellow-700/50 transition"
                  >
                    <div className="flex justify-between mb-3">
                      <h4 className="text-lg font-semibold text-yellow-500">
                        {sound.title}
                      </h4>
                      <button
                        className={`sound-btn relative p-2 rounded-lg transition ${
                          playingId === sound.id
                            ? "bg-yellow-500 text-black playing"
                            : "bg-slate-800 text-yellow-500 hover:bg-slate-700"
                        } ${loading ? "opacity-50" : ""}`}
                        onClick={() => toggleSound(sound.id)}
                        disabled={loading}
                      >
                        {loading && playingId === sound.id ? (
                          <svg
                            className="w-6 h-6 animate-spin"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            ></path>
                          </svg>
                        ) : playingId === sound.id ? (
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                    <p className="text-sm text-gray-400">{sound.description}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-gray-500">Format: MP3</span>
                      <a
                        href={sound.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 text-sm"
                      >
                        {sound.source}
                      </a>
                    </div>
                    {error && playingId === sound.id && (
                      <p className="text-red-400 text-xs mt-2">{error}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Background Music Section */}
        <section id="background-music" className="py-20 px-4 bg-slate-950/30">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center mb-16">
              <div className="w-3 h-12 bg-yellow-500 mr-5"></div>
              <h2 className="text-4xl font-bold text-yellow-400">
                Background Music
              </h2>
            </div>

            <div className="bg-slate-900/40 border border-yellow-700/30 rounded-lg p-6 mb-12">
              <div className="flex flex-col md:flex-row items-center">
                <div className="w-full md:w-1/3 p-4">
                  {/* Music visualization element */}
                  <div className="h-60 w-full bg-slate-800 rounded-lg overflow-hidden relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        id="music-visualizer"
                        className="flex items-end justify-center space-x-1 w-full h-40 px-4"
                      >
                        {/* Bars added dynamically with JS */}
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 to-transparent h-16 flex items-center justify-center">
                      <button
                        id="play-bgm"
                        className="p-3 bg-yellow-600 hover:bg-yellow-500 rounded-full transition transform hover:scale-110"
                        onClick={toggleBgm}
                      >
                        {bgmPlaying ? (
                          <svg
                            className="w-8 h-8 text-black"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-8 h-8 text-black"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-2/3 p-4">
                  <h3 className="text-2xl font-bold text-yellow-400 mb-2">
                    Promo Action Beat - Velvet
                  </h3>
                  <p className="text-gray-300 mb-4">
                    The main theme music playing throughout the port simulation.
                    This energetic rock track sets the tone for the dynamic
                    environment of container operations.
                  </p>

                  <div className="flex items-center mt-6">
                    <a
                      href="https://pixabay.com/music/rock-promo-action-beat-velvet-162609/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 mr-6"
                    >
                      Source: Pixabay
                    </a>

                    <div className="text-gray-400 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      License: Free for commercial use
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Licenses Section */}
        <section id="licenses" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center mb-16">
              <div className="w-3 h-12 bg-yellow-500 mr-5"></div>
              <h2 className="text-4xl font-bold text-yellow-400">
                Licenses & Attributions
              </h2>
            </div>

            <div className="bg-slate-900/40 border border-yellow-700/30 rounded-lg p-8">
              <p className="text-gray-300 mb-6">
                All sound effects and music tracks used in the VisionPort
                simulation are either licensed under Creative Commons or
                obtained from royalty-free sources that permit commercial use.
              </p>

              <h3 className="text-xl font-semibold text-yellow-400 mb-4">
                Attribution Requirements
              </h3>

              <ul className="list-disc pl-6 mb-8 text-gray-300 space-y-2">
                <li>
                  Sounds from Pixabay are released under the{" "}
                  <a
                    href="https://pixabay.com/service/license/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    Pixabay License
                  </a>
                  , which permits commercial and non-commercial use without
                  attribution.
                </li>
                <li>
                  Sounds from Freesound.org are under various Creative Commons
                  licenses, with specific attributions provided above for each
                  sound.
                </li>
                <li>
                  Audio.com content is used with appropriate permissions as
                  specified in their terms of service.
                </li>
              </ul>

              <div className="flex flex-wrap items-center gap-6 mt-8">
                <div className="flex items-center bg-slate-800 px-4 py-2 rounded-lg">
                  <svg
                    className="w-5 h-5 text-yellow-400 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-300">Creative Commons</span>
                </div>

                <div className="flex items-center bg-slate-800 px-4 py-2 rounded-lg">
                  <svg
                    className="w-5 h-5 text-yellow-400 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-300">Royalty-Free</span>
                </div>

                <div className="flex items-center bg-slate-800 px-4 py-2 rounded-lg">
                  <svg
                    className="w-5 h-5 text-yellow-400 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-300">
                    Commercial Use Permitted
                  </span>
                </div>
              </div>
            </div>

            {/* Full Audio List */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-yellow-400 mb-6">
                Full Audio Source List
              </h3>

              <div className="bg-slate-900/40 border border-yellow-700/30 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {allSoundUrls.map((url, index) => (
                    <div
                      key={index}
                      className="text-gray-300 text-sm py-2 border-b border-gray-800"
                    >
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-yellow-400 transition"
                      >
                        {url}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-40 bg-black py-8 border-t border-gray-800">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold text-yellow-500">
                Port Crane Simulator
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                © 2025 Hong Kong Port Simulation Training Center All Rights
                Reserved
              </p>
            </div>

            <div className="flex space-x-6">
              <a
                href="https://www.facebook.com"
                className="text-gray-400 hover:text-yellow-500 transition"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://www.twitter.com"
                className="text-gray-400 hover:text-yellow-500 transition"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com"
                className="text-gray-400 hover:text-yellow-500 transition"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.441 16.892c-2.102.144-6.784.144-8.883 0C5.282 16.736 5.017 15.622 5 12c.017-3.629.285-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0C18.718 7.264 18.982 8.378 19 12c-.018 3.629-.285 4.736-2.559 4.892zM10 9.658l4.917 2.338L10 14.342V9.658z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-gray-800/50 text-center text-gray-500 text-xs">
            All audio content used with permission under appropriate licenses.
            See individual credits for details.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CreditsPage;
