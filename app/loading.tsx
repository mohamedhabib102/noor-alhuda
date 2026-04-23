import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center dark:bg-[#000000] bg-[#fdfbf7]">
      <div className="flex items-center flex-col justify-center gap-4">
        <Image
          src="/logo-share.png"
          alt="logo"
          width={120}
          height={120}
          priority
          className="animate-pulse"
        />
        <h2 className="text-2xl font-bold text-main animate-pulse font-quran">
          جاري التحميل بكل سكينة....
        </h2>
      </div>
    </div>
  );
}
