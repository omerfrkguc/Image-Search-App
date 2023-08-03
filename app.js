const formWrapper = document.querySelector(".form-wrapper");
const form = document.querySelector("#form");
const searchInput = document.querySelector("#searchInput");
const buttonWrapper = document.querySelector(".button-wrapper");
const searchButton = document.querySelector("#searchButton");
const clearButton = document.querySelector("#clearButton");
const imagelistWrapper = document.querySelector(".imagelist-wrapper");


runEventListeners();

function runEventListeners(){
    form.addEventListener("submit" , search);
    clearButton.addEventListener("click", clear );
};

function clear(e){
   searchInput.value="";
   Array.from(imagelistWrapper.children).forEach((child)=>child.remove())

}

function search(e){

    
    const value = searchInput.value.trim();

    fetch(`https://api.unsplash.com/search/photos?query=${value}`,{
        method : "GET",
        headers : {
            Authorization : "Client-ID q3Sr7YaJzfPuYmKrBB3hsY1Jd7mVdeZyjwvxRMsUhMw"
        }

    })
    .then((res)=> res.json())
    .then((data)=>{

        Array.from(data.results).forEach((image)=>{
            console.log(image.urls.small)
            addImageToUI(image.urls.small)
        })

    })
    .catch((err)=> console.log(err));


    clear();
    e.preventDefault();
};


function addImageToUI(url){
    console.log(imagelistWrapper);
    const div = document.createElement("div");
    div.className="card";

    const img = document.createElement("img");
    img.setAttribute("src",url);
    img.height="400";
    img.width="400";

    div.append(img);
    imagelistWrapper.append(div);
}

