import React from 'react'
import { images, stables } from "../constants"
import { BsCheckLg } from "react-icons/bs"
import { Link } from 'react-router-dom';

const PostCard = ({ post, className }) => {
  return (
    <div className={`rounded-xl overflow-hidden shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] ${className}`}>
      <Link to={`/post/${post.slug}`}>
        <img
          src={post.photo ? stables.UPLOAD_FOLDER_BASE_URL + post.photo : images.samplePostImg}
          alt="Robot post 1"
          className="w-full object-cover object-center h-auto md:h-52 lg:h-48 xl:h-60"
        />
      </Link>
      <div className="p-5">
        <Link to={`/post/${post.slug}`}>

          <h2 className="font-roboto font-bold text-xl text-dark-soft md:text-2xl lg:text-[28px]">
            {post.title}
          </h2>
          <p className="text-dark-light mt-3 text-sm md:text-lg">
            {post.caption}
          </p>
        </Link>
        <div className="flex justify-between flex-nowrap items-center mt-6">
          <div className="flex items-center gap-x-2 md:gap-x-2.5">
            <img src={post.user.avater ? stables.UPLOAD_FOLDER_BASE_URL + post.user.avater : images.sampleUserImg} alt="User Icon 1" className="w-9 h-9 md:h-10 md:w-10 rounded-full" />
            <div className="flex flex-col">
              <h4 className="font-bold italic text-dark-soft text-sm md:text-base">
                {post.user.name}
              </h4>
              <div className="flex items-center gap-x-2">
                <span className="bg-[#36B37E] w-fit bg-opacity-20 p-1.5 rounded-full">
                  <BsCheckLg className="w-1.5 h-1.5 text-[#36B37E]" />
                </span>
                <span className="italic text-dark-light text-xs md:text-sm">
                  Verified
                </span>
              </div>
            </div>
          </div>
          <span className="font-roboto text-dark-light italic text-sm md:text-base">{new Date(post.createdAt).getDate()} {new Date(post.createdAt).toLocaleString("default", { month: "long", })}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard