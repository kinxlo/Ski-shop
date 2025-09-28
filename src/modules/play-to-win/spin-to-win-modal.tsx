"use client";

import { BlurImage } from "@/components/core/miscellaneous/blur-image";
import SkiButton from "@/components/shared/button";
import { ReusableDialog } from "@/components/shared/dialog/Dialog";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";

interface SpinToWinModalProperties {
  children: React.ReactNode;
  autoOpen?: boolean;
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
const AUTO_OPEN_INTERVAL_MS = 15 * 60 * 1000;
const STORAGE_KEY = "skicom.spinToWin.lastShownAt";

export const SpinToWinModal = ({ children, autoOpen = true }: SpinToWinModalProperties) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState<(typeof PRIZES)[0] | null>(null);
  const [rotation, setRotation] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const intervalReference = useRef<number | null>(null);
  const timeoutReference = useRef<number | null>(null);
  const rafReference = useRef<number | null>(null);
  // Guard to prevent duplicate opens within a short window (e.g., Strict Mode/double scheduling)
  const openGuardReference = useRef<number>(0);

  useEffect(() => {
    // Always clear any existing timers when autoOpen turns false
    if (!autoOpen) {
      if (timeoutReference.current) {
        clearTimeout(timeoutReference.current);
        timeoutReference.current = null;
      }
      if (intervalReference.current) {
        clearInterval(intervalReference.current);
        intervalReference.current = null;
      }
      if (rafReference.current) {
        cancelAnimationFrame(rafReference.current);
        rafReference.current = null;
      }
      return;
    }

    const openNow = () => {
      // prevent duplicate opens within 1s window (handles StrictMode/double scheduling)
      const nowTs = Date.now();
      if (nowTs - openGuardReference.current < 1000) return;
      openGuardReference.current = nowTs;

      // avoid redundant state churn if already open
      setIsModalOpen((previous) => {
        if (!previous) {
          try {
            localStorage.setItem(STORAGE_KEY, String(Date.now()));
          } catch {
            // no-op
          }
          return true;
        }
        return previous;
      });
    };

    const startInterval = () => {
      if (intervalReference.current) {
        clearInterval(intervalReference.current);
      }
      intervalReference.current = window.setInterval(() => {
        // only open when visible to prevent background pops stacking
        if (document.visibilityState === "visible") {
          openNow();
        }
      }, AUTO_OPEN_INTERVAL_MS);
    };

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const lastShown = raw ? Number.parseInt(raw, 10) || 0 : 0;
      const now = Date.now();

      if (!lastShown || now - lastShown >= AUTO_OPEN_INTERVAL_MS) {
        // Open immediately, then start regular cadence
        // Delay to next tick to avoid hydration flashes
        rafReference.current = requestAnimationFrame(() => {
          if (document.visibilityState === "visible") {
            openNow();
          }
          startInterval();
        });
      } else {
        // Wait remaining time, then open, then start interval
        const remaining = AUTO_OPEN_INTERVAL_MS - (now - lastShown);
        timeoutReference.current = window.setTimeout(() => {
          if (document.visibilityState === "visible") {
            openNow();
          }
          startInterval();
        }, remaining);
      }
    } catch {
      // Fallback if localStorage not accessible
      timeoutReference.current = window.setTimeout(() => {
        if (document.visibilityState === "visible") {
          openNow();
        }
        startInterval();
      }, AUTO_OPEN_INTERVAL_MS);
    }

    return () => {
      if (timeoutReference.current) {
        clearTimeout(timeoutReference.current);
        timeoutReference.current = null;
      }
      if (intervalReference.current) {
        clearInterval(intervalReference.current);
        intervalReference.current = null;
      }
      if (rafReference.current) {
        cancelAnimationFrame(rafReference.current);
        rafReference.current = null;
      }
    };
  }, [autoOpen]);

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
    // Align selected segment center with the pointer (12 o'clock).
    // Subtracting half a segment fixes the off-by-one-to-the-right issue.
    const finalRotation = baseRotation + (360 - targetAngle) - SEGMENT_ANGLE / 2;

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
      wrapperClassName={`hidden`}
      className="hide-scrollbar max-h-[90vh] w-[95vw] max-w-sm overflow-x-hidden overflow-y-auto border-none !bg-transparent p-0 shadow-none sm:max-w-md md:max-w-lg lg:max-w-4xl xl:max-w-5xl"
      hideClose
    >
      {showResult && (
        <Confetti
          // width={typeof window === "undefined" ? 300 : window.innerWidth}
          // height={typeof window === "undefined" ? 300 : window.innerHeight}
          // className={`h-[600px]`}
          recycle={false}
          numberOfPieces={200}
          colors={["#ffffff", "#fde68a", "#ef4444", "#f59e0b"]}
        />
      )}
      <section className="animate-in fade-in zoom-in-95 items-center justify-center rounded-2xl p-4 shadow-2xl shadow-black/30 backdrop-blur-sm duration-500 sm:rounded-3xl sm:p-6 md:p-8 lg:p-10">
        <div className={`scale-[0.9]`}>
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mb-4 inline-block rounded-full bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 px-4 py-1 shadow-lg shadow-amber-500/30 sm:px-6 sm:py-2">
              <span className="text-xs font-bold tracking-wider text-black sm:text-sm">🎰 SPIN TO WIN</span>
            </div>
            <h2 className="mb-3 bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-400 bg-clip-text text-3xl font-bold !text-white drop-shadow-lg sm:text-4xl lg:text-5xl">
              Win Up to ₦5000
            </h2>
            <p className="!text-mid-grey-I text-sm font-medium sm:text-base lg:text-lg">Exclusive Coupon Prize!</p>
          </div>

          <div className="mb-8 flex flex-col items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:flex-row">
            {/* Spinning Wheel */}
            <div className="relative">
              {/* Top clamp behind pointer */}
              <div className="absolute -top-4 left-1/2 z-20 h-6 w-14 -translate-x-1/2 rounded-b-md bg-amber-300 shadow-md shadow-black/40" />

              {/* Outer Rim */}
              <div className="absolute inset-0 rounded-full bg-black p-3 shadow-2xl shadow-black/50">
                <div className="h-full w-full rounded-full bg-[#2b2b2b] ring-2 ring-black/70" />
              </div>

              {/* Wheel Container */}
              <div className="relative p-3">
                {/* Pointer */}
                <div className="absolute top-11 left-1/2 z-30 origin-top -translate-x-1/2 rotate-180 transform">
                  <div className="relative">
                    {/* <div className="h-0 w-0" /> */}
                    <div className="absolute top-2 left-1/2 h-0 w-0 -translate-x-1/2 border-r-[16px] border-b-[32px] border-l-[16px] border-r-transparent border-b-amber-300 border-l-transparent" />
                    <div className="bg-primary absolute top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full shadow-sm" />
                  </div>
                </div>

                {/* Wheel */}
                <div
                  className={cn(
                    "relative h-60 w-60 overflow-hidden rounded-full shadow-2xl sm:h-72 sm:w-72 md:h-80 md:w-80 lg:h-80 lg:w-80",
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
                            "absolute text-[14px] font-extrabold tracking-wide drop-shadow select-none",
                            textClass,
                          )}
                          style={{
                            top: "50%",
                            left: "50%",
                            transform: `translate(-50%, -50%) rotate(${startAngle + SEGMENT_ANGLE / 2}deg) translateY(-88px)`,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {prize.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {/* Center hub with golden ring */}
                <div className="absolute top-1/2 left-1/2 z-20 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-white shadow-md ring-4 ring-amber-400">
                  <BlurImage
                    priority
                    alt={`logo`}
                    src={`/images/skicom-mini.svg`}
                    width={100}
                    height={100}
                    className={`h-[30px] w-[30px]`}
                  />
                  {/* <div className="absolute inset-2 rounded-full bg-gray-200" /> */}
                </div>
              </div>

              {/* Base */}
              <div className="absolute -bottom-6 left-1/2 z-0 h-6 w-24 -translate-x-1/2 rounded-t-xl bg-black shadow-lg" />
              <div className="absolute -bottom-9 left-1/2 z-0 h-3 w-28 -translate-x-1/2 rounded-t-xl bg-black/80" />
            </div>

            {/* Result Display */}
            {showResult && selectedPrize && (
              <div className="animate-in fade-in slide-in-from-bottom-4 mt-10 mb-6 rounded-3xl border border-amber-400/40 bg-gradient-to-br from-amber-500 via-yellow-500 to-orange-500 p-6 text-center shadow-2xl shadow-amber-500/30 duration-700 sm:p-8 md:p-10">
                <div className="mb-4">
                  <div className="animate-bounce text-4xl sm:text-5xl">🎉</div>
                </div>
                <h3 className="mb-2 text-xl font-bold text-white drop-shadow-lg sm:text-2xl">Congratulations!</h3>
                <p className="mb-1 text-2xl font-bold text-amber-100 drop-shadow-lg sm:text-3xl">
                  {selectedPrize.label}
                </p>
                <p className="mb-4 text-sm font-medium text-amber-200 sm:text-base">Exclusive Coupon Prize Won!</p>
                <div className="inline-block rounded-full border border-white/30 bg-white/25 px-3 py-1 backdrop-blur-sm sm:px-4 sm:py-2">
                  <span className="text-xs font-semibold text-white sm:text-sm">🎁 Added to your wallet</span>
                </div>
              </div>
            )}
          </div>

          {/* Action Button */}
          <div className="mt-20 flex items-center justify-center gap-4">
            {showResult && (
              <SkiButton
                onClick={handlePlayAgain}
                className="min-w-[100px] transform rounded-xl bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 px-4 py-3 text-base font-bold text-black shadow-xl shadow-amber-500/25 transition-all duration-300 hover:scale-105 hover:from-amber-300 hover:via-yellow-400 hover:to-orange-400 sm:min-w-[120px] sm:px-6 sm:py-4"
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
                "min-w-[120px] transform rounded-xl px-6 py-3 text-base font-bold shadow-xl transition-all duration-300 hover:scale-105 sm:min-w-[140px] sm:px-8 sm:py-4 sm:text-lg",
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
      </section>
    </ReusableDialog>
  );
};
