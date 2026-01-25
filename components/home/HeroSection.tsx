import HeroSliderClient from "./HeroSliderClient";



const HeroSection: React.FC = () => {

  return (
    <section className="lg:p-6 md:p-2 p-0 bg-background dark:bg-background transition-colors">
      <HeroSliderClient />
    </section>
  );
};

export default HeroSection;
