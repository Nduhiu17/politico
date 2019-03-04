const id = localStorage.getItem("partyId");
let currentToken = `Bearer ${localStorage.getItem("token")}`;


const getPartyDetail = () => {//function that gets party details from api
    return fetch(`https://politico-api-server.herokuapp.com/api/v2/parties/${id}`, {
        method: "GET",
        headers: {"Content-Type": "application/json;charset=UTF-8", Authorization: currentToken}
    }).then(res => res.json())
};

const generatePartyDetail = (party) => {//function that renders party details to html page
    return `
             <div class="party-container-wrapper">
            <div class="party-contents">
                <div class="party-name-details">
                   Party Name: ${party.name}
                </div>
                <div class="party-slogan-details">
                    Party Slogan: 
                    <p>${party.slogan}</p> 
                </div>
            </div>
            <div class="party-logo-details">
                <div class="profile-photo">
                        <img src="./images/republican.jpeg" alt="photo">
                </div>
            </div>
        </div>
`;
};


const onloadPartyDetailsPage = () =>{//function that loads data to html page
    getPartyDetail().then(res=> {
        document.getElementById('party-details-main').innerHTML = generatePartyDetail(res.data);
    })

}

const deleteParty = () => {
    deleteApi(id).then(res => {
        if(res.status == 204){//check for successful delete
            // debugger
            window.location.replace("parties.html");
            window.alert(res.data);
        }
         if(res.error){//check for error
            window.alert(res.error)//alerting the error messages
        }

    })
}


const deleteApi = (id) =>{//function to delete a party
    let currentToken = `Bearer ${localStorage.getItem("token")}`;
     return fetch(`https://politico-api-server.herokuapp.com/api/v2/parties/${id}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json;charset=UTF-8", Authorization: currentToken}
    }).then(res => res.json())
}

const updateParty = () =>{//function to redirect to modify party page
    window.location.replace("edit-political-party.html");
}



const onloadUpdateParty = () => {//function to insert data that is to be updated to forms
    getPartyDetail().then(res => {
        document.getElementById('update-party-name').value=`${res.data.name}`
    })
}

const onsubmitUpdatedParty = (event) =>{//function that updates data
    event.preventDefault()
    const newName = {
        name:event.target["party-name"].value
    }
    updatePartyApi(newName).then(res =>{
            if(res.status == 201){//check for successful update
                window.location.replace("parties.html");
                window.alert(res.message);//alerting the successful messages
            }
            if(res.error){//check for error
            window.alert(res.error)//alerting the error messages
        }

    })

}

const updatePartyApi = (data) =>{//calling api patch endpoint
    return fetch(`https://politico-api-server.herokuapp.com/api/v2/parties/${id}/name`, {
        method: 'PATCH',
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
}