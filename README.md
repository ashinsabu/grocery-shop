# Summary

A full stack Javascript SPA grocery shopping page built without the help of any JS frameworks.
Minimal usage of anchor tags and new page reloading in order to minimize load times between different features of app.

# How to run the app locally on your device

Step 1: Clone the repository into your device by using the command: 
    git clone git@github.com:ashinsabu/grocery-shop.git

Step 2: CD into the directory and run the command "npm install" (assuming you have npm already on your device). This should install the required node modules

Step 3: Start your local MongoDB server and create a database named "chakkiIntern" and create two collection inside it namely "orders" and "admins"

Step 4: Run the command "node index.js" inside the app directory to start the server.

Step 5: Demo the app by entering the following into your browser's address bar "localhost:4000"

# Technologies used

<img src = "https://user-images.githubusercontent.com/25181517/117447535-f00a3a00-af3d-11eb-89bf-45aaf56dbaf1.png" height="40px" width ="40px">
<img src="https://user-images.githubusercontent.com/25181517/117447663-0fa16280-af3e-11eb-8677-bcf8e4f8e298.png" height="40px" width ="40px">
<img src="https://user-images.githubusercontent.com/25181517/117447155-6a868a00-af3d-11eb-9cfe-245df15c9f3f.png" height="40px" width ="40px">
<img src="https://user-images.githubusercontent.com/25181517/121402101-c89df700-c959-11eb-8b4a-bbadf9e84b30.png" height="40px" width ="40px">
<img src="https://cdn-icons-png.flaticon.com/512/919/919825.png" height="40px" width ="40px">
<img src="https://i0.wp.com/blog.fossasia.org/wp-content/uploads/2017/07/handlebars-js.png?fit=500%2C500&ssl=1" height="40px" width ="40px">
<img src="https://cdn.iconscout.com/icon/free/png-256/mongodb-226029.png" height="40px" width ="40px">

# API's used
Razorpay, MongoDB Atlas

# customizing list of items

Add any items / products to the json file similarly as previous items are added.

Values possible inside the 'type' property are

atta
millets
gheeoil
dryfruits
rice
cookies
spices
achar
muarabba
coffee 
honey
tea

Example 
{
    "id": 1,
    "name": "Single Grain Atta",
    "type": "atta",
    "priceperkg" : 100
}
