const loginApi = (data)=>{//function that logs in a user
    return fetch('https://politico-api-server.herokuapp.com/api/v2/auth/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)

        })
        .then((res) =>{
            return res.json()
        })
};



let login = () => {
    let email = document.getElementById('login-email').value;
    let password = document.getElementById('login-password').value;
    let data = {//asigning variables to log in details
        email: email,
        password: password
    }

    loginApi(data).then(res=> {
        if(res.error){
            window.alert(res.error)
        }else {
            console.log(data)
            localStorage.setItem("token",res .access_token)
            if (res.message === "logged in") {//checking a successful login
                window.location.replace("index.html");//redirecting to home page after a successful login
            }
    }})
}

const registerApi = (data)=>{//function that hits api endpoint with the data collected
    return fetch('https://politico-api-server.herokuapp.com/api/v2/auth/signup', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)

        })
        .then((res) =>{
            return res.json()
        })
};



let register = () => {//function that collects registration details
    let firstname = document.getElementById('signup-fname').value;
    let lastname = document.getElementById('signup-lname').value;
    let othername = document.getElementById('signup-oname').value;
    let email = document.getElementById('signup-email').value;
    let phonenumber = document.getElementById('signup-phone').value;
    let county = document.getElementById('signup-county').value;
    let nationalid = document.getElementById('signup-nationalid').value;
    let passporturl = document.getElementById('signup-passporturl').value;
    let password = document.getElementById('signup-password').value;
    let rpassword = document.getElementById('signup-rpassword').value;
    let data = {//asigning variable to sign up details
        email: email,
        password: password,
        firstname:firstname,
        lastname:lastname,
        othername:othername,
        phonenumber:phonenumber,
        county:county,
        nationalid:nationalid,
        passporturl:passporturl,
        repeatpassword:rpassword
    }

    registerApi(data).then(res=> {
        if(res.error){
            window.alert(res.error)
        }else {
            console.log(res)
            localStorage.setItem("token",res.token)
            if (res.message === "User registered") {//checking a successful registration
                window.location.replace("index.html");//redirecting to index page after a successful registration
            }
    }})
}