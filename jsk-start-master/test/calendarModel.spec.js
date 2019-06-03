import * as model from "../src/app/Calendar/calendarModel"

describe("calendarModel", () => {
    it("should return map with four days when get events from fifth month", () => {
        // given
        const year = 2019;
        const month = 5;

        // when
        const daysWithEvents = model.getEvents(year, month);
        const eventsInSpecificDay = daysWithEvents.get(20190605);

        // then
        expect(daysWithEvents.size).toEqual(4);
        expect(eventsInSpecificDay.length).toEqual(2);
    })

    it("should throw error when year is beyond scope", () => {
        // given
        const year = 1850;
        const month = 5;

        // when
        let message = '';
        try {
            model.getEvents(year, month);
        } catch (e) {
            message = e.message;
        }

        // then
        expect(message).toEqual('InvalidYearNo');
    })

    it("should throw error when month is beyond scope", () => {
        // given
        const year = 2018;
        const month = 15;

        // when
        let message = '';
        try {
            model.getEvents(year, month);
        } catch (e) {
            message = e.message;
        }

        // then
        expect(message).toEqual('InvalidMonthNo');
    })

    it("should return one event when delete one of two events", () => {
        // given
        const year = 2019;
        const month = 5;
        const eventId = "020190605";

        // when
        model.deleteEvent(eventId);
        const daysWithEvents = model.getEvents(year, month);
        const eventsInSpecificDay = daysWithEvents.get(20190605);

        // then
        expect(daysWithEvents.size).toEqual(4);
        expect(eventsInSpecificDay.length).toEqual(1);
    })

    it("should throw error when eventId point to non existing event", () => {
        // given
        const eventId = "320190605";

        // when
        let message = '';
        try {
            model.deleteEvent(eventId);
        } catch (e) {
            message = e.message;
        }

        // then
        expect(message).toEqual('ThereIsNoEventWithSpecifiedId');
    })

    it("should return two events when add one to two events in specific day", () => {
        // given
        const year = 2019;
        const month = 5;
        const dayId = 20190605;
        const newEvent = {
            title: "test title",
            place: "test place",
            description: "test description",
            members: "test members",
        }

        // when
        model.addEvent(dayId, newEvent);
        const daysWithEvents = model.getEvents(year, month);
        const eventsInSpecificDay = daysWithEvents.get(dayId);

        // then
        expect(daysWithEvents.size).toEqual(4);
        expect(eventsInSpecificDay.length).toEqual(2);
    })

    it("should return one event when add one to empty day", () => {
        // given
        const year = 2019;
        const month = 5;
        const dayId = 20190625;
        const newEvent = {
            title: "test title",
            place: "test place",
            description: "test description",
            members: "test members",
        }

        // when
        model.addEvent(dayId, newEvent);
        const daysWithEvents = model.getEvents(year, month);
        const eventsInSpecificDay = daysWithEvents.get(dayId);

        // then
        expect(daysWithEvents.size).toEqual(5);
        expect(eventsInSpecificDay.length).toEqual(1);
    })

    it("should throw error when title of new event is empty", () => {
        // given
        const dayId = 20190605;
        const newEvent = {
            title: "",
            place: "test place",
            description: "test description",
            members: "test members",
        }

        // when
        let message = '';
        try {
            model.addEvent(dayId, newEvent);
        } catch (e) {
            message = e.message;
        }

        // then
        expect(message).toEqual('TitleFieldIsEmpty');
    })

    it("should throw error when title of new event is empty", () => {
        // given
        const dayId = 20190605;
        const newEvent = {
            title: "test title",
            place: "",
            description: "test description",
            members: "test members",
        }

        // when
        let message = '';
        try {
            model.addEvent(dayId, newEvent);
        } catch (e) {
            message = e.message;
        }

        // then
        expect(message).toEqual('PlaceFieldIsEmpty');
    })

    it("should throw error when dayId is wrong", () => {
        // given
        const dayId = 20190655;        
        const newEvent = {
            title: "test title",
            place: "",
            description: "test description",
            members: "test members",
        }

        // when
        let message = '';
        try {
            model.addEvent(dayId, newEvent);
        } catch (e) {
            message = e.message;
        }

        // then
        expect(message).toEqual('InvalidDayNo');
    })

})