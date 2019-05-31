import * as model from "./headerModel"
import * as view from "./headerView"

const initHeader = () => {
	view.setTitle(model.headerModel.title);
	view.setCurrentDate(model.headerModel.currentDate);
}

initHeader();
