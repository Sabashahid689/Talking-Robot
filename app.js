document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector("button");

    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        console.error("Speech Recognition API is not supported in this browser.");
        return;
    }

    const recognition = new SpeechRecognition();

    recognition.onstart = function () {
        console.log("Speech Recognition started!");
    };

    recognition.onresult = function (event) {
        console.log(event);

        const spokenwords = event.results[0][0].transcript;

        console.log("Spoken words are:", spokenwords);

        // Pass the recognized speech to the computer speech function
        computerSpeech(spokenwords);
    };

    function computerSpeech(words) {
        const speech = new SpeechSynthesisUtterance();
        speech.lang = "en-US";
        speech.pitch = 0.9;
        speech.volume = 1;
        speech.rate = 1;

        determineWords(speech, words);

        if (!speech.text) {
            speech.text = "I didn't understand that. Could you repeat?";
        }

        window.speechSynthesis.speak(speech);
    }

    function determineWords(speech, words) {
        if (words.includes("how are you")) {
            speech.text = "I am fine, thank you!";
        } 
        else if (words.includes("who am I")) {
            speech.text = "You are my master!";

        } 
        else if (words.includes("what is your name")) {
            speech.text = "My name is saba!";
        } 
        else if (words.includes("how is the weather")) {
            speech.text = "Why do you care about that you never go out!";
        } else if (words.includes("do you understand my question")) {
            speech.text = "Yes, I understand!";
        } else if (words.includes("what happened")) {
            speech.text = "Nothing happened!";
        } else if (words.includes("should people follow my LinkedIn profile")) {
            speech.text = "Yes, you are a rising LinkedIn star!";
            window.open("https://www.linkedin.com/in/saba-jadoon-47242826b/");
        }
    }

    button.addEventListener("click", () => {
        recognition.start();
    });
});
