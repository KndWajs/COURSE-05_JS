import { headerModel } from "./model"
import { headerView } from "./view"

const view = headerView()

export const hederController = () => {
	view.setContent(headerModel.value)
	const setHeaderColorRed = () => {
		console.log(headerModel)
		view.changeColor(headerModel.otherColor)
	}

	return {
		setHeaderColorRed,
	}
}
