document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    //получаю элементы
    const add = document.querySelector("#add"),
        closeWidget = document.querySelector("#closeWidget"),
        contentTask = document.querySelector("#contentTask"),
        consol = document.querySelector(".list-to-do"),
        widgetToDo = document.querySelector(".widget-todo"),
        contentToDo = document.querySelector(".content-to-do"),
        addToDo = document.querySelector(".add-to-do"),
        headerToDo = document.querySelector(".header-to-do"),
        subtitleWidget = document.querySelector(".subtitle-widget"),
        minimizeWidgetToDo = document.querySelector("#minimize svg path");


    const listTask = JSON.parse(localStorage.getItem('listTask')) || [];
    let saveWidgetData = JSON.parse(localStorage.getItem("closeSaveWidgetData")) || [];
    //render();
    const render = listTask => {
        consol.innerHTML = "";
        listTask.forEach((elem, i) => {
            consol.innerHTML += `
            <li id="${i}" class="item">			
				<i class="fa co ${elem.faCircleThin}"></i>
                <!-- fa-check-circle -->
				<p class="text ${elem.noLineThrough}">${elem.contentTask}</p> 
				<!-- lineThrough -->
				<i id="del" class="fa fa-trash-o de"></i>
			</li>
            `;
        });
        const del = document.querySelectorAll("#del"),
            item = document.querySelectorAll(".item");

        delTask(item, del, listTask);
        doneTask(item, listTask);
        
        
        
    };

    //выполнил
    const doneTask = (item, listTask) => {
        item.forEach((elem, index) => {
            elem.addEventListener("click", event => {
                // console.dir(event.target.classList);
                event.target.classList.forEach((elem, i) => {
                    if (elem === "fa-circle-thin") {
                        listTask.forEach((element, j) => {
                            if (index === j) {
                                // console.log("dsadas: ", element);
                                element.faCircleThin = "fa-check-circle";
                                element.noLineThrough = "lineThrough";
                                localStorage.setItem("listTask", JSON.stringify(listTask));
                                render(listTask);
                            }
                        });

                    };
                });
            });
        });
    }

    //удалить
    const delTask = (item, del, listTask) => {
        item.forEach((elem, i) => {
            elem.addEventListener("click", event => {
                if (event.target.id === "del") {
                    listTask.splice(i, 1);
                    localStorage.setItem("listTask", JSON.stringify(listTask));
                    render(listTask);
                    return true;
                }
            })
        });
    }

    //добавить
    add.addEventListener("click", () => {
        const obj = {};
        obj[contentTask.id] = contentTask.value;
        obj["faCircleThin"] = "fa-circle-thin";
        obj["noLineThrough"] = "noLineThrough";
        listTask.push(obj);
        localStorage.setItem("listTask", JSON.stringify(listTask));
        render(listTask);
        contentTask.value = "";
       
    });
    contentTask.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            const obj = {};
            obj[contentTask.id] = contentTask.value;
            obj["faCircleThin"] = "fa-circle-thin";
            obj["noLineThrough"] = "noLineThrough"
            listTask.push(obj);
            localStorage.setItem("listTask", JSON.stringify(listTask));
            render(listTask);
            contentTask.value = "";
        }
    });

    //рендер всех заданий
    render(listTask);
    let oldWidgetToDoHeight = widgetToDo.offsetHeight;

    //закрыть\спрятать виджет
    closeWidget.addEventListener("click", event => {
        saveWidgetData.splice(0, 1, "0");
        localStorage.setItem("closeSaveWidgetData", JSON.stringify(saveWidgetData));
        
        let widgetToDoHeight = widgetToDo.offsetHeight;
        widgetToDo.style.height = widgetToDoHeight + "px";
        contentToDo.style.display = "none";
        addToDo.style.display = "none";
        headerToDo.style.display = "none";
        widgetToDo.style.backgroundColor = "#303B44";
        const animatedCloseWidgetToDo = () => {
          
            if (widgetToDoHeight <= 40) {
                clearInterval(animatedCloseToDo);
                widgetToDo.style.backgroundColor = "#fff";
                subtitleWidget.style.display = "flex";
                widgetToDo.style.display = "flex";
            }else {
                widgetToDoHeight = widgetToDoHeight - 6;
                widgetToDo.style.height = widgetToDoHeight + "px";
            }
        }
        let animatedCloseToDo = setInterval(animatedCloseWidgetToDo, 5);
        animatedCloseWidgetToDo();
    });


    minimizeWidgetToDo.addEventListener("click", event => {
        saveWidgetData.splice(0, 1, "1");
        localStorage.setItem("closeSaveWidgetData", JSON.stringify(saveWidgetData));

        subtitleWidget.style.display = "none";
        let widgetToDoHeight = widgetToDo.offsetHeight;
        widgetToDo.style.backgroundColor = "#303B44";
        const animatedMinimizeWidgetToDo = () => {
            if (widgetToDoHeight >= oldWidgetToDoHeight) {
                clearInterval(amimatedMinimizeToDo);
                widgetToDo.style.backgroundColor = "#fff";       
                widgetToDo.style.display = "block";
                contentToDo.style.display = "block";
                addToDo.style.display = "flex";
                headerToDo.style.display = "flex";
                widgetToDo.style.height = "auto";
            }else {
                widgetToDoHeight = widgetToDoHeight + 6;
                widgetToDo.style.height = widgetToDoHeight + "px";
            }
        }
        let amimatedMinimizeToDo = setInterval(animatedMinimizeWidgetToDo, 5);
        animatedMinimizeWidgetToDo();
        
    });
    
    const saveMinimizeWidget = () => {
        if (saveWidgetData != "") {
            saveWidgetData.forEach(elem => {
                if (elem === "1") {
                    widgetToDo.style.backgroundColor = "#fff";
                
                    widgetToDo.style.display = "block";
                    contentToDo.style.display = "block";
                    addToDo.style.display = "flex";
                    headerToDo.style.display = "flex";
                    widgetToDo.style.height = "auto";
                }
                if (elem === "0"){
                    contentToDo.style.display = "none";
                    addToDo.style.display = "none";
                    headerToDo.style.display = "none";
                    widgetToDo.style.backgroundColor = "#303B44";

                    widgetToDo.style.backgroundColor = "#fff";
                    subtitleWidget.style.display = "flex";
                    widgetToDo.style.display = "flex";
                }
                
            })
        }
    }
    saveMinimizeWidget();
});