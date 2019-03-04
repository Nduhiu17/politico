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