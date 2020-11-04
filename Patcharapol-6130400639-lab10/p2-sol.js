const fetch = require('node-fetch');

async function getUserAsync() {
    let response = await fetch(`https://api.github.com/users`);
    let data = await response.json();

    data.forEach(async (user) => {
        let responseName = await fetch(`https://api.github.com/users/${user.login}`);
        let fulldata = await responseName.json();
        console.log({login: user.login, name: fulldata.name});
    });
}

getUserAsync();