const shellPrices = {
    "conch": 10.99,
    "brokenHeart": 5.99,
    "oceansWail": 19.99,
    "tinyTitan": 14.99,
    "sailorsBounty": 19.99,
    "whitePrincess": 24.99
}

const buildShoppingCartList = (img, name, price, shellQuantityId, value, updateShellId, customerId, deleteShellId, sqlShell) =>{
    //This code creates a new table row and appends it as a child
    //to the exisiting html table
    let newElement = document.createElement("tr");
    newElement.setAttribute("id", "currentRow");
    let currentElement = document.getElementById("cartTable");
    currentElement.appendChild(newElement);

    //This code creates two commonly used elements within the
    //following switch code
    let newContent = document.createElement("img");
    currentElement = document.getElementById("currentRow");
    
    //This code creates a new data cell, attaches an img to the 
    //data cell, and then attaches that data cell as a child 
    //of the current row we're working on
    newElement = document.createElement("td");
    newContent.setAttribute("src", img);
    newElement.appendChild(newContent);
    currentElement.appendChild(newElement);

    //This creates the text name
    newContent = document.createTextNode(" " + name);
    newElement.appendChild(newContent);
    currentElement.appendChild(newElement);

    //This creates the data cell and fills in the price
    newElement = document.createElement("td");
    newContent = document.createTextNode("$" + price);
    newElement.appendChild(newContent);
    currentElement.appendChild(newElement);

    //This will create the data cell, create the input cell,
    //and set the value of the input cell to the quantity of
    //the product added form index.js
    newElement = document.createElement("td");
    newContent = document.createElement("input");
    newContent.type = "number";
    newContent.setAttribute("id", shellQuantityId);
    newContent.setAttribute("value", value);
    newContent.setAttribute("min", "0");
    newElement.appendChild(newContent);
    currentElement.appendChild(newElement);
                
    //This will create an update button for the user to update
    //the quantity of the particular item in their shopping cart
    newContent = document.createElement("button");
    newContent.setAttribute("id", updateShellId);
    newContent.innerHTML = "Update";
    newElement.appendChild(newContent);

    //This code creates the button functionality to send information
    //to the router to update the shopping cart database
    
    document.getElementById(updateShellId).addEventListener("click", () =>{
        let quantity = document.getElementById(shellQuantityId).value;
        fetch(`/cart?id=${customerId}&shell=${sqlShell}&quantity=${quantity}`, {method: "PUT"});
        document.location.reload(true);
    });
    

    //This will create the button to delete the item from the user's
    //shopping cart
    newElement = document.createElement("td");
    newContent = document.createElement("button");
    newContent.setAttribute("id", deleteShellId);
    newContent.innerHTML = "Delete";
    newElement.appendChild(newContent);
    currentElement.appendChild(newElement);

    //This will create the functionality to update the shopping
    //cart database to delete the particular item when the delete
    //button is pressed
    
    document.getElementById(deleteShellId).addEventListener("click", () =>{
        fetch(`/cart?id=${customerId}&shell=${sqlShell}`, {method: "DELETE"});
        document.location.reload(true);
    });

    document.getElementById("currentRow").setAttribute("id", "");
}

//Populate Shopping Cart Functionality
//Builds the page to view your shopping cart items


const populateShoppingCart = cart =>{
    //This will delete the customer id number from cart data object to
    //help facilitate future functions. It's not needed at this point
    const customerId = cart.id;
    delete cart.id;

    //This code is simply to disply an empty cart message if the cart
    //object's keys are all equal to zero
    let cartCount = 0;
    let cartValues = Object.values(cart);
    cartValues.forEach(element =>{
        if(element != 0) cartCount += 1;
    });

    if(cartCount === 0){
        let newElement = document.createElement("tr");
        newElement.setAttribute("id", "currentRow");
        let currentElement = document.getElementById("cartTable");
        currentElement.appendChild(newElement);

        let newContent = document.createTextNode("You're cart is empty");
        currentElement.appendChild(newContent);
    }

    //This code will build the entire table displaying what the customer
    //has in their shopping cart, including the update and delete buttons
    //and their functionalities

    for(let [key, value] of Object.entries(cart)){
        if(value === 0){
            continue;
        }else{
            
            //This code creates a new table row and appends it as a child
            //to the exisiting html table
            let newElement = document.createElement("tr");
            newElement.setAttribute("id", "currentRow");
            let currentElement = document.getElementById("cartTable");
            currentElement.appendChild(newElement);

            //This code creates two commonly used elements within the
            //following switch code
            let newContent = document.createElement("img");
            currentElement = document.getElementById("currentRow");


            //Switch that checks which shell we need to build data cells for
            
            switch(key){
                case "conch":
                //This code creates a new data cell, attaches an img to the 
                //data cell, and then attaches that data cell as a child 
                //of the current row we're working on
                newElement = document.createElement("td");
                newContent.setAttribute("src", "/img/shell01.jpg");
                newElement.appendChild(newContent);
                currentElement.appendChild(newElement);

                //This creates the text name
                newContent = document.createTextNode(" " + "The Conch");
                newElement.appendChild(newContent);
                currentElement.appendChild(newElement);

                //This creates the data cell and fills in the price
                newElement = document.createElement("td");
                newContent = document.createTextNode("$10.99");
                newElement.appendChild(newContent);
                currentElement.appendChild(newElement);

                //This will create the data cell, create the input cell,
                //and set the value of the input cell to the quantity of
                //the product added form index.js
                newElement = document.createElement("td");
                newContent = document.createElement("input");
                newContent.type = "number";
                newContent.setAttribute("id", "conchQuantity");
                newContent.setAttribute("value", value);
                newContent.setAttribute("min", "0");
                newElement.appendChild(newContent);
                currentElement.appendChild(newElement);
                
                //This will create an update button for the user to update
                //the quantity of the particular item in their shopping cart
                newContent = document.createElement("button");
                newContent.setAttribute("id", "updateConch");
                newContent.innerHTML = "Update";
                newElement.appendChild(newContent);

                //This code creates the button functionality to send information
                //to the router to update the shopping cart database
                document.getElementById("updateConch").addEventListener("click", () =>{
                    let conchQuantity = document.getElementById("conchQuantity").value;
                    fetch(`/cart?id=${customerId}&shell=conch&quantity=${conchQuantity}`, {method: "PUT"});
                    document.location.reload(true);
                });
    
                //This will create the button to delete the item from the user's
                //shopping cart
                newElement = document.createElement("td");
                newContent = document.createElement("button");
                newContent.setAttribute("id", "deleteConch");
                newContent.innerHTML = "Delete";
                newElement.appendChild(newContent);
                currentElement.appendChild(newElement);

                //This will create the functionality to update the shopping
                //cart database to delete the particular item when the delete
                //button is pressed
                document.getElementById("deleteConch").addEventListener("click", () =>{
                    fetch(`/cart?id=${customerId}&shell=conch`, {method: "DELETE"});
                    document.location.reload(true);
                });
                break;
                

                //Each additional case has identical code
                case "brokenheart":
                newElement = document.createElement("td");
                newContent.setAttribute("src", "/img/shell02.jpg");
                newElement.appendChild(newContent);
                currentElement.appendChild(newElement);

                newContent = document.createTextNode(" " + "The Broken Heart");
                newElement.appendChild(newContent);
                currentElement.appendChild(newElement);

                newElement = document.createElement("td");
                newContent = document.createTextNode("$5.99");
                newElement.appendChild(newContent);
                currentElement.appendChild(newElement);

                newElement = document.createElement("td");
                newContent = document.createElement("input");
                newContent.type = "number";
                newContent.setAttribute("id", "brokenHeartQuantity");
                newContent.setAttribute("value", value);
                newContent.setAttribute("min", "0");
                newElement.appendChild(newContent);
                currentElement.appendChild(newElement);

                newContent = document.createElement("button");
                newContent.setAttribute("id", "updateBrokenHeart");
                newContent.innerHTML = "Update";
                newElement.appendChild(newContent);

                document.getElementById("updateBrokenHeart").addEventListener("click", () =>{
                    let brokenHeartQuantity = document.getElementById("brokenHeartQuantity").value;
                    fetch(`/cart?id=${customerId}&shell=brokenHeart&quantity=${brokenHeartQuantity}`, {method: "PUT"});
                    document.location.reload(true);
                });
    
                newElement = document.createElement("td");
                newContent = document.createElement("button");
                newContent.setAttribute("id", "deleteBrokenHeart");
                newContent.innerHTML = "Delete";
                newElement.appendChild(newContent);
                currentElement.appendChild(newElement);

                document.getElementById("deleteBrokenHeart").addEventListener("click", () =>{
                    fetch(`/cart?id=${customerId}&shell=brokenHeart`, {method: "DELETE"});
                    document.location.reload(true);
                });
                break;

                case "oceanswail": 
                newElement = document.createElement("td");
                newContent.setAttribute("src", "/img/shell03.jpg");
                newElement.appendChild(newContent);
                currentElement.appendChild(newElement);

                newContent = document.createTextNode(" " + "Ocean's Wail");
                newElement.appendChild(newContent);
                currentElement.appendChild(newElement);

                newElement = document.createElement("td");
                newContent = document.createTextNode("$19.99");
                newElement.appendChild(newContent);
                currentElement.appendChild(newElement);

                newElement = document.createElement("td");
                newContent = document.createElement("input");
                newContent.type = "number";
                newContent.setAttribute("id", "oceansWailQuantity")
                newContent.setAttribute("value", value);
                newContent.setAttribute("min", "0");
                newElement.appendChild(newContent);
                currentElement.appendChild(newElement);

                newContent = document.createElement("button");
                newContent.setAttribute("id", "updateOceansWail");
                newContent.innerHTML = "Update";
                newElement.appendChild(newContent);

                document.getElementById("updateOceansWail").addEventListener("click", () =>{
                    let oceansWailQuantity = document.getElementById("oceansWailQuantity").value;
                    fetch(`/cart?id=${customerId}&shell=oceansWail&quantity=${oceansWailQuantity}`, {method: "PUT"});
                    document.location.reload(true);
                });
    
                newElement = document.createElement("td");
                newContent = document.createElement("button");
                newContent.setAttribute("id", "deleteOceansWail");
                newContent.innerHTML = "Delete";
                newElement.appendChild(newContent);
                currentElement.appendChild(newElement);

                document.getElementById("deleteOceansWail").addEventListener("click", () =>{
                    fetch(`/cart?id=${customerId}&shell=oceansWail`, {method: "DELETE"});
                    document.location.reload(true);
                });
                break;

                case "tinytitan": 
                newElement = document.createElement("td");
                newContent.setAttribute("src", "/img/shell04.jpg");
                newElement.appendChild(newContent);
                currentElement.appendChild(newElement);

                newContent = document.createTextNode(" " + "The Tiny Titan");
                newElement.appendChild(newContent);
                currentElement.appendChild(newElement);

                newElement = document.createElement("td");
                newContent = document.createTextNode("$14.99");
                newElement.appendChild(newContent);
                currentElement.appendChild(newElement);

                newElement = document.createElement("td");
                newContent = document.createElement("input");
                newContent.type = "number";
                newContent.setAttribute("id", "tinyTitanQuantity")
                newContent.setAttribute("value", value);
                newContent.setAttribute("min", "0");
                newElement.appendChild(newContent);
                currentElement.appendChild(newElement);

                newContent = document.createElement("button");
                newContent.setAttribute("id", "updateTinyTitan");
                newContent.innerHTML = "Update";
                newElement.appendChild(newContent);

                document.getElementById("updateTinyTitan").addEventListener("click", () =>{
                    let tinyTitanQuantity = document.getElementById("tinyTitanQuantity").value;
                    fetch(`/cart?id=${customerId}&shell=tinyTitan&quantity=${tinyTitanQuantity}`, {method: "PUT"});
                    document.location.reload(true);
                });
    
                newElement = document.createElement("td");
                newContent = document.createElement("button");
                newContent.setAttribute("id", "deleteTinyTitan");
                newContent.innerHTML = "Delete";
                newElement.appendChild(newContent);
                currentElement.appendChild(newElement);

                document.getElementById("deleteTinyTitan").addEventListener("click", () =>{
                    fetch(`/cart?id=${customerId}&shell=tinyTitan`, {method: "DELETE"});
                    document.location.reload(true);
                });
                break;

                case "sailorsbounty": 
                newElement = document.createElement("td");
                newContent.setAttribute("src", "/img/shell05.jpg");
                newElement.appendChild(newContent);
                currentElement.appendChild(newElement);

                newContent = document.createTextNode(" " + "Sailor's Bounty");
                newElement.appendChild(newContent);
                currentElement.appendChild(newElement);

                newElement = document.createElement("td");
                newContent = document.createTextNode("$19.99");
                newElement.appendChild(newContent);
                currentElement.appendChild(newElement);

                newElement = document.createElement("td");
                newContent = document.createElement("input");
                newContent.type = "number";
                newContent.setAttribute("id", "sailorsBountyQuantity")
                newContent.setAttribute("value", value);
                newContent.setAttribute("min", "0");
                newElement.appendChild(newContent);
                currentElement.appendChild(newElement);

                newContent = document.createElement("button");
                newContent.setAttribute("id", "updateSailorsBounty");
                newContent.innerHTML = "Update";
                newElement.appendChild(newContent);

                document.getElementById("updateSailorsBounty").addEventListener("click", () =>{
                    let sailorsBountyQuantity = document.getElementById("sailorsBountyQuantity").value;
                    fetch(`/cart?id=${customerId}&shell=sailorsBounty&quantity=${sailorsBountyQuantity}`, {method: "PUT"});
                    document.location.reload(true);
                });
    
                newElement = document.createElement("td");
                newContent = document.createElement("button");
                newContent.setAttribute("id", "deleteSailorsBounty");
                newContent.innerHTML = "Delete";
                newElement.appendChild(newContent);
                currentElement.appendChild(newElement);

                document.getElementById("deleteSailorsBounty").addEventListener("click", () =>{
                    fetch(`/cart?id=${customerId}&shell=sailorsBounty`, {method: "DELETE"});
                    document.location.reload(true);
                });
                break;

                case "whiteprincess": 
                newElement = document.createElement("td");
                newContent.setAttribute("src", "/img/shell06.jpg");
                newElement.appendChild(newContent);
                currentElement.appendChild(newElement);

                newContent = document.createTextNode(" " + "White Princess");
                newElement.appendChild(newContent);
                currentElement.appendChild(newElement);

                newElement = document.createElement("td");
                newContent = document.createTextNode("$24.99");
                newElement.appendChild(newContent);
                currentElement.appendChild(newElement);

                newElement = document.createElement("td");
                newContent = document.createElement("input");
                newContent.type = "number";
                newContent.setAttribute("id", "whitePrincessQuantity");
                newContent.setAttribute("value", value);
                newContent.setAttribute("min", "0");
                newElement.appendChild(newContent);
                currentElement.appendChild(newElement);

                newContent = document.createElement("button");
                newContent.setAttribute("id", "updateWhitePrincess");
                newContent.innerHTML = "Update";
                newElement.appendChild(newContent);

                document.getElementById("updateWhitePrincess").addEventListener("click", () =>{
                    let whitePrincessQuantity = document.getElementById("whitePrincessQuantity").value;
                    fetch(`/cart?id=${customerId}&shell=whitePrincess&quantity=${whitePrincessQuantity}`, {method: "PUT"});
                    document.location.reload(true);
                });
    
                newElement = document.createElement("td");
                newContent = document.createElement("button");
                newContent.setAttribute("id", "deleteWhitePrincess");
                newContent.innerHTML = "Delete";
                newElement.appendChild(newContent);
                currentElement.appendChild(newElement);

                document.getElementById("deleteWhitePrincess").addEventListener("click", () =>{
                    fetch(`/cart?id=${customerId}&shell=whitePrincess`, {method: "DELETE"});
                    document.location.reload(true);
                });
                break;
            }
            document.getElementById("currentRow").setAttribute("id", "");
        }
    }
}

/*
const populateShoppingCart = cart =>{
    const customerId = cart.id;
    delete cart.id;

    let cartCount = 0;
    let cartValues = Object.values(cart);
    cartValues.forEach(element =>{
        if(element != 0) cartCount += 1;
    });

    if(cartCount === 0){
        let newElement = document.createElement("tr");
        newElement.setAttribute("id", "currentRow");
        let currentElement = document.getElementById("cartTable");
        currentElement.appendChild(newElement);

        let newContent = document.createTextNode("You're cart is empty");
        currentElement.appendChild(newContent);
    }

    for(let [key, value] of Object.entries(cart)){
        if(value === 0){
            continue;
        }else{
            switch(key){
                case "conch":
                    buildShoppingCartList("/img/shell01.jpg", "The Conch", shellPrices["conch"], "conchQuantity", value, "updateConch", customerId, "deleteConch", "conch");
                    break;
                case "brokenheart":
                    buildShoppingCartList("/img/shell02.jpg", "Broken Heart", shellPrices["brokenHeart"], "brokenHeartQuantity", value, "updateBrokenHeart", customerId, "deleteBrokenHeart", "brokenheart");
                    break;
                case "oceanswail":
                    buildShoppingCartList("/img/shell03.jpg", "Ocean's Wail", shellPrices["oceansWail"], "oceansWailQuantity", value, "updateOceansWail", customerId, "deleteOceansWail", "oceanswail");
                    break;
                case "tinytitan":
                    buildShoppingCartList("/img/shell04.jpg", "Tiny Titan", shellPrices["tinyTitan"], "tinyTitanQuantity", value, "updateTinyTitan", customerId, "deleteTinyTitan", "tinytitan");
                    break;
                case "sailorsbounty":
                    buildShoppingCartList("/img/shell05.jpg", "Sailor's Bounty", shellPrices["sailorsBounty"], "sailorsBountyQuantity", value, "updateSailorsBounty", customerId, "deleteSailorsBounty", "sailorsbounty");
                    break
                case "whiteprincess":
                    buildShoppingCartList("/img/shell05.jpg", "White Princess", shellPrices["whitePrincess"], "whitePrincessQuantity", value, "updateWhitePrincess", customerId, "deleteWhitePrincess", "whiteprincess");
                    break;
            }
        }
    }
}
*/
//This code executes everything to build the page

const buildPage = () =>{
    let customerInfo = null;
    let cart = null;
    fetch("/signUpLogIn", { method: "GET"})
    .then(response =>{
        if(response.ok) return response.json();
    
        renderError(response);
    })
    .then(response =>{
        customerInfo = response.customerInfo;
        document.getElementById("userCart").innerHTML = `${customerInfo.first_name}'s Shopping Cart`;
        fetch(`/cart?id=${customerInfo.id}`, { method: "GET"})
        .then(response =>{
            if(response.ok) return response.json();

            renderError(response);
        })
        .then(response =>{
        cart = response;
        populateShoppingCart(cart);
        });
    });
}

buildPage();