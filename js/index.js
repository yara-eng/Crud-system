var productName = document.getElementById("productName");
var productCategory = document.getElementById("productCategory");
var productPrice = document.getElementById("productPrice");
var Description = document.getElementById("Description");
var textValid =document.getElementById("textValid");
var textMust = document.getElementById("textMust");
var productList=[];

if(localStorage.getItem('list') !== null){
productList= JSON.parse(localStorage.getItem('list'))
display()
}

function addProduct(){
    if(productName.value !="" && productPrice.value !="" && productCategory.value !=""&& Description.value !="")
    {
        if(validationName()===true){
            creatProduct();
        }else{
            textValid.classList.replace('d-none','d-block');
            alert("The product name must begin with a capital letter and must not be less than three letters");
        }
    }else{
        textMust.classList.replace('d-none','d-block');
        alert("you must writ product");
    }
}

function creatProduct(){
    var product={
        pName:productName.value,
        pCategory:productCategory.value,
        pPrice : productPrice.value,
        desc : Description.value
    }
    productList.push(product);
    localStorage.setItem('list',JSON.stringify(productList))
    console.log(productList);
    clearForm();
    display();
    textValid.classList.replace('d-block','d-none');
    textMust.classList.replace('d-block','d-none');
}
function clearForm(){
    productName.value="";
    productCategory.value="";
    productPrice.value="";
    Description.value="";
}
function display(){
    var trs="";
    for(var i=0 ; i< productList.length ; i++){
        trs+=`
        <tr >
        <td>${i+1}</td>
        <td>${productList[i].pName}</td>
        <td>${productList[i].pCategory}</td>
        <td>${productList[i].pPrice}</td>
        <td>${productList[i].desc}</td>
        <td > <button class="btn update"> <i class="fa-regular fa-pen-to-square"></i> </button> </td>
        <td><button class="btn delete" onclick="deleteForm(${i})"> <i class="fa-solid fa-trash-can"></i> </button></td>
      </tr>
        `
    }
    document.getElementById("tableBody").innerHTML=trs;
}

function deleteForm(index){
console.log(index);
productList.splice(index,1);
localStorage.setItem('list',JSON.stringify(productList))
display();
}

var searchInput = document.getElementById("search");
function search(){
    var trs='';
    for(var i=0 ; i<productList.length ; i++){
        if(productList[i].pName.includes(searchInput.value)){
            trs+=`
            <tr >
            <td>${i+1}</td>
            <td>${productList[i].pName}</td>
            <td>${productList[i].pCategory}</td>
            <td>${productList[i].pPrice}</td>
            <td>${productList[i].desc}</td>
            <td > <button class="btn update"> <i class="fa-regular fa-pen-to-square"></i> </button> </td>
            <td><button class="btn delete" onclick="deleteForm(${i})"> <i class="fa-solid fa-trash-can"></i> </button></td>
          </tr>
            `
        }
    }
        document.getElementById("tableBody").innerHTML=trs;
    
};

function validationName(){
    nameValue=productName.value;
    nameRegex=/^[A-Z][a-z]{3,10}$/
    if(nameRegex.test(nameValue)===true){
        return true;
    }else{
        return false;
    }
};