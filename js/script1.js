/**
 * Created by anmol on 30/6/17.
 */

let table;
let inc,dec;
let tbody;
let arr=[];
let newArr=[];
$(function () {


    table=$('.table');
    setHeader();
    retrieveLocal();
    getData();

});

function objc(Productname,Productprice,quantity){
    this.Productname=Productname;
    this.Productprice=Productprice;
    this.quantity=quantity;
}

function setHeader(){
    let head=$(`<thead>
        <tr>
          <th>SNo.</th>
          <th>ProductName</th>
         <th>Price</th>
         <th>Quantity</th>
         <th>Amount</th>
        </tr>
        </thead>`);
    table.append(head);
}

function retrieveLocal(){

    let jsonString=localStorage.getItem("item");
    if(jsonString){
        arr=JSON.parse(jsonString)
        console.log(JSON.parse(jsonString))
    }

}

function getData(){

    $.getJSON('package.json',function(json){

          for (i in json){
              for(i1 in arr){
                  if (json[i].id==arr[i1].id1){
                     newArr.push(new objc(json[i].Name,json[i].price,arr[i1].quantity));
                     console.log(newArr)
                  }
              }
          }

        setBody();
    })

}


function setBody() {

    console.log("hello");
    for (i in newArr) {
         let body = $(`<tbody class="body">
            <tr scope="row">
            <th>${i}</th>
            <td>${newArr[i].Productname}</td>
            <td>${newArr[i].Productprice}</td>
            <td id="${i}"><button class="btn dec">-</button>${newArr[i].quantity}<button class="btn inc">+</button></td>
            <td>${+newArr[i].Productprice * newArr[i].quantity}</td>
            </tr>
            </tbody>`);
        table.append(body)
        console.log(body)
    }

    inc=$('.inc');
    dec=$('.dec');
    tbody=$('.body');
    inc.click(Increment)
    dec.click(Decrement)

}


function Decrement(eve){

    let id=$(eve.target).parent().attr('id')
    let num=$(eve.target).parent().text().replace("-","").replace("+","")
    newArr[id].quantity=+num-1;
    if (newArr[id].quantity==0){
        newArr.splice(id,1);
    }
    DecrementArr(id);
    saveToLocal()
    tbody.empty();
    setBody();
    console.log(newArr[id].quantity)

}

function Increment(eve){
    let id=$(eve.target).parent().attr('id')
    let num=$(eve.target).parent().text().replace("-","").replace("+","")
    newArr[id].quantity=+num+1;
    incrementArr(id);
    saveToLocal()
    tbody.empty();
    setBody();
    console.log(newArr[id].quantity)
}

function saveToLocal(){
    localStorage.setItem("item",JSON.stringify(arr))
}

function incrementArr(id){
    arr[id].quantity++;
}
function DecrementArr(id){
    arr[id].quantity--;
}