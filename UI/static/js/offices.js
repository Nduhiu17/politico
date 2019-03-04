
let baseUrl = 'https://politico-api-server.herokuapp.com';
let currentToken = `Bearer ${localStorage.getItem("token")}`;//getting token from local storage and assigning it to a reusable variable

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

let goToOfficeDetailsPage = (officeId) => {
    localStorage.setItem("officeId",officeId)
    window.location.replace("office-details.html");
}

