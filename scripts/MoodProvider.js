let moods = []

export const getMoods = () => {
    return fetch ("http://localhost:8088/moods")
    .then(response => response.json())
    .then(parsedMoods => {
        moods = parsedMoods
    })
}

export const useMoods = () => moods.slice()
