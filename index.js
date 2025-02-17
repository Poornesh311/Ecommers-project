let row = document.querySelector(".maindiv");
console.log(row);

let data1 = [];

async function fetchData() {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();
  console.log(data);
  createcards(data);
  data.map((ele) => {
    data1.push(ele);
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

      <button style="background-color: black;color: whitesmoke ;padding: 10px; border-radius: 3px;text-align: center;"data-id="${currObj.id}" class="details">Details</button>
      <button style="background-color: black;color: whitesmoke;padding: 10px; border-radius: 3px;text-align: center;"data-id="${currObj.id}" class="addtocart">Add to Cart</button>
    </div>
     `
    image += x;
  });
  row.innerHTML = image;
  let detailsBtn = document.querySelectorAll(".details");

  detailsBtn.forEach((deBtn) => {
    deBtn.addEventListener("click", (e) => {
      let id = e.target.dataset.id;
      localStorage.setItem("id", id);
      window.location.href = "./product.html";
    });
  });

  let addtocartBtn = document.querySelectorAll(".addtocart");

  addtocartBtn.forEach((adBtn) => {
    adBtn.addEventListener("click", (e) => {
      let id = e.target.dataset.id;
      addToCart(id);  
      alert("Product added to cart!");  
    });
  });
}

function addToCart(productId) {
  let cartItems = getCartItems();
  let product = data1.find(item => item.id == productId);
  let existingItem = cartItems.find(item => item.id == productId);

  if (existingItem) {
    existingItem.quantity += 1;  
  } else {
    product.quantity = 1;
    cartItems.push(product);
  }

  saveCartItems(cartItems);
}

function saveCartItems(items) {
  localStorage.setItem("cartItems", JSON.stringify(items));
}

function getCartItems() {
  let cartItems = localStorage.getItem("cartItems");
  return cartItems ? JSON.parse(cartItems) : [];
}

let allbtn = document.getElementById("all");

allbtn.addEventListener("click", () => {
  createcards(data1);
});

let men = document.getElementById("men");

men.addEventListener("click", () => {
  let men = data1.filter((ele) => ele.category == "men's clothing");
  createcards(men);
});

let women = document.getElementById("women");

women.addEventListener("click", () => {
  let women = data1.filter((ele) => ele.category == "women's clothing");
  createcards(women);
});

let jewelery = document.getElementById("jewelery");

jewelery.addEventListener("click", () => {
  let jewelery = data1.filter((ele) => ele.category == "jewelery");
  createcards(jewelery);
});

let Electronics = document.getElementById("Electronics");

Electronics.addEventListener("click", () => {
  let Electronics = data1.filter((ele) => ele.category == "electronics");
  createcards(Electronics);
});

let productsEle = document.querySelector(".products");

productsEle.addEventListener("click", () => {
  localStorage.setItem("id", "details");
  console.log(localStorage.getItem("id"));
});

