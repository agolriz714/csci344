import React, {useState} from "react";
import { postDataToServer, deleteDataFromServer } from "../server-requests";
/*

Job:
    1.Renders the bookmark(whether or not current user has bookmarked or not)
    2.add and create or delete bookmarks

*/
export default function Bookmark({token, bookmarkId, postId}){
    const [stateBookmarkId, setStateBookmarkId] = useState(bookmarkId);

    async function createBookmark() {

        const sendData= {
            "post_id": postId,
        };
        //send HTTP request to create a bookmark
        const responseData = await postDataToServer(
            token,
            "/api/bookmarks/",
            sendData
        );
        console.log(responseData);
        setStateBookmarkId(responseData.id);
    }


    
    async function deleteBookmark() {
       
         const responseData = await deleteDataFromServer(
            token,
            '/api/bookmarks/' + stateBookmarkId
         );
         
         console.log(responseData);
         setStateBookmarkId(null);
    }
   
    if(stateBookmarkId){
        return( 
            <button 
            aria-label="Unbookmark this post" 
            aria-checked="true" 
            role="toggle" 
            onClick={deleteBookmark}>
                <i className="fas fa-bookmark"></i>
            </button>
            );
    }else{
        return( 
            <button 
            aria-label="Bookmark this post" 
            aria-checked="false" 
            role="toggle" 
            onClick={createBookmark}>
                <i className="far fa-bookmark"></i>
            </button>
            );
    }
}