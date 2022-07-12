const orderArea = document.querySelector('.orders');

const addOrder = (orderData, index) => {
    const customerName = orderData['user']['name'];
    const customerEmail = orderData['user']['email'];
    const customerNumber1 = orderData['user']['number'];
    const customerNumber2 = orderData['user']['alternativeField'];
    const customerAddress = orderData['user']['address'];

    const orderId = orderData['_id'];

    const orderItems = orderData['items'];

    const order = document.createElement('div');
    order.className = "order";
    
    order.innerHTML = '<h2><i class="bi bi-card-checklist"></i> Order #' + (index+1) + '</h2>';

    const customerInfo = document.createElement('div');
    customerInfo.className='customer-info';

    customerInfo.innerHTML = '<div><span class="field-box"><span class="field-title">Customer Name: </span><span class="customer-name">' +customerName+ '</span></span><span class="field-box"><span class="field-title">Customer Email: </span><span class="customer-email">'+customerEmail+'</span></span></div><div>    <span class="field-box"><span class="field-title">Mobile No: </span><span class="customer-number1">'+customerNumber1+'</span></span><span class="field-box"><span class="field-title">Alternate Mob No: </span><span class="customer-number2">'+customerNumber2+'</span></span></div><span class="field-title">Address: </span><span class="customer-address">'+customerAddress+'</span>'

    order.append(customerInfo);

    for(let i=0;i<orderItems.length;i++){
        const orderItem = document.createElement('div');
        orderItem.className='order-item';

        orderItem.innerHTML='<div class="form-group"><input type="checkbox" id="'+orderItems[i]['_id']+'"><label for="'+orderItems[i]['_id']+'"> </label></div>';

        const itemName = orderItems[i]['itemName'];
        const itemTypes = orderItems[i]['types'];
        const itemPrice =orderItems[i]['itemPrice'];
        const itemQty =orderItems[i]['itemQty'];

        const h4 = document.createElement('h4');
        h4.textContent=itemName;

        orderItem.append(h4);

        if(itemTypes.length==0){
            const qty = document.createElement('div');
            qty.className = 'order-qty';
            qty.innerText = itemQty;
            orderItem.append(qty);
        }
        else{
            const infoContainer = document.createElement('div');
            infoContainer.className='custom-info-container';

            const h5 = document.createElement('h5');
            h5.innerHTML='Mix Atta';

            const customInfo = document.createElement('div');
            customInfo.className='custom-atta-info';

            for(let k=0;k<itemTypes.length;k++){
                const newComponent = document.createElement('div');
                newComponent.className = 'order-custom-component';
                newComponent.innerHTML = itemTypes[k];

                customInfo.append(newComponent);
            }
            infoContainer.append(h5,customInfo);
            orderItem.append(infoContainer);
        }

        const priceText = document.createElement('span');
        priceText.innerHTML = 'Net Price: ';

        const priceArea = document.createElement('p');
        priceArea.innerHTML = itemPrice;

        orderItem.append(priceText,priceArea);
        order.append(orderItem);
    }
    orderArea.append(order);
}

const fillOrders = () => {
    fetch("./sample.json")
    .then(response => response.json())
    .then(json => {
        const allOrders = json['order'];
        for(let i=0;i<allOrders.length;i++){
            addOrder(allOrders[i],i);
        }
    });
}

fillOrders();