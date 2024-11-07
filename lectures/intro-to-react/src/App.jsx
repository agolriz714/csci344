import React from "react";
import Profile from  "./Profile.jsx";


 export default function App() {

     return (
         <>
             <header>
                 <h1>My First App</h1>
             </header>
             <main>
                 <p>Hello React!</p>
                 <p>Hello React!</p>
                 <Profile name="Anita" />
                <Profile name="Ben" />
                <Profile name="Adwaina" />
                <Profile name="Laciesha" />
             </main>
         </>
     );
 }