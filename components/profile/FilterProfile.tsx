"use client"

import { Post, Question } from "@/types/Types"



interface FilterProps {
    filter: Post[] | Question[];
    value: string;
    type: string
}



const FilterProfile: React.FC<FilterProps> = ({ filter, value, type }) => {
  return (
    <>
      {type && value === "post" ? (
        <>
          {(filter as Post[]).map((post) => (
            <div key={post.postID}>
              <h3>{post.postTitle}</h3>
              <p>{post.postContent}</p>
            </div>
          ))}
        </>
      ) : (
        <>
          {(filter as Question[]).map((q) => (
            <div key={q.questionID}>
              <p>{q.questionContent}</p>
            </div>
          ))}
        </>
      )}
    </>
  );
};export default FilterProfile;
