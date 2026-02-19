

interface Title {
    title: string;
    description?: string;
    success: boolean;
}

const CustomTitle: React.FC<Title> = ({ title, description, success }) => {
    return (
        <div className="text-right mb-8 select-none">
            <h2 className="text-main dark:text-brand-gold mb-1 font-semibold text-lg">{title}</h2>
            <p className={`text-[21px] text-foreground/80 dark:text-gray-200 ${success ? "lg:w-[760px] ml-auto" : ""}`}>{description}</p>
        </div>
    )
};
export default CustomTitle;
