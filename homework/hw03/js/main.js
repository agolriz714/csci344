import { getAccessToken } from "./utilities.js";
const rootURL = "https://photo-app-secured.herokuapp.com";
let token = null;
let username = "webdev";
let password = "password";

async function initializeScreen() {
    token = await getToken();
    showNav();
    getPosts();
    getUser();
    getSugg();
    getStories();
}

async function getToken() {
    return await getAccessToken(rootURL, username, password);
}

function showNav() {
    document.querySelector("#nav").innerHTML = `
    <nav class="flex justify-between py-5 px-9 bg-white border-b fixed w-full top-0">
            <h1 class="font-Comfortaa font-bold text-2xl">Photo App</h1>
            <ul class="flex gap-4 text-sm items-center justify-center">
                <li><span>${username}</span></li>
                <li><button class="text-blue-700 py-2">Sign out</button></li>
            </ul>
        </nav>
    `;
}

// implement remaining functionality below:
/**
 * Generate posts from data
 * 1. go out to internet and fetch all of our posts
 * 2. once posts come back, we want to loop through each post
 * and out and append each post to the correct place in html
 */
async function getPosts() {
    //get the HTTP response header
    const endpoint =
    "https://photo-app-secured.herokuapp.com/api/posts/?limit=10";
    const response = await fetch(endpoint,{
        method: "GET",
        headers:{
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    });
    //get HTTP body,(JSON )pbject
    const posts = await response.json();
    //print data to console
    console.log(posts);
    
    showPosts(posts);
}
function showPosts(posts){
    //get a reference to the HTML tag where we want to add the post
   const mainEl= document.querySelector("main");
   //loop through each post and append HTML rep of post to the DOM
    posts.forEach(post =>{
        const template =` <section class="bg-white border mb-10">
            <div class="p-4 flex justify-between">
                <h3 class="text-lg font-Comfortaa font-bold">${post.user.username}</h3>
                <button class="icon-button" aria-label ="More options"><i class="fas fa-ellipsis-h"></i></button>
            </div>
            <img src="${post.image_url}" alt="${post.alt_text}" width="300" height="300"
                class="w-full bg-cover">
            <div class="p-4">
            <!-- button panel -->
                <div class="flex justify-between text-2xl mb-3">
                    <div>
                        ${getLikeButton(post) } 
                        <button aria-label="Comment button"><i class="far fa-comment"  ></i></button>
                        <button aria-label="Send to other users"><i class="far fa-paper-plane" ></i></button>
                    </div>
                    <div>
                       ${getBookmarkButton(post)}
                    </div>
                </div>
                <!-- number of likes -->
                <p class="font-bold mb-3">${post.likes.length} likes</p>
                <!-- caption from creator of post -->
                <div class="text-sm mb-3">
                    <p>
                        <strong>${post.user.username}</strong>
                        ${post.caption} <!-- <button class="button" aria-label="More comments">more</button> -->
                    </p>
                </div>
                
                ${showComments(post.comments)} {
                
                
                }
                
                <!-- when posted -->
                <p class="uppercase text-gray-500 text-xs">${post.display_time}</p>
            </div>
            <div class="flex justify-between items-center p-3">
                <div class="flex items-center gap-3 min-w-[80%]">
                    <i class="far fa-smile text-lg" aria-label="Smile next to comment button"></i>
                    <input type="text" class="min-w-[80%] focus:outline-none" aria-label="Add comment here"placeholder="Add a comment...">
                </div>
                <button class="text-blue-700 py-2"aria-label="Post comment">Post</button>
            </div>
        </section>`;


    mainEl.insertAdjacentHTML("beforeend",template);
   });
}
//input: comments
//output: HTML sgring representing comments
function showComments(comments) {
    if(comments.length >1){
        const lastComment = comments[comments.length -1];
        return `
            <button aria-label="View all comments"> view all ${comments.length} comments </button>
            <p> ${lastComment.user.username}${lastComment.text}</p>
        `;
    }
    if(comments.length == 1){
        return `<p> ${comments[0].user.username}${comments[0].text}</p>`;
    }
     return '';
}
//get current user data for the area above suggested 

async function getUser() {
    const infoGrab = 
    "https://photo-app-secured.herokuapp.com/api/profile/";
    const response = await fetch(infoGrab,{
        method: "GET",
        headers:{
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    });
    const info = await response.json();
    console.log(info);
    
    showCurrUser(info);
 }
function showCurrUser(info){
    
    const asideEl = document.querySelector("aside");
    const headerEl = asideEl.querySelector("header");
    const headerStuff=` <header class="flex gap-4 items-center">
            <img src=${info.thumb_url} alt="Your profile pic"class="rounded-full w-16" />
            <h2 class="font-Comfortaa font-bold text-2xl">${info.username}</h2>
        </header>`;
        
        
    asideEl.insertAdjacentHTML("afterbegin",headerStuff);
    
}
//Begin suggested user info
async function getSugg() {
    const suggPoint = "https://photo-app-secured.herokuapp.com/api/suggestions/";
    const response = await fetch(suggPoint, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        }
    });
    const sugg = await response.json();
    console.log(sugg);
    showSuggData(sugg);
}
function showSuggData(users){

    const asideEl = document.querySelector("aside");
    const sectionEl = asideEl.querySelector("section");
    users.forEach(user =>{
    const suggStuff = `<section class="flex justify-between items-center mb-4 gap-2">
                <img src="${user.thumb_url}" alt="Sugg user pic" class="rounded-full" />
                <div class="w-[180px]">
                    <p class="font-bold text-sm">${user.username}</p>
                    <p class="text-gray-900 text-xs">suggested for you</p>
                </div>
                <button class="text-blue-700 text-sm py-2">follow</button>
            </section>`;
           
            asideEl.insertAdjacentHTML("beforeend",suggStuff);
    });
}


//End
//Below is code for the stories
async function getStories() {
    const storyPoint = "https://photo-app-secured.herokuapp.com/api/stories/";
    
    const response = await fetch(storyPoint, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    const store = await response.json();
    console.log(store);
    showStory(store.slice(0,5));
}
function showStory(stories){
const mainEl = document.querySelector("main");
const headEl = mainEl.querySelector("header");
const divEl = headEl.querySelector("div");

stories.forEach(story =>{
const storyTemplate = `
            <div class="flex flex-col justify-center items-center mr-6">
                <img src=${story.user.thumb_url} alt="Story thumbnail" class="rounded-full border-4 border-gray-300" />
                <p class="text-xs text-gray-500">${story.user.username}</p>
            </div>`
           
            headEl.insertAdjacentHTML("beforeend",storyTemplate)
});
 

}

//End

//ALL FUNCTIONS BELOW
//will be for like, unlike, bookmark, unbookmark
     function getLikeButton(post){
        let iconClass = "far"
        if(post.current_user_like_id){
            iconClass = "fa-solid text-red-700"
        }
          //  return  `<button> <i class="fa-solid text-red-700 fa-heart "></i> </button>`
        return  `<button aria-label="Like button"><i class="${iconClass} fa-heart" ></i></button>`
     }
     function getBookmarkButton(post){
        if(post.current_user_bookmark_id){
            return  `<button onclick="deleteBookmark(${post.current_user_bookmark_id})" aria-label="Bookmark"><i class="fa-solid fa-bookmark" ></i></button>`
        }else{
            return  `
            <button onclick="createBookmark(${post.id})" aria-label="Bookmark">
                <i class="far fa-bookmark"></i>
            </button>`
        }
       
     }

    window.createBookmark = async function (postID){
        const postData = {
            post_id : postID,
        };
        
        //await / async syntax:
       
            const response = await fetch("https://photo-app-secured.herokuapp.com/api/bookmarks/", {
                method: "POST",
                headers:{
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                },
                body: JSON.stringify(postData) //the data that's gettign sent to the server
            });
            const data = await response.json();
            console.log(data);
        }
        window.deleteBookmark = async function (bookmarkId){
           
                const response = await fetch(`https://photo-app-secured.herokuapp.com/api/bookmarks/${bookmarkId}`, {
                    method: "DELETE",
                    headers:{
                        'Content-Type' : 'application/json',
                        'Authorization' : `Bearer ${token}`
                    },
                });
                const data = await response.json();
                console.log(data);
            }
        

     
    
/* <p class="text-sm mb-3">
                    <strong>lizzie</strong>
                    Here is a comment text text text text text text text text.
                </p>
                <p class="text-sm mb-3">
                    <strong>vanek97</strong>
                    Here is another comment text text text.
                </p> */
   



// after all of the functions are defined, invoke initialize at the bottom:
initializeScreen();
