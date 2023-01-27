const caTaxRate = .0975;
const shippingHandling = 4.99;

const shellPrices = {
    "conch": 10.99,
    "brokenHeart": 5.99,
    "oceansWail": 19.99,
    "tinyTitan": 14.99,
    "sailorsBounty": 19.99,
    "whitePrincess": 24.99
}

const roundTo = (number, digits) =>{
    const d = Math.pow(10, digits);
    return Math.round((number + Number.EPSILON) * d)/ d;
}

const buildCheckoutList = (name, value, price) =>{
    let newElement = document.createElement("tr");
    newElement.setAttribute("id", "currentRow");
    let currentElement = document.getElementById("checkoutTable");
    currentElement.appendChild(newElement);
    currentElement = document.getElementById("subtotalRow");
    currentElement.before(newElement);

    newElement = document.createElement("td");
    currentElement = document.getElementById("currentRow");
    currentElement.appendChild(newElement);
    let newContent = document.createTextNode(name);
    newElement.appendChild(newContent);

    newElement = document.createElement("td");
    newContent = document.createTextNode(value);
    newElement.appendChild(newContent);
    currentElement.appendChild(newElement);

    newElement = document.createElement("td");
    newContent = document.createTextNode("$" + price);
    newElement.appendChild(newContent);
    currentElement.appendChild(newElement);

    newElement = document.createElement("td")
    newContent = document.createTextNode("$" + value * price);
    newElement.appendChild(newContent);
    currentElement.appendChild(newElement);
}

const populateCheckout = cart =>{
    delete cart.id;

    for(let [key, value] of Object.entries(cart)){
        if(value === 0){
            continue;
        }else{
            switch(key){
                case "conch":
                    buildCheckoutList("The Conch", value, shellPrices["conch"]);
                    break;
                case "brokenheart":
                    buildCheckoutList("Broken Heart", value, shellPrices["brokenHeart"]);
                    break;
                case "oceanswail":
                    buildCheckoutList("Ocean's Wail", value, shellPrices["oceansWail"]);
                    break;
                case "tinytitan":
                    buildCheckoutList("Tiny Titan", value, shellPrices["tinyTitan"]);
                    break;
                case "sailorsbounty":
                    buildCheckoutList("Sailor's Bounty", value, shellPrices["sailorsBounty"]);
                    break;
                case "whiteprincess":
                    buildCheckoutList("White Princess", value, shellPrices["whitePrincess"]);
                    break;
            }
            document.getElementById("currentRow").setAttribute("id", "");
        }
        let subtotal = (cart.conch * shellPrices["conch"]) + (cart.brokenheart * shellPrices["brokenHeart"]) + (cart.oceanswail * shellPrices["oceansWail"]) + (cart.tinytitan * shellPrices["tinyTitan"]) + (cart.sailorsbounty * shellPrices["sailorsBounty"]) + (cart.whiteprincess * shellPrices["whitePrincess"]);
        subtotal = roundTo(subtotal, 2);
        document.getElementById("subtotal").innerHTML = "$" + subtotal;
        let taxes = subtotal * caTaxRate;
        taxes = roundTo(taxes, 2);
        document.getElementById("taxes").innerHTML = "$" + taxes;
        let finalTotal = subtotal + taxes + shippingHandling;
        finalTotal = roundTo(finalTotal, 2);
        document.getElementById("finalTotal").innerHTML = "$" + finalTotal;
    }
}

//Builds the checkout table
const buildCheckout = () =>{
    let customerInfo = null;
    let cart = null;
    fetch("/signUpLogIn", { method: "GET"})
    .then(response =>{
        if(response.ok) return response.json();
    
        renderError(response);
    })
    .then(response =>{
        customerInfo = response.customerInfo;
        fetch(`/cart?id=${customerInfo.id}`, { method: "GET"})
        .then(response =>{
            if(response.ok) return response.json();

            renderError(response);
        })
        .then(response =>{
        cart = response;
        populateCheckout(cart);
        });
    });
}

buildCheckout();

const buildAddressList = customerAddresses =>{
    delete customerAddresses.id;

    for(let [key, value] of Object.entries(customerAddresses)){
        if(value != null){
            let newElement = document.createElement("input");
            let currentElement = document.getElementById("addressForm");
            newElement.setAttribute("type", "radio");
            newElement.setAttribute("id", key);
            newElement.setAttribute("name", "address");
            newElement.setAttribute("value", value);
            currentElement.appendChild(newElement);

            newElement = document.createElement("label");
            newElement.setAttribute("for", key);
            newElement.innerHTML = value;
            currentElement.appendChild(newElement);

            newElement = document.createElement("br");
            currentElement.appendChild(newElement);
        }
    }
}

//Builds addresses box

const buildAddressesBox = async() =>{
    let customerInfo = null;
    let addresses = null;
    try{
        const response = await fetch("/signUpLogIn", { method: "GET"});
        if(response.ok){
            const jsonResponse = await response.json();
            customerInfo = jsonResponse.customerInfo;
            fetch(`/addresses?id=${customerInfo.id}`, { method: "GET"})
            .then(response =>{
                if(response.ok) return response.json();

                renderError(response);
            })
            .then(response =>{
                addresses = response;
                delete addresses.id;
                let addressCount = 0;
                let addressValues = Object.values(addresses);
                addressValues.forEach(element =>{
                    if(element != null) addressCount += 1;
                });
                if(addressCount === 0){
                    let newElement = document.createElement("a");
                    newElement.setAttribute("href", "/pageRouter/account");
                    let currentElement = document.getElementById("addressForm");
                    currentElement.appendChild(newElement);
                    newElement.innerHTML = "Add an address to your profile now";
                }else{
                    buildAddressList(addresses);
                }
            });
        }else throw new Error("Request failed!");
    }catch(error){
        console.log(error);
    }
}

buildAddressesBox();

const placeOrder = () =>{
    const finalTotal = document.getElementById("finalTotal").value;
    const address = document.getElementById("addressForm").value;
    console.log(finalTotal);
    console.log(address);
}

const placeOrderButton = document.getElementById("placeOrder");

placeOrderButton.addEventListener("click", placeOrder);