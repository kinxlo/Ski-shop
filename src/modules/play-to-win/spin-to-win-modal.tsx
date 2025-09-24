"use client";

import SkiButton from "@/components/shared/button";
import { ReusableDialog } from "@/components/shared/dialog/Dialog";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

interface SpinToWinModalProperties {
  children: React.ReactNode;
}

// Prize segments data
const PRIZES = [
  { label: "₦500", value: 500, color: "from-indigo-500 to-purple-600", textColor: "text-white" },
  { label: "₦100", value: 100, color: "from-purple-500 to-indigo-600", textColor: "text-white" },
  { label: "₦1000", value: 1000, color: "from-blue-500 to-indigo-600", textColor: "text-white" },
  { label: "₦50", value: 50, color: "from-indigo-600 to-purple-700", textColor: "text-white" },
  { label: "₦5000", value: 5000, color: "from-amber-400 to-yellow-500", textColor: "text-black" },
  { label: "₦200", value: 200, color: "from-purple-600 to-blue-600", textColor: "text-white" },
  { label: "₦2000", value: 2000, color: "from-indigo-400 to-purple-500", textColor: "text-white" },
  { label: "₦300", value: 300, color: "from-blue-600 to-indigo-700", textColor: "text-white" },
];

const TOTAL_SEGMENTS = 8;
const SEGMENT_ANGLE = 360 / TOTAL_SEGMENTS;

export const SpinToWinModal = ({ children }: SpinToWinModalProperties) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState<(typeof PRIZES)[0] | null>(null);
  const [rotation, setRotation] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // Auto-open modal after 20 seconds, only once per browser (persisted flag)
  useEffect(() => {
    const STORAGE_KEY = "spin_to_win_shown";
    if (typeof window === "undefined") return;

    try {
      const alreadyShown = window.localStorage.getItem(STORAGE_KEY);
      if (alreadyShown) return;
    } catch {
      // Ignore storage access errors
    }

    const timer = window.setTimeout(() => {
      setIsModalOpen(true);
      try {
        window.localStorage.setItem(STORAGE_KEY, "1");
      } catch {
        // Ignore storage access errors
      }
    }, 20 * 1000);

    return () => window.clearTimeout(timer);
  }, []);

  const handleOpenChange = (open: boolean) => {
    setIsModalOpen(open);
    if (!open) {
      // Reset modal state when closing
      resetWheel();
    }
  };

  const handleSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setShowResult(false);
    setSelectedPrize(null);

    // Random prize selection
    const randomIndex = Math.floor(Math.random() * PRIZES.length);
    const prize = PRIZES[randomIndex];

    // Calculate rotation
    const baseRotation = 360 * 5; // 5 full rotations
    const targetAngle = randomIndex * SEGMENT_ANGLE;
    const finalRotation = baseRotation + (360 - targetAngle) + SEGMENT_ANGLE / 2;

    setRotation((previous) => previous + finalRotation);

    // Show result after animation
    setTimeout(() => {
      setIsSpinning(false);
      setSelectedPrize(prize);
      setShowResult(true);
    }, 3000);
  };

  const resetWheel = () => {
    setShowResult(false);
    setSelectedPrize(null);
    setRotation(0);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handlePlayAgain = () => {
    resetWheel();
  };

  return (
    <ReusableDialog
      open={isModalOpen}
      onOpenChange={handleOpenChange}
      trigger={children}
      className="w-[95vw] max-w-md sm:max-w-lg md:max-w-4xl"
      hideClose={false}
    >
      {showResult && (
        <Confetti
          width={typeof window === "undefined" ? 300 : window.innerWidth}
          height={typeof window === "undefined" ? 300 : window.innerHeight}
          recycle={false}
          numberOfPieces={200}
          colors={["#ffffff", "#fde68a", "#ef4444", "#f59e0b"]}
        />
      )}
      <div className="animate-in fade-in zoom-in-95 flex flex-col items-center justify-center rounded-3xl border border-amber-500/20 bg-[#2f2f2f] p-8 shadow-2xl shadow-black/30 backdrop-blur-sm duration-500">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 inline-block rounded-full bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 px-6 py-2 shadow-lg shadow-amber-500/30">
            <span className="text-sm font-bold tracking-wider text-black">🎰 SPIN TO WIN</span>
          </div>
          <h2 className="mb-3 bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-400 bg-clip-text text-3xl font-bold text-transparent drop-shadow-lg sm:text-4xl">
            Win Up to ₦5000
          </h2>
          <p className="text-sm font-medium text-gray-200 sm:text-base">Exclusive Coupon Prize!</p>
        </div>

        <div className="mb-8 flex flex-col items-center justify-center gap-8 md:flex-row lg:flex-row">
          {/* Spinning Wheel */}
          <div className="relative">
            {/* Top clamp behind pointer */}
            <div className="absolute -top-4 left-1/2 z-20 h-6 w-14 -translate-x-1/2 rounded-b-md bg-amber-400 shadow-md shadow-black/40" />

            {/* Outer Rim */}
            <div className="absolute inset-0 rounded-full bg-black p-3 shadow-2xl shadow-black/50">
              <div className="h-full w-full rounded-full bg-[#2b2b2b] ring-2 ring-black/70"></div>
            </div>

            {/* Wheel Container */}
            <div className="relative p-3">
              {/* Pointer */}
              <div className="absolute top-0 left-1/2 z-30 -translate-x-1/2 transform">
                <div className="relative">
                  <div className="h-0 w-0 border-r-[22px] border-b-[44px] border-l-[22px] border-r-transparent border-b-amber-500 border-l-transparent drop-shadow-[0_8px_8px_rgba(0,0,0,0.35)]"></div>
                  <div className="absolute top-2 left-1/2 h-0 w-0 -translate-x-1/2 border-r-[16px] border-b-[32px] border-l-[16px] border-r-transparent border-b-amber-300 border-l-transparent"></div>
                  <div className="absolute top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-white shadow-sm"></div>
                </div>
              </div>

              {/* Wheel */}
              <div
                className={cn(
                  "relative h-60 w-60 overflow-hidden rounded-full shadow-2xl sm:h-72 sm:w-72",
                  isSpinning && "will-change-transform",
                )}
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transition: isSpinning ? "transform 3s cubic-bezier(0.23, 1, 0.32, 1)" : "none",
                  boxShadow: "0 0 0 8px #111 inset, 0 0 30px rgba(0,0,0,0.4)",
                  backgroundColor: "#111",
                }}
                aria-label="Prize wheel"
                role="img"
              >
                {PRIZES.map((prize, index) => {
                  const startAngle = index * SEGMENT_ANGLE;
                  const endAngle = (index + 1) * SEGMENT_ANGLE;
                  const isRed = index % 2 === 0;
                  const textClass = isRed ? "text-white" : "text-slate-900";

                  return (
                    <div
                      key={index}
                      className={cn("absolute h-full w-full", isRed ? "bg-red-600" : "bg-white")}
                      style={{
                        clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos(((startAngle - 90) * Math.PI) / 180)}% ${50 + 50 * Math.sin(((startAngle - 90) * Math.PI) / 180)}%, ${50 + 50 * Math.cos(((endAngle - 90) * Math.PI) / 180)}% ${50 + 50 * Math.sin(((endAngle - 90) * Math.PI) / 180)}%)`,
                      }}
                    >
                      <div
                        className={cn(
                          "absolute text-[14px] font-extrabold tracking-wide drop-shadow select-none sm:text-[16px]",
                          textClass,
                        )}
                        style={{
                          top: "50%",
                          left: "50%",
                          transform: `translate(-50%, -50%) rotate(${startAngle + SEGMENT_ANGLE / 2}deg) translateY(-78px)`,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {prize.label}
                      </div>
                    </div>
                  );
                })}

                {/* Center hub with golden ring */}
                <div className="absolute top-1/2 left-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-gray-300 shadow-md ring-4 ring-amber-400">
                  <div className="absolute inset-2 rounded-full bg-gray-200"></div>
                </div>
              </div>
            </div>

            {/* Base */}
            <div className="absolute -bottom-6 left-1/2 z-0 h-6 w-24 -translate-x-1/2 rounded-t-xl bg-black shadow-lg"></div>
            <div className="absolute -bottom-9 left-1/2 z-0 h-3 w-28 -translate-x-1/2 rounded-t-xl bg-black/80"></div>
          </div>

          {/* Result Display */}
          {showResult && selectedPrize && (
            <div className="animate-in fade-in slide-in-from-bottom-4 mb-6 rounded-3xl border border-amber-400/40 bg-gradient-to-br from-amber-500 via-yellow-500 to-orange-500 p-8 text-center shadow-2xl shadow-amber-500/30 duration-700">
              <div className="mb-4">
                <div className="animate-bounce text-5xl">🎉</div>
              </div>
              <h3 className="mb-2 text-2xl font-bold text-white drop-shadow-lg">Congratulations!</h3>
              <p className="mb-1 text-3xl font-bold text-amber-100 drop-shadow-lg">{selectedPrize.label}</p>
              <p className="mb-4 text-base font-medium text-amber-200">Exclusive Coupon Prize Won!</p>
              <div className="inline-block rounded-full border border-white/30 bg-white/25 px-4 py-2 backdrop-blur-sm">
                <span className="text-sm font-semibold text-white">🎁 Added to your wallet</span>
              </div>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="flex gap-4">
          {showResult && (
            <SkiButton
              onClick={handlePlayAgain}
              className="min-w-[120px] transform rounded-xl bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 px-6 py-4 text-base font-bold text-black shadow-xl shadow-amber-500/25 transition-all duration-300 hover:scale-105 hover:from-amber-300 hover:via-yellow-400 hover:to-orange-400"
              size="lg"
              aria-label="Play again"
            >
              🎲 Play Again
            </SkiButton>
          )}
          <SkiButton
            onClick={showResult ? handleClose : handleSpin}
            isDisabled={isSpinning}
            className={cn(
              "min-w-[140px] transform rounded-xl px-8 py-4 text-lg font-bold shadow-xl transition-all duration-300 hover:scale-105",
              isSpinning
                ? "cursor-not-allowed bg-gradient-to-r from-gray-400 to-gray-500"
                : showResult
                  ? "bg-gradient-to-r from-slate-600 to-slate-700 text-white hover:from-slate-500 hover:to-slate-600"
                  : "bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-black shadow-yellow-500/25 hover:from-yellow-300 hover:via-orange-400 hover:to-red-400",
            )}
            size="lg"
            aria-label={isSpinning ? "Spinning the wheel" : showResult ? "Close modal" : "Spin the wheel to win"}
          >
            {isSpinning ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Spinning...
              </div>
            ) : showResult ? (
              "Close"
            ) : (
              "🎮 SPIN NOW!"
            )}
          </SkiButton>
        </div>
      </div>
    </ReusableDialog>
  );
};
