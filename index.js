let myLeads = []
const inputEl  = document.getElementById("input-el")
const saveEl = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage;
    renderLeads(myLeads);
}

const tabs = [
    {url: "https://www.linkedin.com/in/per-harald-borgen/"}
]

tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        console.log(tabs[0].url)    
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        renderLeads(myLeads)
    })
    
})

function renderLeads(leads){
    let listItems ='';
    for(let i= 0; i < leads.length; i++){
        listItems += `<li>
                         <a href='${leads[i]}' target ='_blank'>${leads[i]}</a>
                      </li>`
    }
    ulEl.innerHTML = listItems
}

saveEl.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value =''
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    renderLeads(myLeads)
    console.log(localStorage.getItem("myLeads"))
})
deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear();
    myLeads =[];
    renderLeads(myLeads)
})




