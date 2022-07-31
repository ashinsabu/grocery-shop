const orderArea = document.querySelector(".orders")

function formatDate(date) {
    var day;
    var month;

    switch (date.getDay()) {
        case 1: day = "Monday"; break;
        case 2: day = "Tuesday"; break;
        case 3: day = "Wednesday"; break;
        case 4: day = "Thursday"; break;
        case 5: day = "Friday"; break;
        case 6: day = "Saturday"; break;
        default: day = "Sunday";
    }

    switch (date.getMonth()) {
        case 0: month = "January"; break;
        case 1: month = "Febuary"; break;
        case 2: month = "March"; break;
        case 3: month = "April"; break;
        case 4: month = "May"; break;
        case 5: month = "June"; break;
        case 6: month = "July"; break;
        case 7: month = "August"; break;    
        case 8: month = "September"; break;    
        case 9: month = "October"; break;
        case 10: month = "November"; break;    
        default: month = "December";
    }

    return day + ", " + month + " " + ("0" + date.getDate()).slice(-2) + " " + (1900 + date.getYear());
}

const addOrder = (orderData, index) => {
    const customerName = orderData["user"]["name"]
    const customerEmail = orderData["user"]["email"]
    const customerNumber1 = orderData["user"]["number"]
    const customerNumber2 = orderData["user"]["alternativeField"]
    const customerAddress = orderData["user"]["address"]
    const paymentMethod = (orderData["paymentMethod"] == 'cod' ? "Cash on Delivery" : "Online")
    const orderedAt = formatDate(new Date(`${orderData["orderedAt"].toString()}`))
    const paymentStatus = orderData["paymentStatus"]
    const orderId = orderData["_id"]
    const totalOrderPrice = orderData['totalPrice']
    const orderItems = orderData["items"]
   

    const order = document.createElement("div")
    order.className = "order"
    
    var orderDate = new Date(`${orderData["orderedAt"].toString()}`);
    var today = new Date();
    if(orderDate.getDate() === today.getDate() && orderDate.getMonth() === today.getMonth() && orderDate.getFullYear() == today.getFullYear()){
        order.classList.add('today');
    }
    else{
        order.classList.add('previous');
    }
    order.innerHTML =
        '<h2><div class="form-group"><input type="checkbox" id="' +
        orderId +
        '"><label for="' +
        orderId +
        '"> </label></div></i> Order #' +
        (index + 1) +
        "</h2>"

    const customerInfo = document.createElement("div")
    customerInfo.className = "customer-info"

    customerInfo.innerHTML =
        '<div><span class="field-box"><span class="field-title">Customer Name: </span><span class="customer-name">' +
        customerName +
        '</span></span><span class="field-box"><span class="field-title">Customer Email: </span><span class="customer-email">' +
        customerEmail +
        '</span></span><div><span class="field-box"><span class="field-title">Ordered At: </span><span class="ordered-at">' +
        orderedAt +
        '</span></span><span class="field-box"><span class="field-title">Payment Status: </span><span class="customer-number1">' +
        paymentStatus +
        '</span></span></div><div>    <span class="field-box"><span class="field-title">Mobile No: </span><span class="customer-number1">' +
        customerNumber1 +
        '</span></span><span class="field-box"><span class="field-title">Alternate Mob No: </span><span class="customer-number2">' +
        customerNumber2 +
        '</span></span><span class="field-title">Address: </span><span class="customer-address">' +
        customerAddress +
        '</span></span></div><span class="field-title">Payment Method: </span><span class="customer-address">' +
        paymentMethod +
        "</span>"

    order.append(customerInfo)
    order.innerHTML+='<h2 style="color: #6E4A35; ">Items</h2>'
    for (let i = 0; i < orderItems.length; i++) {
        const orderItem = document.createElement("div")
        orderItem.className = "order-item"


        const itemName = orderItems[i]["itemName"]
        const itemTypes = orderItems[i]["types"]
        const itemPrice = orderItems[i]["itemPrice"]
        const itemQty = orderItems[i]["itemQty"]

        const h4 = document.createElement("h4")
        h4.textContent = itemName

        orderItem.append(h4)

        if (itemTypes.length == 0) {
            const qty = document.createElement("div")
            qty.className = "order-qty"
            qty.innerText = itemQty
            orderItem.append(qty)
        } else {
            const infoContainer = document.createElement("div")
            infoContainer.className = "custom-info-container"

            const h5 = document.createElement("h5")
            h5.innerHTML = "Mix Atta"

            const customInfo = document.createElement("div")
            customInfo.className = "custom-atta-info"

            for (let k = 0; k < itemTypes.length; k++) {
                const newComponent = document.createElement("div")
                newComponent.className = "order-custom-component"
                newComponent.innerHTML = itemTypes[k]

                customInfo.append(newComponent)
            }
            infoContainer.append(h5, customInfo)
            orderItem.append(infoContainer)
        }

        const priceText = document.createElement("span")
        priceText.innerHTML = "Net Price: "

        const priceArea = document.createElement("p")
        priceArea.innerHTML = itemPrice

        orderItem.append(priceText, priceArea)
        order.append(orderItem)
    }
    if(order.classList.contains('previous'))
        order.classList.add('invisible');
    orderArea.append(order)
    order.innerHTML+='<h2 id="total-order-price" style="display: inline; color: #6E4A35; ">Total Amount: </h2><h2 style="display: inline;">Rs. '+totalOrderPrice+'</h2>'
}

const fillOrders = () => {
    fetch("/adminGetAllOrders")
        .then((response) => response.json())
        .then((json) => {
            const allOrders = json["order"];
            const sortedDesc = allOrders.sort(
                (objB, objA) => Number(new Date(`${objA["orderedAt"].toString()}`)) - Number(new Date(`${objB["orderedAt"].toString()}`)),
              );
              console.log(sortedDesc);
            document.querySelector(".order-count").innerText = json.order.length
            for (let i = 0; i < sortedDesc.length; i++) {
                addOrder(sortedDesc[i], sortedDesc.length-i)
            }
        })
}




fillOrders();

document.querySelectorAll('.dropdown-item').forEach((dropdownItem) => {
    dropdownItem.addEventListener('click',() => {
        document.querySelector('.dropdown-toggle').innerHTML=dropdownItem.innerHTML;
        const orderList = document.querySelectorAll('.order');
        if(dropdownItem.innerHTML == "Today's Orders"){
            orderList.forEach((currentOrder) => {
                if(currentOrder.classList.contains('today'))
                    currentOrder.classList.remove('invisible')
                if(currentOrder.classList.contains('previous'))
                    currentOrder.classList.add('invisible')
            });
        }
        if(dropdownItem.innerHTML == "Previous Orders"){
            orderList.forEach((currentOrder) => {
                if(currentOrder.classList.contains('today'))
                    currentOrder.classList.add('invisible')
                if(currentOrder.classList.contains('previous'))
                    currentOrder.classList.remove('invisible')
            });
        }

    })
})