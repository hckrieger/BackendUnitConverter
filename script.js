const quickCalcBtn = document.getElementById("quickCalc");
const quickCalcForm = document.getElementById("formSection");
const calcSubmit = document.getElementById("calcSubmit");

quickCalcBtn.addEventListener("click", () => {
    

    quickCalcForm.style.visibility = "visible";
});

calcSubmit.addEventListener("click", () => {
    

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

    return `Skids: ${fullSkids}\nLayers: ${partialSkidFullLayers}\nList: ${partialSkidUnitsInFullLefoverLifts}\nBooks: ${partialSkidUnitsInLeftoverUnits}`;
}


function showOutput()
{
   
        document.getElementById("answer").innerHTML = calculateOutput(80000, 54, 17, 5);
    
}