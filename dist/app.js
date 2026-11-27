"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const addJobDisplayBtn = document.getElementById("addJobDisplayBtn");
const quickCalcBtn = document.getElementById("quickCalcBtn");
const addJobSubmitBtn = document.getElementById("addJobSubmitBtn");
const addJobSection = document.getElementById("addJobSection");
const addDispatchSection = document.getElementById("addDispatchSection");
const addDispatchHeader = document.getElementById("addDispatchHeader");
let jobsArray = [];
if ((jobsArray.length === 0 || jobsArray === null) && getItem("jobs")) {
    jobsArray = getItem("jobs");
    DisplayJobsList();
}
if (addDispatchSection !== null && addJobSection !== null) {
    addJobDisplayBtn?.addEventListener('click', () => {
        addJobSection.style.display = "block";
        addDispatchSection.style.display = "none";
    });
    quickCalcBtn?.addEventListener('click', () => {
        addDispatchSection.style.display = "block";
        addJobSection.style.display = "none";
        if (addDispatchHeader != null)
            addDispatchHeader.innerHTML = "Quick Calc";
    });
    addJobSubmitBtn?.addEventListener('click', () => {
        let jobNameElement = document.getElementById("jobName");
        let jobNumberElement = document.getElementById("jobNumber");
        if (jobNameElement != null && jobNumberElement != null) {
            let submittedJob = { jobName: jobNameElement.value, jobNumber: jobNumberElement.value };
            jobsArray?.push(submittedJob);
            setItem("jobs", jobsArray);
            DisplayJobsList();
            addJobSection.style.display = "none";
        }
    });
}
function DisplayJobsList() {
    const jobsList = document.getElementById("jobsList");
    if (jobsArray != null) {
        if (jobsArray.length > 0) {
            while (jobsList?.firstChild)
                jobsList.removeChild(jobsList.firstChild);
        }
        jobsArray.reverse();
        for (let i = 0; i < jobsArray.length; i++) {
            let jobsListNode = document.createElement("li");
            jobsListNode.classList.add("list-group-item");
            jobsListNode.innerHTML = `<a href="#">${jobsArray[i]?.jobNumber}</a> - ${jobsArray[i]?.jobName} `;
            //     let removeButton: HTMLButtonElement = document.createElement("button");
            //    removeButton.textContent = "X";
            //    removeButton.style.backgroundColor = "red";
            //    removeButton.id = `${jobsArray[i]?.jobName}`;
            //    jobsListNode.appendChild(removeButton);
            jobsList?.appendChild(jobsListNode);
        }
    }
}
function setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
function getItem(key) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
}
//# sourceMappingURL=app.js.map