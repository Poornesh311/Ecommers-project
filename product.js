let row = document.querySelector(".details");
console.log(row);

let dataPro = [];

async function fetchData() {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();
  console.log(data);
  createcards(data);
  data.map((ele) => {
    dataPro.push(ele);
  });
}
fetchData();