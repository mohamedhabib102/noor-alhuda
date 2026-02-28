// app/community/[id]/page.tsx
import { Metadata } from "next";
import req from "@/lib/axios";
import PostDetails from "@/components/community/PostDetails";
import { Post } from "@/types/Types";

// Next.js 15 App Router: params comes as a Promise
type PageProps = {
  params: Promise<{ id: string }>;
};

// جلب البوست من API
async function getPost(id: string): Promise<Post | undefined> {
  const res = await req.get("/api/Alhoda_Alnabawya/GetAllPosts");
  return res.data.find((p: Post) => p.postID === Number(id));
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { id } = await params;
  const post = await getPost(id);
  if (!post) return {};

  const imageUrl = post.image_Post || "/images/default.png";

  return {
    title: post.postTitle,
    description: post.postContent.slice(0, 160),
    openGraph: {
      title: post.postTitle,
      description: post.postContent.slice(0, 160),
      siteName: "نور الهدى",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
        },
      ],
      type: "article",
    },
    twitter: {
    card: "summary",
    title: post.postTitle,
    description: post.postContent.slice(0, 160),
    images:  [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
      }
    ]
  }
  };
}

// Page component
export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    return <p>Post not found</p>;
  }

  return <PostDetails post={post} />;
}
