export default class ListView {
    constructor(storage, options={}) {
        this.storage = storage;
        this.options = options;
        console.log('ListView constructor');
        this.initView();
    }

    get $headerIcon() {
        return $(`#${this.storage.sortCol}-${this.storage.sortDir}`);
    }

    get $listContainer() {
        return $(`#${this.options.listContainerId}`);
    }

    get $alertContainer() {
        return $(`#${this.options.alertContainerId}`);
    }

    get $alertContainerId() {
        return this.options.alertContainerId;
    }

    get $modal() {
        return $(`#${this.options.modalContainerId}`);
    }
    
    get entitySingle() {
        return this.options.entitySingle;
    }

    get $resetBtn() {
        return $(`#${this.options.resetBtnId}`);
    }

    initView() {
        this.bindWrapperEvents();
    }
    
    async render() {
        // let data = this.storage.list; // getters dont need parenthesis
        let data = this.storage.sort(this.storage.sortCol, this.storage.sortDir, true); // getters dont need parenthesis
        console.log('ListView render');
        console.log(data);
        let html = `
        <table class="table table-hover">
            <thead class="bg-light">
                <tr>
                    <th class="table-header" scope="col" data-col="name">Team name
                        <i id="name-asc" class="fa fa-arrow-up" aria-hidden="true" style="display:none"></i>
                        <i id="name-desc" class="fa fa-arrow-down" aria-hidden="true" style="display:none"></i>
                    </th>
                    <th class="table-header" scope="col" data-col="coachName">Coach name
                        <i id="coachName-asc" class="fa fa-arrow-up" aria-hidden="true" style="display:none"></i>
                        <i id="coachName-desc" class="fa fa-arrow-down" aria-hidden="true" style="display:none"></i>
                    </th>
                    <th class="table-header" scope="col" data-col="coachPhone">Coach phone
                        <i id="coachPhone-asc" class="fa fa-arrow-up" aria-hidden="true" style="display:none"></i>
                        <i id="coachPhone-desc" class="fa fa-arrow-down" aria-hidden="true" style="display:none"></i>
                    </th>
                    <th class="table-header" scope="col" data-col="numPlayers"># of riders
                        <i id="numPlayers-asc" class="fa fa-arrow-up" aria-hidden="true" style="display:none"></i>
                        <i id="numPlayers-desc" class="fa fa-arrow-down" aria-hidden="true" style="display:none"></i>
                    </th>
                    <th class="table-header" scope="col-lg" data-col="a8s">Actions
                        <i id="actions-asc" class="fa fa-arrow-up" aria-hidden="true" style="display:none"></i>
                        <i id="actions-desc" class="fa fa-arrow-down" aria-hidden="true" style="display:none"></i>
                    </th>
                </tr>
            </thead>
            <tbody>`

            // todo: icons
            // todo: popovers
        for (let row of data) {
            html += `
            <div id="_${row.id}-tool-tip" role="tooltip">
                <div class="d-flex gap-2 align-items-center">
                    <img src="../imgs/${row.name}.svg" width="25px" />
                    <h6 class="mt-2">${row.name}</h6>
                    </div>
                    <div>${row.coachName}</div>
                    <div>${row.coachPhone}</div>
                    <div><span>${row.numPlayers}</span> Riders</div>
                <div id="arrow" data-popper-arrow></div>
            </div>
            <tr id="_${row.id}-btn" aria-describedby="tooltip">
                    <th scope="row">${row.name}</th>
                    <th>${row.coachName}</th>
                    <th>${row.coachPhone}</th>
                    <th>${row.numPlayers}</th>
                    <td>
                        <div class="d-flex justify-content-center align-items-baseline gap-2 flex-wrap">
                            <i class="fa-solid fa-pen-to-square"></i>
                            <i id="delete-_${row.id}" class="fa-solid fa-trash" type="button" data-bs-toggle="modal" data-bs-id="${row.name}"
                                data-bs-target="#exampleModal" data-bs-whatever="${row.name}"></i>
                        </div>
                    </td>
                </tr>`
        }

   


        html += `</tbody></table>`;

        $(this.$listContainer).html(html); // makes this dynamic
        this.bindListEvents();
    }

    bindListEvents() {
        // $(".table-header").click(function (ev) {
        //     let sortCol = $(this).attr("data-col");
        //     console.log(`sortCol=${sortCol}`);
        // });

        let that = this;

        $(".table-header").click((e) => {
            const dataName = $(e.currentTarget).attr("data-col");
            let curDirection = this.storage.sortDir;

            console.log(`sortCol=${dataName}`);
            console.log(`sortDir=${curDirection}`);

            // $(`#${dataName}-${curDirection}`).hide();
            if (that.storage.sortCol === dataName) {
                that.storage.sortDir = (curDirection === "asc" ? "desc" : "asc");
            } else {
                that.storage.sortCol = 'asc';
            }

            that.storage.sortCol = dataName;
            that.render();
        });

        this.$headerIcon.show();
        this.storage.model.data.forEach(el => this.popover(el.id));

        // update modal info
        $(`.fa-trash`).click((e) => {
            const id = $(e.currentTarget).attr("id");
            const rowId = id.replace("delete-", "") + "-btn";   
            const teamName = $(`tr#${rowId} th:first-child`).text();
            console.log(`id=${rowId}`);
            console.log(teamName);

            $('span#team').text(teamName);
            $('button#delete-btn').click((e) => {
                that.storage.delete(
                    parseInt(rowId.replace('_', '')
                            .replace('-btn', ''), 10));
                that.render();

                that.$alertContainer.removeClass('opacity-0');
                that.$alertContainer.addClass('opacity-100');

                setTimeout(() => {
                    that.$alertContainer.removeClass('opacity-100');
                    that.$alertContainer.addClass('opacity-0');
                }, 2.5 * 1000);
            });
        });
    }

    bindWrapperEvents() {
        this.$resetBtn.click((e) => {
            // console.log(this.storage.reset)
            this.storage.reset();
            // this.storage = this.storage.retrieve(); 
            // this.storage
            this.render();
        });
    }

    popover(item) {
        const btn = document.querySelector(`#_${item}-btn`);
        const toolTip = document.querySelector(`#_${item}-tool-tip`);
        const popperInstance = Popper.createPopper(btn, toolTip, {
            modifiers: [
                {
                name: 'offset',
                options: {
                    offset: [0, -150],
                },
                },
            ],
          });
        function show() {
          toolTip.setAttribute('data-show', '');
          popperInstance.update();
        }
      
        function hide() {
            toolTip.removeAttribute('data-show');
        }
      
        const showEvents = ['mouseenter', 'focus'];
        const hideEvents = ['mouseleave', 'blur'];
      
        showEvents.forEach((event) => {
            btn.addEventListener(event, show);
        });
      
        hideEvents.forEach((event) => {
            btn.addEventListener(event, hide);
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