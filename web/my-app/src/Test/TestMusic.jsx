import React, { useState, useEffect, useRef } from "react";

const TestMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 創建音頻對象
    audioRef.current = new Audio("/sound/promo-action-beat_velvet-162609.mp3");

    // 設置循環播放
    audioRef.current.loop = true;

    // 設置音量
    audioRef.current.volume = 0.7;

    // 音頻加載完成事件
    audioRef.current.addEventListener("canplaythrough", () => {
      setLoading(false);
    });

    // 音頻錯誤事件
    audioRef.current.addEventListener("error", (e) => {
      console.error("音頻加載錯誤:", e);
      setLoading(false);
      setError("無法加載音頻文件");
    });

    // 音頻結束事件
    audioRef.current.addEventListener("ended", () => {
      // 如果沒有設置循環，這裡可以處理播放結束的邏輯
      setIsPlaying(false);
    });

    // 組件卸載時清理
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  // 播放/暫停切換
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      // 暫停音樂
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // 播放音樂
      setLoading(true);

      // 嘗試播放
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setLoading(false);
        })
        .catch((err) => {
          console.error("播放失敗:", err);
          setLoading(false);
          setError("播放失敗，請再試一次");
        });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-10 bg-gray-900 rounded-lg max-w-md mx-auto my-10">
      <h2 className="text-2xl font-bold text-yellow-400 mb-6">音樂播放示例</h2>

      <div className="w-full bg-gray-800 rounded-lg p-6 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl text-white font-semibold">
              Promo Action Beat - Velvet
            </h3>
            <p className="text-gray-400 text-sm">背景音樂</p>
          </div>

          <button
            onClick={togglePlay}
            disabled={loading}
            className={`w-12 h-12 flex items-center justify-center rounded-full transition-all ${
              isPlaying
                ? "bg-yellow-500 text-gray-900"
                : "bg-gray-700 text-yellow-500 hover:bg-gray-600"
            } ${loading ? "opacity-50" : ""}`}
          >
            {loading ? (
              // 加載中圖標
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
            ) : isPlaying ? (
              // 暫停圖標
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              // 播放圖標
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>

        {/* 可視化元素 - 只在播放時激活 */}
        <div className="mt-4 h-10 bg-gray-900 rounded-md overflow-hidden">
          <div className="h-full w-full flex items-end justify-center space-x-1 px-2">
            {Array.from({ length: 20 }).map((_, index) => (
              <div
                key={index}
                className="bg-gradient-to-t from-yellow-500 to-yellow-300 w-2 rounded-t"
                style={{
                  height: isPlaying ? `${20 + Math.random() * 80}%` : "10%",
                  transition: "height 0.2s ease",
                  animationDelay: `${index * 0.05}s`,
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {error && (
        <div className="text-red-500 mt-2 text-sm bg-red-900/20 p-2 rounded-md w-full text-center">
          {error}
        </div>
      )}

      <p className="text-gray-400 text-sm mt-4 text-center">
        點擊按鈕可以播放或暫停音樂。此示例使用的音樂文件：promo-action-beat_velvet-162609.mp3
      </p>
    </div>
  );
};

export default TestMusic;
