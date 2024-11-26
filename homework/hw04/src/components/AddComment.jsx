// import React, {useState} from "react";
// import { postDataToServer } from "../server-requests";
//Unfinished 

// export default function AddComment({token, postId}){
//     const [commentText, setCommentText] = useState("");

//     function commentChange(event){
//         setCommentText(event.target.value);
//     }

//     async function createComment() {
//         const sendData ={
//             "post_id":postId,
//             text: commentText,
//         };
//         const responseData = await postDataToServer(
//             token,
//             "/api/comments",
//             sendData
//         );
        
        
//         console.log(responseData)
//         const newComment={
//             id: responseData.commentId,
//             user: responseData.username,
//             test: commentText,
//         };
//         setComments(prevComments => [...prevComments, newComment]);
//         setCommentText("");
//     }
    
//     return(
//         <div>
//         <input
//             type="text"
//             value={commentText}
//             onChange={commentChange}
            
//         />
//         <button
//             aria-label="add comment"
//             role="button"
//             onClick={createComment}> 
//             <i className="far fa-comment"></i>
            

//         </button>
//         </div>
//     )

// }