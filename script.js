const palette = document.getElementById("palette");
const generateBtn = document.getElementById("generateBtn");
const copyAll = document.getElementById("copyAll");

let colors = [];

// Random color
function getRandomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

// Create palette
function generatePalette() {
    palette.innerHTML = "";

    colors = Array.from({ length: 5 }, (_, i) => {
        return colors[i]?.locked ? colors[i] : { hex: getRandomColor(), locked: false };
    });

    colors.forEach((color, index) => {
        const card = document.createElement("div");
        card.classList.add("color-card");
        card.style.background = color.hex;

        const code = document.createElement("div");
        code.classList.add("color-code");
        code.textContent = color.hex;

        code.onclick = () => {
            navigator.clipboard.writeText(color.hex);
            alert("Copied " + color.hex);
        };

        const lock = document.createElement("div");
        lock.classList.add("lock-btn");
        lock.textContent = color.locked ? "🔒" : "🔓";

        lock.onclick = () => {
            colors[index].locked = !colors[index].locked;
            generatePalette();
        };

        card.appendChild(lock);
        card.appendChild(code);
        palette.appendChild(card);
    });
}

// Copy full palette
copyAll.onclick = () => {
    const text = colors.map(c => c.hex).join(", ");
    navigator.clipboard.writeText(text);
    alert("Palette copied!");
};

// Button click
generateBtn.onclick = generatePalette;

// Space key
document.addEventListener("keydown", (e) => {
    if (e.code === "Space") generatePalette();
});

// Initial load
generatePalette();