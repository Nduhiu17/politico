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