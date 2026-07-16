"use client";

import { useEffect, useState } from "react";
import CustomContainer from "@/ui/CustomContainer";
import CustomTitle from "@/ui/CustomTitle";
import Azkar from "@/components/adhkar/Azkar";
import { AdhkarItem } from "@/types/Types";
import { BsEmojiFrown } from "react-icons/bs";
import { getFromIDB, saveToIDB } from "@/lib/idb";



const AdhkarPage: React.FC = () => {
  const [adhkar, setAdhkar] = useState<AdhkarItem[]|null>([]);
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
        setLoading(true)
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/adhkar?type=category`);
        const data = await res.json();
        setAdhkar(data);
        await saveToIDB("adhkar-categories", "all", data);
      } catch (err) {
        console.error("Error fetching adhkar categories, trying offline cache:", err);
        const cached = await getFromIDB("adhkar-categories", "all");
        if (cached) {
          setAdhkar(cached);
        }
      } finally{
        setLoading(false)
      }
    };

    fetchData();
  }, []);


 if (!loading && (!adhkar || adhkar.length === 0)) {
    return (
      <section className="py-16">
        <CustomContainer>
          <CustomTitle
            success={false}
            title=" الأذكار "
            description="لمسة صباحية تملأ قلبك بالسكينة"
          />
          <div className="flex flex-col items-center justify-center py-20 text-center text-gray-500 dark:text-gray-400">
            <BsEmojiFrown size={60} className="mb-4 text-amber-500" />
            <h3 className="text-xl font-bold mb-2">لا توجد أذكار حالياً</h3>
          </div>
        </CustomContainer>
      </section>
    );
  }
  return (
    <section className="py-16">
      <CustomContainer>
        <CustomTitle
          success={false}
          title=" الأذكار "
          description="لمسة صباحية تملأ قلبك بالسكينة"
        />
        <Azkar 
        list={adhkar||[]} 
        loading={loading}
        />
      </CustomContainer>
    </section>
  );
};

export default AdhkarPage;
