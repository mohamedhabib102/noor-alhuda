import CustomContainer from "@/ui/CustomContainer";
import CustomTitle from "@/ui/CustomTitle";
import Bookmarks from "@/components/quran/Bookmarks";

const BookmarksPage: React.FC = () => {
  return (
    <section className="py-16 min-h-screen">
      <CustomContainer>
        <CustomTitle
          success={true}
          title="العلامات المحفوظة"
          description="صفحة للرجوع إلى الآيات التي قمت بتحديدها مسبقاً لمواصلة القراءة أو التدبر."
        />
        <Bookmarks />
      </CustomContainer>
    </section>
  );
};

export default BookmarksPage;
