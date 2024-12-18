import UserInfo from "./UserInfo";

// Operational
let nameInputEl = document.getElementById("input-playername") as HTMLInputElement;
nameInputEl.value = "VonRiddarn";
let clothesEl = document.getElementById("input-clothes") as HTMLInputElement;
clothesEl.checked = true;
let inspectButtonEl = document.getElementById("input-inspect") as HTMLElement;

// Graphical
let aliasEl = document.getElementById("alias") as HTMLElement;
let uuidEl = document.getElementById("uuid") as HTMLElement;
let showcaseEl = document.getElementById("showcase") as HTMLElement;

inspectButtonEl.addEventListener('click', async () => {
	const response = await fetch(`https://playerdb.co/api/player/minecraft/${nameInputEl.value}`);
	const userInfo = await response.json();

	buildImage(userInfo as unknown as UserInfo);
});

const buildImage = (userInfo:UserInfo) => {

	if(!userInfo.data.player)
	{
		uuidEl.innerHTML = "Player does not exist!";
		showcaseEl.setAttribute("src", ``);
		aliasEl.innerHTML = nameInputEl.value;
		return;
	}
		
	let url = "https://crafatar.com/renders/body/";
	let arg:string = clothesEl.checked ? "overlay" : ""; // The api does not accept a false argument for some reason
	showcaseEl.setAttribute("src", `${url}${userInfo.data.player.raw_id}?${arg}&scale=10&size=512`);
	aliasEl.innerHTML = userInfo.data.player.username;
	uuidEl.innerHTML = userInfo.data.player.raw_id;
};