const id = localStorage.getItem("officeId");
const el = document.querySelector("#office-details-main");
let currentToken = `Bearer ${localStorage.getItem("token")}`;
const pl = document.querySelector("#politician-details-main");
const userId = (localStorage.getItem("candidate"));

if(localStorage.getItem("token") == null) {
    window.location.replace("signin.html");
}

const getOfficeDetail = () => {//getting office details from the api
    return fetch(`https://politico-api-server.herokuapp.com/api/v2/offices/${id}`,{ method: "GET",headers: { "Content-Type": "application/json;charset=UTF-8", Authorization: currentToken}}).then(res => res.json())
};

const htmlFormatOfficeDetail = (office) => {
    el.innerHTML = `
               <div class="office-details-header">
                    <div class="name-detail">
                        <p>Name: ${office.data.name}</p>
                    </div>
                    <div class="conty-detail">
                        <p>Office Type: ${office.data.office_type}</p>
                    </div>
                    <div class="vote-detail">
                        <p>Registered Candindates: ${office.data.candindates.length}</p>
                    </div>
                </div>
    `;

    document.getElementById('office-details-table').innerHTML = generateAllCandidates(office.data.candindates);


};



getOfficeDetail().then(res => {
    htmlFormatOfficeDetail(res)
});


const generateAllCandidates = (allData) => {//rendering candidate details
    let candidates = {
    candidates:allData
    }

    localStorage.candidates = JSON.stringify(candidates);
    let output = `    <tr>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Party</th>
                      <th>Party Slogan</th>
                      <th>County</th>
                      <th>No. Of Votes</th>
                    </tr>`;
    allData.reverse().forEach((candidate) => {//looping over the fetched data for candidates
        output +=

            `        <tr onclick="goToCandidateDetailsPage(${candidate.id})">
                      <td>${candidate.firstname}</td>
                      <td>${candidate.lastname}</td>
                      <td>${candidate.party.name}</td>
                      <td>${candidate.party.slogan}</td>
                       <td>${candidate.county}</td>
                      <td>${candidate.votes}</td>
                    </tr>`
    });
    return output

};

let goToCandidateDetailsPage = (candidateId) => {
    localStorage.setItem("candidateId",candidateId)
    window.location.replace("politician-details.html");
}

candindateId = parseInt(localStorage.candidateId);

let candidateObjects = JSON.parse(localStorage.candidates);
candidateObjects = candidateObjects.candidates
for (var key in candidateObjects) {
if (candidateObjects.hasOwnProperty(key)) {
  if((candidateObjects[key].id) == candindateId){
  localStorage.setItem("candidate",(candidateObjects[key].id))
  }
  }
  }



const loadPoliticianDetail = () => {
    pl.innerHTML = `
                 <div class="left-div">
                <div class="profile-photo">
                    <img src="./images/profile.png" alt="photo">
                </div>
            </div>
            <div class="right-div">
                <div class="first-name-div">
                    First Name:${candidateObjects[key].firstname}
                </div>
                <div class="last-name-div">
                    Last Name: ${candidateObjects[key].lastname}
                </div>
                <div class="party-name">
                   Party:${candidateObjects[key].party.name}
                </div>
                <div class="party-slogan">
                    Slogan:${candidateObjects[key].party.slogan}
                </div>
                <div class="vote-div" id="edit-party-button" onclick="votePolitician()">
                    <p>Vote</p>
                </div>
            </div>
    `;
};

const votePolitician = () =>{
postVoteApi(vote)
}

let vote = {
candidate:userId,
office:id
}

const postVoteApi = (vote)=>{
    return fetch('https://politico-api-server.herokuapp.com/api/v2/votes', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
             Authorization: currentToken
        },
        body: JSON.stringify(vote)

        })
        .then((res) =>{
            return res.json()
        })
};


    postVoteApi(vote).then(res=> {
        if(res.error){
            alert(res.error)
        }
         if(res.message) {
            alert(res.message)
             window.location.replace("office-details.html");

        }
})