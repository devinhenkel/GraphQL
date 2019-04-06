const logString = "hello from the module!"
const name = "D-Dogg!"
const getLocation = (city) => {
    return `I am in ${city}`
}

export { logString, name, getLocation as default }