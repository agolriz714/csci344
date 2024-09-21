
const changeBg = (sel, color) => {
    // your code here...
    console.log('Change background to '+color+' ');
    document.querySelector(sel).style.backgroundColor = color;
};
const clearBgs =() =>{
    const divs = document.querySelectorAll('.my-section');
    console.log(divs);
    for(const div of divs){
        div.style.backgroundColor = 'transparent';
    }
};



