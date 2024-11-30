let diagram = document.getElementById("diagram")
let color = document.getElementById("color")
let greenButton = document.getElementById("greenButton")
let redButton = document.getElementById("redButton")
let blueButton = document.getElementById("blueButton")
let resetButton = document.getElementById("resetButton")

greenButton.addEventListener("click", () => {
    diagram.style.backgroundColor = "green"
})

redButton.addEventListener("click", () => {
    diagram.style.backgroundColor = "red"
})

blueButton.addEventListener("click", () => {
    diagram.style.backgroundColor = "blue"
})

resetButton.addEventListener("click", () => {
    diagram.style.backgroundColor = "transparent"
})

color.addEventListener("change", () => {
    diagram.style.backgroundColor = color.value
})