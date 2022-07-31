const itemsColumn = document.querySelector(".items-column")
const cartSection = document.querySelector(".cart")
const addedtoCartAlert = document.querySelector(".added-alert")

var totalAmt = 0
var deliveryPrice = 0

function displayItems(curCategory) {
    itemsColumn.innerHTML = "<p>*Click on the input field to edit product quantity.</p>"
    fetch("./items.json")
        .then((response) => response.json())
        .then((json) => {
            for (let i = 0; i < json.length; i++) {
                if (json[i]["type"] == curCategory) {
                    //item div created
                    const item = document.createElement("div")
                    item.className = "item"

                    //item info
                    const itemInfo = document.createElement("div")
                    itemInfo.className = "item-info"

                    const itemName = document.createElement("h2")
                    itemName.innerText = json[i]["name"]

                    const itemPrice = document.createElement("p")
                    if (
                        json[i]["type"] == "atta" ||
                        json[i]["type"] == "multigrainatta" ||
                        json[i]["type"] == "specialatta"
                    ) {
                        itemPrice.innerText =
                            "₹" + json[i]["priceperkg"].toString() + "/kg"
                    } else {
                        itemPrice.innerText =
                            "₹" + json[i]["priceperkg"].toString()
                    }

                    let itemDesc = json[i]["desc"]
                    const itemdesc = document.createElement("span")
                    itemdesc.className = "itemdesc"
                    itemdesc.innerHTML = itemDesc

                    itemInfo.append(itemName, itemdesc, itemPrice)

                    //quantity controls

                    const qtyControls = document.createElement("div")
                    qtyControls.className = "qty-controls"

                    const reduceQtyButton = document.createElement("div")
                    reduceQtyButton.className = "reduceqty-btn button"
                    reduceQtyButton.innerHTML = "-"

                    const increaseQtyButton = document.createElement("div")
                    increaseQtyButton.className = "increaseqty-btn button"
                    increaseQtyButton.innerHTML = "+"

                    const qty = document.createElement("input")
                    qty.type = "number"
                    qty.className = "qty"
                    qty.value = 0

                    qtyControls.append(reduceQtyButton, qty, increaseQtyButton)

                    //unit controls

                    const kgButton = document.createElement("div")
                    kgButton.className = "kg-unit-btn"
                    kgButton.innerHTML = "kg"

                    // const gButton = document.createElement("div")
                    // gButton.className = "g-unit-btn"
                    // gButton.innerHTML = "g"
                    //   }else{
                    const gButton = document.createElement("div")
                    if (
                        json[i]["type"] == "atta" ||
                        json[i]["type"] == "multigrainatta" ||
                        json[i]["type"] == "specialatta"
                    ) {
                        gButton.className = "g-unit-btn1"
                        gButton.innerHTML = "g"
                    } else {
                        gButton.className = "g-unit-btn"
                        kgButton.innerHTML = "Pkt"
                    }
                    //   }

                    const addButton = document.createElement("button")
                    addButton.className = "add-item-btn"
                    addButton.innerHTML = "ADD"

                    //functionality to increase and decrease qty
                    increaseQtyButton.addEventListener("click", () => {
                        if (gButton.classList.contains("active")) {
                            let c = qty.valueAsNumber

                            c = c + 50
                            qty.value = c
                        } else {
                            let c = qty.valueAsNumber
                            c = c + 1
                            qty.value = c
                        }
                    })
                    reduceQtyButton.addEventListener("click", () => {
                        if (gButton.classList.contains("active")) {
                            let c = qty.valueAsNumber

                            c = c - 50
                            if (c < 50) {
                                console.log("value should be greater than 50")
                            } else {
                                qty.value = c
                            }
                        } else {
                            let c = qty.valueAsNumber
                            c = c - 1
                            if (c < 1) {
                                console.log("value should be greater than 1")
                            } else {
                                qty.value = c
                            }
                        }
                    })
                    qty.addEventListener("input", () => {
                        if (qty.value < 0) {
                            qty.value = 0
                            alert("Cannot be less than 0")
                        }
                    })

                    //functionality to unit controls

                    kgButton.classList.add("active")

                    kgButton.addEventListener("click", () => {
                        if (!kgButton.classList.contains("active")) {
                            qty.value = "0"
                            gButton.classList.remove("active")
                            kgButton.classList.add("active")
                        }
                    })
                    gButton.addEventListener("click", () => {
                        if (!gButton.classList.contains("active")) {
                            qty.value = "50"
                            kgButton.classList.remove("active")
                            gButton.classList.add("active")
                        }
                    })

                    //functionality to add button
                    addButton.addEventListener("click", () => {
                        if(qty.value == 0){
                            alert("Quantity cannot be less than 1!"); 
                            return;
                        }
                        if (
                            json[i]["type"] == "atta" ||
                            json[i]["type"] == "multigrainatta" ||
                            json[i]["type"] == "specialatta"
                        ) {
                            if (kgButton.classList.contains("active"))
                                totalAmt += qty.value * json[i]["priceperkg"]
                            else {
                                totalAmt +=
                                    (qty.value * json[i]["priceperkg"]) / 1000
                            }
                            totalAmt = Math.ceil(totalAmt)
                        } else {
                            totalAmt +=
                                qty.value *
                                parseFloat(
                                    json[i]["priceperkg"].replace(/,/g, "")
                                )
                            console.log(json[i]["priceperkg"])
                        }

                        // const totalamtdiv = document.querySelector('.total-amount');
                        // totalamtdiv.innerHTML = "Total Amount: ₹" + totalAmt.toString();

                        //cart item creation
                        const cartItem = document.createElement("div")
                        cartItem.className = "cart-item"

                        const cartItemName = document.createElement("h3")
                        cartItemName.innerHTML = json[i]["name"]

                        // cart quantity div
                        const cartQty = document.createElement("div")
                        cartQty.className = "cart-qty"

                        const cartqtynum = document.createElement("input")
                        cartqtynum.type = "number"
                        cartqtynum.value = qty.value
                        cartqtynum.min = 0
                        cartqtynum.className = "cart-qty"
                        cartqtynum.addEventListener("input", () => {
                            if (cartqtynum.value < 0) {
                                alert("Can't be less than 0")
                                cartqtynum.value = 0
                            }
                            if (
                                json[i]["type"] == "atta" ||
                                json[i]["type"] == "multigrainatta" ||
                                json[i]["type"] == "specialatta"
                            ) {
                                if (cartUnit.innerHTML == "KG")
                                    priceArea.innerText = (
                                        Math.ceil(cartqtynum.value * json[i]["priceperkg"])
                                    ).toString()
                                else {
                                    priceArea.innerText = (
                                        Math.ceil((cartqtynum.value *
                                            json[i]["priceperkg"]) /
                                        1000)
                                    ).toString()
                                }
                            } else {
                                priceArea.innerText = (
                                    Math.ceil(cartqtynum.value *
                                    parseFloat(
                                        json[i]["priceperkg"].replace(/,/g, "")
                                    ))
                                ).toString()
                            }
                            const allcartitems =
                                document.querySelectorAll(".cart-item")
                            totalAmt = 0
                            allcartitems.forEach((thatCartItem) => {
                                // console.log(thatCartItem.childNodes[3].textContent);

                                totalAmt += parseFloat(
                                    thatCartItem.childNodes[3].textContent
                                )
                            })
                            const totalamtsec =
                                document.querySelector(".totalamtsec")
                            totalamtsec.innerHTML =
                                "Total Amount: Rs. " +
                                Math.ceil(
                                    parseFloat(totalAmt + deliveryPrice)
                                ).toString()
                            // console.log(allcartitems);
                        })

                        const cartUnit = document.createElement("div")
                        cartUnit.className = "cart-unit"
                        if (
                            json[i]["type"] == "atta" ||
                            json[i]["type"] == "multigrainatta" ||
                            json[i]["type"] == "specialatta"
                        ) {
                            if (kgButton.classList.contains("active"))
                                cartUnit.innerHTML = "KG"
                            else {
                                cartUnit.innerHTML = "G"
                            }
                        } else {
                            cartUnit.innerHTML = "PKT"
                        }
                        cartQty.append(cartqtynum, cartUnit)
                        // end of cart qty div
                        const priceAreaText = document.createElement("span")
                        priceAreaText.className = "cart-unit"
                        priceAreaText.innerHTML = "Price:"
                        const priceArea = document.createElement("p")
                        priceArea.className = "cart-unit"
                        if (
                            json[i]["type"] == "atta" ||
                            json[i]["type"] == "multigrainatta" ||
                            json[i]["type"] == "specialatta"
                        ) {
                            if (kgButton.classList.contains("active"))
                                priceArea.innerText = (
                                    Math.ceil(qty.value * json[i]["priceperkg"])
                                ).toString()
                            else {
                                priceArea.innerText = (
                                    Math.ceil((qty.value * json[i]["priceperkg"]) /
                                    1000)
                                ).toString()
                            }
                        } else {
                            priceArea.innerText = (
                               Math.ceil(qty.value *
                                parseFloat(
                                    json[i]["priceperkg"].replace(/,/g, "")
                                ))
                            ).toString()
                        }

                        const deleteButton = document.createElement("button")
                        deleteButton.innerHTML = "Delete"

                        cartItem.append(
                            cartItemName,
                            cartQty,
                            priceAreaText,
                            priceArea,
                            deleteButton
                        )

                        cartSection.append(cartItem)
                        deleteButton.addEventListener("click", () => {
                            cartItem.remove()
                            updateCartTotal()
                            updateCartVisual()
                        })
                        updateCartTotal()
                        updateCartVisual()
                        addedtoCartAlert.classList.remove("invisible")
                        setTimeout(function () {
                            addedtoCartAlert.classList.add("invisible")
                        }, 1500)
                    })
                    //appending all to item div

                    item.append(
                        itemInfo,
                        qtyControls,
                        kgButton,
                        gButton,
                        addButton
                    )

                    itemsColumn.append(item)
                }
            }
        })
}
const updateCartTotal = () => {
    const allcartitems = document.querySelectorAll(".cart-item")
    totalAmt = 0
    allcartitems.forEach((thatCartItem) => {
        console.log(thatCartItem.childNodes[3].textContent)

        totalAmt += parseFloat(thatCartItem.childNodes[3].textContent)
    })
    const totalamtsec = document.querySelector(".totalamtsec")
    totalamtsec.innerHTML =
        "Total Amount: Rs. " + Math.ceil(totalAmt + deliveryPrice)
}

// displayItems('atta');

const shoppingarea = document.querySelector(".shopping-area")
shoppingarea.style.display = "none"
const topRow = document.querySelector(".top-row")

const categoryContainers = document.querySelectorAll(".category-container")

categoryContainers.forEach((categoryContainer) => {
    let category = categoryContainer.childNodes[1]
    // console.log(category);
    category.addEventListener("click", () => {
        categoryContainers.forEach((x) => x.classList.remove("active"))
        categoryContainer.classList.add("active")
        displayItems(category.dataset.categoryname)
    })
})

const categSquares = document.querySelectorAll(".atta")

categSquares.forEach((categSquare) => {
    if (categSquare.dataset.categ != "customatta") {
        categSquare.addEventListener("click", () => {
            const billsec = document.querySelector(".billing-section")
            billsec.style.display = "none"
            // topRow.style.display = "flex"
            backToHome.style.display = "block"
            const products = document.querySelector("#products")

            products.style.display = "none"

            displayItems(categSquare.dataset.categ)
            shoppingarea.style.display = "grid"
            // console.log(categoryContainers);
            categoryContainers.forEach((x) => {
                x.classList.remove("active")
                // console.log(x.childNodes[1].dataset.categoryname);
                // console.log(categSquare.dataset.categ);
                if (
                    x.childNodes[1].dataset.categoryname ==
                    categSquare.dataset.categ
                ) {
                    x.classList.add("active")
                }
            })
        })
    } else if (categSquare.dataset.categ == "customatta") {
        categSquare.addEventListener("click", () => {
            const billsec = document.querySelector(".billing-section")
            billsec.style.display = "none"
            // topRow.style.display = "flex"
            backToHome.style.display = "block"
            products.style.display = "none"
            customAttaSection = document.querySelector(".custom-atta")
            customAttaSection.classList.remove("invisible")
            createdAtta = document.querySelector(".created-atta")

            availableAttas = document.querySelector(".available-attas")
            // console.log(availableAttas);
            availableAttas.innerHTML = ""

            fetch("./items.json")
                .then((response) => response.json())
                .then((json) => {
                    for (let i = 0; i < json.length; i++) {
                        if (json[i]["type"] == "atta") {
                            // console.log(json[i]);
                            //item div created
                            const item = document.createElement("div")
                            item.className = "item"

                            //item info
                            const itemInfo = document.createElement("div")
                            itemInfo.className = "item-info"

                            const itemName = document.createElement("h2")
                            itemName.innerText = json[i]["name"]

                            const itemPrice = document.createElement("p")
                            itemPrice.innerText =
                                "₹" + json[i]["priceperkg"].toString() + "/kg"

                            itemInfo.append(itemName, itemPrice)

                            //quantity controls

                            const qtyControls = document.createElement("div")
                            qtyControls.className = "qty-controls"

                            const reduceQtyButton =
                                document.createElement("div")
                            reduceQtyButton.className = "reduceqty-btn button"
                            reduceQtyButton.innerHTML = "-"

                            const increaseQtyButton =
                                document.createElement("div")
                            increaseQtyButton.className = "increaseqty-btn button"
                            increaseQtyButton.innerHTML = "+"

                            const qty = document.createElement("input")
                            qty.type = "number"
                            qty.className = "qty"
                            qty.value = 0

                            qtyControls.append(
                                reduceQtyButton,
                                qty,
                                increaseQtyButton
                            )

                            //unit controls

                            const kgButton = document.createElement("div")
                            kgButton.className = "kg-unit-btn"
                            kgButton.innerHTML = "kg"

                            const gButton = document.createElement("div")
                            gButton.className = "g-unit-btn1"
                            gButton.innerHTML = "g"

                            const addButton = document.createElement("button")
                            addButton.className = "add-item-btn"
                            addButton.innerHTML = "ADD"

                            //functionality to increase and decrease qty
                            // increaseQtyButton.addEventListener("click", () => {
                            //     let curQty = qty.value
                            //     // console.log(curQty);
                            //     curQty++
                            //     qty.value = curQty
                            // })
                            // reduceQtyButton.addEventListener("click", () => {
                            //     let curQty = qty.value
                            //     // console.log(curQty);
                            //     curQty = curQty == 1 ? 1 : curQty - 1
                            //     qty.value = curQty
                            // })
                            increaseQtyButton.addEventListener("click", () => {
                                if (gButton.classList.contains("active")) {
                                    let c = qty.valueAsNumber

                                    c = c + 50
                                    qty.value = c
                                } else {
                                    let c = qty.valueAsNumber
                                    c = c + 1
                                    qty.value = c
                                }
                            })
                            reduceQtyButton.addEventListener("click", () => {
                                if (gButton.classList.contains("active")) {
                                    let c = qty.valueAsNumber

                                    c = c - 50
                                    if (c < 50) {
                                        console.log(
                                            "value should be greater than 50"
                                        )
                                    } else {
                                        qty.value = c
                                    }
                                } else {
                                    let c = qty.valueAsNumber
                                    c = c - 1
                                    if (c < 0) {
                                        console.log(
                                            "value should be greater than 1"
                                        )
                                    } else {
                                        qty.value = c
                                    }
                                }
                            })
                            qty.addEventListener("input", () => {
                                if (qty.value < -1) {
                                    qty.value = 1
                                    alert("Cannot be less than 1")
                                }
                            })

                            //functionality to unit controls

                            kgButton.classList.add("active")

                            kgButton.addEventListener("click", () => {
                                qty.value = "0"
                                if (!kgButton.classList.contains("active")) {
                                    gButton.classList.remove("active")
                                    kgButton.classList.add("active")
                                }
                            })
                            gButton.addEventListener("click", () => {
                                qty.value = "50"
                                if (!gButton.classList.contains("active")) {
                                    kgButton.classList.remove("active")
                                    gButton.classList.add("active")
                                }
                            })

                            //functionality to add price button
                            addButton.addEventListener("click", () => {
                                 if (qty.value == 0) {
                                     alert("Can't be less than 0")
                                     cartqtynum.value = 0
                                 }
                                const attacomponent =
                                    document.createElement("div")
                                attacomponent.className = "atta-component"

                                const AttacomponentName =
                                    document.createElement("h5")
                                AttacomponentName.innerHTML =
                                    "+ " + json[i]["name"]

                                // cart quantity div
                                const componentQty = document.createElement("p")
                                componentQty.className = "component-qty"
                                componentQty.innerHTML = qty.value

                                const componentUnit =
                                    document.createElement("div")
                                componentUnit.className = "component-unit"

                                if (kgButton.classList.contains("active"))
                                    componentUnit.innerHTML = "KG"
                                else {
                                    componentUnit.innerHTML = "G"
                                }

                                const priceAreaText =
                                    document.createElement("span")
                                priceAreaText.innerHTML = "Price: "
                                const priceArea = document.createElement("p")
                                priceArea.className = "component-price"
                                if (kgButton.classList.contains("active"))
                                    priceArea.innerText = (
                                        qty.value * json[i]["priceperkg"]
                                    ).toString()
                                else {
                                    priceArea.innerText = (
                                        (qty.value * json[i]["priceperkg"]) /
                                        1000
                                    ).toString()
                                }

                                const deleteButton =
                                    document.createElement("button")
                                deleteButton.innerHTML = "Delete"

                                attacomponent.append(
                                    AttacomponentName,
                                    componentQty,
                                    componentUnit,
                                    priceAreaText,
                                    priceArea,
                                    deleteButton
                                )

                                createdAtta.append(attacomponent)

                                const allComponents =
                                    document.querySelectorAll(".atta-component")

                                deleteButton.addEventListener("click", () => {
                                    attacomponent.remove()
                                    updatePrice()
                                    updateCartVisual()
                                })
                                updatePrice()
                            })
                            //appending all to item div

                            item.append(
                                itemInfo,
                                qtyControls,
                                kgButton,
                                gButton,
                                addButton
                            )

                            availableAttas.append(item)
                        }
                    }
                })
        })
    }
})
const totalwtarea = document.querySelector(".custom-atta-weight")
const totalpricearea = document.querySelector(".custom-atta-price")

const updatePrice = () => {
    let customamount = 0
    let customwt = 0
    const allofthoseComponents = document.querySelectorAll(".atta-component")

    allofthoseComponents.forEach((thatComponent) => {
        // console.log(thatComponent.childNodes[4].textContent);
        if (thatComponent.childNodes[2].textContent == "KG")
            customwt += parseFloat(thatComponent.childNodes[1].textContent)
        else
            customwt +=
                parseFloat(thatComponent.childNodes[1].textContent) / 1000

        customamount += parseFloat(thatComponent.childNodes[4].textContent)
    })
    totalpricearea.innerHTML = "Total Amount: Rs. " + customamount
    totalwtarea.innerHTML = "Total Weight: " + customwt + " KG"
    console.log(customamount)
}

const addCustomtocart = document.querySelector(".add-custom-to-cart")
addCustomtocart.addEventListener("click", () => {
    const allCurrComponents = document.querySelectorAll(".atta-component")
    if (allCurrComponents.length > 0) {
        console.log("creatable mix atta")
        const cartItem = document.createElement("div")
        cartItem.className = "cart-item"

        const H4 = document.createElement("h4")
        H4.innerHTML = "Mix Atta"

        //creating custom info container
        const customInfoContainer = document.createElement("div")
        customInfoContainer.className = "custom-info-container"

        //creating the H5 and info div for info container
        const H5 = document.createElement("h5")
        H5.innerHTML = "Components"

        //custom atta component info list and stuff div
        const customAttaInfo = document.createElement("div")
        customAttaInfo.className = "custom-atta-info"

        let totalPrice = 0
        let totalWt = 0
        allCurrComponents.forEach((currComponent) => {
            const customComponentName = document.createElement("span")
            customComponentName.className = "custom-component-name"
            customComponentName.innerHTML =
                currComponent.childNodes[0].textContent

            const customComponentQty = document.createElement("span")
            customComponentQty.className = "custom-component-qty"
            if (currComponent.childNodes[2].textContent === "KG") {
                customComponentQty.innerHTML =
                    currComponent.childNodes[1].textContent + " KG"
                totalWt += parseFloat(currComponent.childNodes[1].textContent)
            } else {
                customComponentQty.innerHTML =
                    currComponent.childNodes[1].textContent + " G"
                totalWt +=
                    parseFloat(currComponent.childNodes[1].textContent) / 1000
            }

            const customComponentPrice = document.createElement("span")
            customComponentPrice.className = "custom-component-price"
            customComponentPrice.innerHTML =
                "Price: " + currComponent.childNodes[4].textContent
            totalPrice += parseFloat(currComponent.childNodes[4].textContent)

            //creating component div to add all the above and then append to customattainfo div

            const cartCustomComponent = document.createElement("div")
            cartCustomComponent.className = "cart-custom-component"
            cartCustomComponent.append(
                customComponentName,
                customComponentQty,
                customComponentPrice
            )

            customAttaInfo.append(cartCustomComponent)
        })
        const totalWeight = document.createElement("span")
        totalWeight.className = "custom-component-name"
        totalWeight.innerHTML = "Total Weight: " + totalWt.toString() + " KG"

        customInfoContainer.append(H5, customAttaInfo, totalWeight)

        //price and delete button
        const priceText = document.createElement("span")
        priceText.innerHTML = "Price: "

        const price = document.createElement("p")
        price.innerText = totalPrice.toString()

        const delButton = document.createElement("button")
        delButton.innerHTML = "Delete"

        //adding all components to the main div
        cartItem.append(H4, customInfoContainer, priceText, price, delButton)

        cartSection.append(cartItem)

        delButton.addEventListener("click", () => {
            cartItem.remove()
            updateCartTotal()
            updateCartVisual()
        })
        updateCartVisual()
        updateCartTotal()

        //resetting the custom atta creator
        const allComponentstodelete =
            document.querySelectorAll(".atta-component")
        allComponentstodelete.forEach((componentoDelete) => {
            componentoDelete.remove()
            updatePrice()
        })
        addedtoCartAlert.classList.remove("invisible")
        setTimeout(function () {
            addedtoCartAlert.classList.add("invisible")
        }, 1500)
    }
})

const backToHome = document.querySelector(".back-to-home")
backToHome.addEventListener("click", () => {
    shoppingarea.style.display = "none"
    const products = document.querySelector("#products")
    products.style.display = "block"
    // topRow.style.display = "none"
    const billsec = document.querySelector(".billing-section")
    billsec.style.display = "grid"
    const customAtta = document.querySelector(".custom-atta")
    customAtta.classList.add("invisible")
    backToHome.style.display = "none"
    searchInput.value = ""
    searchResultArea.innerHTML = ""
})
// backToHome.style.display = 'none'
const addToLocalStorage = () => {
    const currCartItems = document.querySelectorAll(".cart-item")
    let cartObj = []
    let totalPrice = 0
    function Item(name, qty, netPrice, types) {
        this.itemName = name
        this.itemQty = qty
        this.itemPrice = netPrice
        this.types = types
    }
    currCartItems.forEach((currCartItem) => {
        // console.log(currCartItem);
        let types = []
        let qty
        if (currCartItem.childNodes[1].className == "custom-info-container") {
            currCartItem.childNodes[1].childNodes[1].childNodes.forEach(
                (customAttaComponent) => {
                    types.push(
                        customAttaComponent.childNodes[0].textContent +
                            " " +
                            customAttaComponent.childNodes[1].textContent +
                            " " +
                            customAttaComponent.childNodes[2].textContent
                    )
                    // +=parseFloat(customAttaComponent.childNodes[1].match(/\b\d+(?:.\d+)?/));
                }
            )
            qty =
                currCartItem.childNodes[1].childNodes[2].textContent.substring(
                    14
                )
        } else {
            qty =
                currCartItem.childNodes[1].childNodes[0].value.toString() +
                " " +
                currCartItem.childNodes[1].childNodes[1].textContent
        }
        // console.log(types);
        totalPrice += parseFloat(currCartItem.childNodes[3].textContent)
        console.log(
            new Item(
                currCartItem.childNodes[0].textContent,
                qty,
                parseFloat(currCartItem.childNodes[3].textContent),
                types
            )
        )
        cartObj.push(
            new Item(
                currCartItem.childNodes[0].textContent,
                qty,
                Math.ceil(parseFloat(currCartItem.childNodes[3].textContent)),
                types
            )
        )
    })
    totalPrice += deliveryPrice
    Math.ceil(totalPrice)
    // console.log(JSON.stringify(cartObj));
    localStorage.setItem("cart", JSON.stringify(cartObj))
    localStorage.setItem("totalPrice", totalPrice.toString())
}
const orderButton = document.querySelector(".order")
orderButton.addEventListener("click", (e) => {
    if (
        document.querySelector("#inputName").value.length > 0 &&
        document.querySelector("#inputNumber").value.toString().length > 0 &&
        document.querySelector("#inputAddress2").value.length > 0 &&
        sectorArea.innerHTML != "<span>Noida Sector</span>"
    ) {
        if (
            Math.ceil(totalAmt + deliveryPrice) >= 240 // total amount minimum 240
        ) {
            addToLocalStorage()

            let body = {
                user: {
                    name: document.querySelector("#inputName").value,
                    email: document.querySelector("#inputEmail").value,
                    number: parseInt(
                        document.querySelector("#inputNumber").value
                    ),
                    alternativeField:
                        document.querySelector("#inputField").value,
                    address: document.querySelector("#inputAddress2").value,
                },
                items: JSON.parse(localStorage.getItem("cart")),
                totalPrice: Math.ceil(
                    JSON.parse(localStorage.getItem("totalPrice"))
                ),
                paymentMethod: document.querySelector("#payment").value,
            }

            orderButton.disabled = true
            orderButton.innerText = "loading"
            fetch("/createOrder", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.order.paymentMethod === "cod") {
                        confirm("Order Placed! Check your Email for more details")
                        window.location.reload()
                    } else if (data.order.paymentMethod === "online") {
                        const options = {
                            key: "rzp_test_ewgTctaZxoNKtm", //your key
                            amount: parseInt(data.orderId.amount),
                            currency: data.orderId.currency,
                            name: "chakki",
                            order_id: data.orderId.id,
                            handler: function (response) {
                                console.log(response)
                                confirm("Order Placed")
                                window.location.reload()
                            },
                            prefill: {
                                name: data.order.user.name,
                                email: data.order.user.email,
                                contact: `${data.order.user.number}`,
                            },
                        }
                        const rzp1 = new Razorpay(options)
                        rzp1.on("payment.failed", function (response) {
                            console.log({
                                failed: "true",
                                response,
                            })
                            deleteOrder(data.order.paymentId)
                            confirm("Try Again")
                            setTimeout(() => {
                                window.location.reload()
                            }, 2000)
                        })
                        rzp1.open()
                    } else if ((data.status = "error")) {
                        confirm("Try Again")
                    }
                })
        } else {
            e.preventDefault()
            alert("Minimum order amount is Rs. 240.")
        }
    } else {
        e.preventDefault()
        alert("Please check if all required fields are filled.")
    }
})
const deleteOrder = (oid) => {
    fetch("/deleteOrder", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ oid }),
    })
        .then((res) => res.json())
        .then((data) => console.log(data))
}
// types field for custom atta is not empty

const focusOnBillingSection = () => {
    shoppingarea.style.display = "none"
    const products = document.querySelector("#products")
    products.style.display = "block"
    // topRow.style.display = "none"
    backToHome.style.display = "none"
    const billsec = document.querySelector(".billing-section")
    billsec.style.display = "grid"
    const customAtta = document.querySelector(".custom-atta")
    customAtta.classList.add("invisible")
    billsec.scrollIntoView()
}

document.querySelector("#navbarbillinglink").addEventListener("click", () => {
    focusOnBillingSection()
})

const updateCartVisual = () => {
    const totalCartItems = document.querySelectorAll(".cart-item")
    var cartSize = totalCartItems.length
    document.querySelector("#numberofcartprods").innerHTML = cartSize.toString()
}

let sectors = [
    3, 28, 29, 30, 35, 36, 41, 49, 50, 51, 52, 53, 54, 55, 56, 76, 78, 82, 92,
    93, 100, 104, 105, 108, 126, 128, 133, 134, 135, 137, 143, 144, 168,
]

const dropdownmenu = document.querySelector(".dropdown-menu")

sectors.forEach((sectorNumber) => {
    const sectorButton = document.createElement("button")
    sectorButton.type = "button"
    sectorButton.className = "dropdown-item"
    sectorButton.innerHTML = sectorNumber
    dropdownmenu.append(sectorButton)
})

const sectorButtons = document.querySelectorAll(".dropdown-item")
const sectorArea = document.querySelector(".dropdown-toggle")

sectorButtons.forEach((sectorButton) => {
    sectorButton.addEventListener("click", () => {
        sectorArea.innerHTML = sectorButton.innerHTML
        if (
            sectorArea.innerHTML == "93" ||
            sectorArea.innerHTML == "82" ||
            sectorArea.innerHTML == "92" ||
            sectorArea.innerHTML == "143" ||
            sectorArea.innerHTML == "144" ||
            sectorArea.innerHTML == "134" ||
            sectorArea.innerHTML == "133" ||
            sectorArea.innerHTML == "135" ||
            sectorArea.innerHTML == "168"
        ) {
            deliveryPrice = 30
            alert("The Delivery charge for this sector is 30 Rs")
        } else if (sectorArea.innerHTML == "137") {
            deliveryPrice = 0
            alert("The Delivery charge for this sector is 0 Rs")
        } else {
            deliveryPrice = 50
            alert("The Delivery charge for this sector is 50 Rs")
        }
        const totalamtsec = document.querySelector(".totalamtsec")
        const t = totalAmt + deliveryPrice

        totalamtsec.innerHTML =
            "Total Amount: Rs. " + Math.ceil(totalAmt + deliveryPrice)
    })
})

// search feature

const searchInput = document.querySelector("#search")
const searchResultArea = document.querySelector(".search-results")
const customAtta = document.querySelector(".custom-atta")

const searchController = () => {
    console.log(searchInput.value)
    if (
        searchInput.value.length <= 0 &&
        shoppingarea.style.display == "none" &&
        customAtta.classList.contains("invisible")
    ) {
        searchResultArea.innerHTML = ""
        const products = document.querySelector("#products")
        products.style.display = "block"
        const billsec = document.querySelector(".billing-section")
        billsec.style.display = "grid"
        return
    } else if (
        shoppingarea.style.display == "none" &&
        customAtta.classList.contains("invisible")
    ) {
        searchResultArea.innerHTML = ""
        const products = document.querySelector("#products")
        products.style.display = "none"
        const billsec = document.querySelector(".billing-section")
        billsec.style.display = "none"
        generalSearch(searchInput.value)
    } else if (shoppingarea.style.display == "grid") {
        categSpecificSearch()
    }
}
setInterval(() => {
    if (
        searchInput.value == "" &&
        shoppingarea.style.display == "none" &&
        document.querySelector(".custom-atta").style.display == "none"
    )
        searchController()
}, 2000)

const generalSearch = (searchValue) => {
    // console.clear();
    fetch("./items.json")
        .then((response) => response.json())
        .then((json) => {
            for (let i = 0; i < json.length; i++) {
                if (
                    json[i]["name"]
                        .toLowerCase()
                        .includes(searchValue.toLowerCase())
                ) {
                    // console.log(json[i]['name']);
                    const searchResult = document.createElement("div")
                    searchResult.className = "search-result"

                    const searchResultName = document.createElement("p")
                    searchResultName.innerText = json[i]["name"]

                    const searchResultPrice = document.createElement("span")
                    searchResultPrice.innerText = json[i]["priceperkg"]

                    searchResultName.addEventListener("click", () => {
                        searchResultArea.innerHTML = ""
                        searchInput.value = ""
                        shoppingarea.style.display = "grid"
                        console.log(json[i]["type"])
                        categoryContainers.forEach((x) =>
                            x.classList.remove("active")
                        )
                        categoryContainers.forEach((x) => {
                            if (
                                x.childNodes[1].dataset.categoryname ==
                                json[i]["type"]
                            )
                                x.classList.add("active")
                        })

                        displayItems(json[i]["type"])
                        setTimeout(() => {
                            const allItemstosearch =
                                document.querySelectorAll(".item")
                            // console.log(allItemstosearch[0]);
                            allItemstosearch.forEach((thatiteminfo) => {
                                if (
                                    json[i]["name"] ==
                                    thatiteminfo.childNodes[0].childNodes[0]
                                        .textContent
                                ) {
                                    thatiteminfo.scrollIntoView({
                                        behavior: "auto",
                                        block: "center",
                                        inline: "center",
                                    })
                                    thatiteminfo.style.background =
                                        "#f8ad78"
                                    setTimeout(() => {
                                        thatiteminfo.style.background = "white"
                                    }, 2000)
                                }
                            })
                        }, 500)

                        backToHome.style.display = "flex"
                    })
                    searchResult.append(searchResultName, searchResultPrice)
                    searchResultArea.append(searchResult)
                }
            }
        })
}

const categSpecificSearch = () => {
    let cur
    categoryContainers.forEach((x) => {
        if (x.classList.contains("active"))
            cur = x.childNodes[1].dataset.categoryname
    })
    const allItemstosearch = document.querySelectorAll(".item")
    allItemstosearch.forEach((thatiteminfo) => {
        if (
            searchInput.value.length <= 0 ||
            !thatiteminfo.childNodes[0].childNodes[0].textContent
                .toLowerCase()
                .includes(searchInput.value.toLowerCase())
        ) {
            thatiteminfo.style.background = "white"
            return
        } else if (
            thatiteminfo.childNodes[0].childNodes[0].textContent
                .toLowerCase()
                .includes(searchInput.value.toLowerCase())
        ) {
            thatiteminfo.style.background = "#f8ad78"
        }
    })
}

const searchButton = document.querySelector("#Component_76_1")

searchButton.addEventListener("click", () => {
    searchResultArea.innerHTML = ""
    searchController()
    backToHome.style.display = "flex"
})

searchInput.addEventListener("input", () => {
    if (shoppingarea.style.display == "grid") searchController()
})

searchInput.addEventListener("keyup", function (event) {
    // console.log("enter pressed");
    if (event.key === "Enter") {
        event.preventDefault()
        searchResultArea.innerHTML = ""
        searchController()
        backToHome.style.display = "flex"
    }
})

// window.onscroll = function(ev) {
//     if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight*0.99) {
//         document.querySelector('.footer').style.display = 'block';
//     }
//     else
//         document.querySelector('.footer').style.display = 'none';
// };
