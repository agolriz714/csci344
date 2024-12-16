// your code here:

document.getElementById("search").addEventListener("click",buttonClick);
const click = document.getElementById("open").addEventListener("change",open);

async function getBusinesses(location,name,openNow) {
   
   const limit = 10;
   const yelpApi =`https://www.apitutor.org/yelp/simple/v3/businesses/search?location=${location}&term=${name}&limit=${limit}&open_now=${openNow}`;
   const response = await fetch(yelpApi);
   
   
   const result = await response.json();
   console.log(result)
   addItIn(result);
       
   }

   function locField(){//Should take the text given by the user in the locarion box
       const textInfo = document.getElementById("location").value;
       console.log(textInfo);
    return textInfo;
   }

   function nameField(){
        const textInfo = document.getElementById("term").value;
        console.log(textInfo);


    return textInfo;
   }
   function open(){
            const checker = document.getElementById("open");
        if(checker.checked){
            return true;
        }
        return false;
   }

   function buttonClick(){//this funtion handles when the search button is clicked and takes
    //the two params to access the yelp api to return results
    const location = locField();
    const name = nameField();

    getBusinesses(location,name,open());
    return"This should not be seen...";

   }

  

    function addItIn(yelpObj){
    
    let info ='';
    yelpObj.forEach(obj => {
        function checkPrice() {
            if(obj.price){
                return obj.price;
            }
            return "";
        }
        info +=`
            <div id ="yum"class="p-4 bg-black-100 grid-cols-3 grid-rows-4">
                <h1 class = "text-sm">${obj.name}</h1>
                <img src="${obj.image_url}" alt="Restaurant picture">
                <section>
                    <p>${obj.display_address}</p>
                    <p>${obj.rating}</p>
                    <p>${checkPrice()}</p>
                    <p>${obj.review_count}</p>
                </section>
            </div>
            
        `;
    });
    document.getElementById("results").innerHTML = info;
    
}



