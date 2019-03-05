let currentToken = `Bearer ${localStorage.getItem("token")}`;

if(localStorage.getItem("token") == null){
    window.location.replace("signin.html");
}

const postApplicationApi = (data)=>{
    return fetch('https://politico-api-server.herokuapp.com/api/v2/applications', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
             Authorization: currentToken
        },
        body: JSON.stringify(data)

        })
        .then((res) =>{
            return res.json()
        })
};



let postApplication = () => {//function to get data from forms
    let office_name = document.getElementById('application-office-name').value;
    let party_name = document.getElementById('application-party-name').value;
    let data = {//asigning variables to application in details
        office_name: office_name,
        party_name: party_name

    }

    postApplicationApi(data).then(res=> {
        if(res.error){
            window.alert(res.error)
        }else {
            if (res.status === 201) {//checking a successful creation of an application
                window.location.replace("parties.html");//redirecting to home page after a successful login
            }
    }})
}