"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import CustomContainer from "@/ui/CustomContainer";
import CustomTitle from "@/ui/CustomTitle";
import { 
  FaBookQuran, 
  FaChildReaching, 
  FaBookOpen, 
  FaGlobe, 
  FaScroll,
  FaWhatsapp
} from "react-icons/fa6";

const features = [
  {
    title: "جلسات شخصية لتحفيظ القرآن",
    desc: "تعلم وحفظ كتاب الله في جلسات شخصية، مصممة خصيصًا لك، سواء كنت رجلاً أو امرأة، مع نخبة من المحفظين والمحفظات.",
    icon: FaBookQuran,
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
  },
  {
    title: "برامج الأطفال المبتكرة",
    desc: "برامج ممتعة تجمع بين تحفيظ القرآن وتعليم العلوم الشرعية للأطفال بأسلوب مبتكر وجذاب ينمي فيهم حب الدين واللغة.",
    icon: FaChildReaching,
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400"
  },
  {
    title: "اللغة العربية الفصحى",
    desc: "دورات مكثفة في اللغة العربية الفصحى لتفهم النصوص الشرعية بعمق وتدبر، وتعزيز مهارات التحدث والقراءة.",
    icon: FaBookOpen,
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400"
  },
  {
    title: "لغير الناطقين بالعربية",
    desc: "برامج مخصصة لغير الناطقين بالعربية، لنجعل فهم الدين متاحًا للجميع بلغتهم، بأساليب تعليمية عالمية.",
    icon: FaGlobe,
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400"
  },
  {
    title: "علوم الحديث والتفسير",
    desc: "دورات متقدمة في علوم الحديث والتفسير لمن يبحثون عن التعمق في فهم السنة النبوية ومعاني القرآن الكريم.",
    icon: FaScroll,
    color: "bg-rose-500/10 text-rose-600 dark:text-rose-400"
  }
];

const AcademyClient = () => {
  return (
    <div className="min-h-screen bg-background transition-colors duration-500">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-main/10 to-transparent -z-10" />
        <CustomContainer>
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8 p-4 bg-white dark:bg-zinc-900 rounded-3xl border border-main/10 shadow-xl"
            >
              <Image
                src="/images/yaqeinacademy.png"
                alt="شعار أكاديمية يقين"
                width={200}
                height={200}
                className="w-32 md:w-48 h-auto"
                priority
              />
            </motion.div>
            
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-black mb-6 text-foreground dark:text-white"
            >
              أكاديمية <span className="text-main">يقين</span> للعلوم الشرعية
            </motion.h1>
            
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-foreground/70 dark:text-white/70 max-w-2xl leading-relaxed"
            >
              بالتعاون مع منصة نور الهدى، نقدم لكم صرحاً تعليمياً يهدف إلى بناء جيل مرتبط بكتاب الله وسنة نبيه ﷺ، من خلال برامج تعليمية متطورة.
            </motion.p>
          </div>
        </CustomContainer>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <CustomContainer>
          <CustomTitle 
            title="ماذا تقدم الأكاديمية؟"
            description="مجموعة شاملة من الدورات والبرامج المصممة لتلبية احتياجاتكم التعليمية والروحية"
            success={false}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-main/5 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform`}>
                  <feature.icon />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground dark:text-white">{feature.title}</h3>
                <p className="text-foreground/70 dark:text-white/70 leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </CustomContainer>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <CustomContainer>
          <div className="bg-main rounded-[2.5rem] p-8 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
            {/* Decorations */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-gold/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-black mb-8">ابدأ رحلتك التعليمية الآن</h2>
              <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
                لا تتردد في التواصل معنا للاستفسار عن الدورات المتاحة وطرق التسجيل. فريق أكاديمية يقين في انتظارك.
              </p>
              
              <div className="flex flex-wrap justify-center gap-6">
                <motion.a
                  target="_blank"
                  href="https://wa.me/+201032129080"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white rounded-2xl font-bold shadow-lg"
                >
                  <FaWhatsapp size={24} />
                  تواصل عبر واتساب
                </motion.a>
                
                <motion.a
                  href="https://yaqeinacademy.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-3 px-8 py-4 bg-white text-main rounded-2xl font-bold shadow-lg"
                >
                  <FaGlobe size={24} />
                  زيارة الموقع الرسمي
                </motion.a>
              </div>
            </div>
          </div>
        </CustomContainer>
      </section>
    </div>
  );
};

export default AcademyClient;
