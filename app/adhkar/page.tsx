"use client";

import { useEffect, useState } from "react";
import CustomContainer from "@/ui/CustomContainer";
import CustomTitle from "@/ui/CustomTitle";
import Azkar from "@/components/adhkar/Azkar";
import { AdhkarItem } from "@/types/Types";



const AdhkarPage: React.FC = () => {
  const [adhkar, setAdhkar] = useState<AdhkarItem[]|null>([]);
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
        setLoading(true)
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/adhkar?type=category`);
        const data = await res.json();
        setAdhkar(data);
      } catch (err) {
        console.error(err);
      } finally{
        setLoading(false)
      }
    };

    fetchData();
  }, []);

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
