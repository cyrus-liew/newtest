import React, { useEffect, useState } from 'react'
import { deletePost, getAllPost } from '../../../../services/index/posts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { stables, images } from '../../../../constants';
import Pagination from '../../../../components/Pagination';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

let isFirstTime = true;

const ManagePost = () => {

  const [posts, setPosts] = useState([]);
  const [postsPerPage] = useState(10);

  
  const queryClient = useQueryClient();
  const userState = useSelector((state) => state.user);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: postsData,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryFn: () => getAllPost(searchKeyword, 0, 9999999999),
    queryKey: ["posts"],
  });

  const { mutate: mutateDelete, isLoading: isLoadingDelete } = useMutation({
    //delete takes in two para, slug and token 
    mutationFn: ({ slug, token }) => {
      return deletePost({
       slug,
       token
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["posts"]); // Refresh the "posts" query
      queryClient.invalidateQueries(["profile"]); // Refresh the "profile" query  
      toast.success("Post Is Deleted");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  useEffect(() => {
    if (isFirstTime) {
      isFirstTime = false;
      return;
    }

    refetch();
  }, [refetch, currentPage]);


  const searchKeywordHandler = (e) => {
    const { value } = e.target;
    setSearchKeyword(value);
  }

  const submitSearchKeywordHandler = (e) => {
    e.preventDefault();
    refetch();

  }

  //create delet post handler
  const deletePostHandler = ({slug, token}) => {
    mutateDelete({slug, token});

  }
  // Calculate the index of the last comment on the current page
  const indexOfLastPost = currentPage * postsPerPage;
  // Calculate the index of the first comment on the current page
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  console.log(indexOfLastPost);
  console.log(currentPage);
  console.log(postsPerPage);
  console.log(postsData?.data?.length);

  // Change page
  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= Math.ceil(postsData?.data?.length / postsPerPage)) {
        setCurrentPage(pageNumber);
    }
  };

  return (
    <div>
      <h1 className='text-2xl font-semibold'>Manage Posts</h1>
      <div className="w-full px-4 mx-auto">
        <div className="py-8">
          <div className="flex flex-row justify-between w-full mb-1 sm:mb-0">
            <h2 className="text-2xl leading-tight">
              Posts
            </h2>
            <div className="text-end">
              <form onSubmit={submitSearchKeywordHandler} className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0">
                <div className=" relative ">
                  <input type="text" id="&quot;form-subscribe-Filter" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Post title" onChange={searchKeywordHandler} value={searchKeyword} />
                </div>
                <button className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200" type="submit">
                  Filter
                </button>
              </form>
            </div>
          </div>
          <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
            <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                      Title
                    </th>
                    <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                      Categories
                    </th>
                    <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                      Created at
                    </th>
                    <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                      Tags
                    </th>
                    <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading || isFetching ? (
                    <tr>
                      <td colSpan={5} className="text-center py-10 w-full">
                        Loading......
                      </td>
                    </tr>
                  ) : postsData?.data?.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-10 w-full">
                        No Post 
                      </td>
                    </tr>
                  ) : (

                    postsData?.data?.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage).map((post) => (
                      <tr>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 break-all">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <a href="/" className="relative block">
                                <img alt="post.title" src={post?.image ? stables.UPLOAD_FOLDER_BASE_URL + post?.image : images.samplePostImg} className="mx-auto object-cover rounded-lg aspect-square w-10 " />
                              </a>
                            </div>
                            <div className="ml-3">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {post.title}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {post.categories.length > 0 ? post.categories[0] : "Uncategoried"}
                          </p>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {new Date(post.createdAt).toLocaleDateString("en-us",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric"
                              })}
                          </p>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <div className="flex gap-x-2">
                            {post.text.length > 0 ? post.text.map((text, index) => (
                              <p>
                                {text}
                                {post.text.length - 1 !== index && ","}
                              </p>
                            )) : "No tags"}
                          </div>
                        </td>
                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 space-x-6">
                          <button disabled={isLoadingDelete} type='button' className='text-red-600 hover:text-red-900 disabled:opacity-80 disabled:cursor-not-allowed' onClick={() => {deletePostHandler({slug: post?.slug, token: userState.userInfo.token})}}> Delete </button>
                        
                        </td>
                      </tr>
                    ))
                  )}

                </tbody>
              </table>
             {/* {!isLoading && (
                <Pagination
                  onPageChange={(page) => setCurrentPage(page)}
                  currentPage={currentPage}
                  totalPageCount={JSON.parse(
                    postsData?.headers?.["x-totalpagecount"]
                  )}
                />
              )} */}
              {/* {!isLoading && (
                <Pagination
                  onPageChange={(page) => setCurrentPage(page)}
                  currentPage={currentPage}
                  siblingCount={1} // Provide an appropriate value for siblingCount
                  totalPageCount={
                    parseInt(postsData?.headers?.["x-totalpagecount"]) || 1
                  } // Parse the header value to ensure it's a valid number
                />
              )} */}
            </div>
          </div>
          <div class="flex flex-col items-center px-5 py-5 bg-white xs:flex-row xs:justify-between" style={{ height: 'auto' }}>
                <div class="flex items-center">
                    <button
                        type="button"
                        onClick={() => paginate(currentPage - 1)}
                        class="w-full p-4 text-base text-gray-600 bg-white border rounded-l-xl hover:bg-gray-100"
                        disabled={currentPage === 1}
                    >
                        {"<"}
                    </button>
                    <button type="button" class="w-full p-4 text-base text-indigo-500 bg-white border-t border-b ">
                        {currentPage}
                    </button>
                    <button
                        type="button"
                        onClick={() => paginate(currentPage + 1)}
                        class="w-full p-4 text-base text-gray-600 bg-white border-t border-b border-r rounded-r-xl hover:bg-gray-100"
                        disabled={indexOfLastPost >= postsData?.data?.length}
                    >
                        {">"}
                    </button>
                </div>
            </div>
        </div>
      </div>

    </div>
  )
}

export default ManagePost;