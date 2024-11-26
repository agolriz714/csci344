import React from "react";
import Follow from "./Follow";

export default function Suggestion({ suggestionData,token }) {
    console.log(suggestionData);
    function suggPart(){
        return(
        <section className="flex justify-between items-center mb-4 gap-2">
        <img src={suggestionData.thumb_url} alt="Suggested users profile pic" className="rounded-full" />
        <div className="w-[180px]">
            <p className="font-bold text-sm">{suggestionData.username}</p>
            <p className="text-gray-700 text-xs">suggested for you</p>
        </div>
        <Follow token={token} userId={suggestionData.id} />
        {/* <button className="text-blue-700 text-sm py-2">follow</button> */}
    </section>
    );
};
    return (
        suggPart()
    );
}
