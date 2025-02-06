let row = document.querySelector(".card");
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
         "<div class="card" style="width: 18rem; display:flex; margin:7px;text-align: center;">
        <img src="${currObj.image}" class="card-img-top" alt="iamges is not getting">
        <div class="card-body">
          <h5 class="card-title" style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${currObj.title}</h5>
          <p class="card-text" style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${currObj.description}</p><hr>
          <p>${currObj.price} </p>
        </div><hr>
        <div class="card-body">
         <button type="button" class="btn btn-dark details "data-id="${currObj.id}">Details</button>
         <button type="button" class="btn btn-dark">Add to Cart</button>
        </div>
      </div>`;
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
}

let allbtn = document.getElementById("all");

allbtn.addEventListener("click", () => {
  createcards(data1);
});

  
  
