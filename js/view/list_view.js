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
    
    get modalContainerId() {
        return this.options.modalContainerId;
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
                                data-bs-target="#${this.modalContainerId}" data-bs-whatever="${row.name}"></i>
                        </div>
                    </td>
                </tr>`
        }

        html += `</tbody></table>`;

        $(this.$listContainer).html(html); // makes this dynamic
        this.bindListEvents();
    }

    bindListEvents() {
        let that = this;

        $(".table-header").click((e) => {
            const dataName = $(e.currentTarget).attr("data-col");
            let curDirection = this.storage.sortDir;

            console.log(`sortCol=${dataName}`);
            console.log(`sortDir=${curDirection}`);

            if (that.storage.sortCol === dataName) {
                that.storage.sortDir = (curDirection === "asc") ? "desc" : "asc";
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

            $('span#team').text(teamName);
            $('button#delete-btn').click((e) => {
                that.storage.delete(
                    parseInt(rowId.replace('_', '')
                            .replace('-btn', ''), 10));
                that.render();
                that.renderAlert();
            });
        });
    }

    bindWrapperEvents() {
        this.$resetBtn.click((e) => {
            this.storage.reset();
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

      renderAlert() {
        this.$alertContainer.removeClass('opacity-0');
        this.$alertContainer.addClass('opacity-100');

        setTimeout(() => {
            this.$alertContainer.removeClass('opacity-100');
            this.$alertContainer.addClass('opacity-0');
        }, 2.5 * 1000);
      }
}
