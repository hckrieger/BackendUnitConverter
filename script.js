const quickCalcBtn = document.getElementById("quickCalc");
const calcForm = document.getElementById("calcForm");
const addJobBtn = document.getElementById("addJob");
const addJobForm = document.getElementById("addJobForm")
const calcOutput = document.getElementById("calcOutput");
const calcSubmit = document.getElementById("calcSubmit");
const jobSubmit = document.getElementById("jobSubmit");

const pathName = window.location.pathname;
const hrefName = window.location.href;

const urlParams = new URL(hrefName);

let jobsArray = []
let dispatchArray = [];

let selectedJob = null;

//localStorage.removeItem("jobs"); 
//localStorage.removeItem("dispatches");

let currentJobId = 0;

class Job {
    
    constructor(jobName, jobNumber)
    {
        this.jobName = jobName,
        this.jobNumber = jobNumber
        this.jobId = currentJobId++;
    }
}

class Dispatch {
    constructor(id, stackType, total, booksInLift, liftsInLayer, layersOnSkid, jobId)
    {
        this.id = id;
        this.stackType = stackType;
        this.total = total;
        this.booksInLift = booksInLift;
        this.liftsInLayer = liftsInLayer;
        this.layersOnSkid = layersOnSkid;
        this.jobId = jobId;
    }
}

if (localStorage.getItem("jobs") != null)
{
    jobsArray = JSON.parse(localStorage.getItem("jobs"));
        // Later get it where it displays jobs in reverse order
    // ...so that the most recent job is at the top of the list
    let ul = document.getElementById("jobList");
    
    jobsArray.reverse();

    for (let i = 0; i < jobsArray.length; i++)
    {
        document.getElementById("jobsDisplay").style.display = "block";
        let li = document.createElement("li");
        var job = jobsArray[i];
        let pathWithParams = `${pathName}?jobNumber=${job.jobNumber}&jobName=${job.jobName}`;
        li.innerHTML = `<a href='${pathWithParams}'>${job.jobNumber} - ${job.jobName}</a>`;
        ul.appendChild(li);
    }

    if (localStorage.getItem("dispatches") != null)
    {
        dispatchArray = JSON.parse(localStorage.getItem("dispatches"));
    }
}

//Make calclculation form appear
quickCalcBtn.addEventListener("click", () => {
    calcForm.style.display = "inline";
    addJobForm.style.display = "none";
    document.getElementById("jobNumberHeader").textContent = "";
    document.getElementById("jobNameHeader").textContent = "";
});

//submit form data
calcSubmit.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    calcOutput.style.display = "inline";
    calculateOutput();
});


//Make add job form appear
addJobBtn.addEventListener("click", () => {
    addJobForm.style.display = "inline";
    calcForm.style.display = "none";
    calcOutput.style.display = "none";
    document.getElementById("jobNumberHeader").textContent = "";
    document.getElementById("jobNameHeader").textContent = "";
});

//Submit new job
jobSubmit.addEventListener("click", (event) => {
    event.preventDefault();
    //Create function for adding event
    let jobNumber = document.getElementById("jobNumber").value;
    let jobName = document.getElementById("jobName").value;
    
    
    //Add form validation feedback eventually
    if (jobNumber !== '' && jobName !== '')
    {
        job = new Job(jobName, jobNumber);
        jobsArray.push(job);
        localStorage.setItem("jobs", JSON.stringify(jobsArray));
        
        // Later get it where it displays jobs in reverse order
        // ...so that the most recent job is at the top of the list
        let ul = document.getElementById("jobList");
        let li = document.createElement("li");

        let pathWithParams = `${pathName}?jobNumber=${job.jobNumber}`;
        li.innerHTML = `<a href='${pathWithParams}'>${job.jobNumber} - ${job.jobName}</a>`;

        selectedJob = job.jobNumber;

        ul.appendChild(li);

        if (jobsArray.length > 0) {
            document.getElementById("jobsDisplay").style.display = "block";
        }

        addJobForm.reset();
        addJobForm.style.display = "none";

        calcForm.style.display = "block";
    }
    
})


let jobNumber = urlParams.searchParams.get("jobNumber");
let jobName = urlParams.searchParams.get("jobName");
if (jobNumber !== null)
{
    document.getElementById("jobNumberHeader").textContent = jobNumber;

    if (jobName !== null)
    {
        document.getElementById("jobNameHeader").textContent = jobName;
    }

    for (let i = 0; i < jobsArray.length; i++)
    {
        let job = jobsArray[i];
        if (job.jobNumber === jobNumber)
        {
            selectedJob = job;
        }
    }

    calcForm.style.display = "block";
}

function calculateOutput()
{
    let id = document.getElementById("dispatchNumber").value;
    let stackType = document.querySelector('input[name="stackCategory"]:checked').value;
    let total = parseFloat(document.getElementById("total").value);
    let unitsInLift = parseFloat(document.getElementById("books").value);
    let liftsInLayer = parseFloat(document.getElementById("lifts").value);
    let layersOnSkid = parseFloat(document.getElementById("layers").value);

    





    if (selectedJob != null)
    {
        let dispatch = new Dispatch(id, stackType, total, unitsInLift, liftsInLayer, layersOnSkid, selectedJob.jobId);
        dispatchArray.push(dispatch);
        localStorage.setItem("dispatches", JSON.stringify(dispatchArray));
        
        
        let jobTableBody = document.getElementById("jobTableBody");

        for (let i = 0; i < dispatchArray.length; i++)
        {
            let tr = document.createElement("tr");
            jobTableBody.appendChild(tr);

            let tdId = document.createElement("td");
            let tdQuickInfo = document.createElement("td");
            let tdLiftQty = document.createElement("td");
            let tdLiftsInLayer = document.createElement("td");
            let tdLayerQty = document.createElement("td");
            let tdFullLayers = document.createElement("td");
            let tdFullSkidQty = document.createElement("td");
            let tdPartialSkidQty = document.createElement("td");

            tdId.textContent = dispatchArray[i].id;
            tr.appendChild(tdId);

            let unitsInLayer = dispatchArray[i].liftsInLayer * dispatchArray[i].unitsInLift;
            let unitsInSkid = unitsInLayer * dispatchArray[i].layersOnSkid;
            let fullSkids = Math.floor(dispatchArray[i].total / unitsInSkid);

            let unitsInFullSkids = fullSkids * unitsInSkid;
            let unitsInPartialSkid = dispatchArray[i].total - unitsInFullSkids;

            let partialSkidFullLayers = Math.floor(unitsInPartialSkid / unitsInLayer);
            let partialSkidUnitsinFullLayers = partialSkidFullLayers * unitsInLayer;
            let partialSkidUnitsinPartialLayer = unitsInPartialSkid - partialSkidUnitsinFullLayers;

            let partialSkidUnitsInFullLefoverLifts = Math.floor(partialSkidUnitsinPartialLayer / dispatchArray[i].unitsInLift);
            let partialSkidUnitsInLeftoverUnits = partialSkidUnitsinPartialLayer - (partialSkidUnitsInFullLefoverLifts * dispatchArray[i].unitsInLift);

            let stackTypeName;
            if (dispatchArray[i].stackType === "Downstack") {
                stackTypeName = "Lifts";
            } else if (dispatchArray[i].stackType === "Carton Pack") {
                stackTypeName = "Cartons";
            } 


            let spanFullSkids = document.createElement("span");
            spanFullSkids.innerHTML = (fullSkids !== 0) ? `<strong>${fullSkids}</strong> Skids<br>` : "";
            tdQuickInfo.appendChild(spanFullSkids);

            let spanFullLayers = document.createElement("span");
            spanFullLayers.innerHTML = (partialSkidFullLayers !== 0) ? `<strong>${partialSkidFullLayers}</strong> Layers<br>` : "";
            tdQuickInfo.appendChild(spanFullLayers);
            
            let spanLeftOverLifts = document.createElement("span");
            spanLeftOverLifts.innerHTML = (partialSkidUnitsInFullLefoverLifts !== 0) ? `<strong>${partialSkidUnitsInFullLefoverLifts}</strong> ${stackTypeName}<br>` : "";
            tdQuickInfo.appendChild(spanLeftOverLifts);

            let spanLeftOverUnits = document.createElement("span");
            tdQuickInfo.appendChild(spanLeftOverUnits);
            spanLeftOverUnits.innerHTML = (partialSkidUnitsInLeftoverUnits !== 0) ? `<strong>${partialSkidUnitsInLeftoverUnits}</strong> Books` : "";

            tr.appendChild(tdQuickInfo);


            tdLiftQty.textContent = unitsInLift;
            tr.appendChild(tdLiftQty);

            tdLiftsInLayer.textContent = liftsInLayer;
            tr.appendChild(tdLiftsInLayer);

            tdLayerQty.textContent = unitsInLayer;
            tr.appendChild(tdLayerQty);

            tdFullLayers.textContent = partialSkidFullLayers;
            tr.appendChild(tdFullLayers);

            tdFullSkidQty.textContent = unitsInFullSkids;
            tr.appendChild(tdFullSkidQty);

            tdPartialSkidQty.textContent = unitsInPartialSkid;
            tr.appendChild(tdPartialSkidQty);
        }




  

    }
    


    
}
