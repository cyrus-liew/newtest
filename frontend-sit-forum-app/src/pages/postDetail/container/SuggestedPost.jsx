import React from 'react'
import { Link } from 'react-router-dom';
import { stables, images } from '../../../constants';


const SuggestedPost = ({ className, header, posts = [], text }) => {
    return (
        <div
            className={`w-full shadow-[rgba(7,_65,_210,0.1)_0px_9px_30px] rounded-lg p-4 ${className}`}
        >
            <h2 className="font-roboto font-medium text-dark-hard md:text-xl">{header}</h2>
            <div className="grid gap-y-5 mt-5 md:grid-cols-2 md:gap-x-5 lg:grid-cols-1">
                {/* map through data lastest posts */}
                {posts.map((item) => (
                    <div
                        key={item._id}
                        className="flex space-x-3 flex-nowrap items-center"
                    >
                        <img
                            className="aspect-square object-cover rounded-lg w-1/5"
                            src={item?.image ? stables.UPLOAD_FOLDER_BASE_URL + item?.image : images.samplePostImg}
                            alt={item.title}

                        />
                        <div className="text-sm font-roboto text-dark-hard font-m break-all">
                            <h3 className="text-sm font-roboto text-dark-hard font-medium md:text-base lg:text-lg">
                                <Link to={`/post/${item.slug}`}>
                                    {item.title}
                                </Link></h3>
                            <span className="text-xs opacity-60">
                                {new Date(item.createdAt).toLocaleDateString("en-US", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                }
                                )}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <h2 className="font-roboto font-medium text-dark-hard mt-8 md:text-xl">Tags</h2>
            {text && text.length > 0 ? (
                <div className="flex flex-wrap gap-x-2 gap-y-2 mt-4">
                    {text.map((item, index) => (
                        <Link key={index} to="/" className="inline-block rounded-md px-3 py-1.5 bg-primary font-roboto text-xs text-white md:text-sm">
                            {item}
                        </Link>
                    ))}
                </div>
            ) : (
                <p>There are no tags for this post.</p>
            )}

        </div>
    );
};

export default SuggestedPost