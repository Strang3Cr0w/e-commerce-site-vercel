const fetchCustomerInfo = () =>{
    let customerInfo = null;
    fetch("/signUpLogIn", { method: "GET"})
    .then(response =>{
        if(response.ok) return response.json();
    
        renderError(response);
    })
    .then(response =>{
        customerInfo = response.customerInfo;
        document.getElementById("id").setAttribute("value", customerInfo.id);
    });
}

fetchCustomerInfo();

const submit = document.getElementById("submit");

const submitAddress = () =>{
    window.location.replace("/pageRouter/account");
}