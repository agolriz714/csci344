import React, { useState, useEffect } from "react";
import { getDataFromServer } from "../server-requests";

export default function Stories({ token }) {
    const [stories, setStories] = useState([]);

    async function getStories() {   
    
        const data = await getDataFromServer(token, "/api/stories/");
        console.log(data);
        setStories(data);
    }
    useEffect(() =>{
        getStories();
    },[]);
    function head(){
        <header className="flex gap-6 bg-white border p-2 overflow-hidden mb-6">
            </header>
    }
    function Story({ storyData }) {
        return (
          <div className="flex flex-col items-center">
            <img
              src={storyData.user.image_url}
              alt="Story Image"
              className=" aspect-square rounded-full border-2 border-gray-300 "
            />
            <p className="text-xs text-gray-500">{storyData.user.username}</p>
          </div>
        );
      }
    function outputStories(storyObj){
        return<Story key={storyObj.id} storyData={storyObj}/>;
    }
    
    return (
        <header className="flex gap-6 bg-white border p-2 overflow-hidden mb-6">
                <div className="flex gap-4">
                    
                    {stories.map(outputStories)}
                </div>
               </header>
            
    )
}
