const addJobDisplayBtn: HTMLElement | null = document.getElementById("addJobDisplayBtn");
const quickCalcBtn: HTMLElement | null = document.getElementById("quickCalcBtn");
const addJobSubmitBtn: HTMLElement | null = document.getElementById("addJobSubmitBtn");


const addJobSection: HTMLElement | null = document.getElementById("addJobSection");
const addDispatchSection: HTMLElement | null = document.getElementById("addDispatchSection");
const addDispatchHeader: HTMLElement | null = document.getElementById("addDispatchHeader");
const jobNameHeader: HTMLElement | null = document.getElementById("jobNameHeader");
const jobNumberHeader: HTMLElement | null = document.getElementById("jobNumberHeader");
const jobsSelectSection: HTMLElement | null = document.getElementById("jobsSelectSection");
const displayDispatchSection: HTMLElement | null = document.getElementById("dispatchDisplaySection");

//localStorage.removeItem("jobs");
let jobsArray: Job[] | null = [];

let fullUrl: string | URL = new URL(window.location.href);
let baseUrl: string | undefined = fullUrl.toString().split("?")[0];
let currentJobNameFromParams: string | null = fullUrl.searchParams.get("jobName");
let currentJobNumberFromParams: string | null = fullUrl.searchParams.get("jobNumber");

//Try to test if gitignore worked

if (currentJobNameFromParams !== null && currentJobNumberFromParams !== null)
{
    if (addDispatchSection !== null)
        addDispatchSection.style.display = "block";


    if (jobNameHeader != null && jobNumberHeader && addDispatchHeader != null)
    {
        jobNameHeader.textContent = "Job Name - " + currentJobNameFromParams?.replaceAll('-', ' ');
        jobNumberHeader.textContent = "Job Number - " + currentJobNumberFromParams;
        addDispatchHeader.textContent = "Add calculation for dispatch to:"
    }
} else {
    if (addDispatchSection !== null)
    {
        addDispatchSection.style.display = "none";
    }
        
}

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
        
        
        if (addDispatchHeader != null && jobNameHeader !== null && jobNumberHeader !== null)
        {
            
            addDispatchHeader.innerHTML = "Quick Calc";
            jobNameHeader.textContent = "";
            jobNumberHeader.textContent = "";

            StripURLParams();
                    
        }
            
    });

    
    addJobSubmitBtn?.addEventListener('click', e => {
       e.preventDefault();
        
        let jobNameElement = document.getElementById("jobName") as HTMLFormElement;
        let jobNumberElement = document.getElementById("jobNumber") as HTMLFormElement;

        if (jobNameElement != null && jobNumberElement != null)
        {
            let submittedJob: Job = {jobName: jobNameElement.value, jobNumber: jobNumberElement.value};
            jobsArray?.push(submittedJob);
            setItem<Job[] | null>("jobs", jobsArray);
            DisplayJobsList();

            addJobSection.style.display = "none";

            let urlString = `${baseUrl}?jobNumber=${submittedJob.jobNumber}&jobName=${submittedJob.jobName.replaceAll(' ', '-')}`;
            window.location.href = urlString;
            console.log(urlString);
            console.log(window.location.href);
        }

        
    });


}

function DisplayJobsList(): void {
    const jobsList: HTMLElement| null = document.getElementById("jobsList");

    if (jobsArray != null && jobsSelectSection != null)
    {
        if (jobsArray.length > 0)
        {
            jobsSelectSection.style.display = "block";

            while(jobsList?.firstChild)
                jobsList.removeChild(jobsList.firstChild);

        } else {
            jobsSelectSection.style.display = "none";
        }
        
        jobsArray.reverse();

        for (let i = 0; i < jobsArray.length; i++)
        {
            let jobsListNode: HTMLElement = document.createElement("li");
            //jobsListNode.classList.add("list-group-item");

            let linkUrl: string = baseUrl?.toString() + `?jobNumber=${jobsArray[i]?.jobNumber}` + `&jobName=${jobsArray[i]?.jobName.replaceAll(' ', '-')}`;

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


function StripURLParams(): void {
    if (window.location.search) {  
        // Replace the current URL with the pathname (removes all parameters)  
        window.history.replaceState(  
        {}, // State object (can store data, optional)  
        document.title, // Page title (optional, ignored by most browsers)  
        window.location.pathname // New URL (path only, no parameters)  
        );  
    }  
}


function setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
}

function getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) as T : null;
}


