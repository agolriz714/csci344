import React from "react";
import Bookmark from "./Bookmark";
import Like from "./Like";

export default function Post({postData,token}) {
console.log(postData);
//Job:
//1. Create tasteful representation of the post
//using data passed in from the parent
    return(
        <section className="bg-white border mb-10">
            {/* User header */}
            <div className="p-4 flex justify-between">
                <h3 className="text-lg font-Comfortaa font-bold">
                    {postData.user.username}
                </h3>
                <button className="icon-button"><i className="fas fa-ellipsis-h"></i></button>
            </div>
            {/* Image */}
            <img src={postData.image_url} 
            alt={postData.alt_text || "Post photo "} 
            width="300" 
            height="300"
            className="w-full bg-cover"></img>
             <div className="p-4">
                <div className="flex justify-between text-2xl mb-3">
                    <div className ="flex gap-2">
                        {/* Buttons */}

                        
                        <Like likeId={postData.current_user_like_id}/>
                        <button>
                            <i className="far fa-comment"></i>
                        </button>
                        <button>
                            <i className="far fa-paper-plane"></i>
                        </button>
                    </div>
                    <div>
                        
                        <Bookmark 
                        token={token} 
                        bookmarkId={postData.current_user_bookmark_id} 
                        postId={postData.id}/>
                    </div>
                </div>
                {/* Likes */}
                <p className="font-bold mb-3">{postData.likes.length} likes</p>
                 {/* User caption */}
                <div className="text-sm mb-3">
                    <p  className ="flex gap-2">
                        <strong>{postData.user.username}</strong>
                        {postData.caption} <button className="button">more</button>
                    </p>
                </div>
                {/* Comments */}
                <p className="text-sm mb-3 flex gap-2">

                    <strong>lizzie</strong>
                    Here is a comment text text text text text text text text.
                </p>
                <p className="flex gap-2 text-sm mb-3">
                    <strong>vanek97</strong>
                    Here is another comment text text text.
                </p>
                {/* Date from when posted */}
                <p className="uppercase text-gray-500 text-xs">
                    {postData.display_time}
                    </p>
            </div>
            
            

        </section>
    )
}