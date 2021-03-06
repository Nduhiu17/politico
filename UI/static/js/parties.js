let baseUrl = 'https://politico-api-server.herokuapp.com';
let currentToken = `Bearer ${localStorage.getItem("token")}`;

if(localStorage.getItem("token") == null){
    window.location.replace("signin.html");
}

const postPartyApi = (data)=>{
    return fetch('https://politico-api-server.herokuapp.com/api/v2/parties', {
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



let postParty = () => {//function to log in a user
    let name = document.getElementById('party-name').value;
    let slogan = document.getElementById('party-slogan').value;
    let hqaddress = document.getElementById('party-address').value;
    let logoUrl = document.getElementById('party-logo').value;
    let data = {//asigning variables to log in details
        name: name,
        slogan: slogan,
        hqaddress:hqaddress,
        logoUrl:logoUrl

    }

    postPartyApi(data).then(res=> {
        if(res.error){
            window.alert(res.error)
        }else {
            if (res.status === 201) {//checking a successful post of a party
                window.location.replace("parties.html");//redirecting to parties page
            }
    }})
}

let loadParties = () => {
    getParties(`${baseUrl}/api/v2/parties`).then(res => {
        const allData = res.data;
        document.getElementById('main-container-parties').innerHTML = generateAllParties(allData);
    });
};

const getParties = (url) => {//function to get parties from api
    return fetch(url,{ method: "GET",headers: { "Content-Type": "application/json;charset=UTF-8", Authorization: currentToken}})
        .then((res) => res.json())
        .catch(() => {
    });
};

const generateAllParties = (allData) => {//function to render parties to html
    let output = `<tr>
                 <th>Party Name</th>
                 <th>Slogan</th>
                 <th>Head Quaters</th>
                 <th>Registration Date</th>
               
                 </tr>`;
    allData.reverse().forEach((party) => {//looping over the fetched data
        output +=
            `<tr onclick="goToPartyDetailsPage(${party.id})"><td>${party.name}</td>
                 <td>${party.slogan}</td>
                 <td>${party.hqaddress}</td>
                 <td>${party.date_created}</td>
                 </tr>`
    });
    return output
};

let goToPartyDetailsPage = (partyId) => {
    localStorage.setItem("partyId",partyId)
    window.location.replace("party-details.html");
}