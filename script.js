
const itemsColumn = document.querySelector('.items-column');
var totalAmt = 0;


function displayItems(curCategory) {
    itemsColumn.innerHTML="";
    fetch("./items.json")
    .then(response => response.json())
    .then(json => {
    // console.log(json);

    for(let i=0;i<json.length;i++){
        if(json[i]['type'] == curCategory){
            console.log(json[i]);
        //item div created
        const item = document.createElement('div');
        item.className="item";

        //item info
        const itemInfo = document.createElement('div');
        itemInfo.className = "item-info";

        const itemName = document.createElement('h2');
        itemName.innerText = json[i]['name'];

        const itemPrice = document.createElement('p');
        itemPrice.innerText = "₹" + json[i]['priceperkg'].toString() + "/kg";

        itemInfo.append(itemName,itemPrice);

        //quantity controls

        const qtyControls = document.createElement('div');
        qtyControls.className = "qty-controls";

        const reduceQtyButton = document.createElement('button');
        reduceQtyButton.className = "reduceqty-btn";
        reduceQtyButton.innerHTML="-";

        const increaseQtyButton = document.createElement('button');
        increaseQtyButton.className = "increaseqty-btn";
        increaseQtyButton.innerHTML="+";

        const qty = document.createElement('input');
        qty.type="number";
        qty.className = "qty";
        qty.value=1;

        qtyControls.append(reduceQtyButton,qty,increaseQtyButton);

        //unit controls

        const kgButton = document.createElement('div');
        kgButton.className = "kg-unit-btn";
        kgButton.innerHTML="KG";

        const gButton = document.createElement('div');
        gButton.className = "g-unit-btn";
        gButton.innerHTML="G";

        const addButton = document.createElement("button");
        addButton.className = "add-item-btn";
        addButton.innerHTML = "ADD";

        //functionality to increase and decrease qty 
        increaseQtyButton.addEventListener('click', () => {
            let curQty = qty.value;
            // console.log(curQty);
            curQty++;
            qty.value=curQty;
        });
        reduceQtyButton.addEventListener('click', () => {
            let curQty = qty.value;
            // console.log(curQty);
            curQty = (curQty==1) ? 1 : curQty-1;
            qty.value=curQty;
        });
        qty.addEventListener('input',() => {
            if(qty.value<1){
                qty.value=1;
                alert("Cannot be less than 1");
            }
        })

        //functionality to unit controls

        kgButton.classList.add("active");

        kgButton.addEventListener('click',() => {
            if(!kgButton.classList.contains('active')){
                gButton.classList.remove('active');
                kgButton.classList.add('active');
            }
        })
        gButton.addEventListener('click',() => {
            if(!gButton.classList.contains('active')){
                kgButton.classList.remove('active');
                gButton.classList.add('active');
            }
        })

        //functionality to add price button
        addButton.addEventListener('click',() => {
            if(kgButton.classList.contains("active"))
                totalAmt+=qty.value * json[i]['priceperkg'];
            else{
                totalAmt+=qty.value * json[i]['priceperkg']/1000;
            }
            const totalamtdiv = document.querySelector('.total-amount');
            totalamtdiv.innerHTML = "Total Amount: ₹" + totalAmt.toString();
                console.log(totalAmt);
        });
        //appending all to item div

        item.append(itemInfo,qtyControls,kgButton,gButton,addButton);

        itemsColumn.append(item);


        }
    }
    });   
}


displayItems('atta');

const categoryContainers = document.querySelectorAll('.category-container');

categoryContainers.forEach((categoryContainer) => {
    let category = categoryContainer.childNodes[1];
    console.log(category);
    category.addEventListener('click', () => {
        categoryContainers.forEach((x) => x.classList.remove('active'));
        categoryContainer.classList.add('active');
        displayItems(category.dataset.categoryname);
    });
})