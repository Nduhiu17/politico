
let baseUrl = 'https://politico-api-server.herokuapp.com';
let currentToken = `Bearer ${localStorage.getItem("token")}`;//getting token from local storage and assigning it to a reusable variable

if(localStorage.getItem("token") == null){
    window.location.replace("signin.html");
}
let loadOffices = () => {
    getOffices(`${baseUrl}/api/v2/offices`).then(res => {
        const allData = res.data;
        document.getElementById('main-container-offices').innerHTML = generateAllOffices(allData);
    });
};

const getOffices = (url) => {//function that gets offices from the api
    return fetch(url,{ method: "GET",headers: { "Content-Type": "application/json;charset=UTF-8", Authorization: currentToken}})
        .then((res) => res.json())
        .catch(() => {
    });
};

const generateAllOffices = (allData) => {//function that renders the offices to the html
    let output = `<tr>
                  <th>Office Name</th>
                  <th>Office Type</th>
                  <th>Registered Candidates</th>
                </tr>`;
    allData.reverse().forEach((office) => {//looping over the fetched data
        output +=
            `<tr><td> <a onclick="goToOfficeDetailsPage(${office.id})">${office.name}</a></td>
                  <td>${office.office_type}</td>
                  <td>${office.candindates.length}</td>
                </tr>`
    });
    return output
};

let goToOfficeDetailsPage = (officeId) => {//function that directs to office-details page
    localStorage.setItem("officeId",officeId)
    window.location.replace("office-details.html");
}

const postOfficeApi = (data)=>{//function to post data to the api
    return fetch('https://politico-api-server.herokuapp.com/api/v2/offices', {
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



let postOffice = () => {//function that collects offices details from forms
    let name = document.getElementById('office-name').value;
    let office_type = document.getElementById('office-type').value;
    let data = {//asigning variables to log in details
        name: name,
        office_type: office_type
    }

    postOfficeApi(data).then(res=> {//checking for errors
        if(res.error){
            window.alert(res.error)
        }else {
            if (res.status === 201) {//checking a successful office creation
                window.location.replace("index.html");//redirecting to home page after a successful login
            }
    }})
}
