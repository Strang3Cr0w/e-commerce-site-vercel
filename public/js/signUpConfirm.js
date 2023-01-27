const fetchCustomerInformation = () =>{
    fetch("/signUpLogIn", { method: "GET"})
    .then(response =>{
        if(response.ok) return response.json();

        renderError(response);
    })
    .then(response =>{
        const loggedIn = response.loggedIn;
        const customerInfo = response.customerInfo;
        if(loggedIn){
            document.getElementById("welcome").innerHTML = `Welcome ${customerInfo.first_name}`;
        }
    })
}

fetchCustomerInformation();