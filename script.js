
const itemsColumn = document.querySelector('.items-column');
const cartSection = document.querySelector('.cart');
const addedtoCartAlert = document.querySelector('.added-alert');

var totalAmt = 0;


function displayItems(curCategory) {
    itemsColumn.innerHTML="";
    fetch("./items.json")
    .then(response => response.json())
    .then(json => {
    for(let i=0;i<json.length;i++){
        if(json[i]['type'] == curCategory){
        
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
                updateCartTotal();
            })
            updateCartTotal();

            addedtoCartAlert.classList.remove('invisible');
            setTimeout(function() {
                addedtoCartAlert.classList.add('invisible')
            },1500);
                        
        });
        //appending all to item div

        item.append(itemInfo,qtyControls,kgButton,gButton,addButton);

        itemsColumn.append(item);


        }
    }
    });   
}
const updateCartTotal = () => {
    const allcartitems = document.querySelectorAll('.cart-item');
                totalAmt=0;
                allcartitems.forEach((thatCartItem) => {
                    console.log(thatCartItem.childNodes[3].textContent);
                    
                    totalAmt+=parseFloat(thatCartItem.childNodes[3].textContent);
                    
                })
                const totalamtsec = document.querySelector('.totalamtsec');
                    totalamtsec.innerHTML="Total Amount: Rs. "+totalAmt;
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
    if(categSquare.dataset.categ!='customatta'){
        categSquare.addEventListener('click',() => {
            const billsec = document.querySelector('.billing-section');
            billsec.style.display = 'none';
            topRow.style.display = 'flex';
            const products = document.querySelector('#products');

            products.style.display = 'none';

            displayItems(categSquare.dataset.categ);
            shoppingarea.style.display = 'grid';
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
    }
    else if(categSquare.dataset.categ=='customatta'){
        categSquare.addEventListener('click',() => {
            const billsec = document.querySelector('.billing-section');
            billsec.style.display = 'none';
            topRow.style.display = 'flex';
            products.style.display = 'none';
            customAttaSection = document.querySelector('.custom-atta');
            customAttaSection.classList.remove('invisible');
            createdAtta = document.querySelector('.created-atta');


            availableAttas = document.querySelector('.available-attas');
            // console.log(availableAttas);
            availableAttas.innerHTML = "";
            

            fetch('./items.json')
            .then( response => response.json())
            .then(json =>{
                for(let i=0;i<json.length;i++){
                    if(json[i]['type'] == 'atta'){
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
                            
                            // const totalamtdiv = document.querySelector('.total-amount');
                            // totalamtdiv.innerHTML = "Total Amount: ₹" + totalAmt.toString();
                
                            //cart item creation
                            const attacomponent = document.createElement('div');
                            attacomponent.className='atta-component';
                
                            const AttacomponentName = document.createElement('h5');
                            AttacomponentName.innerHTML="+ " + json[i]['name'];
                
                            // cart quantity div
                            const componentQty = document.createElement('p');
                            componentQty.className='component-qty';
                            componentQty.innerHTML = qty.value;
                
                            const componentUnit = document.createElement('div');
                            componentUnit.className='component-unit';
                
                            if(kgButton.classList.contains("active"))
                                componentUnit.innerHTML='KG';
                            else{
                                componentUnit.innerHTML='G';
                            }
                            
                            const priceAreaText = document.createElement('span');
                            priceAreaText.innerHTML = "Price: ";
                            const priceArea = document.createElement('p');
                            priceArea.className = "component-price";
                            if(kgButton.classList.contains("active"))
                                priceArea.innerText=(qty.value * json[i]['priceperkg']).toString();
                            else{
                                priceArea.innerText=(qty.value * json[i]['priceperkg']/1000).toString();
                            }
                
                            const deleteButton = document.createElement('button');
                            deleteButton.innerHTML="Delete";
                            
                            attacomponent.append(AttacomponentName,componentQty,componentUnit,priceAreaText,priceArea,deleteButton);
                
                            createdAtta.append(attacomponent);
                            
                            const allComponents = document.querySelectorAll('.atta-component');
                            

                            deleteButton.addEventListener('click',() => {
                                attacomponent.remove();
                                updatePrice();
                            })
                            updatePrice();
                            
                                        
                        });
                        //appending all to item div
                
                        item.append(itemInfo,qtyControls,kgButton,gButton,addButton);
                
                        availableAttas.append(item);
                
                
                        }
                }
            });
        })
    }
});
const totalwtarea = document.querySelector('.custom-atta-weight');
                            const totalpricearea = document.querySelector('.custom-atta-price');
                            
                            const updatePrice = () =>{
                                let customamount = 0;
                                let customwt = 0;
                                const allofthoseComponents = document.querySelectorAll('.atta-component');

                                allofthoseComponents.forEach((thatComponent) => {
                                    // console.log(thatComponent.childNodes[4].textContent);
                                    if(thatComponent.childNodes[2].textContent == 'KG')
                                        customwt+=parseFloat(thatComponent.childNodes[1].textContent);
                                    else
                                        customwt+=parseFloat(thatComponent.childNodes[1].textContent)/1000;

                                    customamount+=parseFloat(thatComponent.childNodes[4].textContent);

                                    
                                    
                                });
                                totalpricearea.innerHTML="Total Amount: Rs. "+customamount;
                                totalwtarea.innerHTML = "Total Weight: " + customwt + " KG";
                                console.log(customamount);

                            };

const addCustomtocart = document.querySelector('.add-custom-to-cart');
addCustomtocart.addEventListener('click', () => {
    const allCurrComponents = document.querySelectorAll('.atta-component');
    if(allCurrComponents.length > 0){
        console.log('creatable mix atta');
        const cartItem = document.createElement('div');
        cartItem.className='cart-item';

        const H4 = document.createElement('h4');
        H4.innerHTML="Mix Atta";

        //creating custom info container
        const customInfoContainer = document.createElement('div');
        customInfoContainer.className="custom-info-container";

        //creating the H5 and info div for info container
        const H5 = document.createElement('h5');
        H5.innerHTML = "Components";

        //custom atta component info list and stuff div
        const customAttaInfo = document.createElement('div');
        customAttaInfo.className = "custom-atta-info";

        let totalPrice = 0;
        let totalWt = 0;
        allCurrComponents.forEach((currComponent) => {
            const customComponentName = document.createElement('span');
            customComponentName.className="custom-component-name";
            customComponentName.innerHTML = currComponent.childNodes[0].textContent;

            const customComponentQty = document.createElement('span');
            customComponentQty.className = "custom-component-qty";
            if(currComponent.childNodes[2].textContent === "KG"){
                customComponentQty.innerHTML = currComponent.childNodes[1].textContent + " KG";
                totalWt += parseFloat(currComponent.childNodes[1].textContent);
            }
            else{
                customComponentQty.innerHTML = currComponent.childNodes[1].textContent + " G";
                totalWt += parseFloat(currComponent.childNodes[1].textContent)/1000;
            }

            

            const customComponentPrice = document.createElement('span');
            customComponentPrice.className = "custom-component-price";
            customComponentPrice.innerHTML = "Price: " + currComponent.childNodes[4].textContent;
            totalPrice += parseFloat(currComponent.childNodes[4].textContent);

            //creating component div to add all the above and then append to customattainfo div

            const cartCustomComponent = document.createElement('div');
            cartCustomComponent.className="cart-custom-component";
            cartCustomComponent.append(customComponentName,customComponentQty,customComponentPrice);

            customAttaInfo.append(cartCustomComponent);

        });
        const totalWeight = document.createElement('span');
        totalWeight.className = "custom-component-name";
        totalWeight.innerHTML = "Total Weight: " + totalWt.toString() + " KG";

        customInfoContainer.append(H5,customAttaInfo,totalWeight);
        
        //price and delete button
        const priceText = document.createElement('span');
        priceText.innerHTML="Price: ";

        const price = document.createElement('p');
        price.innerText = totalPrice.toString();

        const delButton = document.createElement('button');
        delButton.innerHTML="Delete";

        //adding all components to the main div
        cartItem.append(H4,customInfoContainer,priceText,price,delButton);

        cartSection.append(cartItem);

        delButton.addEventListener('click',() => {
            cartItem.remove();
            updateCartTotal();
        });
        updateCartTotal();

        //resetting the custom atta creator
        const allComponentstodelete = document.querySelectorAll('.atta-component');
        allComponentstodelete.forEach((componentoDelete) => {
            componentoDelete.remove();
            updatePrice();
        });
        addedtoCartAlert.classList.remove('invisible');
            setTimeout(function() {
                addedtoCartAlert.classList.add('invisible')
            },1500);
    }
});

const backToHome = document.querySelector('.back-to-home');
backToHome.addEventListener('click',() => {
    shoppingarea.style.display = 'none';
    const products = document.querySelector('#products');
    products.style.display = 'block';
    topRow.style.display = 'none';
    const billsec = document.querySelector('.billing-section');
    billsec.style.display = 'grid';
    const customAtta = document.querySelector('.custom-atta');
    customAtta.classList.add('invisible');
})