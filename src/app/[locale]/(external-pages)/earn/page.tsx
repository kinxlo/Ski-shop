"use client";

import { BreadCrumb } from "@/components/shared/breadcrumb";
import SkiButton from "@/components/shared/button";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { PiLink } from "react-icons/pi";

import { ProductBreadcrumb } from "../(home)/_components/product-breadcrumb";

export default function EarnPage() {
  const [inviteCode] = useState("SKS123GU");
  const [successfulInvites] = useState(3);
  const [copied, setCopied] = useState(false);
  const t = useTranslations();

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(inviteCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Silently handle clipboard errors
    }
  };

  const handleCopyLink = async () => {
    const inviteLink = `${window.location.origin}/signup?ref=${inviteCode}`;
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Silently handle clipboard errors
    }
  };

  const handleShare = () => {
    const inviteLink = `${window.location.origin}/signup?ref=${inviteCode}`;
    const shareText = `Join Ski-Shop using my invite code ${inviteCode} and get amazing deals on ski equipment!`;

    if (navigator.share) {
      navigator.share({
        title: "Join Ski-Shop",
        text: shareText,
        url: inviteLink,
      });
    } else {
      // Fallback to copying link
      handleCopyLink();
    }
  };

  return (
    <section className="pt-[10rem]">
      <ProductBreadcrumb productTitle={t("profile.investEarn")} />
      {/* Breadcrumb */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <BreadCrumb />
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-30 lg:grid-cols-6">
          {/* Left Column - Main Content */}
          <div className="space-y-8 lg:col-span-3">
            {/* Title */}
            <div>
              <h1 className="mb-4 !text-4xl font-bold text-gray-900">Invite & Earn</h1>
              <p className="text-xl text-gray-600">Share Ski-Shop with friends and get rewarded!</p>
            </div>

            {/* Description */}
            <div className="">
              <p className="text-3xl leading-relaxed font-bold text-gray-700">
                Earn <span className="text-mid-warning font-semibold">coupons/vouchers</span> for every friend who signs
                up and <span className="text-mid-warning font-semibold">places their first order</span>.
              </p>
            </div>

            {/* Invite Code Section */}

            <div className="border-primary flex items-center overflow-hidden rounded-lg border-2">
              <Input value={inviteCode} readOnly className="h-12 flex-1 rounded-none bg-gray-50 font-mono text-lg" />
              <SkiButton
                variant="ghost"
                onClick={handleCopyCode}
                className={`border-primary text-primary border-l-primary rounded-none border-l-2 shadow-none`}
              >
                {copied ? "Copied!" : "Copy Code"}
              </SkiButton>
            </div>

            {/* Sharing Options */}
            <div className="space-y-4">
              <SkiButton className={`w-full`} variant="primary" onClick={handleShare}>
                Share With Friends
              </SkiButton>

              <button
                onClick={handleCopyLink}
                className="text-primary hover:text-accent flex items-center justify-center gap-2 text-sm"
              >
                <PiLink className="h-4 w-4" />
                Copy Invite link
              </button>
            </div>
          </div>

          {/* Right Column - Statistics */}
          <div className="lg:col-span-3">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <div className="space-y-4 text-center">
                <div>
                  <p className="text-sm text-gray-600">Successful Invites</p>
                  <p className="text-3xl font-bold text-orange-500">{successfulInvites}</p>
                </div>

                <SkiButton variant="outline" className="border-primary text-primary w-full border shadow-none">
                  View Coupons
                </SkiButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
