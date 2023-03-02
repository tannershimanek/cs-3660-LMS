import LocalStorageService from "../model/local_storage_service.js";
import teamData from "../model/team_data.js";
import ListView from "../view/list_view.js";


export default class AppController {
    constructor() {
        console.log('AppController constructor');
        this.storage = new LocalStorageService(teamData, 'teamData');
        this.listView = new ListView(this.storage, {
            listContainerId: 'tableContainer',
            modalContainerId: 'exampleModal',
            alertContainerId: 'alertContainer',
            entitySingle: 'team',
            resetBtnId: 'resetBtn',
        });
        console.log(teamData);
        this.render();
        // this.runTests();
    }

    async render() {
        await this.listView.render();
    }

    // runTests() {
    //     //Unit Test 1
    //     this.storage.delete(1);
    //     if (this.storage.read(1) === null) console.log("delete successfull");
    //     if (this.storage.size == 2)
    //       console.log("Size reports correct value, two remaining");
    //     let model = JSON.parse(localStorage["teamData"]);
    //     if (this.storage.size === model.data.length)
    //       console.log("localstorage size equal to reported local data size, deletes persisted");

    //     //Unit test 2
    //     this.storage.create({
    //       id: 4,
    //       name: "Lions",
    //       coachId: 4,
    //       coachFirst: "Johnny",
    //       coachLast: "Appleseed",
    //       coachPhone: "801-333-4444",
    //       coachEmail: "johnny.appleseed@uvu.edu",
    //       coachLicenseLevel: 2,
    //       league: 1,
    //       division: 2,
    //     });
    //     if (this.storage.read(4).coachLast === "Appleseed")
    //       console.log("Create successfull");

    //     //Unit test 3
    //     this.storage.update({
    //       id: 2,
    //       name: "Killer Bunnie Rabbits",
    //       coachId: 2,
    //       coachFirst: "Peter",
    //       coachLast: "Rabbit",
    //       coachPhone: "801-444-4444",
    //       coachEmail: "peter.rabbit@playboy.edu",
    //       coachLicenseLevel: 1,
    //       league: 2,
    //       division: 2,
    //     });
    //     if (this.storage.read(2).coachEmail === "peter.rabbit@playboy.edu")
    //       console.log("Test Team Two updated successfully");

    //     this.storage.clear();
    //     this.storage.reset();
    //     if (this.storage.read(2).name === "Killer Bunnies")
    //       console.log("Reset, orig data restored");

    //     //Unit test 4
    //     this.storage.update({
    //       id: 2,
    //       name: "Killer Bunnie Rabbits",
    //       coachId: 2,
    //       coachFirst: "Peter",
    //       coachLast: "Rabbit",
    //       coachPhone: "801-444-4444",
    //       coachEmail: "peter.rabbit@playboy.edu",
    //       coachLicenseLevel: 1,
    //       league: 2,
    //       division: 2,
    //     });

    //     this.storage.clear(); //clear localStorage
    //     this.storage.retrieve();
    //     if (this.storage.read(2).coachEmail === "peter.rabbit@playboy.edu")
    //       console.log("After clear/retrieve, data still updated");
    //     this.storage.reset(); //reset data, original data should be there

    //     if (this.storage.read(2).name === "Killer Bunnies")
    //       console.log("After reset, orig data restored");

    //     //Unit Test 5
    //     let list = this.storage.list;

    //     if (list[0].name === "Raptors") {
    //       console.log("List retrieved correctly");
    //     }
    //     if (list.length===3) 
    //       console.log("List size is correct:3");

    //     //Unit test 6
    //     let teams = this.storage.filter({coachLicenseLevel:1});

    //     if (teams.length == 2) {
    //       console.log("Filter returned two teams with coachLicenseLevel=1");
    //     }

    //     //Unit test 7
    //     this.storage.reset();
    //     teams = this.storage.sort("name", "asc");

    //     if (teams[0].name === "Killer Bunnies") {
    //       console.log("sorted asc, killer bunnies first");
    //     }

    //     teams = this.storage.list;

    //     if (teams[0].name === "Raptors") {
    //       console.log("sorted asc, orig data not changed");
    //     }

    //     this.storage.sort("name", "asc", true); //sort permanently
    //     teams = this.storage.list;
    //     if (teams[0].name === "Killer Bunnies") {
    //       console.log("sorted permanently, list returns sorted values");
    //     }
    // }
}


// remember form submit
// <form method="post" action="http..." onsubmit="...">