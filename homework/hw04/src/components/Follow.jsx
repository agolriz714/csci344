import React, {useState} from "react";
import { postDataToServer, deleteDataFromServer } from "../server-requests";

export default function Follow({userId, token}){
    const [stateFollowStatus,setFollowStatus ] = useState(false);

    async function followUser() {
        const sendData = {
            "user_id" : userId,
        };
        const responseData = await postDataToServer(
            token,
            "/api/following/",
            sendData
        );
        console.log(responseData);
        
        setFollowStatus(true);

    }
    async function unFollowUser() {
        const sendData = {
            "user_id" : userId,
        };
        const responseData = await deleteDataFromServer(
            token,
            `/api/following/${userId}`,
            sendData
            
        );
        setFollowStatus(false);

    }
    if(stateFollowStatus){
        return(<button 
                aria-label="unFollow a user"
                aria-checked="true"
                role="toggle"
                onClick={unFollowUser}

            className="text-blue-700 border-solid border-2 border-gray-400  bg-white text-sm py-0">unfollow</button>

        )
    }else{
        return(
        <button 
            aria-label="Follow a user"
            aria-checked="true"
            role="toggle"
            onClick={followUser}
            className="text-blue-700 text-sm py-2">follow</button>

        )
    }
    

}