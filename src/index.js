

var shop =document.getElementById("shop");
var basket = JSON.parse(localStorage.getItem("data")) || [];
let createshop = ()=>{
    return shop.innerHTML = shopItemsData.map((n)=>{
        var {id,name,price,desc,img}= n;
        let search = basket.find((x)=>x.id == id) || [];
        return `
     <div id="product-id-${id}" class="item">
            <img  src="${img}" alt="">
            <div class="details">
                <h2>${name}</h2>
                <p>${desc}.</p>
                <div class="pricing">
                    <h2>$${price}</h2>
                  <div class="button">
                      <i onclick="decrement(${id})" class="bi bi-dash"></i>
                      <div id=${id} class="quantity">${search.items === undefined? 0:search.items}</div>
                      <i onclick="increment(${id})" class="bi bi-plus"></i>
                   </div>
                </div>
                
            </div>
        </div>`
    }).join("");
}
createshop();

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

    localStorage.setItem("data",JSON.stringify(basket))
    update(id);
}
var decrement =(id)=>{
    let search = basket.find((x)=> x.id === id);
    if(search === undefined){
            return
    }
    else{
        search.items -= 1;
    }
     update(id);
     basket = basket.filter((x)=>x.items !== 0);
     localStorage.setItem("data",JSON.stringify(basket))
}
var update =(id)=>{
    var search = basket.find((x)=> x.id === id);
    document.getElementById(id).textContent = search.items ;
    calculate();
}
var calculate = ()=>{
      var totalval =basket.map((x)=> x.items).reduce((x,y)=> x+y,0);
    document.getElementById('cartamount').innerHTML = totalval;
}
calculate()
