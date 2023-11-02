import React from 'react';
import PostCard from "../../../components/PostCard";
import { FaArrowRight } from "react-icons/fa";
import { isError, useQuery } from '@tanstack/react-query';
import { getAllPost } from '../../../services/index/posts';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';



const Posts = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getAllPost(),
    queryKey: ['posts'],
    onError: (error) => {
      toast.error(error.message);
      console.log(error)
    }
  });

  const handlePosts = () => {
    navigate(`/posts`);
  };

  return (
    <section className="container mx-auto px-5 py-10">
      <div className="grid gap-x-5 gap-y-5 md:grid-cols-2 lg:grid-cols-3">
        {!isLoading && !isError && data?.data.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            className="w-full" />
        ))}
      </div>

      <div className="mt-5">
        <button onClick={handlePosts} className="mx-auto flex items-center gap-x-2 font-bold text-primary border-2 border-primary px-6 py-3 rounded-lg">
          <span>More articles</span>
          <FaArrowRight className="w-3 h-3" />
        </button>
      </div>


    </section>
  );
};

export default Posts;
