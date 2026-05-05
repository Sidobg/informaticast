"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import Image from "next/image";

const TOTAL_STEPS = 5;
const STEP_DURATION = 5000;

const steps = [
  { id: "1", name: "Step 1", title: "Riparazione Computer", description: "Diagnosi e riparazione professionale di PC desktop e portatili. Recupero dati, sostituzione componenti, reinstallazione sistemi operativi." },
  { id: "2", name: "Step 2", title: "Riparazione Smartphone", description: "Riparazione display, sostituzione batterie, problemi software su tutte le marche. Interventi rapidi con ricambi di qualità." },
  { id: "3", name: "Step 3", title: "Assistenza Aziende", description: "Supporto IT on-site per aziende e professionisti della Val Seriana. Contratti di assistenza personalizzati e interventi prioritari." },
  { id: "4", name: "Step 4", title: "Vendita Hardware", description: "PC desktop, notebook, smartphone, tablet, stampanti e accessori. Prodotti selezionati con garanzia e assistenza post-vendita." },
  { id: "5", name: "Step 5", title: "Siti Internet", description: "Realizzazione siti web e landing page per aziende locali. Soluzioni moderne, veloci e facili da gestire." },
];

export interface ImageSet {
  step1img1: string;
  step1img2: string;
  step2img1: string;
  step2img2: string;
  step3img: string;
  step4img: string;
  step5img: string;
  step1img1Class?: string;
  step1img2Class?: string;
  step2img1Class?: string;
  step2img2Class?: string;
  step3imgClass?: string;
  step4imgClass?: string;
  step5imgClass?: string;
}

function renderStepContent(stepIndex: number, images: ImageSet) {
  switch (stepIndex) {
    case 0:
      return (
        <div className="grid grid-cols-2 gap-3 h-full">
          <div className="relative rounded-xl overflow-hidden h-56">
            <Image
              src={images.step1img1}
              alt="Riparazione Computer 1"
              fill
              className={clsx("object-cover", images.step1img1Class)}
            />
          </div>
          <div className="relative rounded-xl overflow-hidden h-56">
            <Image
              src={images.step1img2}
              alt="Riparazione Computer 2"
              fill
              className={clsx("object-cover", images.step1img2Class)}
            />
          </div>
        </div>
      );
    case 1:
      return (
        <div className="grid grid-cols-2 gap-3 h-full">
          <div className="relative rounded-xl overflow-hidden h-56">
            <Image
              src={images.step2img1}
              alt="Riparazione Smartphone 1"
              fill
              className={clsx("object-cover", images.step2img1Class)}
            />
          </div>
          <div className="relative rounded-xl overflow-hidden h-56">
            <Image
              src={images.step2img2}
              alt="Riparazione Smartphone 2"
              fill
              className={clsx("object-cover", images.step2img2Class)}
            />
          </div>
        </div>
      );
    case 2:
      return (
        <div className="relative rounded-xl overflow-hidden h-56 w-full">
          <Image
            src={images.step3img}
            alt="Assistenza Aziende"
            fill
            className={clsx("object-cover", images.step3imgClass)}
          />
        </div>
      );
    case 3:
      return (
        <div className="relative rounded-xl overflow-hidden h-56 w-full">
          <Image
            src={images.step4img}
            alt="Vendita Hardware"
            fill
            className={clsx("object-cover", images.step4imgClass)}
          />
        </div>
      );
    case 4:
      return (
        <div className="relative rounded-xl overflow-hidden h-56 w-full">
          <Image
            src={images.step5img}
            alt="Siti Internet"
            fill
            className={clsx("object-cover", images.step5imgClass)}
          />
        </div>
      );
    default:
      return null;
  }
}

interface FeatureCardProps {
  stepIndex: number;
  images: ImageSet;
}

function FeatureCard({ stepIndex, images }: FeatureCardProps) {
  const step = steps[stepIndex];
  return (
    <motion.div
      key={stepIndex}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="bg-[#030d1a] dark:bg-[#030d1a] border border-blue-900/30 dark:border-blue-900/30 rounded-2xl p-6 flex flex-col gap-5"
    >
      <div>
        <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
        <p className="text-[#8a9ab0] dark:text-[#8a9ab0] text-sm leading-relaxed">
          {step.description}
        </p>
      </div>
      {renderStepContent(stepIndex, images)}
    </motion.div>
  );
}

interface FeatureCarouselProps {
  image: ImageSet;
}

export function FeatureCarousel({ image }: FeatureCarouselProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimers = (step: number) => {
    // Clear existing
    if (intervalRef.current) clearTimeout(intervalRef.current);
    if (progressRef.current) clearInterval(progressRef.current);

    setProgress(0);
    const startTime = Date.now();

    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / STEP_DURATION) * 100, 100);
      setProgress(pct);
    }, 30);

    intervalRef.current = setTimeout(() => {
      const next = (step + 1) % TOTAL_STEPS;
      setCurrentStep(next);
    }, STEP_DURATION);
  };

  useEffect(() => {
    startTimers(currentStep);
    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [currentStep]);

  const handleStepClick = (index: number) => {
    if (intervalRef.current) clearTimeout(intervalRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
    setCurrentStep(index);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start">
      {/* Step list — left */}
      <div className="flex flex-col gap-1 lg:w-56 w-full shrink-0">
        {steps.map((step, i) => {
          const isActive = i === currentStep;
          return (
            <button
              key={step.id}
              onClick={() => handleStepClick(i)}
              className="text-left w-full"
            >
              <div
                className={clsx(
                  "rounded-xl px-4 py-3 transition-all duration-300 border",
                  isActive
                    ? "bg-blue-700/20 border-blue-700/50"
                    : "bg-transparent border-transparent hover:bg-blue-900/20 hover:border-blue-900/40"
                )}
              >
                <div className="flex items-center gap-3 mb-1">
                  <span
                    className={clsx(
                      "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors duration-300",
                      isActive
                        ? "bg-blue-700 text-white"
                        : "bg-blue-900/40 text-blue-400"
                    )}
                  >
                    {i + 1}
                  </span>
                  <span
                    className={clsx(
                      "text-sm font-semibold transition-colors duration-300",
                      isActive ? "text-white" : "text-[#8a9ab0]"
                    )}
                  >
                    {step.title}
                  </span>
                </div>
                {/* Progress bar */}
                <div className="h-0.5 rounded-full bg-blue-900/30 overflow-hidden ml-9">
                  <motion.div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: isActive ? `${progress}%` : "0%" }}
                    transition={{ ease: "linear" }}
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Content card — right */}
      <div className="flex-1 min-h-[340px]">
        <AnimatePresence mode="wait">
          <FeatureCard
            key={currentStep}
            stepIndex={currentStep}
            images={image}
          />
        </AnimatePresence>
      </div>
    </div>
  );
}
