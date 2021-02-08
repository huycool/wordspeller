window.WordSpeller = function () {
  return {
    showSettings: false,
    selectedWordIndex: 3,
    words: [
      { text: "dog", correct: false },
      { text: "beta", correct: false },
      { text: "theta", correct: false },
    ],
    sayWord(index) {
      speakText(this.words[index].text, 1, 1, 1);
    },
    answerWord(index) {
      let answer = document.getElementById("answer_" + index).value;
      this.words[index].correct =
        this.words[index].text.toLowerCase() === answer.toLowerCase();
    },
    init() {
      console.log("init()", this.words.length);
      document.getElementById("inputWords").value = this.words
        .map(w => w.text)
        .join("\n");
    },
    setWords() {
      let words = document
        .getElementById("inputWords")
        .value.trim()
        .split("\n");
      console.log(words);
      this.words = words.map(w => {
        return { text: w, correct: false };
      });
      let answerInputs = document.querySelectorAll("[id^='answer_']");
      for (const i of answerInputs) {
        i.value = "";
      };
    },
  };
};

function speakText(text, pitch, rate, volume) {
  // stop any speaking in progress
  window.speechSynthesis.cancel();

  // create new utterance with all the properties
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.pitch = pitch;
  utterance.rate = rate;
  utterance.volume = volume;

  var selectedOption = voiceSelect.selectedOptions[0].getAttribute("data-name");
  for (var i = 0; i < voices.length; i++) {
    if (voices[i].name === selectedOption) {
      utterance.voice = voices[i];
    }
  }

  // speak that utterance
  window.speechSynthesis.speak(utterance);
}

var synth = window.speechSynthesis;
var voices = [];
var voiceSelect = document.getElementById("voiceSelect");

function populateVoiceList() {
  // voices = synth.getVoices().sort(function (a, b) {
  //     const aname = a.name.toUpperCase(), bname = b.name.toUpperCase();
  //     if (aname < bname) return -1;
  //     else if (aname == bname) return 0;
  //     else return +1;
  // });
  voices = synth.getVoices();
  var selectedIndex =
    voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
  voiceSelect.innerHTML = "";
  for (i = 0; i < voices.length; i++) {
    var option = document.createElement("option");
    option.textContent = voices[i].name + " (" + voices[i].lang + ")";

    if (voices[i].default) {
      option.textContent += " -- DEFAULT";
    }

    option.setAttribute("data-lang", voices[i].lang);
    option.setAttribute("data-name", voices[i].name);
    voiceSelect.appendChild(option);
  }
  voiceSelect.selectedIndex = selectedIndex;
}

populateVoiceList();
if (
  typeof speechSynthesis !== "undefined" &&
  speechSynthesis.onvoiceschanged !== undefined
) {
  window.speechSynthesis.onvoiceschanged = populateVoiceList;
}
