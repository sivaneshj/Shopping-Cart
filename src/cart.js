var label = document.getElementById("label")
var maincart = document.getElementById("main-cart")


var basket = JSON.parse(localStorage.getItem("data")) || [];

var calculate = ()=>{
    var totalval =basket.map((x)=> x.items).reduce((x,y)=> x+y,0);
    document.getElementById('cartamount').innerHTML = totalval;
}
calculate()

let generatebox = ()=>{
    if(basket.length !==0){
        return maincart.innerHTML = basket.map((x)=>{
            var {id,items} = x;
            let search = shopItemsData.find((x)=> x.id == id)||[];
    
            return `
    
            <div class = "items">
                <img width="100" src="${search.img}"/>
                <div class="details">
                    <div class="details-1">
                        <h4>
                            <p>${search.name}</p>
                            <p class ="price">$${search.price}</p>
                        </h4>
                        <i onclick="remove(${id})" class="bi bi-x-lg"></i>
                    </div>
                    <div class="details-2">
                        <div class="button">
                          <i onclick="decrement(${id})" class="bi bi-dash"></i>
                          <div id=${id} class="quantity">${items}</div>
                          <i onclick="increment(${id})" class="bi bi-plus"></i>
                       </div>
                    </div>
                    <h3>$${search.price * items}</h3>
                </div>
            </div>`
            }).join("");
    }
    else{
        label.innerHTML = `
        <h2 >Cart is Empty</h2>
        <a href="./index.html">
        <button>Back to Home</button></a>`;
        maincart.innerHTML=``;
    }
}
generatebox()
var increment =(id)=>{
    let search = basket.find((x)=> x.id === id);
    if(search === undefined ){
        basket.push({
            id: id,
            items: 1,
        });
    }
    else{
        search.items +=1;
    }
    generatebox()
    update(id);
    localStorage.setItem("data",JSON.stringify(basket))
}
var decrement =(id)=>{
    let search = basket.find((x)=> x.id === id);
    if(search === undefined){
            return
    }
    else if(search.items === 0) return;
    else{
        search.items -= 1;
    }
     update(id);
     basket = basket.filter((x)=>x.items !== 0);
     generatebox()
     localStorage.setItem("data",JSON.stringify(basket))
}
var update =(id)=>{
    var search = basket.find((x)=> x.id === id);
    document.getElementById(id).textContent = search.items ;
    calculate();
    TotalAmount();
}
var remove = (id)=>{
    basket = basket.filter((x)=> x.id !== id)
    generatebox();
    calculate();
    TotalAmount()
    localStorage.setItem("data",JSON.stringify(basket))
}
var clearCart = ()=>{
    basket.length = 0 ;
    generatebox();
    calculate()
    localStorage.setItem("data",JSON.stringify(basket));
}
let TotalAmount = () => {
    if (basket.length !== 0) {
      let amount = basket.map((x) => {
          let { id, items } = x;
          let search = shopItemsData.find((y) => y.id == id) || [];
  
          return items * search.price;
        })
        .reduce((x, y) => x + y, 0);
      label.innerHTML = `
      <h2>Total Bill : $ ${amount}</h2>
      <button class="checkout">Checkout</button>
      <button onclick="clearCart()" class="removeAll">Clear Cart</button>
      `;

    } else return;
};
  TotalAmount();
