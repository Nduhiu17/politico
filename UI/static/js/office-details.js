const id = localStorage.getItem("officeId");
const el = document.querySelector("#office-details-main");
let currentToken = `Bearer ${localStorage.getItem("token")}`;

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
    let output = `    <tr>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Party</th>
                      <th>No. Of Votes</th>
                    </tr>`;
    allData.reverse().forEach((candidate) => {//looping over the fetched data for candidates
        output +=

            `        <tr>
                      <td><a href="politician-details.html">${candidate.firstname}</a></td>
                      <td>${candidate.lastname}</td>
                      <td>${candidate.party.name}</td>
                      <td>1000340</td>
                    </tr>`
    });
    return output
};
