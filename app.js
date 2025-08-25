let speech = new SpeechSynthesisUtterance();
let voices = [];
let voicesSelect = document.querySelector("select");

window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0];

    // Clear old options first
    voicesSelect.innerHTML = "";

    // Add each voice to the select dropdown
    voices.forEach((voice, i) => {
        let option = new Option(`${voice.name} (${voice.lang})`, i);
        voicesSelect.add(option);
    });
};

// When button is clicked, speak text with selected voice
document.querySelector("button").addEventListener("click", () => {
    speech.text = document.querySelector("textarea").value;
    speech.voice = voices[voicesSelect.value]; // set chosen voice
    window.speechSynthesis.speak(speech);
});

// stop-btn
document.querySelector("#stopBtn").addEventListener("click",()=>{
    window.speechSynthesis.cancel();
})