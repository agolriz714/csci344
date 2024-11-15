import React, { useState, useEffect } from "react";
import { getDataFromServer } from "../server-requests";
import Post from "./Post";
//job: 
//1. Fetches data from server
//2.It iterates through each element and draws a post componet

export default function Posts({ token }) {
    //State vars: everytime a state var gets set, it redraws the componet
    const [posts, setPosts] = useState([]);

    async function getPosts() {
        //fetches data from endpoint
        const data = await getDataFromServer(token, "/api/posts");
        //printing data to the screen
        console.log(data);
        //setting a state var
        console.log("setting a state var set to rederaw the screen after the posts are set");
        setPosts(data);//state var setters always redraw the screen
    }
    //the useEffect is a builtin function designed to handles side effects when a page first loads
    //
    useEffect(() => {
        getPosts();
    }, []);
    console.log(posts);

    function outputPost(postObj){
        return<Post token={token} key={postObj.id} postData={postObj}/>;
    }
    return (
    <div>
        {
            posts.map(outputPost)
        }
    </div>
    )
}

