import { saveEntry } from "./JournalDataProvider.js"
import { getMoods, useMoods } from "../Mood/MoodProvider.js"

const contentTarget = document.querySelector(".journalEntryForm")
const eventHub = document.querySelector(".container")

export const journalFormComponent = (entriesArray) => {
    getMoods()
    .then(() => {
        const allMoods = useMoods()
        // console.log(moods)

    contentTarget.innerHTML = `
    <h3>Record Today's Entry</h3>
    <form action="">
        <fieldset>
            <label for="journalDate"> Date of Entry </label>
            <input type="date" name="journalDate" id="journalDate"> 
        </fieldset>
        <fieldset>
            Concepts covered:
            <input type="text"  name="concepts" id="journalConcepts">
        </fieldset>    
        <fieldset>
            Journal Entry:    
            <input type="textarea" size="30em" name="journalEntry" id="journalEntry"> 
        </fieldset>
        <fieldset>
            Mood: <select name="mood" id="mood"> 
            ${allMoods.map(
                    (mood) => {
                        return `<option value="${ mood.id }">${ mood.label }</option>`
                    }
                ).join("")
            }
            </select> 
        </fieldset>
    <button id="saveEntryButton">Save Entry</button>
</form>
    ` 
    })
}

eventHub.addEventListener("click", event => {
    if (event.target.id === "saveEntryButton") {
        event.preventDefault()
        
        const newEntry = {
            "date":`${document.getElementById("journalDate").value}`,
            "concept":`${document.getElementById("journalConcepts").value}`,
            "entry":`${document.getElementById("journalEntry").value}`,
            "moodId":`${document.getElementById("mood").value}`
        }
        saveEntry(newEntry)
    }
})