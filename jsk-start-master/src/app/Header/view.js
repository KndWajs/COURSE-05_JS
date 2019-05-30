export const headerView = () => {
	const header = document.querySelector("#header")

	const currentDate = document.getElementById("currentDate")
	const now = new Date();
	currentDate.innerText = now.toLocaleDateString();

	document.getElementById("title").innerText = 'CapgeminiCalendar'

	const changeColor = color => {
		header.style.color = color
	}
	const setContent = content => {
		header.innerText = content
	}

	return {
		changeColor,
		setContent,
	}
}