let journal = []

const eventHub = document.querySelector(".container")

export const useEntries = () => {
    const sortedByDate = journal.sort(
        (currentEntry, nextEntry) =>
            Date.parse(currentEntry.date) - Date.parse(nextEntry.date)
    )
    return sortedByDate
}

const dispatchStateChangeEvent = () => {
    eventHub.dispatchEvent(new CustomEvent("journalStateChanged"))
}

export const getEntries = () => {
    // return fetch("http://localhost:8088/entries")
    return fetch("http://localhost:8088/entries?_expand=mood")
     // Fetch from the API
        .then(response => response.json())  // Parse as JSON
        .then(entries => {
            journal = entries
        })
}

export const saveEntry = (newEntry) => {
fetch("http://localhost:8088/entries", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(newEntry)
})
    .then(getEntries)  
    .then(dispatchStateChangeEvent) 
}