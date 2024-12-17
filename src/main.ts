import UserInfo from "./UserInfo";

// Operational
let nameInputEl = document.getElementById("input-playername") as HTMLInputElement;
let clothesEl = document.getElementById("input-clothes") as HTMLInputElement;
let inspectButtonEl = document.getElementById("input-inspect") as HTMLElement;

// Graphical
let aliasEl = document.getElementById("alias") as HTMLElement;
let uuidEl = document.getElementById("uuid") as HTMLElement;
let showcaseEl = document.getElementById("showcase") as HTMLElement;

inspectButtonEl.addEventListener('click', async () => {
	const response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${nameInputEl.value}`);
	const userInfo = await response.json();

	buildImage(userInfo as unknown as UserInfo);
});

const buildImage = (userInfo:UserInfo) => {

	if(userInfo["errorMessage"] != undefined)
	{
		uuidEl.innerHTML = "USER WAS NOT FOUND";
		return;
	}

	// A little hacky as we promised a name.
	// Had we not error checked above this would go to hell
	aliasEl.innerHTML = userInfo.name;
	uuidEl.innerHTML = userInfo.id;

	let url = "https://crafatar.com/renders/body/";
	let arg:string = clothesEl.checked ? "overlay=true" : ""; // The api does not accept a false argument for some reason
	showcaseEl.setAttribute("src", `${url}${userInfo.id}${arg}`);
};