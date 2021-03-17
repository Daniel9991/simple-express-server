const msgBox = document.querySelector('#message-box');


const allTeamsBtn = document.querySelector('#all-teams-actionable');


const teamBtn = document.querySelector('#team-actionable');
const teamEntryGroup = document.querySelector('#team-entry-group');
const teamInput = document.querySelector('#team-input');
const teamSubmit = document.querySelector('#team-find');


const playerBtn = document.querySelector('#player-actionable');
const playerEntryGroup = document.querySelector('#player-entry-group');
const playerInput = document.querySelector('#player-input');
const playerSubmit = document.querySelector('#player-find');


allTeamsBtn.addEventListener('click', () => {

	// Hide the other inputs
	teamBtn.style.display = 'block';
	teamEntryGroup.style.display = 'none';
	playerBtn.style.display = 'block';
	playerEntryGroup.style.display = 'none';

	// Fetching data from the api
	fetch('/api/teams')
	.then(res => {
		if(res.status === 200){
			displayTeamsData(res.json());
		}
		else{
			handleBadRequest(res.json());
		}
	})
	.catch(err => {console.log(err); displayMessage('An error ocurred')});
});


teamBtn.addEventListener('click', () => {
	
	// Hide the player input
	playerBtn.style.display = 'block';
	playerEntryGroup.style.display = 'none';

	// Show team input
	teamBtn.style.display = 'none';
	teamEntryGroup.style.display = 'flex';
});


playerBtn.addEventListener('click', () => {
	
	// Hide the team input
	teamBtn.style.display = 'block';
	teamEntryGroup.style.display = 'none';

	// Show player input
	playerBtn.style.display = 'none';
	playerEntryGroup.style.display = 'flex';
});


teamSubmit.addEventListener('click', () => {
	if(teamInput.value.trim() === ''){
		displayMessage('A team name must be provided.');
	}
	else{
		fetch(`/api/team/${teamInput.value.trim()}`)
		.then(res => {
			if(res.status === 200){
				displaySingleTeamData(res.json());
			}
			else{
				handleBadRequest(res.json());
			}
		})
		.catch(err => {console.log(err); displayMessage('An error ocurred')});
	}
});


playerSubmit.addEventListener('click', () => {
	if(playerInput.value.trim() === ''){
		displayMessage('A player name must be provided.');
	}
	else{
		fetch(`/api/player/${playerInput.value.trim()}`)
		.then(res => {
			if(res.status === 200){
				displayPlayerData(res.json());
			}
			else{
				handleBadRequest(res.json());
			}
		})
		.catch(err => {console.log(err); displayMessage('An error ocurred')});
	}
});


function displayMessage(msg){
	msgBox.textContent = msg;
	msgBox.style.display = 'block';
	msgBox.style.opacity = '1';
	setTimeout(() => {
		msgBox.style.opacity = '0';
	}, 2000);
	setTimeout(() => {
		msgBox.style.display = 'none';
	}, 2600);
}


function displaySingleTeamData(dataPromise){
	dataPromise.then(teamInfo => {
		let output = `
			<h2 class="results-heading">${teamInfo.name}</h2>
			<p>Created on ${teamInfo.created}</p>
			<p class="results-subheading">Players:</p>
		`;

		// Looping over team players
		for(let player of teamInfo.players){
			output += `<p>${player}</p>`;
		}
		console.log(output);
		document.querySelector('#results').innerHTML = output;
	});
}


function displayTeamsData(dataPromise){
	dataPromise.then(allTeamNames => {
		let output = `<h2 class="results-heading">Team Names</h2>`;
		// Looping over team names
		for(let teamName of allTeamNames){
			output += `
				<p>${teamName}</p>
			`;
		}
		document.querySelector('#results').innerHTML = output;
	});
}


function displayPlayerData(dataPromise){
	dataPromise.then(playerInfo => {
		let output = `
			<h2 class="results-heading">${playerInfo.name}</h2>
			<p class="results-subheading">${playerInfo.country}</p>
		`;
	
		document.querySelector('#results').innerHTML = output;
	});
}


function handleBadRequest(badPromise){
	badPromise.then(jsonData => displayMessage(jsonData.msg));
}