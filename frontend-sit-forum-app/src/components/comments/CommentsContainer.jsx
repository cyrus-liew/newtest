import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CommentsForm from './CommentsForm';
import Comment from './Comment';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNewComment, deleteComment, updateComment } from '../../services/index/comments';
import toast from 'react-hot-toast';



const CommentsContainer = ({ className, logginedUserId, comments, postSlug }) => {
    const [commentsState, setCommentsState] = useState([]);
    const queryClient = useQueryClient()
    // const [comments, setComments] = useState([]);
    // const mainComments = comments.filter((comment) => comment.parent === null);
    const [affectedComment, setAffectedComment] = useState(null)
    const userState = useSelector(state => state.user);

    useEffect(() => {
        // Update state when comments prop changes
        setCommentsState(comments);
    }, [comments]);
    
    //mutate function for create new comment
    const {mutate: mutateNewComment, isLoading: isLoadingNewComment} = useMutation({
        mutationFn: ({token, desc, slug, parent, replyOnUser}) => {
            return createNewComment({token, desc, slug, parent, replyOnUser});
        },
        onSuccess: () => {
            toast.success(
              "Your comment is sent successfully, it will be visible after the confirmation of the Admin"
            );
            queryClient.invalidateQueries(["post", postSlug])
          },
          onError: (error) => {
            toast.error(error.message);
            console.log(error);
          },
    });

     //mutate function for update comment
     const {mutate: mutateUpdateComment} = useMutation({
        mutationFn: ({token, desc, commentId}) => {
            return updateComment({token, desc, commentId});
        },
        onSuccess: () => {
            toast.success(
              "Your comment is updated successfully"
            );

            queryClient.invalidateQueries(["post", postSlug]);
            
          },
          onError: (error) => {
            toast.error(error.message);
            console.log(error);
          },
    });

    //mutate function for delete comment
    const {mutate: mutateDeleteComment} = useMutation({
        mutationFn: ({token, desc, commentId}) => {
            return deleteComment({token, commentId});
        },
        onSuccess: () => {
            toast.success(
              "Your comment is deleted successfully"
            );

            queryClient.invalidateQueries(["post", postSlug]);
          },
          onError: (error) => {
            toast.error(error.message);
            console.log(error);
          },
    });

    const addCommmentHandler = (value, parent = null, replyOnUser = null) => {
        mutateNewComment({desc: value, parent, replyOnUser, token: userState.userInfo.token, slug: postSlug})
        setAffectedComment(null);

    };

    const updateCommentHandler = (value, commentId) => {
        mutateUpdateComment({
            token: userState.userInfo.token, desc: value, commentId
        })

        // setComments(updatedComments);
        setAffectedComment(null);
    };

    const deleteCommentHandler = (commentId) => {
        mutateDeleteComment({token: userState.userInfo.token, commentId});
    };

    // const getRepliesHandler = (commentId) => {
    //     return comments.filter((comment) => comment.parent === commentId).sort((a, b) => {
    //         return (
    //             new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    //         );
    //     });
    // }

    return (
        <div className={`${className}`}>
            <CommentsForm
                btnLabel="Send"
                formSubmitHandler={(value) => addCommmentHandler(value)} loading={isLoadingNewComment} />

            <div className="space-y-4 mt-8">
                {Array.isArray(comments) &&
                    comments.map((comment) => (
                        <Comment
                            key={comment._id}
                            comment={comment}
                            logginedUserId={logginedUserId}
                            affectedComment={affectedComment}
                            setAffectedComment={setAffectedComment}
                            addComment={addCommmentHandler}
                            updateComment={updateCommentHandler}
                            deleteComment={deleteCommentHandler}
                            replies={comment.replies}
                        />
                    ))}
            </div>

        </div>

    )
}

export default CommentsContainer