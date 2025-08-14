"use client";

import SkiButton from "@/components/shared/button";
import { ReusableDialog } from "@/components/shared/dialog/Dialog";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface SpinToWinModalProperties {
  children: React.ReactNode;
}

// Prize segments data
const PRIZES = [
  { label: "₦500", value: 500, color: "from-amber-400 to-orange-500", textColor: "text-white" },
  { label: "₦100", value: 100, color: "from-emerald-400 to-teal-500", textColor: "text-white" },
  { label: "₦1000", value: 1000, color: "from-purple-400 to-pink-500", textColor: "text-white" },
  { label: "₦50", value: 50, color: "from-blue-400 to-indigo-500", textColor: "text-white" },
  { label: "₦5000", value: 5000, color: "from-red-400 to-rose-500", textColor: "text-white" },
  { label: "₦200", value: 200, color: "from-cyan-400 to-blue-500", textColor: "text-white" },
  { label: "₦2000", value: 2000, color: "from-violet-400 to-purple-500", textColor: "text-white" },
  { label: "₦300", value: 300, color: "from-lime-400 to-green-500", textColor: "text-white" },
];

const TOTAL_SEGMENTS = 8;
const SEGMENT_ANGLE = 360 / TOTAL_SEGMENTS;

export const SpinToWinModal = ({ children }: SpinToWinModalProperties) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState<(typeof PRIZES)[0] | null>(null);
  const [rotation, setRotation] = useState(0);
  const [showResult, setShowResult] = useState(false);

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

  return (
    <ReusableDialog
      open={isModalOpen}
      onOpenChange={handleOpenChange}
      trigger={children}
      className="w-[95vw] max-w-md sm:max-w-lg"
      hideClose={false}
    >
      <div className="flex flex-col items-center justify-center rounded-2xl border border-purple-500/20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8 shadow-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-3 inline-block rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-1">
            <span className="text-sm font-bold text-black">SPIN TO WIN</span>
          </div>
          <h2 className="mb-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
            Up to ₦5000
          </h2>
          <p className="text-sm text-gray-300 sm:text-base">Coupon Prize!</p>
        </div>

        {/* Spinning Wheel */}
        <div className="relative mb-8">
          {/* Outer Ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 p-1">
            <div className="h-full w-full rounded-full bg-slate-900"></div>
          </div>

          {/* Wheel Container */}
          <div className="relative p-2">
            {/* Pointer */}
            <div className="absolute top-2 left-1/2 z-30 -translate-x-1/2 transform">
              <div className="relative">
                <div className="border-b-gradient-to-r h-0 w-0 border-r-[20px] border-b-[40px] border-l-[20px] border-r-transparent border-b-yellow-400 border-l-transparent shadow-lg"></div>
                <div className="border-b-gradient-to-r absolute top-1 left-1/2 h-0 w-0 -translate-x-1/2 border-r-[16px] border-b-[32px] border-l-[16px] border-r-transparent border-b-orange-500 border-l-transparent"></div>
              </div>
            </div>

            {/* Wheel */}
            <div
              className={cn(
                "relative h-60 w-60 overflow-hidden rounded-full shadow-2xl transition-transform duration-3000 ease-out sm:h-72 sm:w-72",
                isSpinning && "duration-3000",
              )}
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: isSpinning ? "transform 3s cubic-bezier(0.25, 0.46, 0.45, 0.94)" : "none",
                filter: "drop-shadow(0 0 20px rgba(147, 51, 234, 0.5))",
              }}
            >
              {PRIZES.map((prize, index) => {
                const startAngle = index * SEGMENT_ANGLE;
                const endAngle = (index + 1) * SEGMENT_ANGLE;

                return (
                  <div
                    key={index}
                    className={cn("absolute h-full w-full bg-gradient-to-r", prize.color, prize.textColor)}
                    style={{
                      clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos(((startAngle - 90) * Math.PI) / 180)}% ${50 + 50 * Math.sin(((startAngle - 90) * Math.PI) / 180)}%, ${50 + 50 * Math.cos(((endAngle - 90) * Math.PI) / 180)}% ${50 + 50 * Math.sin(((endAngle - 90) * Math.PI) / 180)}%)`,
                    }}
                  >
                    <div
                      className="absolute text-sm font-bold drop-shadow-lg sm:text-base"
                      style={{
                        top: "50%",
                        left: "50%",
                        transform: `translate(-50%, -50%) rotate(${startAngle + SEGMENT_ANGLE / 2}deg) translateY(-75px)`,
                      }}
                    >
                      {prize.label}
                    </div>
                  </div>
                );
              })}

              {/* Center circle */}
              <div className="absolute top-1/2 left-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg ring-4 ring-white/20">
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-slate-800 to-slate-900"></div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute inset-0 h-60 w-60 sm:h-72 sm:w-72">
              {Array.from({ length: 24 }).map((_, index) => {
                const angle = (index * 360) / 24;
                const isLarge = index % 3 === 0;
                return (
                  <div
                    key={index}
                    className={cn(
                      "absolute rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 shadow-sm",
                      isLarge ? "h-3 w-3" : "h-2 w-2",
                    )}
                    style={{
                      top: "50%",
                      left: "50%",
                      transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${isLarge ? "135px" : "130px"})`,
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* Base */}
          <div className="absolute bottom-0 left-1/2 h-6 w-20 -translate-x-1/2 translate-y-3 transform rounded-t-xl bg-gradient-to-r from-slate-700 to-slate-800 shadow-lg"></div>
        </div>

        {/* Result Display */}
        {showResult && selectedPrize && (
          <div className="mb-6 rounded-2xl border border-emerald-400/30 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 p-6 text-center shadow-2xl">
            <div className="mb-3">
              <div className="text-4xl">🎉</div>
            </div>
            <h3 className="text-xl font-bold text-white drop-shadow-lg">Congratulations!</h3>
            <p className="text-2xl font-bold text-yellow-200 drop-shadow-lg">{selectedPrize.label}</p>
            <p className="text-sm text-emerald-100">Coupon Prize Won!</p>
            <div className="mt-3 inline-block rounded-full bg-white/20 px-3 py-1">
              <span className="text-xs font-semibold text-white">🎁 Added to your wallet</span>
            </div>
          </div>
        )}

        {/* Action Button */}
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
    </ReusableDialog>
  );
};
