import React, { useState } from "react";
import MainLayout from "../../components/MainLayout";
import ListPosts from "./container/ListPosts";
import { FiSearch } from 'react-icons/fi';
import { useParams } from "react-router-dom";

const PostsPage = () => {
    const { searchTerm: initialSearchTerm } = useParams();
    const [searchTerm, setSearchTerm] = useState(initialSearchTerm || "");

    return (
        <MainLayout>
            <section className="container mx-auto px-5 py-5">
                <div className="relative" >
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-[#959EAD]" />
                    <input
                        className="placeholder:font-bold font-semibold text-dark-soft placeholder:text-[#959EAD] rounded-lg pl-12 pr-3 py-3 w-full focus:outline-none shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] md:py-4"
                        type="text"
                        placeholder="Search post"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </section>
            <ListPosts searchTerm={searchTerm} numOfPost={9999}/>
        </MainLayout>
    );
};

export default PostsPage;