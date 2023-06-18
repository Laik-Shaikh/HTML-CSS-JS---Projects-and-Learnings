const API_URL  = "https://api.github.com/users/";

const form = document.getElementById('form');
const main = document.getElementById('main');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = document.querySelector('input[name=search]').value;
    
    getUserProfile(value);
});

async function getUserProfile(username) {
    const User_Profile_URL = `${API_URL}${username}`;
    const response = await fetch(User_Profile_URL);
    const data = await response.json();
    createUserCard(data);
}

function createUserCard(user) {
    const CARD_HTML = `
        <div class="card">
            <div class="img-container">
                <img src="${user.avatar_url}" alt="${user.name}" />
            </div>
            <div class="user-info">
                <a target="_blank" href="${user.html_url}">${user.name}</a>
                <p>${user.bio}</p>

                <ul class="user-stats">
                    <li class="no_repo">Public Repo: <span>${user.public_repos}</span></li>
                    <li class="followers">Followers: <span>${user.followers}</span></li>
                    <li class="following">Following: <span>${user.following}</span></li>
                </ul>
            </div>
        </div>
    
    `;

    main.innerHTML = CARD_HTML;

}