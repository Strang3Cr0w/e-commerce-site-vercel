//Log In Box Functionality
//Clicking on "Log In" will execute the following code. This code allows
//for the log in box to appear for a user to type in their username
//and password

const logIn = document.getElementById("logIn");
const logInContainerClose = document.getElementById("logInContainerClose");
const logInSubmit = document.getElementById("submit");
const welcomeContainer = document.getElementById("welcome");

const openLogInBox = () =>{
    document.getElementById("logInContainer").style.top = "17%";
}

logIn.addEventListener("click", openLogInBox);

logInContainerClose.addEventListener("click", ()=>{
    document.getElementById("logInContainer").style.top = "-100vh";
});

//Update Log In Status Functionality
//Updates Welcome message to include users name. Also tells the page that
//the user is logged in as well as allows the page to access customer
//information. Also dynamically changes the "Log In" and "Sign Up" links
//to "Log Out" and "Account"
let userAuthenticated = false;
let userName = null;
let customerId = null;
const signUp = document.getElementById("signUp");

const userAuthenticatedCheck = () =>{
    fetch("/profile", {method: "GET"}).then(response =>{
        if(response.ok) return response.json();
        renderError(response);
    }).then(response =>{
        if(response){
            userAuthenticated = true;
            userName = response.user.first_name + " " + response.user.last_name;
            customerId = response.user.id;
            document.getElementById("helloUser").innerHTML = `Welcome ${userName}!`;
            signUp.innerHTML = "Account";
            signUp.setAttribute("href", "/pageRouter/account");
            logIn.innerHTML = "Log Out";
            logIn.removeEventListener("click", openLogInBox);
            logIn.addEventListener("click", () =>{
                userAuthenticated = false;
                userName = null;
                fetch("/logOut", {method: "GET"});
                window.location.href = "/pageRouter/loggedOut";
            
            });
        }else{
            document.getElementById("helloUser").innerHTML = `Welcome!`;
            signUp.innerHTML = "Sign Up";
            signUp.setAttribute("href", "/pageRouter/signup");
            logIn.innerHTML = "Log In";
            logIn.addEventListener("click", openLogInBox);
        }
    });
}

userAuthenticatedCheck();


//Shopping Cart Link Functionality
//Checks if user is logged in before redirecting to shopping cart page
const shoppingCart = document.getElementById("shoppingCart");

shoppingCart.addEventListener("click", () =>{
    if(userAuthenticated === false){
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        logIn.click();
    }else{
        window.location.href = "/pageRouter/cart";
    }
});


//Add To Cart Functionality
//This code will change the text within the "Add to Cart" button to
//"Added!" when the user clicks on it. It will also add the item to
//customer's shopping cart. However, if userAuthenticated equals false, clicking on
//"Add to Cart" will scroll the page to the top and open the sign in box

const addConch = document.getElementById("conch");

addConch.addEventListener("click", () =>{
    if(userAuthenticated === true){
        document.getElementById("conch").innerHTML = "Added!";
        fetch(`/cart?id=${customerInfo.id}&shell=conch`, {method: "POST"});
        setTimeout(function(){
            document.getElementById("conch").innerHTML = "Add to Cart";
        }, 1000);
    }else{
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        logIn.click();
    }
});

const addBrokenHeart = document.getElementById("brokenHeart");

addBrokenHeart.addEventListener("click", () =>{
    if(userAuthenticated === true){
        document.getElementById("brokenHeart").innerHTML = "Added!";
        fetch(`/cart?id=${customerInfo.id}&shell=brokenHeart`, {method: "POST"});
        setTimeout(function(){
            document.getElementById("brokenHeart").innerHTML = "Add to Cart";
        }, 1000);
    }else{
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        logIn.click();
    }
});

const addOceansWail = document.getElementById("oceansWail");

addOceansWail.addEventListener("click", () =>{
    if(userAuthenticated === true){
        document.getElementById("oceansWail").innerHTML = "Added!";
        fetch(`/cart?id=${customerInfo.id}&shell=oceansWail`, {method: "POST"});
        setTimeout(function(){
            document.getElementById("oceansWail").innerHTML = "Add to Cart";
        }, 1000);
    }else{
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        logIn.click();
    }
});

const addTinyTitan = document.getElementById("tinyTitan");

addTinyTitan.addEventListener("click", () =>{
    if(userAuthenticated === true){
        document.getElementById("tinyTitan").innerHTML = "Added!";
        fetch(`/cart?id=${customerInfo.id}&shell=tinyTitan`, {method: "POST"});
        setTimeout(function(){
            document.getElementById("tinyTitan").innerHTML = "Add to Cart";
        }, 1000);
    }else{
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        logIn.click();
    }
});

const addSailorsBounty = document.getElementById("sailorsBounty");

addSailorsBounty.addEventListener("click", () =>{
    if(userAuthenticated == true){
        document.getElementById("sailorsBounty").innerHTML = "Added!";
        fetch(`/cart?id=${customerInfo.id}&shell=sailorsBounty`, {method: "POST"});
        setTimeout(function(){
            document.getElementById("sailorsBounty").innerHTML = "Add to Cart";
        }, 1000);
    }else{
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        logIn.click();
    }
});

const addWhitePrincess = document.getElementById("whitePrincess");

addWhitePrincess.addEventListener("click", () =>{
    if(userAuthenticated === true){
        document.getElementById("whitePrincess").innerHTML = "Added!";
        fetch(`/cart?id=${customerInfo.id}&shell=whitePrincess`, {method: "POST"});
        setTimeout(function(){
            document.getElementById("whitePrincess").innerHTML = "Add to Cart";
        }, 1000);
    }else{
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        logIn.click();
    }
});
