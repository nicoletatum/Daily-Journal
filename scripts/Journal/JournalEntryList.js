import { useEntries, getEntries, deleteEntry } from "./JournalDataProvider.js"
import { JournalEntryComponent } from "./JournalEntry.js"
import { getMoods, useMoods } from "../Mood/MoodProvider.js"

const eventHub = document.querySelector(".container")
const entryLog = document.querySelector(".entryFormContainer")

export const EntryListComponent = () => {
    getEntries()
    .then(getMoods)
        .then(() => {
            const entries = useEntries()
            const moods = useMoods()

            const entriesWithMoods = entries.map(entry => {
                const selectedMood = moods.find(mood => mood.id === entry.moodId)
                return JournalEntryComponent(entry, selectedMood)
            }).join("")
            entryLog.innerHTML +=`
            ${entriesWithMoods}
            `   
        })
    }

eventHub.addEventListener("journalStateChanged", e => {
    EntryListComponent()
})

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("deleteNote--")) {
        const [prefix, id] = clickEvent.target.id.split("--")   
        deleteEntry(id).then(
            () => {
                const newEntryList = useEntries()
                const moods = useMoods()
                render (newEntryList, moods)
            }
        )
    }
})
