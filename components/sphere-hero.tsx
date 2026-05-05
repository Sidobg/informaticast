"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";

const CONFIG = {
  primaryColor: "26, 58, 107",
  secondaryColor: "30, 95, 168",
  sphereRotationDuration: "240s",
  gridPanDuration: "180s",
  coreGlowDuration: "25s",
  wireframeOpacity: 0.75,
  wireframeShadowIntensity: 70,
  coreBlur: 200,
  parallaxDepth: 35,
  lerpFactor: 0.08,
  sphereDensity: 12,
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export default function SphereHero() {
  const [targetMousePos, setTargetMousePos] = useState({ x: 0, y: 0 });
  const currentMousePos = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>(0);

  const animateLerp = useCallback(() => {
    currentMousePos.current.x = lerp(currentMousePos.current.x, targetMousePos.x, CONFIG.lerpFactor);
    currentMousePos.current.y = lerp(currentMousePos.current.y, targetMousePos.y, CONFIG.lerpFactor);
    setTargetMousePos(() => ({ x: currentMousePos.current.x, y: currentMousePos.current.y }));
    animationFrameRef.current = requestAnimationFrame(animateLerp);
  }, [targetMousePos.x, targetMousePos.y]);

  useEffect(() => { animationFrameRef.current = requestAnimationFrame(animateLerp); return () => cancelAnimationFrame(animationFrameRef.current); }, [animateLerp]);
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      setTargetMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const { x: smoothX, y: smoothY } = currentMousePos.current;
  const baseTranslate = `translate3d(${smoothX * CONFIG.parallaxDepth}px, ${smoothY * CONFIG.parallaxDepth}px, 0)`;
  const gridTranslate = `translate3d(${-smoothX * (CONFIG.parallaxDepth / 2)}px, ${-smoothY * (CONFIG.parallaxDepth / 2)}px, 0)`;
  const hazeTranslate = `translate3d(${smoothX * (CONFIG.parallaxDepth / 2)}px, ${smoothY * (CONFIG.parallaxDepth / 2)}px, 0)`;
  const tiltTranslate = `rotateX(${smoothY * 5}deg) rotateY(${-smoothX * 5}deg)`;

  const sphereRings = Array.from({ length: CONFIG.sphereDensity }, (_, i) => {
    const angle = i * (90 / (CONFIG.sphereDensity / 2));
    return <div key={i} className="wireframe-line absolute inset-0 rounded-full border border-blue-400/30" style={{ transform: i % 2 === 0 ? `rotateY(${angle}deg)` : `rotateX(${angle}deg)` }} aria-hidden="true" />;
  });

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#030d1a]">
      <div className="absolute inset-0" style={{ transform: gridTranslate, backgroundImage: "repeating-linear-gradient(to right, rgba(30,95,168,0.08) 1px, transparent 1px), repeating-linear-gradient(to bottom, rgba(30,95,168,0.08) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      <div className="absolute inset-0" style={{ transform: hazeTranslate, backgroundImage: `radial-gradient(circle at 50% 50%, rgba(${CONFIG.primaryColor}, 0.2) 0%, transparent 50%)`, filter: "blur(150px)", mixBlendMode: "screen" }} />
      <div className="absolute inset-0" style={{ transform: baseTranslate, backgroundImage: `radial-gradient(at 50% 50%, rgba(${CONFIG.primaryColor}, 0.12) 0%, #030d1a 90%)` }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ width: 400, height: 400, backgroundImage: `radial-gradient(circle, rgba(${CONFIG.secondaryColor}, 0.45) 0%, transparent 70%)`, filter: `blur(${CONFIG.coreBlur}px)` }} />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none" style={{ width: 700, height: 700 }}>
        <div className="relative w-full h-full animate-spin" style={{ transform: tiltTranslate, animationDuration: CONFIG.sphereRotationDuration, transformStyle: "preserve-3d" }}>
          {sphereRings}
        </div>
      </div>
      <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 50% 50%, rgba(${CONFIG.primaryColor}, 0.35) 0%, transparent 50%)`, mixBlendMode: "screen", filter: "blur(100px)" }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 40%, #030d1a 100%)" }} />
    </div>
  );
}
