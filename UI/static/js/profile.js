let currentToken = `Bearer ${localStorage.getItem("token")}`;

let pd = document.querySelector("#main-profile-body");

const loadProfileDetails = () => {
let user = JSON.parse(localStorage.getItem('user'));
console.log("my user",user.firstname)
    pd.innerHTML = `
        <div class="personal-details">
            <div class="photo-details">
                <img src="./images/profile.png" alt="photo">
            </div>
            <div class="fname-details">
                First Name: ${user.firstname}
            </div>
            <div class="lname-details">
                Last Name: ${user.lastname}
            </div>
            <div class="lname-details">
                Email: ${user.email}
            </div>
            <div class="lname-details">
                Registration County: ${user.county}
            </div>
             <div class="lname-details">
                Who you are: ${user.roles}
            </div>
                 <div class="lname-details">
                Registered on: ${user.date_created}
            </div>
            <div class="change-password-details">
                <button class="button"><a href="reset-password.html">Change Password</a></button>
            </div>
        </div>
        <div class="statistics">
            <div class="statistics-header">
                Your Voting Statistics
            </div>
            <div class="statistic-data">
                <table class="offices-details">
                    <tr>
                      <th>Office</th>
                      <th>First Name</th>
                      <th>Party</th>
                      <th>Slogan</th>
                    </tr>
                    <tr>
                      <td>Senator</td>
                      <td>Jane</td>
                      <td>Democrats</td>
                      <td>Together we can</td>
                    </tr>
                    <tr>
                        <td>Governor </td>
                        <td>Trump</td>
                        <td>Republican</td>
                        <td>Forward Ever</td>
                    </tr>
                      <tr>
                        <td>Member of Parliament </td>
                        <td>Clinton</td>
                        <td>Conservative Party</td>
                        <td>Time for change</td>
                     </tr>
                      <tr>
                        <td>Women Rep </td>
                        <td>Carlo</td>
                        <td>Eagles Party</td>
                        <td>Higher and Higher</td>
                      </tr>
                </table>
            </div>
        </div>
    `;
};