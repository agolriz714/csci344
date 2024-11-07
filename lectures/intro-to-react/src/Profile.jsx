import "./Profile.css";
 import React from "react";

 export default function Profile({name}) {
     return  <section className="profile"> Hello, {name}!</section>;
 }