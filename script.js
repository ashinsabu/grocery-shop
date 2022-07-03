
const itemsColumn = document.querySelector('.items-column');
const cartSection = document.querySelector('.cart');
var totalAmt = 0;


function displayItems(curCategory) {
    itemsColumn.innerHTML="";
    fetch("./items.json")
    .then(response => response.json())
    .then(json => {
    // console.log(json);

    for(let i=0;i<json.length;i++){
        if(json[i]['type'] == curCategory){
            // console.log(json[i]);
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
            // const totalamtdiv = document.querySelector('.total-amount');
            // totalamtdiv.innerHTML = "Total Amount: ₹" + totalAmt.toString();

            //cart item creation
            const cartItem = document.createElement('div');
            cartItem.className='cart-item';

            const cartItemName = document.createElement('h3');
            cartItemName.innerHTML=json[i]['name'];

            // cart quantity div
            const cartQty = document.createElement('div');
            cartQty.className='cart-qty';

            const cartqtynum = document.createElement('input');
            cartqtynum.type = 'number';
            cartqtynum.value = qty.value;
            cartqtynum.min = 0;

            cartqtynum.addEventListener('input',() => {
                if(cartUnit.innerHTML=="KG")
                    priceArea.innerText=(cartqtynum.value * json[i]['priceperkg']).toString();
                else{
                    priceArea.innerText=(cartqtynum.value * json[i]['priceperkg']/1000).toString();
                }
                const allcartitems = document.querySelectorAll('.cart-item');
                totalAmt=0;
                allcartitems.forEach((thatCartItem) => {
                    // console.log(thatCartItem.childNodes[3].textContent);
                    
                    totalAmt+=parseFloat(thatCartItem.childNodes[3].textContent);
                    
                })
                const totalamtsec = document.querySelector('.totalamtsec');
                    totalamtsec.innerHTML="Total Amount: Rs. "+totalAmt;
                // console.log(allcartitems);
            })

            const cartUnit = document.createElement('div');
            cartUnit.className='cart-unit';

            if(kgButton.classList.contains("active"))
                cartUnit.innerHTML='KG';
            else{
                cartUnit.innerHTML='G';
            }
            cartQty.append(cartqtynum,cartUnit);
            // end of cart qty div
            const priceAreaText = document.createElement('span');
            priceAreaText.innerHTML = "Price: ";
            const priceArea = document.createElement('p');
            if(kgButton.classList.contains("active"))
                priceArea.innerText=(qty.value * json[i]['priceperkg']).toString();
            else{
                priceArea.innerText=(qty.value * json[i]['priceperkg']/1000).toString();
            }

            const deleteButton = document.createElement('button');
            deleteButton.innerHTML="Delete";
            
            cartItem.append(cartItemName,cartQty,priceAreaText,priceArea,deleteButton);

            cartSection.append(cartItem);
            deleteButton.addEventListener('click',() => {
                cartItem.remove();
                const allcartitems = document.querySelectorAll('.cart-item');
                totalAmt=0;
                allcartitems.forEach((thatCartItem) => {
                    // console.log(thatCartItem.childNodes[3].textContent);
                    
                    totalAmt+=parseFloat(thatCartItem.childNodes[3].textContent);
                    
                })
                const totalamtsec = document.querySelector('.totalamtsec');
                    totalamtsec.innerHTML="Total Amount: Rs. "+totalAmt;
            })
            const allcartitems = document.querySelectorAll('.cart-item');
                totalAmt=0;
                allcartitems.forEach((thatCartItem) => {
                    // console.log(thatCartItem.childNodes[3].textContent);
                    
                    totalAmt+=parseFloat(thatCartItem.childNodes[3].textContent);
                    
                })
                const totalamtsec = document.querySelector('.totalamtsec');
                    totalamtsec.innerHTML="Total Amount: Rs. "+totalAmt;
                        
        });
        //appending all to item div

        item.append(itemInfo,qtyControls,kgButton,gButton,addButton);

        itemsColumn.append(item);


        }
    }
    });   
}


// displayItems('atta');

const shoppingarea = document.querySelector('.shopping-area');
shoppingarea.style.display = 'none';
const topRow = document.querySelector('.top-row');
topRow.style.display = 'none';

const categoryContainers = document.querySelectorAll('.category-container');

categoryContainers.forEach((categoryContainer) => {
    let category = categoryContainer.childNodes[1];
    // console.log(category);
    category.addEventListener('click', () => {
        categoryContainers.forEach((x) => x.classList.remove('active'));
        categoryContainer.classList.add('active');
        displayItems(category.dataset.categoryname);
    });
})

const categSquares = document.querySelectorAll('.atta');

categSquares.forEach((categSquare) => {
    categSquare.addEventListener('click',() => {
        const billsec = document.querySelector('.billing-section');
        billsec.style.display = 'none';
        topRow.style.display = 'flex';
        displayItems(categSquare.dataset.categ);
        shoppingarea.style.display = 'grid';
        const products = document.querySelector('#products');
        products.style.display = 'none';
        // console.log(categoryContainers);
        categoryContainers.forEach((x) => {
            x.classList.remove('active');
            // console.log(x.childNodes[1].dataset.categoryname);
            // console.log(categSquare.dataset.categ);
            if(x.childNodes[1].dataset.categoryname == categSquare.dataset.categ){
                x.classList.add('active');
            }
        });
        
    })
});

const backToHome = document.querySelector('.back-to-home');
backToHome.addEventListener('click',() => {
    shoppingarea.style.display = 'none';
    const products = document.querySelector('#products');
    products.style.display = 'block';
    topRow.style.display = 'none';
    const billsec = document.querySelector('.billing-section');
    billsec.style.display = 'grid';
})