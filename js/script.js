console.log("hello");

let retrieve=[];
let row;
let inc;
let dec;
let arr=[];
let cart;
let quantity=[];
let jsson=[]

let loader;
let image;
let counter,counter1;
let id1;
let container;
let percentage;
let percentageContainer;
$(function () {
    container=$('#preload');
    loader=$('#loader');
    image=$('#image');
    percentageContainer=$('#percentage');
    counter=20;
    counter1=50;
    percentage=0;
    id1=setInterval(frame,500);
});

function frame(){

    if (counter1==650){
        clearInterval(id1)
        console.log("clear");
        container.empty();
        start();
    }
    else{
        counter+=50;
        counter1+=30;
        percentage=((counter1/650).toFixed(2))*100;
        console.log(counter1);
        loader.css('width',counter+'px');
        image.css('width',counter1+'px');
        percentageContainer.text(percentage+"%");
    }


}

function start(){

    let a=$(`    <div class="page-header text-center">
                <br>
                <div>
                <a href="cart.html" class="btn pull-right btn-warning" id="Cart">Cart <i class="fa fa-shopping-cart"></i></a>
               <br>
               <h1>Shopping Cart</h1>
               <br>
               <br>
              <h5>Buy genuine products</h5>
             <br><br>
             </div>
             </div>

            <div class="row">

             </div>
        `);

    container.append(a)
    start1();
}

function start1(){

    row=$('.row');

    $.getJSON('package.json',function(Json){
        jsson=Json;
        console.log(jsson);
        setContents(jsson)

    });


}


function objc(id1,quantity){
    this.id1=id1;
    this.quantity=quantity;
}

// function Increment(ev){
//     let id=$(ev.target).parent().parent().parent().attr('id');
//     quantity[id-1]++;
//     console.log(quantity);
//     setContents(jsson)
// }
//
//
// function Decrement(ev){
//
//     let id=$(ev.target).parent().parent().parent().attr('id');
//     quantity[id-1]--
//     console.log(quantity);
//     setContents(jsson)
// }

function pushintoCart(ev) {
    let id = $(ev.target).parent().parent().attr('id');
    console.log(id);
    if (check(id)){

    }
    else{
        arr.push(new objc(id,quantity[id-1]));
        SaveLocal();
    }
}

function SaveLocal(){
    localStorage.setItem("item",JSON.stringify(arr));
}


function setContents(json){


    //let row=$('<div class="row">');

    for(i in json){
        quantity[i]=1;
        let col=$(`<div class="col">
            
            <div class="card" id="${json[i].id}">
                 <img class="card-img-top" src="http://via.placeholder.com/300x300?text=${json[i].Name}" alt="Card image cap">
                    <div class="card-block">
                        <h4 class="card-title">Price : Rs. ${json[i].price}</h4>
                         <p class="card-text">Quantity : ${quantity[i]}
                         <button class="btn inc">+</button>
                          <button class="btn dec">-</button></p>
                         
                          <button class="btn btn-primary cart">Add To Cart</button>
                       </div>
                    </div>
            
            </div>`);

        row.append(col);
    }


    // inc=$('.inc');
    // dec=$('.dec');
    cart=$('.cart');
    // inc.click(Increment)
    // dec.click(Decrement)
    cart.click(pushintoCart)
}

function check(id){
    retrieveDATA();
    for(i in retrieve){
        if(retrieve[i].id1==id){
           return true;
        }
        else{
            return false;
        }
    }

}

function retrieveDATA(){
    let a=localStorage.getItem("item")
    if (a){
        retrieve=JSON.parse(a)
    }
}