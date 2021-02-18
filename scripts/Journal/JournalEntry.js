export const JournalEntryComponent = (entry) => {
    return `
        <section id="entry--${entry.id}" class="journalEntry">
            <div class="entryContainer">
                <div class="entryDate">Date: ${entry.date} </div>
                <div class="entryConcept">Topic: ${entry.concept} </div>
                <div class="entryMood">Mood: ${entry.mood.label} </div>
            </div>
                <div class="entryEntry">${entry.entry}</div>
                <button id="deleteNote--${entry.id}">Delete Note</button>
        </section>
    `
}