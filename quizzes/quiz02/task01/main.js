// 1. Create your getBusinesses function here:



async function getBusinesses(location,name,limit) {
 /*
    this function should query from the yelp api to return a list of business objects
    3 params, name of buss, location and limit on how many
    ToDo:
    api regis

 */
if (limit == null){
    limit == 10;
}
const yelpApi =`https://www.apitutor.org/yelp/simple/v3/businesses/search?location=${location}&term=${name}&limit=${limit}`;
const response = await fetch(yelpApi);


const result = await response.json();
console.log(result)
    
}







// 2. When you're done, uncomment the test code below and preview index.html in your browser:


console.log(
    "Should display 3 pizza restaurants in Asheville:",
    getBusinesses("Asheville, NC", "pizza", 3)
);
console.log(
    "Should display 10 thai restaurants in San Francisco:",
    getBusinesses("San Francisco, CS", "thai", 10)
);

