const date1 = 20190525;
const sampleEvent1 = {
	title: "job interview",
    place: "capgemini office",
    description: "should be nice meeting",
    members: ['Adam Małysz', 'Robert Kubica'],
}

const date2 = 20190601;
const sampleEvent2 = {
	title: "tea time",
    place: "office",
    description: "meeting",
    members: ['Adam ', 'Robert '],
}

const date3 = 20190603;
const sampleEvent3 = {
	title: "pizza day",
    place: "restaurant",
    description: "pizza meeting",
    members: ['Adam ', 'Robert'],
}

const date4 = 20190604;
const sampleEvent4 = {
	title: "shopping",
    place: "Shopping center",
    description: "we want to buy house",
    members: ['I', 'Wife'],
}

const date5 = 20190605;
const sampleEvent5 = {
	title: "tea time",
    place: "office",
    description: "meeting in office",
    members: ['Damian J', 'Krzysztof W'],
}

const sampleEvent6 = {
	title: "time",
    place: "ofe",
    description: "mee",
    members: ['Ad ', 'Ro '],
}

export let sampleDataMap = new Map();

sampleDataMap.set(date1, [sampleEvent1, sampleEvent6]);
sampleDataMap.set(date2, [sampleEvent2]);
sampleDataMap.set(date3, [sampleEvent3]);
sampleDataMap.set(date4, [sampleEvent4]);
sampleDataMap.set(date5, [sampleEvent5, sampleEvent6]);

