// 1. Create your businessToHTML function here:

function businessToHTML(businessObj){
    //want to return item with htmlm tailwind duh.
    function checkPrice() {
        if(businessObj.price){
            return businessObj.price;
        }
        return "";
    }

    return`<div> class="p-4 bg-black-100">
            <h1 class = text-6xl >
                ${businessObj.name}
            </h1>
            <img src="${businessObj.image_url}" alt="Resturant picture" >
            </section>
                <p> ${businessObj.display_address}</p>
                
                <p>  ${businessObj.rating}</p>
                <p>    ${checkPrice()} </p>
                
                <p>  ${businessObj.review_count} </p>
            </section>
        </div>
        `;
    
}







// 2. When you're done, uncomment the test code below and preview index.html in your browser:

const businessObjPriceDefined = {
    id: "d8Vg0DxRY-s2a8xnZ6ratw",
    name: "Chestnut",
    rating: 4.5,
    image_url:
        "https://s3-media3.fl.yelpcdn.com/bphoto/TprWlxsHLqjZfCRgDmqimA/o.jpg",
    display_address: "48 Biltmore Ave, Asheville, NC 28801",
    coordinates: { latitude: 35.5931657, longitude: -82.550943 },
    price: "$$",
    review_count: 1257,
};

const businessObjPriceNotDefined = {
    id: "d8Vg0DxRY-s2a8xnZ6ratw",
    name: "Chestnut",
    rating: 4.5,
    image_url:
        "https://s3-media3.fl.yelpcdn.com/bphoto/TprWlxsHLqjZfCRgDmqimA/o.jpg",
    display_address: "48 Biltmore Ave, Asheville, NC 28801",
    coordinates: { latitude: 35.5931657, longitude: -82.550943 },
    review_count: 1257,
};


console.log("HTML representation of a business:", businessToHTML(businessObjPriceDefined));
console.log("HTML representation of a business (no price):", businessToHTML(businessObjPriceNotDefined));

