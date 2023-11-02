import React, { useState } from 'react';
import MainLayout from '../../components/MainLayout';
import BreadCrumbs from '../../components/BreadCrumbs';
import { images, stables } from "../../constants"
import {Link, redirect, useNavigate, useNavigation, useParams} from 'react-router-dom';
import { generateHTML } from '@tiptap/html';
import SuggestedPost from './container/SuggestedPost';
import CommentsContainer from '../../components/comments/CommentsContainer';
import SocialShareButtons from '../../components/SocialShareButtons';
import {useMutation, useQuery} from '@tanstack/react-query';
import { getAllPost, getSinglePost, deletePost } from '../../services/index/posts';
//body
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Italic from '@tiptap/extension-italic'
import Bold from '@tiptap/extension-bold'
//parse html
import parse from 'html-react-parser';
import { useSelector } from 'react-redux';
import {deleteComment} from "../../services/index/comments";
import toast from "react-hot-toast";

const tagsData = [
    "IT",
    "Machine Learning",
    "C#",
    "Java",
    "MySql",
];

const PostsDetailsPage = () => {
    //get slug, slug must be name as the app.js 
    const { slug } = useParams();
    //for comment user id 
    const userState = useSelector((state => state.user));
    const [breadCrumbsData, setbreadCrumbsData] = useState([]);
    //create state 
    const [body, setBody] = useState(null);
    const { data, isLoading, isError } = useQuery({
        queryFn: () => getSinglePost({ slug }),
        queryKey: ['post', slug],
        onSuccess: (data) => {
            setbreadCrumbsData([
                { name: "Home", link: '/' },
                { name: "Post", link: '/post' },
                { name: "Post Title", link: `/post/${data.slug}` },
            ]);
            setBody(
                parse(generateHTML(data?.body, [
                    Document,
                    Paragraph,
                    Text,
                    Bold,
                    Italic,
                ]))
            );
        },
    });

    const navigate = useNavigate();

    const {mutate: mutateDeletePost} = useMutation({
        mutationFn: ({token, desc, slug}) => {
            return deletePost({slug, token});
        },
        onSuccess: () => {
            toast.success(
                "Your post is deleted successfully"
            );
            navigate("/posts");
        },
        onError: (error) => {
            toast.error(error.message);
            console.log(error);
        },
    });

    const deletePostHandler = () =>{
        mutateDeletePost({token: userState.userInfo.token, slug: data.slug});
    };

    const { data: postsData } = useQuery({
        queryFn: () => getAllPost(),
        queryKey: ['posts'],
    });

    if (userState.userInfo!==null) {

        return (
            <MainLayout>
                <section
                    className="container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start">
                    <article className="flex-1">
                        <BreadCrumbs data={breadCrumbsData}/>
                        <img className="rounded-xl w-full"
                             src={data?.photo ? stables.UPLOAD_FOLDER_BASE_URL | data?.photo : images.samplePostImg}
                             alt={data?.title}/>
                        <div className="mt-4 flex gap-3">
                            {data?.categories.map((category) => (
                                <Link to={`/post?category=${category.name}`}
                                      className="text-primary text-sm font-roboto inline-block md:text-base">
                                    {category.name}
                                </Link>
                            ))}
                        </div>

                        <h1 className="text-xl font-medium font-roboto mt-4 text-dark-hard md:text-[26px] break-all">
                            {data?.title}
                        </h1>
                        <div className="mt-4 prose prose-sm sm:prose-base break-all">
                            {body}
                        </div>
                        {
                            userState.userInfo._id === data?.user._id &&
                            <button onClick={deletePostHandler}
                                    className="px-6 py-2.5 rounded-lg bg-red-600 text-white font-semibold disabled:opacity-70 disabled:cursor-not-allowed">
                                Delete Post
                            </button>
                        }
                        <CommentsContainer
                            comments={data?.comments}
                            className="mt-10"
                            logginedUserId={userState?.userInfo?._id}
                            postSlug={slug}
                        />
                    </article>
                    <div>
                        <SuggestedPost header="Latest Posts"
                                       posts={postsData?.data}
                                       text={data?.text}
                                       className="mt-8 lg:mt-0 lg:max-w-xs"/>
                        <div className="mt-7">
                            <h2 className="font-roboto font-medium text-dark-hard mb-4 md:text-xl">
                                Share on:
                            </h2>
                            <SocialShareButtons url={encodeURI("https://www.google.com/")}
                                                title={encodeURIComponent("share share")}/>
                        </div>
                    </div>

                </section>
            </MainLayout>
        );
    }
    else{
        toast.error("Login or register to view post details");
        navigate("/login")
    }
};

export default PostsDetailsPage