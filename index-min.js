function speakText(e,t,o,s){window.speechSynthesis.cancel();const n=new SpeechSynthesisUtterance(e);n.pitch=t,n.rate=o,n.volume=s;for(var i=voiceSelect.selectedOptions[0].getAttribute("data-name"),c=0;c<voices.length;c++)voices[c].name===i&&(n.voice=voices[c]);window.speechSynthesis.speak(n)}window.WordSpeller=function(){return{showSettings:!1,selectedWordIndex:3,words:[{text:"cat",correct:!1},{text:"dog",correct:!1},{text:"apple",correct:!1}],sayWord(e,t=1){speakText(this.words[e].text,1,t,1)},answerWord(e){let t=document.getElementById("answer_"+e).value;this.words[e].correct=this.words[e].text.toLowerCase()===t.toLowerCase(),1==this.words.every((e=>1==e.correct))&&(document.getElementById("greatJob-image").src=pandaGifs.data[Math.floor(50*Math.random())].images.original.url,document.getElementById("greatJob").classList.add("is-active"),this.setWords())},init(){document.getElementById("inputWords").value=this.words.map((e=>e.text)).join("\n"),this.getPandaGifs()},setWords(){let e=document.getElementById("inputWords").value.trim().split("\n");this.words=e.map((e=>({text:e,correct:!1})));let t=document.querySelectorAll("[id^='answer_']");for(const e of t)e.value=""},pandaGifs:[],getPandaGifs(){fetch("./panda.json").then((e=>e.json())).then((e=>{pandaGifs=e}))}}};var synth=window.speechSynthesis,voices=[],voiceSelect=document.getElementById("voiceSelect");function populateVoiceList(){voices=synth.getVoices();var e=voiceSelect.selectedIndex<0?0:voiceSelect.selectedIndex;for(voiceSelect.innerHTML="",i=0;i<voices.length;i++){var t=document.createElement("option");t.textContent=voices[i].name+" ("+voices[i].lang+")",voices[i].default&&(t.textContent+=" -- DEFAULT"),t.setAttribute("data-lang",voices[i].lang),t.setAttribute("data-name",voices[i].name),voiceSelect.appendChild(t)}voiceSelect.selectedIndex=e}populateVoiceList(),"undefined"!=typeof speechSynthesis&&void 0!==speechSynthesis.onvoiceschanged&&(window.speechSynthesis.onvoiceschanged=populateVoiceList);