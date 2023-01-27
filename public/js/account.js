const buildAddressList = customerAddresses =>{
    const customerId = customerAddresses.id;
    delete customerAddresses.id;

    for(let [key, value] of Object.entries(customerAddresses)){
        if(value === null){
            continue;
        }else{
            let newElement = null;
            let currentElement = null;
            switch(key){
                case "address1":
                    newElement = document.createElement("li");
                    newElement.setAttribute("id", "address1");
                    currentElement = document.getElementById("addressList");
                    newElement.innerHTML = value;
                    currentElement.appendChild(newElement);
                    newElement = document.createElement("button");
                    newElement.innerHTML = "Delete";
                    newElement.setAttribute("id", "deleteAddress1");
                    currentElement = document.getElementById("address1");
                    currentElement.appendChild(newElement);
                    document.getElementById("deleteAddress1").addEventListener("click", () =>{
                        fetch(`/addresses?id=${customerId}&address=address1`, {method: "DELETE"});
                        document.location.reload(true);
                    });
                    break;
                case "address2":
                    newElement = document.createElement("li");
                    newElement.setAttribute("id", "address2");
                    currentElement = document.getElementById("addressList");
                    newElement.innerHTML = value;
                    currentElement.appendChild(newElement);
                    newElement = document.createElement("button");
                    newElement.innerHTML = "Delete";
                    newElement.setAttribute("id", "deleteAddress2");
                    currentElement = document.getElementById("address2");
                    currentElement.appendChild(newElement);
                    document.getElementById("deleteAddress2").addEventListener("click", () =>{
                        fetch(`/addresses?id=${customerId}&address=address2`, {method: "DELETE"});
                        document.location.reload(true);
                    });
                    break;
                case "address3":
                    newElement = document.createElement("li");
                    newElement.setAttribute("id", "address3");
                    currentElement = document.getElementById("addressList");
                    newElement.innerHTML = value;
                    currentElement.appendChild(newElement);
                    newElement = document.createElement("button");
                    newElement.innerHTML = "Delete";
                    newElement.setAttribute("id", "deleteAddress3");
                    currentElement = document.getElementById("address3");
                    currentElement.appendChild(newElement);
                    document.getElementById("deleteAddress3").addEventListener("click", () =>{
                        fetch(`/addresses?id=${customerId}&address=address3`, {method: "DELETE"});
                        document.location.reload(true);
                    });
                    break;
                case "address4":
                    newElement = document.createElement("li");
                    newElement.setAttribute("id", "address4");
                    currentElement = document.getElementById("addressList");
                    newElement.innerHTML = value;
                    currentElement.appendChild(newElement);
                    newElement = document.createElement("button");
                    newElement.innerHTML = "Delete";
                    newElement.setAttribute("id", "deleteAddress4");
                    currentElement = document.getElementById("address4");
                    currentElement.appendChild(newElement);
                    document.getElementById("deleteAddress4").addEventListener("click", () =>{
                        fetch(`/addresses?id=${customerId}&address=address4`, {method: "DELETE"});
                        document.location.reload(true);
                    });
                    break;
                case "address5":
                    newElement = document.createElement("li");
                    newElement.setAttribute("id", "address5");
                    currentElement = document.getElementById("addressList");
                    newElement.innerHTML = value;
                    currentElement.appendChild(newElement);
                    newElement = document.createElement("button");
                    newElement.innerHTML = "Delete";
                    newElement.setAttribute("id", "deleteAddress5");
                    currentElement = document.getElementById("address5");
                    currentElement.appendChild(newElement);
                    document.getElementById("deleteAddress5").addEventListener("click", () =>{
                        fetch(`/addresses?id=${customerId}&address=address5`, {method: "DELETE"});
                        document.location.reload(true);
                    });
                    break;
            }
        }
    }
    let addressCount = 0;
    for(let [key, value] of Object.entries(customerAddresses)){
        if(value != null) addressCount += 1;
    }
    if(addressCount === 5){
        document.getElementById("addNewAddress").style.visibility = "hidden";
    }else document.getElementById("addNewAddress").style.visibility = "visible";
}

const buildPage = () =>{
    let customerInfo = null;
    let addresses = null;
    fetch("/signUpLogIn", { method: "GET"})
    .then(response =>{
        if(response.ok) return response.json();
    
        renderError(response);
    })
    .then(response =>{
        customerInfo = response.customerInfo;
        fetch(`/addresses?id=${customerInfo.id}`, { method: "GET"})
        .then(response =>{
            if(response.ok) return response.json();

            renderError(response);
        })
        .then(response =>{
        addresses= response;
        buildAddressList(addresses);
        });
    });
}