export const buttonView = () => {
	const button = document.querySelector("#change-color")
	const initButton = cb => {
		button.addEventListener("click", () => {
			cb()
		})
	}
	return {
		initButton,
	}
}
