import React from "react";
import { getDataFromServer } from "../server-requests";


export default function Profile({ token,profileData }) {
    console.log(profileData);
    console.log("Data here");
    async function getProfile() {
       const [profile, setProfile] = useState([]);
        const data = await getDataFromServer(token, "/api/profile")
    
        console.log(data);
    
        setProfile(data);
        
    }
    return (
        <header className="flex gap-4 items-center">
            <img src="https://picsum.photos/60/60?q=11" className="rounded-full w-16" />
            <h2 className="font-Comfortaa font-bold text-2xl">profileData.user.usernae</h2>
        </header>
    );
}
useEffect(() => {
    getProfile();
}, []);
console.log(profile);

function outputProfile(profileObj){
   // return<Profile token={token} key={postObj.id} postData={postObj}/>;
}
// return (
// <div>
//     {
//         profile.map(outputProfile)
//     }
// </div>
// )

