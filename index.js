function speakText(text, pitch, rate, volume) {
    // stop any speaking in progress
    window.speechSynthesis.cancel();

    // create new utterance with all the properties
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = pitch;
    utterance.rate = rate;
    utterance.volume = volume;

    // speak that utterance
    window.speechSynthesis.speak(utterance);
}

window.WordSpeller = function () {
    return {
        selectedWordIndex: 3,
        words: [
            { text: "alpha", correct: false },
            { text: "beta", correct: false },
            { text: "theta", correct: false },
            { text: "greek", correct: false },
            { text: "five", correct: false },
            { text: "alpha", correct: false },
            { text: "beta", correct: false },
            { text: "theta", correct: false },
            { text: "greek", correct: false },
            { text: "five", correct: false },
            { text: "beta", correct: false },
            { text: "theta", correct: false },
            { text: "greek", correct: false },
            { text: "five", correct: false },
        ],
        sayWord(index) {
            speakText(this.words[index].text, 1, 1, 1);
        },
        answerWord(index) {
            let answer = document.getElementById("answer_" + index).value;
            this.words[index].correct = (this.words[index].text === answer);
        },
        init() {
            console.log("init()", this.words.length);
        },
    };
};

