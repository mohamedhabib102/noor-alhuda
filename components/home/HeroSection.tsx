import HeroSliderClient from "./HeroSliderClient";
import db from "../../public/db.json";

interface HeroProps {
  id: number;
  type: string;
  title: string;
  link: string;
  image: string;
  description?: string;
}

const HeroSection: React.FC = () => {
 const slides: HeroProps[] =
  (db.heroSlides || []).map((slide) => ({
    id: Number(slide.id),      
    type: slide.type,
    title: slide.title,
    image: slide.image,
    link: slide.link || "",      
    description: slide.description, 
  }));


  return (
    <section className="lg:p-6 md:p-2 p-0 bg-gray-100 dark:bg-gray-900">
      <HeroSliderClient slides={slides}  />
    </section>
  );
};

export default HeroSection;
