const quickCalcBtn = document.getElementById("quickCalc");
const quickCalcForm = document.getElementById("calcForm");
const addJobBtn = document.getElementById("addJob");
const addJobForm = document.getElementById("addJobForm")
const calcOutput = document.getElementById("calcOutput");
const calcSubmit = document.getElementById("calcSubmit");



const jobMap = new Map();

class Job {
    constructor(jobName, jobNumber)
    {
        this.jobMap,
        this.jobNumber

        let dispatches = new Set();
    }
}

class Dispatch {
    constructor(id, total, booksInLift, liftsInLayer, layersOnSkid)
    {
        this.id = id;
        this.total = total;
        this.booksInLift = booksInLift;
        this.liftsInLayer = liftsInLayer;
        this.layersOnSkid = layersOnSkid;
    }
}

localStorage.setItem("jobs", jobMap);


quickCalcBtn.addEventListener("click", () => {
    quickCalcForm.style.display = "inline";
    addJobForm.style.display = "none";
});

calcSubmit.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    calcOutput.style.display = "inline";
    calculateOutput();
});

addJobBtn.addEventListener("click", () => {
    addJobForm.style.display = "inline";
    quickCalcForm.style.display = "none";
    calcOutput.style.display = "none";
});

addJobForm.addEventListener("click", (event) => {
    event.preventDefault();
    //Create function for adding event
})

function calculateOutput()
{
    let id = document.getElementById("dispatchNumber").value;
    let stackType = document.querySelector('input[name="stackCategory"]:checked').value;
    let total = parseFloat(document.getElementById("total").value);
    let unitsInLift = parseFloat(document.getElementById("books").value);
    let liftsInLayer = parseFloat(document.getElementById("lifts").value);
    let layersOnSkid = parseFloat(document.getElementById("layers").value);

    

    let unitsInLayer = liftsInLayer * unitsInLift;
    let unitsInSkid = unitsInLayer * layersOnSkid;
    let fullSkids = Math.floor(total / unitsInSkid);

    let unitsInFullSkids = fullSkids * unitsInSkid;
    let unitsInPartialSkid = total - unitsInFullSkids;

    let partialSkidFullLayers = Math.floor(unitsInPartialSkid / unitsInLayer);
    let partialSkidUnitsinFullLayers = partialSkidFullLayers * unitsInLayer;
    let partialSkidUnitsinPartialLayer = unitsInPartialSkid - partialSkidUnitsinFullLayers;

    let partialSkidUnitsInFullLefoverLifts = Math.floor(partialSkidUnitsinPartialLayer / unitsInLift);
    let partialSkidUnitsInLeftoverUnits = partialSkidUnitsinPartialLayer - (partialSkidUnitsInFullLefoverLifts * unitsInLift);

    let stackTypeName;
    if (stackType === "Downstack") {
        stackTypeName = "Lifts";
    } else if (stackType === "Carton Pack") {
        stackTypeName = "Cartons";
    }
    
    document.getElementById("calcOutput").style.visibility = "visible";
    document.querySelector(".id").textContent = `${id}`;

    document.querySelector(".full-skid-qty-quick").innerHTML = (fullSkids !== 0) ? `<strong>${fullSkids}</strong> Skids<br>` : "";

    
    document.querySelector(".partial-skid-full-layers").innerHTML = (partialSkidFullLayers !== 0) ? `<strong>${partialSkidFullLayers}</strong> Layers<br>` : "";

    document.querySelector(".partial-skid-units-in-leftover-lifts").innerHTML = (partialSkidUnitsInFullLefoverLifts !== 0) ? `<strong>${partialSkidUnitsInFullLefoverLifts}</strong> ${stackTypeName}<br>` : "";

    document.querySelector(".partial-skid-units-in-leftover-books").innerHTML = (partialSkidUnitsInLeftoverUnits !== 0) ? `<strong>${partialSkidUnitsInLeftoverUnits}</strong> Books` : "";

    document.querySelector(".lift-qty").textContent = `${unitsInLift}`;
    document.querySelector(".lifts-in-layer").textContent = `${liftsInLayer}`;
    document.querySelector(".layer-qty").textContent = `${unitsInLayer}`;
    document.querySelector(".full-skid-qty").textContent = `${unitsInSkid}`;
    document.querySelector(".full-layers").textContent = `${layersOnSkid}`
    document.querySelector(".partial-skid-qty").textContent = `${unitsInPartialSkid}`;

    
}
