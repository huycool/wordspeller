window.WordSpeller = function () {
  return {
    showSettings: false,
    selectedWordIndex: 3,
    inputWords: "",
    words: [],
    sayWord(index, rate = 1) {
      speakText(this.words[index].text, 1, rate, 1);
    },
    answerWord(index) {
      let answer = document.getElementById("answer_" + index).value;
      this.words[index].correct =
        this.words[index].text.toLowerCase() === answer.toLowerCase();
      if (this.words[index].correct == false) {
        playWrongAnswer(index);
      }

      let gotAllWords = this.words.every((w) => w.correct == true);
      if (gotAllWords == true) {
        document.getElementById("greatJob-image").src =
          this.winningGifs.data[Math.floor(Math.random() * 25)].images.original.url;
        document.getElementById("greatJob").classList.add("is-active");
        this.setWords();
      }
    },
    init() {            
      this.selectedWinGif = this.winGifOptions[Math.floor(Math.random() * this.winGifOptions.length)];
      this.getWinningGifs();
    },
    setWords() {
      this.words = [];
      let words = this.inputWords.trim().split("\n");
      console.log(words);
      if (words.length > 0 && words[0] != "") {
        this.words = words.map((w) => {
          return { text: w, correct: false };
        });
      }
      let answerInputs = document.querySelectorAll("[id^='answer_']");
      for (const i of answerInputs) {
        i.value = "";
      }
    },
    saveWords() {
      this.words=[];
      let words = this.inputWords.trim().split("\n");
      localStorage.setItem("words", JSON.stringify(words));
    },
    loadWords() {
      this.words=[];
      let words = JSON.parse(localStorage.getItem("words"));
      this.inputWords = words.join("\n");
    },
    selectedWinGif: "",
    winGifOptions : ["panda","fortnite","funnycats"],
    winningGifs: [],
    getWinningGifs() {
      fetch(this.selectedWinGif + ".json")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          this.winningGifs = data;
        });
    },
  };
};

// ref: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Tips#javascript_content
function playWrongAnswer(index) {
  document.getElementById("wordbox_" + index).className = "box";
  window.requestAnimationFrame(function (time) {
    window.requestAnimationFrame(function (time) {
      document.getElementById("wordbox_" + index).className =
        "box animate-wrong";
    });
  });
}

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

  let findEnglishIdx = 0;
  for (i = 0; i < voices.length; i++) {
    var option = document.createElement("option");
    option.textContent = voices[i].name + " (" + voices[i].lang + ")";

    if (
      option.textContent.indexOf("en-US") > -1 ||
      option.textContent.indexOf("en_US") > -1
    ) {
      findEnglishIdx = i;
    }

    if (voices[i].default) {
      option.textContent += " -- DEFAULT";
    }

    option.setAttribute("data-lang", voices[i].lang);
    option.setAttribute("data-name", voices[i].name);
    voiceSelect.appendChild(option);
  }
  voiceSelect.selectedIndex = findEnglishIdx;
}

populateVoiceList();
if (
  typeof speechSynthesis !== "undefined" &&
  speechSynthesis.onvoiceschanged !== undefined
) {
  window.speechSynthesis.onvoiceschanged = populateVoiceList;
}
