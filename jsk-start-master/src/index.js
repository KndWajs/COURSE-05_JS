import { calendar } from "./common/calendar";
import { hederController } from "./app/Header/controler"
import { buttonView } from "./app/Button/view"
import './styles/style.css'

const initButton = buttonView().initButton
const setHeaderColorRed = hederController().setHeaderColorRed

const calendarWeeks = calendar.monthDays(2019, 5)

const render = () => {
	console.log(calendarWeeks)
	initButton(setHeaderColorRed)
}

render()
