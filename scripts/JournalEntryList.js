import { useEntries, getEntries } from "./JournalDataProvider.js"
import { JournalEntryComponent } from "./JournalEntry.js"

const eventHub = document.querySelector(".container")
const entryLog = document.querySelector(".entryFormContainer")

export const EntryListComponent = () => {
    getEntries()
        .then(() => {
            const entries = useEntries()
            entryLog.innerHTML +=`
            ${entries.map(entry=> JournalEntryComponent(entry)).join("")}
            `   
        })
    }

eventHub.addEventListener("journalStateChanged", e => {
    EntryListComponent()
})