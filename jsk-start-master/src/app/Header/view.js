export const headerView = () => {
	const header = document.querySelector("#header")
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
