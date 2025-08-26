let speech = new SpeechSynthesisUtterance();
let voices = [];
const voicesSelect = document.querySelector("#voiceSelect");

// Function to populate voices
function populateVoices() {
    voices = window.speechSynthesis.getVoices();
    
    // Clear old options
    voicesSelect.innerHTML = "";

    voices.forEach((voice, i) => {
        let option = new Option(`${voice.name} (${voice.lang})`, i);
        voicesSelect.add(option);
    });

    // Set default voice
    if (voices.length > 0) speech.voice = voices[0];
}

// Some browsers require this event
window.speechSynthesis.onvoiceschanged = populateVoices;

// Initial population (in case voices are already loaded)
populateVoices();

// Convert button
document.querySelector("#convertBtn").addEventListener("click", () => {
    const text = document.querySelector("textarea").value;
    if (!text) return; // Do nothing if textarea is empty

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    speech.text = text;
    const selectedIndex = parseInt(voicesSelect.value, 10);
    if (!isNaN(selectedIndex)) speech.voice = voices[selectedIndex];
    
    window.speechSynthesis.speak(speech);
});

// Stop button
document.querySelector("#stopBtn").addEventListener("click", () => {
    window.speechSynthesis.cancel();
});
