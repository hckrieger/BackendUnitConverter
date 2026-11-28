"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const addJobDisplayBtn = document.getElementById("addJobDisplayBtn");
const quickCalcBtn = document.getElementById("quickCalcBtn");
const addJobSubmitBtn = document.getElementById("addJobSubmitBtn");
const addJobSection = document.getElementById("addJobSection");
const addDispatchSection = document.getElementById("addDispatchSection");
const addDispatchHeader = document.getElementById("addDispatchHeader");
const jobNameHeader = document.getElementById("jobNameHeader");
const jobNumberHeader = document.getElementById("jobNumberHeader");
const jobsSelectSection = document.getElementById("jobsSelectSection");
const displayDispatchSection = document.getElementById("dispatchDisplaySection");
//localStorage.removeItem("jobs");
let jobsArray = [];
let fullUrl = new URL(window.location.href);
let baseUrl = fullUrl.toString().split("?")[0];
let currentJobNameFromParams = fullUrl.searchParams.get("jobName");
let currentJobNumberFromParams = fullUrl.searchParams.get("jobNumber");
if (currentJobNameFromParams !== null && currentJobNumberFromParams !== null) {
    if (addDispatchSection !== null)
        addDispatchSection.style.display = "block";
    if (jobNameHeader != null && jobNumberHeader && addDispatchHeader != null) {
        jobNameHeader.textContent = "Job Name - " + currentJobNameFromParams?.replaceAll('-', ' ');
        jobNumberHeader.textContent = "Job Number - " + currentJobNumberFromParams;
        addDispatchHeader.textContent = "Add calculation for dispatch to:";
    }
}
else {
    if (addDispatchSection !== null) {
        addDispatchSection.style.display = "none";
    }
}
if ((jobsArray.length === 0 || jobsArray === null) && getItem("jobs")) {
    jobsArray = getItem("jobs");
    DisplayJobsList();
}
if (addDispatchSection !== null && addJobSection !== null) {
    addJobDisplayBtn?.addEventListener('click', e => {
        e.preventDefault();
        addJobSection.style.display = "block";
        addDispatchSection.style.display = "none";
        StripURLParams();
    });
    quickCalcBtn?.addEventListener('click', e => {
        e.preventDefault();
        addDispatchSection.style.display = "block";
        addJobSection.style.display = "none";
        // if (baseUrl != null)
        //     window.location.href = baseUrl;
        if (addDispatchHeader != null && jobNameHeader !== null && jobNumberHeader !== null) {
            addDispatchHeader.innerHTML = "Quick Calc";
            jobNameHeader.textContent = "";
            jobNumberHeader.textContent = "";
            StripURLParams();
        }
    });
    addJobSubmitBtn?.addEventListener('click', e => {
        e.preventDefault();
        let jobNameElement = document.getElementById("jobName");
        let jobNumberElement = document.getElementById("jobNumber");
        if (jobNameElement != null && jobNumberElement != null) {
            let submittedJob = { jobName: jobNameElement.value, jobNumber: jobNumberElement.value };
            jobsArray?.push(submittedJob);
            setItem("jobs", jobsArray);
            DisplayJobsList();
            addJobSection.style.display = "none";
            let urlString = `${baseUrl}?jobNumber=${submittedJob.jobNumber}&jobName=${submittedJob.jobName.replaceAll(' ', '-')}`;
            window.location.href = urlString;
            console.log(urlString);
            console.log(window.location.href);
        }
    });
}
function DisplayJobsList() {
    const jobsList = document.getElementById("jobsList");
    if (jobsArray != null && jobsSelectSection != null) {
        if (jobsArray.length > 0) {
            jobsSelectSection.style.display = "block";
            while (jobsList?.firstChild)
                jobsList.removeChild(jobsList.firstChild);
        }
        else {
            jobsSelectSection.style.display = "none";
        }
        jobsArray.reverse();
        for (let i = 0; i < jobsArray.length; i++) {
            let jobsListNode = document.createElement("li");
            //jobsListNode.classList.add("list-group-item");
            let linkUrl = baseUrl?.toString() + `?jobNumber=${jobsArray[i]?.jobNumber}` + `&jobName=${jobsArray[i]?.jobName.replaceAll(' ', '-')}`;
            jobsListNode.innerHTML = `<a href=${linkUrl}>${jobsArray[i]?.jobNumber}</a> - ${jobsArray[i]?.jobName}`;
            //     let removeButton: HTMLButtonElement = document.createElement("button");
            //    removeButton.textContent = "X";
            //    removeButton.style.backgroundColor = "red";
            //    removeButton.id = `${jobsArray[i]?.jobName}`;
            //    jobsListNode.appendChild(removeButton);
            jobsList?.appendChild(jobsListNode);
        }
    }
}
function StripURLParams() {
    if (window.location.search) {
        // Replace the current URL with the pathname (removes all parameters)  
        window.history.replaceState({}, // State object (can store data, optional)  
        document.title, // Page title (optional, ignored by most browsers)  
        window.location.pathname // New URL (path only, no parameters)  
        );
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