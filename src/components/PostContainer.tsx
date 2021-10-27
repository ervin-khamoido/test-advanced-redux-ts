/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useEffect, useState } from 'react';
import { IPost } from '../models/IPost';
import { postAPI } from '../services/PostService';
import PostItem from './PostItem';

const PostContainer: FC = () => {
   const [limit, setLimit] = useState(10);

   //refetch - reloading data
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const {data: posts, error, isLoading, refetch} = postAPI.useFetchAllPostsQuery(limit, {
      // reloading data after a specified time
      // pollingInterval: 1000
   });
   //after the colon - rename
   const [createPost, {error: createError, isLoading: isCreateLoading}] = postAPI.useCreatePostMutation();
   const [updatePost, {error: updateError, isLoading: isUpdateLoading}] = postAPI.useUpdatePostMutation();
   const [deletePost, {error: deleteError, isLoading: isDeleteLoading}] = postAPI.useDeletePostMutation();

   // useEffect(() => {
   //    setTimeout(() => {
   //       setLimit(3);
   //    }, 2000)
   // }, [])

   const handleCreate = async () => {
      const title = prompt();
      await createPost({title, body: title} as IPost);
   }

   const handleRemove = (post: IPost) => {
      deletePost(post);
   }

   const handleUpdate = (post: IPost) => {
      updatePost(post);
   }

   return (
      <div>
         <div className="post__list">
            {/* <button onClick={() => refetch()}>refetch</button> */}

            <button onClick={handleCreate}>Add new post</button>

            {isLoading && <h1>Loading - load data...</h1>}
            {error && <h1>Error - load data...</h1>}

            {isCreateLoading && <h1>Loading - createPost...</h1>}
            {createError && <h1>Error - createPost...</h1>}

            {posts && posts.map(post => 
               <PostItem remove={handleRemove} update={handleUpdate} key={post.id} post={post} />
            )}
         </div>
      </div>
   );
};

export default PostContainer;