import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { readAllUncheckComment, updateCommentCheck, deleteComment } from '../../../../services/index/comments';

const Comment = () => {
    const [comments, setComments] = useState([]);
    const [commentStatus, setCommentStatus] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [commentsPerPage] = useState(10);
    const userState = useSelector(state => state.user);
    const token = userState.userInfo.token;

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const responses = await readAllUncheckComment({ token });
                setComments(responses);
            } catch (error) {
                console.error('Error fetching comments: ', error);
            }
        }
        fetchComments();
    }, [token]);

    // Calculate the index of the last comment on the current page
    const indexOfLastComment = currentPage * commentsPerPage;
    // Calculate the index of the first comment on the current page
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    // Get the comments to display on the current page
    const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

    // Handle the approval of a comment
    const handleApprove = async (commentId) => {
        try {
            await updateCommentCheck({ token, check: true, commentId });
            setCommentStatus({ ...commentStatus, [commentId]: 'approved' });
        } catch (error) {
            console.error('Error approving comment: ', error);
        }
    };

    // Handle the rejection of a comment
    const handleReject = async (commentId) => {
        try {
            await deleteComment({ token, commentId });
            setCommentStatus({ ...commentStatus, [commentId]: 'rejected' });
        } catch (error) {
            console.error('Error rejecting comment: ', error);
        }
    };

    // Change page
    const paginate = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= Math.ceil(comments.length / commentsPerPage)) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div>
            <h1 className='text-2xl font-semibold'>Comments</h1>
            <div class="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
                <div class="py-8" style={{ maxHeight: '75vh', overflowY: 'auto' }}>
                    <div class="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
                        <div class="inline-block w-full overflow-hidden rounded-lg shadow" >
                            <table class="min-w-full leading-normal">
                                <thead>
                                    <tr>
                                        <th scope="col" class="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                            Post Title
                                        </th>
                                        <th scope="col" class="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                            Comment Content
                                        </th>
                                        <th scope="col" class="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                            Created Time
                                        </th>
                                        <th scope="col" class="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                            Actions
                                        </th>
                                        <th scope="col" class="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {comments.slice((currentPage - 1) * commentsPerPage, currentPage * commentsPerPage).map((comment) => (
                                        <tr key={comment.id}>
                                            <td className="px-5 py-2 text-sm bg-white border-b border-gray-200" style={{ maxWidth: '200px' }}>
                                                <p className="text-gray-900 whitespace-no-wrap break-all">
                                                    {comment.post.title}
                                                </p>
                                            </td>
                                            <td className="px-5 py-2 text-sm bg-white border-b border-gray-200" style={{ maxWidth: '200px' }}>
                                                <p className="text-gray-900 whitespace-no-wrap break-all">
                                                    {comment.desc}
                                                </p>
                                            </td>
                                            <td className="px-5 py-2 text-sm bg-white border-b border-gray-200">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    {formatDate(comment.createdAt)}
                                                </p>
                                            </td>
                                            <td className="px-5 py-2 text-sm bg-white border-b border-gray-200">
                                                {commentStatus[comment.id] === 'approved' ? (
                                                    <span>Comment Approved</span>
                                                ) : commentStatus[comment.id] === 'rejected' ? (
                                                    <span>Comment Deleted</span>
                                                ) : (
                                                    <div className="flex justify-between">
                                                        <button
                                                            type="button"
                                                            onClick={() => handleReject(comment.id)}
                                                            className="py-2 px-4 bg-red-500 text-white w-1/2 text-center text-base font-semibold shadow-md rounded-l-lg"
                                                        >
                                                            Reject
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleApprove(comment.id)}
                                                            className="py-2 px-4 bg-blue-500 text-white w-1/2 text-center text-base font-semibold shadow-md rounded-r-lg"
                                                        >
                                                            Approve
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            
                        </div>
                    </div>
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
                        disabled={indexOfLastComment >= comments.length}
                    >
                        {">"}
                    </button>
                </div>
            </div>
        </div>

    )
}
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { 
        day: '2-digit', 
        month: 'long', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit'
    };
    return date.toLocaleDateString(undefined, options).replace(",", "");
}
export default Comment