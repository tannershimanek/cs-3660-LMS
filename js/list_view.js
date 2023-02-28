export default class ListView {
    constructor(storage) {
        this.storage = storage;
        console.log('ListView constructor');
    }

    async render() {
        let data = this.storage.list; // getters dont need parenthesis
        console.log('ListView render');
        console.log(data);
        let html = `
        <table class="table table-hover">
            <thead class="bg-light">
                <tr>
                    <th class="table-header" scope="col" data-col="name">Team name</th>
                    <th class="table-header" scope="col" >Coach name</th>
                    <th class="table-header" scope="col" >Coach phone</th>
                    <th class="table-header" scope="col" ># of riders</th>
                    <th class="table-header" scope="col-lg" >Actions</th>
                </tr>
            </thead>
            <tbody>`

        for (let row of data) {
            html += `<tr id="${row.id}" aria-describedby="tooltip">
                <tr id="us-btn" aria-describedby="tooltip">
                    <th scope="row">${row.name}</th>
                    <td>${row.coachFirst} ${row.coachLast}</td>
                    <td>+1 202-918-2132</td>
                    <td>3</td>
                    <td>
                        <div class="d-flex justify-content-center align-items-baseline gap-2 flex-wrap">
                            <i class="fa-solid fa-pen-to-square"></i><i class="fa-solid fa-trash"
                                type="button" data-bs-toggle="modal" data-bs-id="us"
                                data-bs-target="#exampleModal" data-bs-whatever="United States"></i>
                        </div>
                    </td>
                </tr>`
        }

   


        html += `</tbody></table>`;

        $("#team-list").html(html);
        this.bindListEvents();
    }

    bindListEvents() {
        $(".table-header").click(function (ev) {
            let sortCol = $(this).attr("data-col");
            console.log(`sortCol=${sortCol}`);
        });
    }
}



            //     <tr id="us-btn" aria-describedby="tooltip">
            //         <th scope="row">United States</th>
            //         <td>Cedric Murphy</td>
            //         <td>+1 202-918-2132</td>
            //         <td>3</td>
            //         <td>
            //             <div class="d-flex justify-content-center align-items-baseline gap-2 flex-wrap">
            //                 <i class="fa-solid fa-pen-to-square"></i><i class="fa-solid fa-trash"
            //                     type="button" data-bs-toggle="modal" data-bs-id="us"
            //                     data-bs-target="#exampleModal" data-bs-whatever="United States"></i>
            //             </div>
            //         </td>
            //     </tr>
            //     <div id="ca-tool-tip" role="tooltip">
            //         <div class="d-flex gap-2 align-items-center">
            //             <img src="../imgs/ca.svg" width="25px" />
            //             <h6 class="mt-2">Canada</h6>
            //         </div>
            //         <div>Lewis Torres</div>
            //         <div>+1 346-477-0351</div>
            //         <div><span>4</span> Riders</div>
            //         <div id="arrow" data-popper-arrow></div>
            //     </div>
            //     <tr id="ca-btn" aria-describedby="tooltip">
            //         <th scope="row">Canada</th>
            //         <td>Lewis Torres</td>
            //         <td>+1 346-477-0351</td>
            //         <td>4</td>
            //         <td>
            //             <div class="d-flex justify-content-center align-items-baseline gap-2 flex-wrap">
            //                 <i class="fa-solid fa-pen-to-square"></i><i class="fa-solid fa-trash"
            //                     type="button" data-bs-toggle="modal" data-bs-id="ca"
            //                     data-bs-target="#exampleModal" data-bs-whatever="Canada"></i></div>
            //         </td>
            //     </tr>
            //     <div id="mx-tool-tip" role="tooltip">
            //         <div class="d-flex gap-2 align-items-center">
            //             <img src="../imgs/mx.svg" width="25px" />
            //             <h6 class="mt-2">Mexico</h6>
            //         </div>
            //         <div>Clinton Harris</div>
            //         <div>+1 224-290-7759</div>
            //         <div><span>2</span> Riders</div>
            //         <div id="arrow" data-popper-arrow></div>
            //     </div>
            //     <tr id="mx-btn" aria-describedby="tooltip">
            //         <th scope="row">Mexico</th>
            //         <td>Clinton Harris</td>
            //         <td>+1 224-290-7759</td>
            //         <td>2</td>
            //         <td>
            //             <div class="d-flex justify-content-center align-items-baseline gap-2 flex-wrap">
            //                 <i class="fa-solid fa-pen-to-square"></i><i class="fa-solid fa-trash"
            //                     type="button" data-bs-toggle="modal" data-bs-id="mx"
            //                     data-bs-target="#exampleModal" data-bs-whatever="Mexico"></i></div>
            //         </td>
            //     </tr>
            //     <div id="jp-tool-tip" role="tooltip">
            //         <div class="d-flex gap-2 align-items-center">
            //             <img src="../imgs/jp.svg" width="25px" />
            //             <h6 class="mt-2">Japan</h6>
            //         </div>
            //         <div>Wilfred Vega</div>
            //         <div>+1 505-292-3024</div>
            //         <div><span>2</span> Riders</div>
            //         <div id="arrow" data-popper-arrow></div>
            //     </div>
            //     <tr id="jp-btn" aria-describedby="tooltip">
            //         <th scope="row">Japan</th>
            //         <td>Wilfred Vega</td>
            //         <td>+1 505-292-3024</td>
            //         <td>2</td>
            //         <td>
            //             <div class="d-flex justify-content-center align-items-baseline gap-2 flex-wrap">
            //                 <i class="fa-solid fa-pen-to-square"></i><i class="fa-solid fa-trash"
            //                     type="button" data-bs-toggle="modal" data-bs-id="jp"
            //                     data-bs-target="#exampleModal" data-bs-whatever="Japan"></i></div>
            //         </td>
            //     </tr>
            //     <div id="sw-tool-tip" role="tooltip">
            //         <div class="d-flex gap-2 align-items-center">
            //             <img src="../imgs/se.svg" width="25px" />
            //             <h6 class="mt-2">Sweden</h6>
            //         </div>
            //         <div>Darnell Burke</div>
            //         <div>+1 239-538-3914</div>
            //         <div><span>3</span> Riders</div>
            //         <div id="arrow" data-popper-arrow></div>
            //     </div>
            //     <tr id="sw-btn" aria-describedby="tooltip">
            //         <th scope="row">Sweden</th>
            //         <td>Darnell Burke</td>
            //         <td>+1 239-538-3914</td>
            //         <td>3</td>
            //         <td>
            //             <div class="d-flex justify-content-center align-items-baseline gap-2 flex-wrap">
            //                 <i class="fa-solid fa-pen-to-square"></i><i class="fa-solid fa-trash"
            //                     type="button" data-bs-toggle="modal" data-bs-id="sw"
            //                     data-bs-target="#exampleModal" data-bs-whatever="Sweden"></i></div>
            //         </td>
            //     </tr>
            //     <div id="w-tool-tip" role="tooltip">
            //         <div class="d-flex gap-2 align-items-center">
            //             <img src="../imgs/at.svg" width="25px" />
            //             <h6 class="mt-2">Austria</h6>
            //         </div>
            //         <div>Calvin Martinez</div>
            //         <div>+1 505-255-3838</div>
            //         <div><span>2</span> Riders</div>
            //         <div id="arrow" data-popper-arrow></div>
            //     </div>
            //     <tr id="w-btn" aria-describedby="tooltip">
            //         <th scope="row">Austria</th>
            //         <td>Calvin Martinez</td>
            //         <td>+1 505-255-3838</td>
            //         <td>2</td>
            //         <td>
            //             <div class="d-flex justify-content-center align-items-baseline gap-2 flex-wrap">
            //                 <i class="fa-solid fa-pen-to-square"></i><i class="fa-solid fa-trash"
            //                     type="button" data-bs-toggle="modal" data-bs-id="w"
            //                     data-bs-target="#exampleModal" data-bs-whatever="Austria"></i></div>
            //         </td>
            //     </tr>`;