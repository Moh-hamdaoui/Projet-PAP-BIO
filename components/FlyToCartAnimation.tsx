"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

export type FlyAnimationPayload = {
  fromRect: DOMRect;
  imageUrl: string;
};

type FlyToCartAnimationProps = {
  animation: FlyAnimationPayload | null;
  targetRect: DOMRect | null;
  onComplete: () => void;
};

export default function FlyToCartAnimation({
  animation,
  targetRect,
  onComplete,
}: FlyToCartAnimationProps) {
  const [mounted, setMounted] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!animation || !targetRect) {
      return;
    }

    setAnimating(true);
    const timer = window.setTimeout(() => {
      setAnimating(false);
      onComplete();
    }, 600);

    return () => window.clearTimeout(timer);
  }, [animation, targetRect, onComplete]);

  if (!mounted || !animation || !targetRect) {
    return null;
  }

  const startX = animation.fromRect.left + animation.fromRect.width / 2;
  const startY = animation.fromRect.top + animation.fromRect.height / 2;
  const endX = targetRect.left + targetRect.width / 2;
  const endY = targetRect.top + targetRect.height / 2;
  const deltaX = endX - startX;
  const deltaY = endY - startY;

  return createPortal(
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100]"
      style={
        {
          "--fly-x": `${deltaX}px`,
          "--fly-y": `${deltaY}px`,
        } as React.CSSProperties
      }
    >
      <div
        className={`fly-to-cart-item ${animating ? "fly-to-cart-item--active" : ""}`}
        style={{
          left: startX,
          top: startY,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={animation.imageUrl}
          alt=""
          className="h-10 w-10 rounded-full border-2 border-[#EFBF04] object-cover shadow-md"
        />
      </div>
    </div>,
    document.body,
  );
}
