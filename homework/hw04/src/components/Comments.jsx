import React, {useState,useEffect} from "react";
import { getDataFromServer } from "../server-requests";
import Comment from "./Comment";

export default function Comments({token, postId}){
        const [comments, setComments] = useState([])    
       
    
        async function getComments() {
          
            const data = await getDataFromServer(token, "/api/posts" );
            const post = data.find(post => post.id == postId);
          
            setComments(post.comments);
        }
        useEffect(() =>{
            
            getComments();
            
        },[]);

        function outputComments(commentObj){
            return<Comment token={token} key={commentObj.id} commentData={commentObj} postId={postId}/>
        }
        return(
            <div>
                {comments.length > 1 ?(
                    comments.slice(-2).map(outputComments)
                ) : (
                     comments.length === 1 &&  outputComments(comments[0])
                    
                )}           
            </div>
        )
}