let login = () => {//function to log in a user
    let email = document.getElementById('login-email').value;
    let password = document.getElementById('login-password').value;
    let data = {//asigning variables to log in details
        email: email,
        password: password
    }


    fetch('https://politico-api-server.herokuapp.com/api/v2/auth/login', {//fetching the login url
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)

        })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            localStorage.setItem("token",data.access_token)
            if (data.message === "logged in") {//checking a successful login
                window.location.replace("index.html");//redirecting to home page after a successful login
            }
            if(data.message){
                window.alert(data.message)
            }
            })
        .catch(error => {
            console.log(error);
        })
}