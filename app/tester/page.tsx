import CustomContainer from "@/ui/CustomContainer";
import CustomTitle from "@/ui/CustomTitle";
import req from "@/lib/axios";
import Image from "next/image";

interface Book {
    id: number;
    title: string;
    author: string;
    category: string;
    pages: number;
    size: string;
    fileLink: string;
    images: string;
    description: string;
}

import fs from "fs";
import path from "path";

const getBooks = async () => {
    try {
        const filePath = path.join(process.cwd(), "public", "books.json");
        const fileContent = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(fileContent) as Book[];
    } catch (error) {
        console.error("Error reading books.json:", error);
        return [];
    }
};

const TesterPage = async () => {
    const books = await getBooks();

    console.log(books)
    return (
        <section className="py-16">
            <CustomContainer>
                <CustomTitle
                    title="الكتب الإسلامية"
                    description="مكتبة شاملة تضم كتب الدين الإسلامي، السيرة النبوية الشريفة، التفسير، الفقه، والعقيدة وغيرها من الكتب الدينية النافعة"
                    success={true}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10" dir="rtl">
                    {books.map((book) => (
                        <div key={book.id} className="group relative p-4 bg-white dark:bg-zinc-900 rounded-3xl shadow-sm border border-zinc-100 dark:border-zinc-800 hover:shadow-xl transition-all duration-300 flex flex-col">
                            <div className="relative h-64 w-full mb-6 overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800">
                                <Image
                                    src={`/${book.images}`}
                                    alt={book.title}
                                    fill
                                    className="object-contain group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-3 right-3">
                                    <span className="px-3 py-1 bg-(--main-bg)/45 dark:bg-(--main-bg)/45 backdrop-blur-md dark:text-white text-black text-xs font-bold rounded-full shadow-sm">
                                        {book.category}
                                    </span>
                                </div>
                            </div>

                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-(--main-color) transition-colors">
                                        {book.title}
                                    </h3>
                                    <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">{book.fileLink}</span>
                                </div>
                                <p className="text-sm font-medium text-zinc-500 mb-3">{book.author}</p>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6 line-clamp-2">
                                    {book.description}
                                </p>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-zinc-50 dark:border-zinc-800">
                                <div className="flex gap-4">
                                    <div className="text-xs text-zinc-500">
                                        <span className="font-bold text-zinc-900 dark:text-zinc-100">{book.pages}</span> صفحة
                                    </div>
                                    <div className="text-xs text-zinc-500">
                                        <span className="font-bold text-zinc-900 dark:text-zinc-100">{book.size}</span>
                                    </div>
                                </div>
                                <button className="p-2 bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 rounded-full hover:scale-110 transition-transform">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2-2 0 0 1-2 2H5a2-2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </CustomContainer>
        </section>
    );
};

export default TesterPage;