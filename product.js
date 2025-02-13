 let allproducts = document.querySelector(".allproducts")

 let row = document.querySelector(".allDetailsProductPage"); 
console.log(row);

let dataPro = [];
let id =localStorage.getItem("id")
async function fetchData() {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();
  console.log(data);
 
  if(id=="details"){
    createcards(data);
  }
  else{
    detailspage(data)
  }
  data.map((ele) => {
    dataPro.push(ele);
  });
}
fetchData();

function createcards(source) {
  var image = "";
  source.forEach((currObj) => {
    let x = `
     <div style="border:1px solid grey; width:450px; height: 560px;text-align: center;">
  <img style="width: 300px; height: 350px;" src="${currObj.image}" alt="img1">
  <h4 style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
      ${currObj.title}
  </h4>
  <p style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
      ${currObj.description}
  </p><hr>
  <p style="text-align: center;">$${currObj.price}</p><hr>

  <button style="background-color: black;color: whitesmoke ;padding: 10px; border-radius: 3px;text-align: center;"data-id="${currObj.id}">Details</button>
  <button style="background-color: black;color: whitesmoke;padding: 10px; border-radius: 3px;text-align: center;">Add to Cart</button>


</div>
     `
     image += x;
    });

    row.innerHTML = image;
    let detailsBtn = document.querySelectorAll(".allDetailsProductPage");

    detailsBtn.forEach((deBtn) => {
      deBtn.addEventListener("click", (e) => {
        let id = e.target.dataset.id;
        localStorage.setItem("id", id);
        window.location.href = "./product.html";
      });
    });
}
 
function detailspage(source){
  let selectedProduct = source.find(product => product.id == id)
 
  let y = `
  <div class="container"style="display: flex">
        <div style="width:50%;">
            <img style="width: 450px;height: 380px;"
            src="${selectedProduct.image}" alt="img4">
        </div>

        <div style="width: 50%;">
          <h5 style="color: grey;">${selectedProduct.title}</h5>
          <h4 class="display-5">Mens Cotton Jacket</h4>
          <p style="color: grey;">4.5<i class="fa-solid fa-star"></i></p>
          <p class="display-5">$${selectedProduct.price}</p>
          <p style="color: gray; font-size: large;">${selectedProduct.description}</p>
 
          <button type="button" class="btn btn-outline-dark">Add to Cart</button>
           <button type="button" class="btn btn-dark">Go to Cart</button>
        </div>
        
    </div>`

  
    row.innerHTML = y
}



let allbtn = document.getElementById("all");
console.log(allbtn);


allbtn.addEventListener("click", () => {
  createcards(dataPro);
});
let men = document.getElementById("men");

men.addEventListener("click", () => {
  let men = dataPro.filter(ele => ele.category == "men's clothing");
  createcards(men);
});
let women = document.getElementById("women");

women.addEventListener("click", () => {
  let women = dataPro.filter(ele => ele.category == "women's clothing");
  createcards(women);
});
let jewelery = document.getElementById("Jewelery");

jewelery.addEventListener("click", () => {
  let jewelery = dataPro.filter(ele => ele.category == "jewelery");
  createcards(jewelery);
});
let Electronics = document.getElementById("Electronics");

Electronics.addEventListener("click", () => {
  let Electronics = dataPro.filter(ele => ele.category == "electronics");
  createcards(Electronics);
});

