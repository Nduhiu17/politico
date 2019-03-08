let currentToken = `Bearer ${localStorage.getItem("token")}`;
let baseUrl = 'https://politico-api-server.herokuapp.com';

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
                window.location.replace("index.html");//redirecting to home page after a successful login
            }
    }})
}

let loadApplications = () => {
    getApplications(`${baseUrl}/api/v2/applications`).then(res => {
        const allData = res.data;
        document.getElementById('main-container-applications').innerHTML = generateAllApplications(allData);
    });
};

const getApplications = (url) => {//function to get applications from api
    return fetch(url,{ method: "GET",headers: { "Content-Type": "application/json;charset=UTF-8", Authorization: currentToken}})
        .then((res) => res.json())
        .catch(() => {
    });
};

const generateAllApplications = (allData) => {//function to render applications to html
    let output = `<tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Office</th>
                <th>Party</th>
                <th>County</th>
                <th>Application Date</th>
                <th>Action</th>
            </tr>`;
    allData.reverse().forEach((application) => {//looping over the fetched data
        output +=
               ` <tr>
                    <td>${application.user.firstname}</td>
                    <td>${application.user.lastname}</td>
                    <td>${application.office.name}</td>
                    <td>${application.party.name}</td>
                    <td>${application.user.county}</td>
                    <td>${application.date_created}</td>
                    <td><button class="approve-button" id="approve-button" onclick="postCandindateObject(${application.id})">Approve</button></td>
                </tr>`
    });
    return output
};

let postCandindateObject = (application) => {
    getApplications(`${baseUrl}/api/v2/applications`).then(res => {
        const allData = res.data;
            allData.reverse().forEach((obj) => {//looping over the fetched data
            if(obj.id == application){
                let data = {
                party:(obj.party.id).toString(),
                office:(obj.office.id).toString(),
                candidate:(obj.user.id).toString()
                }
   localStorage.setItem("candidate",(obj.user.id)) //set obj.user.id
   const postCandidateApi = (data)=>{
    return fetch(`https://politico-api-server.herokuapp.com/api/v2/office/${obj.office.id}/register`, {
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

       postCandidateApi(data).then(res=> {
        if(res.error){
            window.alert(res.error)
        }else {
            if (res.status === 201) {//checking a successful post of a candidate
                window.alert(res.message)
                window.location.replace("applications.html");//redirecting to applications page
            }
    }})
    }
    });
    });
};

