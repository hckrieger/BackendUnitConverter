const quickCalcBtn = document.getElementById("quickCalc");
const quickCalcForm = document.getElementById("formSection");
const calcSubmit = document.getElementById("calcSubmit");

quickCalcBtn.addEventListener("click", () => {
    

    quickCalcForm.style.visibility = "visible";
});

calcSubmit.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    showOutput();
});


function calculateOutput(total, unitsInLift, liftsInLayer, layersOnSkid)
{
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

    let stackType = document.querySelector('input[name="stackCategory"]:checked').value;
    let stackTypeName;
    if (stackType === "Downstack") {
        stackTypeName = "Lifts";
    } else if (stackType === "Carton Pack") {
        stackTypeName = "Cartons";
    }
    return `-Full Skids: ${fullSkids} @ ${unitsInSkid} ${stackTypeName}<br>-Partial Skid: 1 @ ${unitsInPartialSkid} ${stackTypeName}<br><pre>Layers: ${partialSkidFullLayers}<br><pre>Lifts: ${partialSkidUnitsInFullLefoverLifts}<br><pre>Books: ${partialSkidUnitsInLeftoverUnits}`;
}


function showOutput()
{
        let total = parseFloat(document.getElementById("total").value);
        let unitsInLift = parseFloat(document.getElementById("books").value);
        let liftsInLayer = parseFloat(document.getElementById("lifts").value);
        let layersOnSkid = parseFloat(document.getElementById("layers").value);
        document.getElementById("answer").innerHTML = calculateOutput(total, unitsInLift, liftsInLayer, layersOnSkid);
        document.getElementById("answer").style.visibility = "visible";
    
}