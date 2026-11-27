const addJobDisplayBtn: HTMLElement | null = document.getElementById("addJobDisplayBtn");
const quickCalcBtn: HTMLElement | null = document.getElementById("quickCalcBtn");
const addJobSubmitBtn: HTMLElement | null = document.getElementById("addJobSubmitBtn");


const addJobSection: HTMLElement | null = document.getElementById("addJobSection");
const addDispatchSection: HTMLElement | null = document.getElementById("addDispatchSection");
const addDispatchHeader: HTMLElement | null = document.getElementById("addDispatchHeader");


let jobsArray: Job[] | null = [];


interface Job
{
    jobName: string;
    jobNumber: string;

}


interface Dispatch
{
    jobNumber: string;
    id: number;
    stackType: "Stack Down" | "Carton Pack";
    total: number;
    liftQty: number;
    liftsInLayer: number,
    layersOnSkid: number,
    
}

if ((jobsArray.length === 0 || jobsArray === null) && getItem<Job[]>("jobs"))
{
    jobsArray = getItem<Job[]>("jobs");
    DisplayJobsList();
}

if (addDispatchSection !== null && addJobSection !== null)
{
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
       
        
        let jobNameElement = document.getElementById("jobName") as HTMLFormElement;
        let jobNumberElement = document.getElementById("jobNumber") as HTMLFormElement;

        if (jobNameElement != null && jobNumberElement != null)
        {
            let submittedJob: Job = {jobName: jobNameElement.value, jobNumber: jobNumberElement.value};
            jobsArray?.push(submittedJob);
            setItem<Job[] | null>("jobs", jobsArray);
            DisplayJobsList();

            addJobSection.style.display = "none";
        }
           
        
    });


}

function DisplayJobsList(): void {
    const jobsList: HTMLElement| null = document.getElementById("jobsList");
    
    if (jobsArray != null)
    {
        if (jobsArray.length > 0)
        {
            while(jobsList?.firstChild)
                jobsList.removeChild(jobsList.firstChild);
            
        }
        jobsArray.reverse();

        for (let i = 0; i < jobsArray.length; i++)
        {
            let jobsListNode: HTMLElement = document.createElement("li");
            jobsListNode.classList.add("list-group-item");
            jobsListNode.innerHTML = `<a href="#">${jobsArray[i]?.jobNumber}</a> - ${jobsArray[i]?.jobName} `

        //     let removeButton: HTMLButtonElement = document.createElement("button");
        //    removeButton.textContent = "X";
        //    removeButton.style.backgroundColor = "red";
        //    removeButton.id = `${jobsArray[i]?.jobName}`;
        //    jobsListNode.appendChild(removeButton);

            jobsList?.appendChild(jobsListNode);
        }
    }
}

        


function setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
}

function getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) as T : null;
}


