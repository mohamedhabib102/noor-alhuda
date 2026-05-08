"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import CustomContainer from "@/ui/CustomContainer";
import { FaGraduationCap, FaBookQuran, FaArrowLeft } from "react-icons/fa6";

const AcademyCollaboration: React.FC = () => {
  return (
    <section className="py-16 bg-linear-to-b from-background to-white dark:from-background dark:to-black transition-colors duration-500 overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-main/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <CustomContainer>
        <div className="flex flex-col items-center text-center gap-10">
          {/* Logo/Image Side */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-md flex justify-center"
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-linear-to-r from-main/20 to-brand-gold/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
              <div className="relative bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-3xl border border-main/10 shadow-2xl overflow-hidden">
                <Image
                  src="/images/yaqeinacademy.png"
                  alt="Yaqein Academy Logo"
                  width={250}
                  height={250}
                  className="w-40 md:w-56 h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                />
                <div className="mt-4 flex items-center justify-center gap-4 text-main font-bold">
                  <div className="h-px flex-1 bg-main/20" />
                  <span className="whitespace-nowrap text-xs md:text-sm">أكاديمية يقين</span>
                  <div className="h-px flex-1 bg-main/20" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-3xl flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-main/10 text-main rounded-full text-sm font-bold mb-6">
              <FaGraduationCap className="text-main" />
              <span>شراكة تعليمية مباركة</span>
            </div>
            
            <h2 className="text-2xl md:text-5xl font-black text-foreground dark:text-white mb-6 leading-tight">
              نور الهدى بالتعاون مع <br />
              <span className="text-main">أكاديمية يقين</span>
            </h2>
            
            <p className="text-base md:text-lg text-foreground/70 dark:text-white/70 mb-8 leading-relaxed max-w-2xl mx-auto">
              رحلة إيمانية متكاملة لتعلم القرآن الكريم والعلوم الشرعية بأحدث الأساليب التعليمية، تجمع بين أصالة المنهج وحداثة الأسلوب لجميع الفئات.
            </p>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 w-full max-w-2xl">
              <li className="flex items-center gap-3 justify-center bg-white/50 dark:bg-zinc-900/50 p-4 rounded-2xl border border-main/5 transition-colors hover:border-main/20">
                <div className="w-10 h-10 shrink-0 bg-brand-gold/10 rounded-xl flex items-center justify-center text-brand-gold">
                  <FaBookQuran />
                </div>
                <span className="text-foreground/80 dark:text-white/80 font-medium text-sm md:text-base">جلسات تحفيظ شخصية مصممة لك.</span>
              </li>
              <li className="flex items-center gap-3 justify-center bg-white/50 dark:bg-zinc-900/50 p-4 rounded-2xl border border-main/5 transition-colors hover:border-main/20">
                <div className="w-10 h-10 shrink-0 bg-main/10 rounded-xl flex items-center justify-center text-main">
                  <FaGraduationCap />
                </div>
                <span className="text-foreground/80 dark:text-white/80 font-medium text-sm md:text-base">برامج ممتعة وجذابة للأطفال والناشئة.</span>
              </li>
            </ul>

            <Link href="/academy">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-main rounded-2xl hover:bg-main-color/90 shadow-lg shadow-main/20 overflow-hidden"
              >
                <span className="relative flex items-center gap-2">
                  معرفة المزيد عن الأكاديمية
                  <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/20 to-transparent" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </CustomContainer>
    </section>
  );
};

export default AcademyCollaboration;
