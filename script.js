// sounds 
const openJournal = document.getElementById('open-journal');
const tapJournal = document.getElementById('tap-journal');
const closeJournal = document.getElementById('close-journal');

const openDialogue = document.getElementById('open-dialogue');
const finishedDialogue = document.getElementById('finish-dialogue');
const closeDialogue = document.getElementById('close-dialogue');

const celebration = document.getElementById('celebration');

// opening and closing the journal when the mail and exit icons are clicked 
const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const flex1 = document.getElementById('flex1');
const flex2 = document.getElementById('flex2');
const audio = document.getElementById('bg-music');
audio.volume = 0.5;

const jiggleSound = document.getElementById('jiggle-sound');
let soundEnabled = true;

// showing and hiding quest details when Advancement is clicked 
const btn3 = document.getElementById('btn3');
const AdvText = document.getElementById('AdvText');
const CanQue = document.getElementById('CanQue');
const Overlay = document.getElementById('btn3');

// hide new button when Advancement (overlay) is clicked 
const New = document.getElementById('New');

// pop up for clicking cancel quest
const btn4 = document.getElementById('btn4');
const FullOverlay1 = document.getElementById('full-overlay');
const typingText = document.getElementById('typing-text');
const typingAudio = document.getElementById('typing-fast');
const btnYes = document.getElementById('btn-yes');
const btnNo = document.getElementById('btn-no');

// make yes button jump around screen 
const overlayContent = document.getElementById('overlay-content');

const btnYesInitialLeft = btnYes.style.left;
const btnYesInitialTop = btnYes.style.top;

// chickens from clicking next button 
const btn5 = document.getElementById('btn5');
const flex3 = document.getElementById('flex3');

// chicken slider 
const scrollers = document.querySelectorAll('.scroller');

// last page 
const flex4 = document.querySelector('.child-of-3-4');
const goldenChicken = document.querySelector('.golden-chicken');
const voidChicken = document.querySelector('.void-chicken');


// conveyor and dialogue 
const row2 = document.querySelector('.child-of-3-2');
const row3 = document.querySelector('.child-of-3-3');
const slideTrack = document.querySelector('.scroller-inner');
const dialogueText = document.getElementById('dialogueText');
const dialogueBox = document.getElementById('dialogueBox');
const dialogueImage = document.getElementById('dialogueImage');
const dialogueWord = document.getElementById("dialogueWord");

let activeDialogue = [];
let currentLine = 0;
let isTyping = false;
let typingTimeout;
let typingSpeed = 50; // default speed
let fastSpeed = 5;   // fast mode when clicked/pressed
let currentSpeed = typingSpeed;

// sample dialogues 
const dialogues = {
  beige: ["Yerti needs frequent affirmations.", "For these affirmations to be most effective, they should be given freely, without Yerti having to ask for them.", "Affirmations don’t need to be poetic. A simple and unprompted “I missed you today” or “I like how [insert compliment here] you are” can go a long way.", "The focus is on frequency and spontaneity, not on length or poetic flair."],
  brown: ["Direction covers two main areas: Forecasting and Mental Load.", "Forecasting: Yerti needs you to share how you’re feeling.", "Specifically, how you’re feeling about her, about the relationship, about the future and about timelines. ", "The Forecasting is most effective when Yerti receives it proactively, rather than needing to request it.", "Mental Load: Yerti appreciates being given the choice, such as picking the cuisine or restaurant.", "That said, being the one to make these decisions most of the time can be exhausting for Yerti.", "Yerti appreciates it when you take the lead on decisions sometimes, especially if she asks for your input."],
  blue: ["Yerti appreciates it when you initiate physical touch.", "Yerti understands that you may not always be in the mood or feel comfortable to do so.", "Still, when you do feel like it, it can make a big difference to Yerti’s perception of the relationship as this can act as a physical Affirmation.", "In essence, Yerti wants to feel like you really want to touch her."]
};

const images = {
  beige: "./Images/classic-dialogue-shaded.png",
  brown: "./Images/brown-dialogue-shaded.png",
  blue: "./Images/blue-dialogue-shading.png"
};

const words = {
  beige: "Affirmation",
  brown: "Direction",
  blue: "Affection"
};



// slider
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    addAnimation();
}

function addAnimation() {
    scrollers.forEach((scroller) => {
        scroller.setAttribute("data-animated", true);
    });
}






// conveyor & dialogues 
// Handle clicks on conveyor items
document.querySelectorAll(".item").forEach(item => {
  item.addEventListener("click", () => {
    if (item.classList.contains("no-opacity")) return; // ignore already faded

    const type = item.classList.contains("beige")
      ? "beige"
      : item.classList.contains("brown")
      ? "brown"
      : "blue";

    startDialogue(type);
  });
});

// Start dialogue for a type
function startDialogue(type) {
  slideTrack.classList.add("paused"); // pause conveyor
  row3.classList.remove("hidden", "no-opacity");   // show dialogue box

  openDialogue.play();

  row3.dataset.activeType = type;

  activeDialogue = dialogues[type];
  currentLine = 0;

  if (dialogueImage) {
    dialogueImage.src = images[type] || "";
  }

  if (dialogueWord) {
    dialogueWord.textContent = words[type] || "";
  }
  

  showLine();
}

// Typewriter effect
function showLine() {
  isTyping = true;
  dialogueText.textContent = "";
  let line = activeDialogue[currentLine];
  let i = 0;
  currentSpeed = typingSpeed;

  function typeChar() {
    if (i < line.length) {
      dialogueText.textContent += line.charAt(i);
      i++;
      typingTimeout = setTimeout(typeChar, currentSpeed);
    } else {
      isTyping = false; // finished typing this line
      finishedDialogue.play();
    }
  }

  typeChar();
}

// Advance dialogue when box clicked or arrow key pressed
function advanceDialogue() {
  if (isTyping) {
    // Speed up typing, don’t instantly finish
    currentSpeed = fastSpeed;
    return;
  }

  // Line finished, move to next
  currentLine++;
  if (currentLine < activeDialogue.length) {
    showLine();
  } else {
    finishDialogue();
  }
}

// Finish dialogue for the active type
function finishDialogue() {
  const activeType = row3.dataset.activeType;

  // Fade out items of that type
  document.querySelectorAll(`.item.${activeType}`).forEach(el => {
    el.classList.add("no-opacity");
  });

 // Fade out dialogue box itself
  row3.classList.add("no-opacity");
  closeDialogue.play();

  // Resume conveyor
  slideTrack.classList.remove("paused");

  // Check if all items are faded out
  const allGone = [...document.querySelectorAll(".item")].every(el =>
    el.classList.contains("no-opacity")
  );

  if (allGone) {
    row2.classList.add("hidden");
    row3.classList.add("hidden");
    flex4.classList.remove('hidden');
  }
}

// Click anywhere on the dialogue box
row3.addEventListener("click", advanceDialogue);

// Press right arrow key
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    advanceDialogue();
  }
});


// last page

voidChicken.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation(); //prevents box from collapsing when (completing action from btn3 function) when btn4 is clicked
    // alert('You have clicked the button!');
    FullOverlay1.classList.remove('hidden');
    typeText("Are you sure you want to end your relationship?", typingText);

    typingAudio.play();

    setTimeout(() => {
        btnYes.classList.remove('no-opacity');
        btnNo.classList.remove('no-opacity');

        btnYes.classList.add('fade-in');
        btnNo.classList.add('fade-in');

    }, 5000);

})

goldenChicken.addEventListener('click', (e) => {
    e.preventDefault();
    const link = document.createElement("a");
    link.href = "./PDFs/HappyYertiSummary.pdf"; // relative path to the PDF file
    link.download = "Happy Yerti Summary.pdf";   // filename for download
    link.click();

    celebration.play();
    celebration.volume = 0.5;

    pauseForSeconds(5);
})

function pauseForSeconds(seconds) {
    if (!audio.paused) {
      audio.pause();
      setTimeout(() => {
        audio.play();
      }, seconds * 1000);
    }
  }



// working Alhamdulillah

document.addEventListener('mouseover', function unlockAudio() {
    jiggleSound.play().then(() => {
        jiggleSound.pause();
        jiggleSound.currentTime = 0;
    });
    document.removeEventListener('mouseover', unlockAudio);
});


setInterval(() => {
    btn1.classList.add('jiggle');

    if (soundEnabled) {
        setTimeout(() => {
            jiggleSound.currentTime = 0;
            jiggleSound.play();
        }, 10); // tiny delay to ensure class applied
    }

    // setTimeout(() => {
    //     jiggleSound.currentTime = 0;
    //     jiggleSound.play();
    // }, 10); 

    setTimeout(() => {
        btn1.classList.remove('jiggle');
    }, 400);
}, 3000);

btn1.addEventListener('click', (e) => {
    e.preventDefault();
    flex1.classList.add('hidden');
    flex2.classList.remove('hidden');

    audio.play();
    openJournal.play();

    soundEnabled = false;
    jiggleSound.pause();
    jiggleSound.currentTime = 0;
})

btn2.addEventListener('click', (e) => {
    e.preventDefault();
    flex1.classList.remove('hidden');
    flex2.classList.add('hidden');

    closeJournal.play();

    soundEnabled = true;         // allow future jiggle sounds
    jiggleSound.currentTime = 0;
})

btn3.addEventListener('click', (e) => {
    if (e.target.id === 'btn4') return;
    e.preventDefault();
    AdvText.classList.toggle('hidden');
    CanQue.classList.toggle('hidden');
    Overlay.classList.add('background-colour');
    New.classList.add('hidden');
    // alert('you have clicked parent');

    tapJournal.play();
})

let typingInterval;

btn4.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation(); //prevents box from collapsing when (completing action from btn3 function) when btn4 is clicked
    // alert('You have clicked the button!');
    FullOverlay1.classList.remove('hidden');
    typeText("Are you sure you want to end your relationship?", typingText);

    typingAudio.currentTime = 0;
    typingAudio.play();

    setTimeout(() => {
        btnYes.classList.remove('no-opacity');
        btnNo.classList.remove('no-opacity');

        btnYes.offsetHeight; // force reflow
        btnNo.offsetHeight; 
        btnYes.classList.add('fade-in');
        btnNo.classList.add('fade-in');

    }, 5000);

})

function typeText(text, element, speed = 100) {
    if (typingInterval) clearInterval(typingInterval);

    element.textContent = ""; // clear any previous text
    let i = 0;

    typingInterval = setInterval(() => {  // ✅ store it globally
        element.textContent += text.charAt(i);
        i++;
        if (i >= text.length) clearInterval(typingInterval);
    }, speed);

    // const interval = setInterval(() => {
    //     element.textContent += text.charAt(i);
    //     i++;
    //     if (i >= text.length) clearInterval(interval); // stop when done
    // }, speed);
}


btnNo.addEventListener('click', (e) => {
    e.preventDefault();
    FullOverlay1.classList.add('hidden');

    // position Yes button back to where it was
    btnYes.style.left = btnYesInitialLeft;
    btnYes.style.top = btnYesInitialTop;

    // stop typing audio immediately when no is clicked
    typingAudio.pause();
    typingAudio.currentTime = 0;

    // stop typing immediately
    if (typingInterval) clearInterval(typingInterval);
    typingText.textContent = "";

    closeJournal.play();
})

btnYes.addEventListener('mouseenter', () => {
    // const screenWidth = window.innerWidth;
    // const screenHeight = window.innerHeight;
    const overlayContentRect = overlayContent.getBoundingClientRect();
    const btnRect = btnYes.getBoundingClientRect();

    const maxX = overlayContentRect.width - btnRect.width;
    const maxY = overlayContentRect.height - btnRect.height;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    btnYes.style.left = randomX + "px";
    btnYes.style.top = randomY + "px";

    // alert('youre hovering over the button');
})


// hide flex-child-2 when click next 

btn5.addEventListener('click', (e) => {
    e.preventDefault();
    flex2.classList.add('hidden');
    flex3.classList.remove('hidden');

    openJournal.play();
    
})


