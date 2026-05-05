"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface LetterState { char: string; isMatrix: boolean; isSpace: boolean; }
interface MatrixTextProps { text?: string; className?: string; initialDelay?: number; letterAnimationDuration?: number; letterInterval?: number; }

export const MatrixText = ({ text = "HelloWorld!", className, initialDelay = 200, letterAnimationDuration = 500, letterInterval = 100 }: MatrixTextProps) => {
  const [letters, setLetters] = useState<LetterState[]>(() => text.split("").map((char) => ({ char, isMatrix: false, isSpace: char === " " })));
  const [isAnimating, setIsAnimating] = useState(false);
  const getRandomChar = useCallback(() => (Math.random() > 0.5 ? "1" : "0"), []);
  const animateLetter = useCallback((index: number) => {
    if (index >= text.length) return;
    requestAnimationFrame(() => {
      setLetters((prev) => { const n = [...prev]; if (!n[index].isSpace) n[index] = { ...n[index], char: getRandomChar(), isMatrix: true }; return n; });
      setTimeout(() => { setLetters((prev) => { const n = [...prev]; n[index] = { ...n[index], char: text[index], isMatrix: false }; return n; }); }, letterAnimationDuration);
    });
  }, [getRandomChar, text, letterAnimationDuration]);
  const startAnimation = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    let i = 0;
    const animate = () => { if (i >= text.length) { setIsAnimating(false); return; } animateLetter(i); i++; setTimeout(animate, letterInterval); };
    animate();
  }, [animateLetter, text, isAnimating, letterInterval]);
  // Avvio iniziale
  useEffect(() => { const t = setTimeout(startAnimation, initialDelay); return () => clearTimeout(t); }, []);
  // Loop: quando isAnimating torna false, rilancia dopo 2s
  useEffect(() => {
    if (isAnimating) return;
    const t = setTimeout(startAnimation, 2000);
    return () => clearTimeout(t);
  }, [isAnimating]);
  const motionVariants = useMemo(() => ({ matrix: { color: "#60a5fa", textShadow: "0 2px 12px rgba(96,165,250,0.8)" } }), []);
  return (
    <div className={cn("flex items-center justify-center", className)} aria-label="Matrix text animation">
      <div className="flex flex-wrap items-center justify-center">
        {letters.map((letter, index) => (
          <motion.div key={`${index}-${letter.char}`} className="font-mono w-[1ch] text-center overflow-hidden" initial="initial" animate={letter.isMatrix ? "matrix" : "normal"} variants={motionVariants} transition={{ duration: 0.1, ease: "easeInOut" }} style={{ display: "inline-block", fontVariantNumeric: "tabular-nums" }}>
            {letter.isSpace ? "\u00A0" : letter.char}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
