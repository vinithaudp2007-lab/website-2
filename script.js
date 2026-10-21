
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // =========================================
  // 1. RELATIONSHIP COUNTER
  // Relationship started: 6 July 2025
  // =========================================

  const startDate = new Date(2025, 6, 6, 0, 0, 0);

  const daysElement = document.getElementById("days");
  const hoursElement = document.getElementById("hours");
  const minutesElement = document.getElementById("minutes");
  const secondsElement = document.getElementById("seconds");

  function updateCounter() {
    const now = new Date();
    const elapsed = Math.max(0, now.getTime() - startDate.getTime());

    const totalSeconds = Math.floor(elapsed / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    daysElement.textContent = String(days);
    hoursElement.textContent = String(hours).padStart(2, "0");
    minutesElement.textContent = String(minutes).padStart(2, "0");
    secondsElement.textContent = String(seconds).padStart(2, "0");
  }

  updateCounter();
  window.setInterval(updateCounter, 1000);

  // =========================================
  // 2. SMALL STATUS / TOAST MESSAGE
  // =========================================

  const toast = document.getElementById("heart-toast");
  let toastTimer;

  function showToast(message) {
    toast.textContent = message;
    toast.hidden = false;

    window.clearTimeout(toastTimer);

    toastTimer = window.setTimeout(() => {
      toast.hidden = true;
    }, 3000);
  }

  // =========================================
  // 3. OPEN MY HEART BUTTON
  // =========================================

  const openHeartButton = document.getElementById("open-heart");
  const revealSecretButton = document.getElementById("reveal-secret");
  const secretMessage = document.getElementById("secret-message");

  function revealSecret() {
    secretMessage.hidden = false;
    revealSecretButton.textContent = "My heart is yours ❤️";
    revealSecretButton.disabled = true;
    revealSecretButton.setAttribute("aria-expanded", "true");
  }

  openHeartButton.addEventListener("click", () => {
    revealSecret();
    document.getElementById("secret").scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  });

  revealSecretButton.setAttribute("aria-expanded", "false");

  revealSecretButton.addEventListener("click", () => {
    revealSecret();
  });

  // =========================================
  // 4. VIRTUAL HUG SURPRISE
  // =========================================

  const hugButton = document.getElementById("hug-button");
  const hugMessage = document.getElementById("hug-message");

  hugButton.addEventListener("click", () => {
    hugMessage.hidden = false;
    hugButton.textContent = "Hug sent successfully! ❤️";
    showToast("A big hug is on its way to Nonsenseeee! 🫂");
  });

  // =========================================
  // 5. MUSIC PLAYER
  //
  // Add your MP3 file at:
  // assets/our-song.mp3
  // =========================================

  const audio = document.getElementById("our-song");
  const musicButton = document.getElementById("music-toggle");
  const musicStatus = document.getElementById("music-status");
  const audioSource = audio.querySelector("source");

  function setMusicButton(isPlaying) {
    musicButton.textContent = isPlaying ? "Ⅱ" : "▶";
    musicButton.setAttribute(
      "aria-label",
      isPlaying ? "Pause our song" : "Play our song"
    );
  }

  musicButton.addEventListener("click", async () => {
    if (!audioSource || !audioSource.getAttribute("src")) {
      musicStatus.textContent =
        "Please add your favourite MP3 file to the assets folder.";
      return;
    }

    if (audio.paused) {
      musicStatus.textContent = "Loading your song…";

      try {
        await audio.play();
      } catch (error) {
        musicStatus.textContent =
          "Song not found. Add assets/our-song.mp3 and try again.";
        setMusicButton(false);
      }
    } else {
      audio.pause();
    }
  });

  audio.addEventListener("play", () => {
    setMusicButton(true);
    musicStatus.textContent = "Playing our song ❤️";
  });

  audio.addEventListener("pause", () => {
    setMusicButton(false);

    if (audio.ended) {
      musicStatus.textContent = "Our song has ended. Play it again? ❤️";
    } else if (audio.currentTime > 0) {
      musicStatus.textContent = "Song paused. Continue whenever you like.";
    }
  });

  audio.addEventListener("ended", () => {
    setMusicButton(false);
    musicStatus.textContent = "Our song has ended. Play it again? ❤️";
  });

  audio.addEventListener("error", () => {
    setMusicButton(false);
    musicStatus.textContent =
      "Add your MP3 file as assets/our-song.mp3 to play music.";
  });

  // =========================================
  // 6. FLOATING HEARTS
  // =========================================

  const heartsContainer = document.getElementById("floating-hearts");
  const heartSymbols = ["♥", "♡", "❤"];

  function createFloatingHeart() {
    if (document.hidden) return;

    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.setAttribute("aria-hidden", "true");

    heart.textContent =
      heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${12 + Math.random() * 18}px`;
    heart.style.animationDuration = `${8 + Math.random() * 8}s`;

    heartsContainer.appendChild(heart);

    heart.addEventListener("animationend", () => {
      heart.remove();
    }, { once: true });
  }

  // Add a few hearts when the page first opens.
  for (let i = 0; i < 5; i++) {
    window.setTimeout(createFloatingHeart, i * 500);
  }

  // Add new hearts slowly to avoid clutter.
  window.setInterval(createFloatingHeart, 1800);

  // =========================================
  // 7. FOOTER / CONSOLE MESSAGE
  // =========================================

  console.log("You, Me & Forever ❤️ — Page 1 loaded successfully.");
});

"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const evidenceBtn = document.getElementById("evidenceBtn");
  const evidenceBox = document.getElementById("evidenceBox");

  const guiltyBtn = document.getElementById("guiltyBtn");
  const innocentBtn = document.getElementById("innocentBtn");

  const verdictResult = document.getElementById("verdictResult");
  const verdictTitle = document.getElementById("verdictTitle");
  const verdictMessage = document.getElementById("verdictMessage");
  const gavel = document.getElementById("gavel");

  const loveBtn = document.getElementById("loveBtn");
  const loveMessage = document.getElementById("loveMessage");

  // Show or hide the evidence
  evidenceBtn.addEventListener("click", function () {
    const isHidden = evidenceBox.classList.contains("hidden");

    evidenceBox.classList.toggle("hidden");

    evidenceBtn.textContent = isHidden
      ? "📁 Hide the Evidence"
      : "🔍 Present the Evidence";

    if (isHidden) {
      evidenceBox.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }
  });

  // Play the gavel animation
  function animateGavel() {
    gavel.classList.remove("swing");

    // Restart the animation when the button is clicked again.
    void gavel.offsetWidth;

    gavel.classList.add("swing");
  }

  // Display the verdict
  function showVerdict(isGuilty) {
    animateGavel();

    verdictResult.classList.remove("hidden");

    if (isGuilty) {
      verdictTitle.textContent = "⚖️ GUILTY AS CHARGED! ❤️";

      verdictMessage.textContent =
        "Dev, you are officially guilty of stealing Vin's heart, " +
        "making her smile, and becoming her favourite person. " +
        "Your sentence is a lifetime of love with Vin! 😂💋";
    } else {
      verdictTitle.textContent = "😇 INNOCENT? NICE TRY, DEV! 😂";

      verdictMessage.textContent =
        "The court has reviewed the evidence and rejected your claim. " +
        "Your smile, your nonsense and your place in Vin's heart " +
        "have exposed you. Verdict: STILL GUILTY! ❤️⚖️";
    }

    verdictResult.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  }

  guiltyBtn.addEventListener("click", function () {
    showVerdict(true);
  });

  innocentBtn.addEventListener("click", function () {
    showVerdict(false);
  });

  // Accept the romantic sentence
  loveBtn.addEventListener("click", function () {
    loveMessage.classList.remove("hidden");
    loveBtn.textContent = "❤️ Sentence Accepted!";

    loveMessage.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  });
});

"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("letterModal");
  const modalTitle = document.getElementById("modalTitle");
  const letterContent = document.getElementById("letterContent");
  const closeButton = document.getElementById("closeLetter");
  const anotherButton = document.getElementById("anotherLetter");

  const secretButton = document.getElementById("secretButton");
  const secretMessage = document.getElementById("secretMessage");

  let lastOpenedButton = null;

  const letters = {
    miss: {
      title: "When You Miss Me 🥺",
      paragraphs: [
        "Hey, my Nonsenseeee. ❤️",

        "If you're reading this because you miss me, just know that "
        + "there is a girl somewhere who is probably missing you too. "
        + "And yes, that girl is me! I wish I could be beside you right "
        + "now, hold your hand, look at your face and annoy you in person.",

        "Sometimes I hate the distance between us. I wish I could just "
        + "come to you whenever I want a hug. But until that happens, "
        + "please remember that distance doesn't make you any less "
        + "important to me.",

        "Close your eyes for a second and imagine me hugging you tightly. "
        + "No escaping, okay? 😂 I love you, Dev. Until I can hold you "
        + "for real, this little letter is your hug from me. 💋"
      ]
    },

    sad: {
      title: "When You're Feeling Sad 🫂",
      paragraphs: [
        "My favourite person, ❤️",

        "I don't know what happened today, but I want you to know that "
        + "you don't have to pretend to be okay all the time. You can "
        + "have bad days. You can feel tired. You can take a break.",

        "Please don't think that one bad day makes you a failure. You "
        + "are still the same person I am proud of, the same boy who "
        + "means so much to me, and the same Nonsenseeee who makes me smile.",

        "If I were there, I would sit beside you, hold your hand and "
        + "listen to whatever you want to say. You don't always need "
        + "solutions. Sometimes you just need someone who stays.",

        "I'm here for you, okay? Take a breath, drink some water and "
        + "give yourself a little kindness today. I love you. ❤️"
      ]
    },

    exam: {
      title: "When Exams Stress You 📚",
      paragraphs: [
        "Hey, my intelligent little troublemaker! 😂❤️",

        "First of all, breathe. One exam, one mark or one difficult "
        + "question cannot decide your entire future.",

        "I know you want to do well, and I know you sometimes put "
        + "too much pressure on yourself. But please remember that "
        + "your effort matters too. You don't have to be perfect "
        + "every single time.",

        "Study what you can, revise calmly, get enough rest and give "
        + "your best. If something goes wrong, we'll face that too. "
        + "You don't have to figure out everything at once.",

        "I'm cheering for you more than you know. Now go study, "
        + "Nonsenseeee! And don't use me as an excuse to avoid it. 😂 "
        + "I believe in you, always. ❤️"
      ]
    },

    angry: {
      title: "When You're Angry With Me 😤",
      paragraphs: [
        "Okay, my angry boy. Let me talk first. 😂❤️",

        "If I hurt you, I'm sorry. I never want you to feel like "
        + "your feelings don't matter to me. You matter to me more "
        + "than winning an argument.",

        "We might misunderstand each other sometimes. We might get "
        + "annoyed, go quiet or say things badly. But I want us to "
        + "talk honestly and try to understand each other instead "
        + "of letting one bad moment become a big distance between us.",

        "Take the time you need to calm down. When you're ready, "
        + "let's talk properly. I want us to be a team, even when "
        + "we disagree.",

        "Also, you can stop being dramatic now, Nonsenseeee. "
        + "I still love you. 🙄❤️ (And yes, I know I'm dramatic too.)"
      ]
    },

    motivation: {
      title: "When You Need Motivation 🌟",
      paragraphs: [
        "Listen to me, Dev. ❤️",

        "You are capable of more than you sometimes believe. You "
        + "might not have everything figured out right now, and "
        + "that's completely okay. Nobody has everything figured out.",

        "Don't compare your journey with someone else's. Move at "
        + "your own pace, learn from your mistakes and keep going "
        + "even when progress feels slow.",

        "I'm proud of you for trying, for learning and for getting "
        + "back up after difficult days. I hope you become someone "
        + "you are proud of too.",

        "One step at a time, okay? I'll be cheering for you through "
        + "the good days and the hard ones. Your Vin believes in you. "
        + "Now go show the world what you can do! ❤️"
      ]
    },

    love: {
      title: "How Much I Love You ❤️",
      paragraphs: [
        "To my Dev, my Nonsenseeee, my favourite person. 💌",

        "Sometimes I wonder how a person can become so important "
        + "to me. We started as friends, and slowly you became "
        + "someone I look forward to talking to, someone I think "
        + "about during random moments, and someone I want beside me.",

        "I love the little things about us. Our conversations, "
        + "our silly moments, the way we can annoy each other, "
        + "and the way one small message from you can change my mood.",

        "I can't promise that every day will be perfect. But I want "
        + "to keep learning about you, listening to you, supporting "
        + "you and choosing us through the ordinary days too.",

        "If you ever wonder whether you matter to me, come back "
        + "to this letter. You do. More than I can explain in one "
        + "little page.",

        "I am so happy that you are part of my life. I love you, "
        + "Nonsenseeee. Yours today, tomorrow and through all the "
        + "little moments we still have ahead of us. ❤️💋"
      ]
    }
  };

  function openLetter(letterKey, button) {
    const letter = letters[letterKey];

    if (!letter) {
      return;
    }

    lastOpenedButton = button || null;
    modalTitle.textContent = letter.title;

    // Build paragraphs safely without inserting HTML from strings.
    letterContent.replaceChildren();

    letter.paragraphs.forEach(function (paragraphText) {
      const paragraph = document.createElement("p");
      paragraph.textContent = paragraphText;
      letterContent.appendChild(paragraph);
    });

    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    closeButton.focus();
  }

  function closeLetter() {
    modal.classList.add("hidden");
    document.body.style.overflow = "";

    if (lastOpenedButton) {
      lastOpenedButton.focus();
    }
  }

  // Open the selected letter.
  document.querySelectorAll("[data-letter]").forEach(function (button) {
    button.addEventListener("click", function () {
      openLetter(button.dataset.letter, button);
    });
  });

  // Close using the X button.
  closeButton.addEventListener("click", closeLetter);

  // Close by clicking the dark background outside the paper.
  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeLetter();
    }
  });

  // Close with Escape.
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !modal.classList.contains("hidden")) {
      closeLetter();
    }
  });

  // Close the current letter and select another.
  anotherButton.addEventListener("click", function () {
    closeLetter();

    const firstLetterButton = document.querySelector("[data-letter]");

    if (firstLetterButton) {
      firstLetterButton.focus();
      firstLetterButton.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  });

  // Reveal the bonus secret.
  secretButton.addEventListener("click", function () {
    const isHidden = secretMessage.classList.contains("hidden");

    secretMessage.classList.toggle("hidden", !isHidden);

    secretButton.textContent = isHidden
      ? "💖 Hide My Secret"
      : "Reveal My Secret ❤️";

    if (isHidden) {
      secretMessage.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  });
});

"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // ==========================================
  // GAME 1: THE COUPLE QUIZ
  // ==========================================

  const coupleQuestions = [
    {
      question: "Who is more dramatic? 😂",
      options: ["Vin 😂", "Dev 😎", "Both of us 🤡"],
      answer: 2,
      correct: "Correct! Two drama kings and queens in one relationship. 😂",
      wrong: "Wrong! The drama level is definitely a team effort. 🤡"
    },
    {
      question: "Who should say sorry after an argument? 🥹",
      options: ["Vin only", "Dev only", "Whoever made the mistake ❤️"],
      answer: 2,
      correct: "Exactly! Understanding each other matters more than winning.",
      wrong: "Nice try! Both of you deserve to be heard. ❤️"
    },
    {
      question: "What's the best way to fix a bad day? 💌",
      options: ["Ignore each other", "Talk and listen", "Start another fight 😂"],
      answer: 1,
      correct: "Yes! Communication wins every time. ❤️",
      wrong: "Nooo! Talking honestly is much better than ignoring each other."
    },
    {
      question: "What is the best long-distance date? 🌙",
      options: ["A call together", "Never talking", "Competing over who misses whom 😂"],
      answer: 0,
      correct: "A cute call together sounds perfect. 🫶",
      wrong: "Wrong answer, Nonsenseeee! Make time for each other. 💕"
    },
    {
      question: "What's the most important thing in our relationship? ❤️",
      options: ["Winning every argument", "Trust and respect", "Being right all the time"],
      answer: 1,
      correct: "Perfect! Love grows with trust, respect and effort. ❤️",
      wrong: "Love isn't about winning. Trust and respect are what matter."
    }
  ];

  const coupleQuestion = document.getElementById("coupleQuestion");
  const coupleOptions = document.getElementById("coupleOptions");
  const coupleFeedback = document.getElementById("coupleFeedback");
  const coupleProgress = document.getElementById("coupleProgress");
  const coupleProgressBar = document.getElementById("coupleProgressBar");
  const coupleNext = document.getElementById("coupleNext");
  const coupleResult = document.getElementById("coupleResult");
  const coupleResultTitle = document.getElementById("coupleResultTitle");
  const coupleResultText = document.getElementById("coupleResultText");
  const coupleRestart = document.getElementById("coupleRestart");

  let coupleIndex = 0;
  let coupleScore = 0;
  let coupleAnswered = false;

  function renderCoupleQuestion() {
    const item = coupleQuestions[coupleIndex];

    coupleAnswered = false;
    coupleQuestion.textContent = item.question;
    coupleProgress.textContent =
      "Question " + (coupleIndex + 1) + " of " + coupleQuestions.length;

    coupleProgressBar.style.width =
      ((coupleIndex + 1) / coupleQuestions.length * 100) + "%";

    coupleFeedback.textContent = "";
    coupleNext.classList.add("hidden");
    coupleResult.classList.add("hidden");
    coupleOptions.replaceChildren();

    item.options.forEach(function (option, index) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "option-button";
      button.textContent = option;

      button.addEventListener("click", function () {
        if (coupleAnswered) return;

        coupleAnswered = true;

        const buttons = coupleOptions.querySelectorAll("button");
        buttons.forEach(function (choice) {
          choice.disabled = true;
        });

        if (index === item.answer) {
          coupleScore++;
          button.classList.add("correct");
          coupleFeedback.textContent = item.correct;
        } else {
          button.classList.add("incorrect");
          buttons[item.answer].classList.add("correct");
          coupleFeedback.textContent = item.wrong;
        }

        coupleNext.textContent =
          coupleIndex === coupleQuestions.length - 1
            ? "See My Result ❤️"
            : "Next Question →";

        coupleNext.classList.remove("hidden");
      });

      coupleOptions.appendChild(button);
    });
  }

  coupleNext.addEventListener("click", function () {
    if (!coupleAnswered) return;

    if (coupleIndex < coupleQuestions.length - 1) {
      coupleIndex++;
      renderCoupleQuestion();
    } else {
      coupleQuestion.classList.add("hidden");
      coupleOptions.classList.add("hidden");
      coupleFeedback.classList.add("hidden");
      coupleNext.classList.add("hidden");
      coupleProgress.classList.add("hidden");
      coupleResult.classList.remove("hidden");

      coupleResultTitle.textContent =
        coupleScore === coupleQuestions.length
          ? "Perfect Couple Energy! 🏆"
          : "Quiz Complete! ❤️";

      coupleResultText.textContent =
        "You scored " + coupleScore + " out of " +
        coupleQuestions.length + ". " +
        (coupleScore === coupleQuestions.length
          ? "Full marks! You two are a great team. 💕"
          : "Remember, Nonsenseeee, the goal is to understand each other. 😂❤️");
    }
  });

  coupleRestart.addEventListener("click", function () {
    coupleIndex = 0;
    coupleScore = 0;
    coupleQuestion.classList.remove("hidden");
    coupleOptions.classList.remove("hidden");
    coupleFeedback.classList.remove("hidden");
    coupleProgress.classList.remove("hidden");
    renderCoupleQuestion();
  });

  renderCoupleQuestion();


  // ==========================================
  // GAME 2: HOW WELL DO YOU KNOW VIN?
  // EDIT THESE QUESTIONS TO MATCH REAL ANSWERS
  // ==========================================

  const vinQuestions = [
    {
      question: "What makes Vin happiest? 💌",
      options: [
        "Cute messages and attention 💕",
        "Being ignored 😂",
        "Doing nothing together forever"
      ],
      answer: 0
    },
    {
      question: "What kind of message would Vin love? 🥹",
      options: [
        "A one-word reply",
        "A sweet, thoughtful message ❤️",
        "A message saying 'go away'"
      ],
      answer: 1
    },
    {
      question: "What should Dev do when Vin feels sad? 🫂",
      options: [
        "Listen and comfort her",
        "Laugh at her",
        "Disappear without explaining"
      ],
      answer: 0
    },
    {
      question: "What's a lovely long-distance date idea? 🌙",
      options: [
        "Ignoring the call",
        "Watching a movie together over a call",
        "Arguing about everything"
      ],
      answer: 1
    },
    {
      question: "What does Vin want most from her relationship? ❤️",
      options: [
        "Trust, love and effort",
        "Constant arguments",
        "Never spending time together"
      ],
      answer: 0
    }
  ];

  const vinQuestion = document.getElementById("vinQuestion");
  const vinOptions = document.getElementById("vinOptions");
  const vinFeedback = document.getElementById("vinFeedback");
  const vinProgress = document.getElementById("vinProgress");
  const vinProgressBar = document.getElementById("vinProgressBar");
  const vinNext = document.getElementById("vinNext");
  const vinResult = document.getElementById("vinResult");
  const vinResultTitle = document.getElementById("vinResultTitle");
  const vinResultText = document.getElementById("vinResultText");
  const vinRestart = document.getElementById("vinRestart");

  let vinIndex = 0;
  let vinScore = 0;
  let vinAnswered = false;

  function renderVinQuestion() {
    const item = vinQuestions[vinIndex];

    vinAnswered = false;
    vinQuestion.textContent = item.question;
    vinProgress.textContent =
      "Question " + (vinIndex + 1) + " of " + vinQuestions.length;

    vinProgressBar.style.width =
      ((vinIndex + 1) / vinQuestions.length * 100) + "%";

    vinFeedback.textContent = "";
    vinNext.classList.add("hidden");
    vinResult.classList.add("hidden");
    vinOptions.replaceChildren();

    item.options.forEach(function (option, index) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "option-button";
      button.textContent = option;

      button.addEventListener("click", function () {
        if (vinAnswered) return;

        vinAnswered = true;

        const buttons = vinOptions.querySelectorAll("button");
        buttons.forEach(function (choice) {
          choice.disabled = true;
        });

        if (index === item.answer) {
          vinScore++;
          button.classList.add("correct");
          vinFeedback.textContent =
            "Yesss! You know your girl! ❤️";
        } else {
          button.classList.add("incorrect");
          buttons[item.answer].classList.add("correct");
          vinFeedback.textContent =
            "Oops, Nonsenseeee! Time to pay more attention to Vin. 😂💕";
        }

        vinNext.textContent =
          vinIndex === vinQuestions.length - 1
            ? "Check My Score ❤️"
            : "Next Question →";

        vinNext.classList.remove("hidden");
      });

      vinOptions.appendChild(button);
    });
  }

  vinNext.addEventListener("click", function () {
    if (!vinAnswered) return;

    if (vinIndex < vinQuestions.length - 1) {
      vinIndex++;
      renderVinQuestion();
    } else {
      vinQuestion.classList.add("hidden");
      vinOptions.classList.add("hidden");
      vinFeedback.classList.add("hidden");
      vinNext.classList.add("hidden");
      vinProgress.classList.add("hidden");
      vinResult.classList.remove("hidden");

      if (vinScore === vinQuestions.length) {
        vinResultTitle.textContent = "Vin's Favourite Person! 🏆";
        vinResultText.textContent =
          "Full marks! You know your girl so well. Vin owes you a hug! 🫂❤️";
      } else if (vinScore >= 3) {
        vinResultTitle.textContent = "Not Bad, Dev! 💕";
        vinResultText.textContent =
          "You scored " + vinScore + " out of " + vinQuestions.length +
          ". Keep listening, learning and making memories together. ❤️";
      } else {
        vinResultTitle.textContent = "Nonsenseeee, We Need to Talk! 😂";
        vinResultText.textContent =
          "You scored " + vinScore + " out of " + vinQuestions.length +
          ". Better luck next time! Get to know Vin even better. 💌";
      }
    }
  });

  vinRestart.addEventListener("click", function () {
    vinIndex = 0;
    vinScore = 0;
    vinQuestion.classList.remove("hidden");
    vinOptions.classList.remove("hidden");
    vinFeedback.classList.remove("hidden");
    vinProgress.classList.remove("hidden");
    renderVinQuestion();
  });

  renderVinQuestion();


  // ==========================================
  // GAME 3: CATCH THE HEARTS
  // ==========================================

  const startHeartGame = document.getElementById("startHeartGame");
  const heartPlayfield = document.getElementById("heartPlayfield");
  const heartInstructions = document.getElementById("heartInstructions");
  const heartScoreDisplay = document.getElementById("heartScore");
  const heartTimeDisplay = document.getElementById("heartTime");
  const heartBestDisplay = document.getElementById("heartBest");
  const heartGameMessage = document.getElementById("heartGameMessage");

  let heartScore = 0;
  let heartTime = 20;
  let heartBest = 0;
  let heartRunning = false;
  let countdownInterval = null;
  let spawnInterval = null;
  let activeHearts = new Set();

  function clearHearts() {
    activeHearts.forEach(function (heart) {
      clearTimeout(heart.expireTimer);
      heart.button.remove();
    });

    activeHearts.clear();

    heartPlayfield.querySelectorAll(".catch-heart").forEach(function (heart) {
      heart.remove();
    });
  }

  function updateHeartStats() {
    heartScoreDisplay.textContent = String(heartScore);
    heartTimeDisplay.textContent = heartTime + "s";
    heartBestDisplay.textContent = String(heartBest);
  }

  function spawnHeart() {
    if (!heartRunning) return;

    const fieldWidth = heartPlayfield.clientWidth;
    const fieldHeight = heartPlayfield.clientHeight;
    const heartSize = 46;

    if (fieldWidth < heartSize || fieldHeight < heartSize) return;

    const heart = document.createElement("button");
    heart.type = "button";
    heart.className = "catch-heart";
    heart.textContent = ["❤️", "💗", "💖", "💕", "💘"][
      Math.floor(Math.random() * 5)
    ];
    heart.setAttribute("aria-label", "Catch this heart");
    heart.style.left =
      Math.floor(Math.random() * (fieldWidth - heartSize)) + "px";
    heart.style.top =
      Math.floor(Math.random() * (fieldHeight - heartSize)) + "px";

    const heartData = {
      button: heart,
      expireTimer: null
    };

    heart.addEventListener("click", function () {
      if (!heartRunning || !activeHearts.has(heartData)) return;

      clearTimeout(heartData.expireTimer);
      activeHearts.delete(heartData);
      heart.remove();

      heartScore++;
      updateHeartStats();
      heartGameMessage.textContent = "YAY! Another heart for Vin! ❤️";
    });

    heartPlayfield.appendChild(heart);
    activeHearts.add(heartData);

    heartData.expireTimer = setTimeout(function () {
      activeHearts.delete(heartData);
      heart.remove();
    }, 1500);
  }

  function endHeartGame() {
    heartRunning = false;

    clearInterval(countdownInterval);
    clearInterval(spawnInterval);

    countdownInterval = null;
    spawnInterval = null;

    clearHearts();

    startHeartGame.disabled = false;
    startHeartGame.textContent = "Play Again 🔄";

    heartInstructions.classList.remove("hidden");
    heartInstructions.textContent = "Time's up! ❤️";
    heartBest = Math.max(heartBest, heartScore);

    updateHeartStats();

    heartGameMessage.textContent =
      "You caught " + heartScore + " hearts! " +
      (heartScore >= 15
        ? "Wowww! Your fingers are faster than your love messages. 😂💖"
        : "Good try, Nonsenseeee! Play again and beat your score. 💕");
  }

  function startGame() {
    if (heartRunning) return;

    clearInterval(countdownInterval);
    clearInterval(spawnInterval);
    clearHearts();

    heartScore = 0;
    heartTime = 20;
    heartRunning = true;

    updateHeartStats();

    heartInstructions.classList.add("hidden");
    startHeartGame.disabled = true;
    startHeartGame.textContent = "Catch the hearts! 💗";
    heartGameMessage.textContent = "Quick! Tap the hearts before they disappear!";

    spawnHeart();

    spawnInterval = setInterval(spawnHeart, 650);

    countdownInterval = setInterval(function () {
      heartTime--;
      updateHeartStats();

      if (heartTime <= 0) {
        endHeartGame();
      }
    }, 1000);
  }

  startHeartGame.addEventListener("click", startGame);

  updateHeartStats();
});

"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // ==========================================
  // PHOTO PLACEHOLDERS
  // ==========================================

  const memoryCards = document.querySelectorAll(".memory-card");

  memoryCards.forEach(function (card) {
    const image = card.querySelector("img");
    const placeholder = card.querySelector(".photo-placeholder");

    if (!image || !placeholder) return;

    function showPlaceholder() {
      image.style.display = "none";
      placeholder.style.display = "flex";
    }

    function showImage() {
      image.style.display = "block";
      placeholder.style.display = "none";
    }

    image.addEventListener("load", showImage);
    image.addEventListener("error", showPlaceholder);

    // Handle images that loaded before these listeners were attached.
    if (image.complete) {
      if (image.naturalWidth > 0) {
        showImage();
      } else {
        showPlaceholder();
      }
    }
  });


  // ==========================================
  // CLICK A PHOTO TO OPEN THE VIEWER
  // ==========================================

  const photoViewer = document.getElementById("photoViewer");
  const largePhoto = document.getElementById("largePhoto");
  const viewerCaption = document.getElementById("viewerCaption");
  const closeViewer = document.getElementById("closeViewer");

  let lastFocusedCard = null;

  function openPhoto(card) {
    const imagePath = card.dataset.photo;
    const caption = card.dataset.caption || "A little memory of us. ❤️";
    const thumbnail = card.querySelector("img");

    lastFocusedCard = card;
    viewerCaption.textContent = caption;

    largePhoto.alt = thumbnail ? thumbnail.alt : "Our memory";
    largePhoto.style.display = "none";
    largePhoto.removeAttribute("src");

    photoViewer.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    closeViewer.focus();

    // Display the larger photo only if it can be loaded.
    if (imagePath) {
      const testImage = new Image();

      testImage.onload = function () {
        if (!photoViewer.classList.contains("hidden")) {
          largePhoto.src = imagePath;
          largePhoto.style.display = "block";
        }
      };

      testImage.onerror = function () {
        largePhoto.style.display = "none";
        viewerCaption.textContent =
          caption + " (Add your photo to the assets folder to see it here.)";
      };

      testImage.src = imagePath;
    }
  }

  function closePhotoViewer() {
    photoViewer.classList.add("hidden");
    document.body.style.overflow = "";

    largePhoto.removeAttribute("src");
    largePhoto.style.display = "none";

    if (lastFocusedCard) {
      lastFocusedCard.focus();
    }
  }

  memoryCards.forEach(function (card) {
    card.addEventListener("click", function () {
      openPhoto(card);
    });
  });

  closeViewer.addEventListener("click", closePhotoViewer);

  photoViewer.addEventListener("click", function (event) {
    if (event.target === photoViewer) {
      closePhotoViewer();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (
      event.key === "Escape" &&
      !photoViewer.classList.contains("hidden")
    ) {
      closePhotoViewer();
    }
  });


  // ==========================================
  // RANDOM MEMORY BUTTON
  // Edit these to add your real memories!
  // ==========================================

  const memories = [
    "Remember, Nonsenseeee, you're still my favourite notification. ❤️",
    "One day, we'll look back at the distance and smile at how far we've come. 🌙",
    "My favourite kind of day is one where I get to talk to you. 💌",
    "Even our silly arguments become stories I remember later. 😂",
    "I can't wait for the hugs we won't have to end over a phone call. 🫂",
    "No matter how busy life gets, I hope we keep making time for us. ❤️",
    "You became a part of my everyday life without even trying. 🥹",
    "One day, we'll make so many memories that we won't know which photo to keep first. 📸",
    "Hey Dev, just a reminder that your Vin loves you. Yes, even when you're annoying. 😂❤️",
    "Our story isn't finished. Some of my favourite memories with you are still ahead of us. 💋"
  ];

  const randomMemoryBtn = document.getElementById("randomMemoryBtn");
  const randomMemoryText = document.getElementById("randomMemoryText");

  let previousMemoryIndex = -1;

  randomMemoryBtn.addEventListener("click", function () {
    let newIndex;

    if (memories.length === 1) {
      newIndex = 0;
    } else {
      do {
        newIndex = Math.floor(Math.random() * memories.length);
      } while (newIndex === previousMemoryIndex);
    }

    previousMemoryIndex = newIndex;
    randomMemoryText.textContent = memories[newIndex];
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Virtual hug and kiss
  const hugButton = document.getElementById("hugButton");
  const kissButton = document.getElementById("kissButton");
  const affectionResult = document.getElementById("affectionResult");
  const animationArea = document.getElementById("animationArea");

  function sendAffection(type) {
    if (!affectionResult || !animationArea) return;

    animationArea.replaceChildren();

    let message = "";
    let symbols = [];

    if (type === "hug") {
      message = "Come here, Nonsenseeee! Sending you the biggest virtual hug! 🤗❤️";
      symbols = ["🤗", "❤️", "🫂", "💕", "🤗"];
    } else {
      message = "Mwahhh! A little kiss from your Vin! 💋❤️";
      symbols = ["💋", "😘", "❤️", "💋", "💕"];
    }

    affectionResult.textContent = message;

    symbols.forEach(function (symbol, index) {
      const heart = document.createElement("span");
      heart.className = "animation-heart";
      heart.textContent = symbol;
      heart.style.animationDelay = (index * 0.12) + "s";
      animationArea.appendChild(heart);
    });
  }

  if (hugButton) {
    hugButton.addEventListener("click", function () {
      sendAffection("hug");
    });
  }

  if (kissButton) {
    kissButton.addEventListener("click", function () {
      sendAffection("kiss");
    });
  }

  // Redeem each love coupon once during the current page visit
  const redeemButtons = document.querySelectorAll(".redeem-button");

  redeemButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const couponCard = button.closest(".coupon-card");
      if (!couponCard) return;

      const status = couponCard.querySelector(".coupon-status");
      const couponName = button.dataset.coupon || "Love Coupon";

      if (button.disabled) return;

      button.disabled = true;
      button.textContent = "Redeemed ❤️";

      if (status) {
        status.textContent = "Yay! " + couponName + " is yours! 💌";
      }
    });
  });

  // Gift box reveal
  const giftBox = document.getElementById("giftBox");
  const giftEmoji = document.getElementById("giftEmoji");
  const giftLabel = document.getElementById("giftLabel");
  const giftMessage = document.getElementById("giftMessage");

  if (giftBox && giftMessage && giftEmoji && giftLabel) {
    giftBox.addEventListener("click", function () {
      const isOpen = giftBox.getAttribute("aria-expanded") === "true";

      giftBox.setAttribute("aria-expanded", String(!isOpen));
      giftMessage.hidden = isOpen;

      if (isOpen) {
        giftEmoji.textContent = "🎁";
        giftLabel.textContent = "Tap to open your gift!";
      } else {
        giftEmoji.textContent = "💝";
        giftLabel.textContent = "Tap to close your gift";
        giftMessage.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // 1. "If I Were There Right Now" choices
  const choiceCards = document.querySelectorAll(".choice-card");
  const choiceResult = document.getElementById("choiceResult");

  choiceCards.forEach(function (card) {
    card.addEventListener("click", function () {
      choiceCards.forEach(function (item) {
        item.classList.remove("selected");
        item.setAttribute("aria-pressed", "false");
      });

      card.classList.add("selected");
      card.setAttribute("aria-pressed", "true");

      if (choiceResult) {
        const emoji = card.dataset.emoji || "❤️";
        const message = card.dataset.message || "Sending you love!";
        choiceResult.textContent = emoji + " " + message;
      }
    });

    card.setAttribute("aria-pressed", "false");
  });

  // 2. Virtual hug and kiss
  const virtualHug = document.getElementById("virtualHug");
  const virtualKiss = document.getElementById("virtualKiss");
  const hugResult = document.getElementById("hugResult");
  const floatingHearts = document.getElementById("floatingHearts");

  function sendAffection(type) {
    if (!hugResult || !floatingHearts) return;

    floatingHearts.replaceChildren();

    let message;
    let emojis;

    if (type === "hug") {
      message =
        "HUG DELIVERED! 🤗 Imagine me holding you until you smile again. ❤️";
      emojis = ["🤗", "❤️", "🫂", "💕", "🤗"];
    } else {
      message =
        "MWAHHH! 💋 A virtual kiss from your Vin. One real kiss pending! ❤️";
      emojis = ["💋", "😘", "❤️", "💕", "💋"];
    }

    hugResult.textContent = message;

    emojis.forEach(function (emoji, index) {
      const heart = document.createElement("span");
      heart.className = "animated-heart";
      heart.textContent = emoji;
      heart.style.animationDelay = (index * 0.12) + "s";
      floatingHearts.appendChild(heart);
    });
  }

  if (virtualHug) {
    virtualHug.addEventListener("click", function () {
      sendAffection("hug");
    });
  }

  if (virtualKiss) {
    virtualKiss.addEventListener("click", function () {
      sendAffection("kiss");
    });
  }

  // 3. Meeting checklist
  const checklist = document.getElementById("meetingChecklist");
  const checklistProgress = document.getElementById("checklistProgress");
  const resetChecklist = document.getElementById("resetChecklist");

  function updateChecklistProgress() {
    if (!checklist || !checklistProgress) return;

    const items = checklist.querySelectorAll('input[type="checkbox"]');
    let checkedCount = 0;

    items.forEach(function (item) {
      if (item.checked) checkedCount++;
    });

    checklistProgress.textContent =
      checkedCount + " of " + items.length + " things checked ❤️";

    if (items.length > 0 && checkedCount === items.length) {
      checklistProgress.textContent =
        "All our little plans are checked! Now we need our meeting day! 🥹❤️";
    }
  }

  if (checklist) {
    checklist.addEventListener("change", updateChecklistProgress);
    updateChecklistProgress();
  }

  if (resetChecklist && checklist) {
    resetChecklist.addEventListener("click", function () {
      const items = checklist.querySelectorAll('input[type="checkbox"]');

      items.forEach(function (item) {
        item.checked = false;
      });

      updateChecklistProgress();
    });
  }

  // 4. Optional meeting countdown
  // No meeting date is assumed. The countdown starts only after
  // the user chooses a date and presses "Set Countdown".

  const meetingDateForm = document.getElementById("meetingDateForm");
  const meetingDateInput = document.getElementById("meetingDate");
  const countdownDisplay = document.getElementById("countdownDisplay");
  const clearMeetingDate = document.getElementById("clearMeetingDate");

  let countdownInterval = null;
  let meetingDate = null;

  function stopCountdown() {
    if (countdownInterval !== null) {
      clearInterval(countdownInterval);
      countdownInterval = null;
    }
  }

  function formatDate(date) {
    return date.toLocaleDateString(undefined, {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  }

  function makeCountdownUnit(number, label) {
    const unit = document.createElement("div");
    unit.className = "countdown-unit";

    const value = document.createElement("strong");
    value.textContent = String(number);

    const name = document.createElement("span");
    name.textContent = label;

    unit.appendChild(value);
    unit.appendChild(name);

    return unit;
  }

  function renderCountdown() {
    if (!meetingDate || !countdownDisplay) return;

    const now = new Date();
    const remaining = meetingDate.getTime() - now.getTime();

    countdownDisplay.replaceChildren();

    const dateLabel = document.createElement("p");
    dateLabel.className = "countdown-date";
    dateLabel.textContent = "Our planned meeting date: " + formatDate(meetingDate);
    countdownDisplay.appendChild(dateLabel);

    if (remaining <= 0) {
      const message = document.createElement("p");
      message.className = "countdown-placeholder";

      if (remaining > -24 * 60 * 60 * 1000) {
        message.textContent =
          "It's our meeting day! Sending you the biggest virtual hug! ❤️";
      } else {
        message.textContent =
          "Our planned date has passed. Update the date if our plans have changed. ❤️";
      }

      countdownDisplay.appendChild(message);
      stopCountdown();
      return;
    }

    const totalSeconds = Math.floor(remaining / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const units = document.createElement("div");
    units.className = "countdown-units";

    units.appendChild(makeCountdownUnit(days, "Days"));
    units.appendChild(makeCountdownUnit(hours, "Hours"));
    units.appendChild(makeCountdownUnit(minutes, "Minutes"));
    units.appendChild(makeCountdownUnit(seconds, "Seconds"));

    countdownDisplay.appendChild(units);
  }

  function setMinimumDate() {
    if (!meetingDateInput) return;

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    meetingDateInput.min = year + "-" + month + "-" + day;
  }

  function clearCountdown() {
    stopCountdown();
    meetingDate = null;

    if (meetingDateInput) {
      meetingDateInput.value = "";
    }

    if (countdownDisplay) {
      countdownDisplay.replaceChildren();

      const message = document.createElement("p");
      message.className = "countdown-placeholder";
      message.textContent =
        "Our date will go here when we decide. No pressure, just love. 💗";

      countdownDisplay.appendChild(message);
    }

    if (clearMeetingDate) {
      clearMeetingDate.hidden = true;
    }
  }

  setMinimumDate();

  if (meetingDateForm && meetingDateInput) {
    meetingDateForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const value = meetingDateInput.value;

      if (!value) {
        meetingDateInput.focus();
        meetingDateInput.reportValidity();
        return;
      }

      // Interpret the selected calendar date in the user's local time.
      const parts = value.split("-").map(Number);
      const selectedDate = new Date(parts[0], parts[1] - 1, parts[2]);

      if (
        selectedDate.getFullYear() !== parts[0] ||
        selectedDate.getMonth() !== parts[1] - 1 ||
        selectedDate.getDate() !== parts[2]
      ) {
        window.alert("Please choose a valid meeting date.");
        return;
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        window.alert("Please choose today or a future date.");
        return;
      }

      // Count down to the start of the selected date.
      meetingDate = selectedDate;
      stopCountdown();
      renderCountdown();

      countdownInterval = window.setInterval(renderCountdown, 1000);

      if (clearMeetingDate) {
        clearMeetingDate.hidden = false;
      }
    });
  }

  if (clearMeetingDate) {
    clearMeetingDate.addEventListener("click", clearCountdown);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Safe local storage helpers
  function saveLocal(key, value) {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      return false;
    }
  }

  function readLocal(key) {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  function removeLocal(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      // The page still works if browser storage is unavailable.
    }
  }

  // 1. Daily mood check-in
  const moodCards = document.querySelectorAll(".mood-card");
  const moodMessage = document.getElementById("moodMessage");
  const moodSavedStatus = document.getElementById("moodSavedStatus");

  const moodMessages = {
    happy: {
      emoji: "🥰",
      message:
        "Look at you being happy! I hope this smile stays on your face all day. Tell me what made you happy so I can be happy with you too. ❤️"
    },
    sad: {
      emoji: "🫂",
      message:
        "Hey, my love. It's okay not to be okay all the time. Take a breath and be gentle with yourself. You don't have to pretend to be happy every second. Sending you the biggest hug. ❤️"
    },
    tired: {
      emoji: "😴",
      message:
        "My sleepy baby, please give yourself a little rest. You don't have to finish everything today. Drink some water, relax, and take care of yourself for me. 🤗"
    },
    stressed: {
      emoji: "🫶",
      message:
        "One thing at a time, okay? You don't have to figure everything out at once. Take a small break, breathe slowly, and remember how far you've already come. I believe in you. ❤️"
    },
    missing: {
      emoji: "💋",
      message:
        "AHAHAHA, caught you missing Vin! 😂❤️ If I were there, I'd hug you, annoy you, steal a little kiss, and refuse to leave your side. Until then, here's a virtual kiss. Mwahhh!"
    }
  };

  function selectMood(mood, shouldSave) {
    const data = moodMessages[mood];
    if (!data) return;

    moodCards.forEach(function (card) {
      const isSelected = card.dataset.mood === mood;
      card.classList.toggle("selected", isSelected);
      card.setAttribute("aria-pressed", String(isSelected));
    });

    if (moodMessage) {
      moodMessage.replaceChildren();

      const icon = document.createElement("span");
      icon.className = "message-icon";
      icon.textContent = data.emoji;

      const message = document.createElement("p");
      message.textContent = data.message;

      moodMessage.appendChild(icon);
      moodMessage.appendChild(message);
    }

    if (shouldSave) {
      const saved = saveLocal("justUsMood", mood);

      if (moodSavedStatus) {
        moodSavedStatus.textContent = saved
          ? "Your mood is saved on this browser. ❤️"
          : "Your mood is selected for now, but browser storage is unavailable.";
      }
    }
  }

  moodCards.forEach(function (card) {
    card.addEventListener("click", function () {
      selectMood(card.dataset.mood, true);
    });
  });

  const savedMood = readLocal("justUsMood");

  if (savedMood && moodMessages[savedMood]) {
    selectMood(savedMood, false);

    if (moodSavedStatus) {
      moodSavedStatus.textContent = "Your last selected mood is shown here. ❤️";
    }
  }

  // 2. Love notes
  const dailyNote = document.getElementById("dailyNote");
  const newNoteButton = document.getElementById("newNoteButton");

  const loveNotes = [
    "You are loved more than you know, Nonsenseeee. ❤️",
    "Even an ordinary day becomes special when I get to talk to you. 💌",
    "You don't have to be perfect to be my favourite person. 🫶",
    "If I could choose my favourite notification, it would always be yours. 😂❤️",
    "One day, our hugs won't have to be virtual anymore. 🤗",
    "No matter how busy life gets, I hope we always make time for us. 💗",
    "You're my favourite person to annoy, and that position is permanent. 😂",
    "I hope you remember that you deserve love, rest, happiness, and kindness. ❤️",
    "Some of my happiest moments begin with your name appearing on my screen. 💌",
    "I don't need every day to be perfect. I just want more real moments with you. ♾️"
  ];

  let lastNoteIndex = -1;

  function showLoveNote() {
    if (!dailyNote) return;

    let nextIndex;

    if (loveNotes.length === 1) {
      nextIndex = 0;
    } else {
      do {
        nextIndex = Math.floor(Math.random() * loveNotes.length);
      } while (nextIndex === lastNoteIndex);
    }

    lastNoteIndex = nextIndex;
    dailyNote.textContent = loveNotes[nextIndex];
  }

  if (newNoteButton) {
    newNoteButton.addEventListener("click", showLoveNote);
  }

  // 3. Question of the day
  const dailyQuestion = document.getElementById("dailyQuestion");
  const nextQuestionButton = document.getElementById("nextQuestionButton");

  const questions = [
    "What's one little thing I do that makes you smile?",
    "What's your favourite memory of us so far?",
    "If we could go anywhere together, where would you take me?",
    "What was your first impression of me?",
    "What's one thing you really want us to do when we meet?",
    "Which song reminds you of us?",
    "What's something silly about me that you secretly love?",
    "What would our perfect virtual date look like?",
    "What's one thing you want us to learn together?",
    "What is one small thing that makes you feel loved?",
    "What's the funniest thing we've ever talked about?",
    "If we had a whole day together, how would we spend it?"
  ];

  let lastQuestionIndex = -1;

  function showQuestion() {
    if (!dailyQuestion) return;

    let nextIndex;

    if (questions.length === 1) {
      nextIndex = 0;
    } else {
      do {
        nextIndex = Math.floor(Math.random() * questions.length);
      } while (nextIndex === lastQuestionIndex);
    }

    lastQuestionIndex = nextIndex;
    dailyQuestion.textContent = questions[nextIndex];
  }

  if (nextQuestionButton) {
    nextQuestionButton.addEventListener("click", showQuestion);
  }

  // 4. Personal message box
  const personalMessage = document.getElementById("personalMessage");
  const characterCount = document.getElementById("characterCount");
  const copyMessageButton = document.getElementById("copyMessageButton");
  const clearMessageButton = document.getElementById("clearMessageButton");
  const messageStatus = document.getElementById("messageStatus");

  function updateCharacterCount() {
    if (!personalMessage || !characterCount) return;

    characterCount.textContent =
      personalMessage.value.length + " / 1000";
  }

  if (personalMessage) {
    const savedMessage = readLocal("justUsPersonalMessage");

    if (savedMessage !== null) {
      personalMessage.value = savedMessage;
    }

    updateCharacterCount();

    personalMessage.addEventListener("input", function () {
      updateCharacterCount();

      const saved = saveLocal(
        "justUsPersonalMessage",
        personalMessage.value
      );

      if (messageStatus) {
        messageStatus.textContent = saved
          ? "Your message is saved in this browser. ❤️"
          : "Your message is available here until you leave or refresh the page.";
      }
    });
  }

  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    // Fallback for browsers where the Clipboard API is unavailable.
    const temporaryArea = document.createElement("textarea");
    temporaryArea.value = text;
    temporaryArea.setAttribute("readonly", "");
    temporaryArea.style.position = "fixed";
    temporaryArea.style.left = "-9999px";
    temporaryArea.style.top = "0";

    document.body.appendChild(temporaryArea);
    temporaryArea.focus();
    temporaryArea.select();

    let copied = false;

    try {
      copied = document.execCommand("copy");
    } catch (error) {
      copied = false;
    }

    temporaryArea.remove();
    return copied;
  }

  if (copyMessageButton && personalMessage) {
    copyMessageButton.addEventListener("click", async function () {
      const text = personalMessage.value.trim();

      if (!text) {
        if (messageStatus) {
          messageStatus.textContent = "Write a little message first. 💌";
        }
        personalMessage.focus();
        return;
      }

      copyMessageButton.disabled = true;
      copyMessageButton.textContent = "Copying...";

      try {
        const copied = await copyText(text);

        if (messageStatus) {
          messageStatus.textContent = copied
            ? "Copied! Now you can paste your message wherever you like. ❤️"
            : "Couldn't copy automatically. Select your message and copy it manually.";
        }
      } catch (error) {
        if (messageStatus) {
          messageStatus.textContent =
            "Couldn't copy automatically. Select your message and copy it manually.";
        }
      } finally {
        copyMessageButton.disabled = false;
        copyMessageButton.textContent = "Copy My Message 📋";
      }
    });
  }

  if (clearMessageButton && personalMessage) {
    clearMessageButton.addEventListener("click", function () {
      personalMessage.value = "";
      removeLocal("justUsPersonalMessage");
      updateCharacterCount();

      if (messageStatus) {
        messageStatus.textContent = "Your message box is cleared.";
      }

      personalMessage.focus();
    });
  }

  // 5. Virtual date planner
  const dateOptions = document.getElementById("dateOptions");
  const dateDay = document.getElementById("dateDay");
  const dateTime = document.getElementById("dateTime");
  const planDateButton = document.getElementById("planDateButton");
  const dateResult = document.getElementById("dateResult");
  const clearDateButton = document.getElementById("clearDateButton");

  const dateIdeas = {
    movie: {
      title: "Movie Night 🎬",
      message:
        "Choose a movie, get your favourite snacks, start at the same time, and stay on call. Don't spoil the ending for each other! 😂"
    },
    gaming: {
      title: "Gaming Together 🎮",
      message:
        "Pick a game you both enjoy, get on a call, and have fun. Winner gets bragging rights until the next game! 😂❤️"
    },
    dinner: {
      title: "Dinner Over Call 🍕",
      message:
        "Get your favourite food, sit down together on a video or phone call, and enjoy a little dinner date from wherever you are. ❤️"
    },
    call: {
      title: "Long Phone Call 📞",
      message:
        "Get comfortable, put your worries aside for a while, and talk about your day, your dreams, and all your nonsense. 💌"
    }
  };

  function setMinimumDate() {
    if (!dateDay) return;

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    dateDay.min = year + "-" + month + "-" + day;
  }

  function formatDate(value) {
    const parts = value.split("-").map(Number);
    const date = new Date(parts[0], parts[1] - 1, parts[2]);

    return date.toLocaleDateString(undefined, {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  }

  function formatTime(value) {
    if (!value) return "";

    const parts = value.split(":");
    const hours = Number(parts[0]);
    const minutes = Number(parts[1]);

    if (
      parts.length !== 2 ||
      !Number.isInteger(hours) ||
      !Number.isInteger(minutes) ||
      hours < 0 ||
      hours > 23 ||
      minutes < 0 ||
      minutes > 59
    ) {
      return "";
    }

    const date = new Date();
    date.setHours(hours, minutes, 0, 0);

    return date.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit"
    });
  }

  function displayDatePlan(ideaKey, dateValue, timeValue) {
    if (!dateResult || !dateIdeas[ideaKey]) return;

    const idea = dateIdeas[ideaKey];
    dateResult.replaceChildren();

    const heading = document.createElement("h3");
    heading.textContent = idea.title;

    const description = document.createElement("p");
    description.textContent = idea.message;

    dateResult.appendChild(heading);
    dateResult.appendChild(description);

    if (dateValue) {
      const dateText = document.createElement("p");
      dateText.className = "planned-date-text";
      dateText.textContent = "Date: " + formatDate(dateValue);
      dateResult.appendChild(dateText);
    }

    if (timeValue) {
      const timeText = document.createElement("p");
      timeText.className = "planned-date-text";
      timeText.textContent = "Time: " + formatTime(timeValue);
      dateResult.appendChild(timeText);
    }

    const reminder = document.createElement("p");
    reminder.className = "planned-date-text";
    reminder.textContent =
      "It's an idea for the two of you to agree on together. ❤️";

    dateResult.appendChild(reminder);
  }

  function clearDatePlan() {
    if (dateOptions) {
      const selected = dateOptions.querySelector(
        'input[name="virtualDate"]:checked'
      );

      if (selected) selected.checked = false;
    }

    if (dateDay) dateDay.value = "";
    if (dateTime) dateTime.value = "";

    removeLocal("justUsDatePlan");

    if (dateResult) {
      dateResult.textContent =
        "Our next cute date idea will appear here. 🫶";
    }

    if (clearDateButton) {
      clearDateButton.hidden = true;
    }
  }

  setMinimumDate();

  if (planDateButton) {
    planDateButton.addEventListener("click", function () {
      const selected = document.querySelector(
        'input[name="virtualDate"]:checked'
      );

      if (!selected) {
        if (dateResult) {
          dateResult.textContent =
            "Choose a date idea first, silly! 🎬🎮🍕📞";
        }

        if (dateOptions) {
          dateOptions.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });
        }

        return;
      }

      const selectedDate = dateDay ? dateDay.value : "";
      const selectedTime = dateTime ? dateTime.value : "";

      if (selectedDate) {
        const parts = selectedDate.split("-").map(Number);
        const chosen = new Date(parts[0], parts[1] - 1, parts[2]);

        if (
          chosen.getFullYear() !== parts[0] ||
          chosen.getMonth() !== parts[1] - 1 ||
          chosen.getDate() !== parts[2]
        ) {
          if (dateResult) {
            dateResult.textContent = "Please choose a valid date. ❤️";
          }
          return;
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (chosen < today) {
          if (dateResult) {
            dateResult.textContent =
              "Please choose today or a future date for your virtual date. ❤️";
          }
          return;
        }
      }

      const plan = {
        idea: selected.value,
        date: selectedDate,
        time: selectedTime
      };

      displayDatePlan(plan.idea, plan.date, plan.time);

      const saved = saveLocal("justUsDatePlan", JSON.stringify(plan));

      if (dateResult && !saved) {
        const storageNote = document.createElement("p");
        storageNote.className = "planned-date-text";
        storageNote.textContent =
          "This plan is displayed now, but browser storage is unavailable.";
        dateResult.appendChild(storageNote);
      }

      if (clearDateButton) {
        clearDateButton.hidden = false;
      }
    });
  }

  // Restore a previously selected date plan, if available.
  const savedPlan = readLocal("justUsDatePlan");

  if (savedPlan) {
    try {
      const plan = JSON.parse(savedPlan);

      if (
        plan &&
        dateIdeas[plan.idea] &&
        typeof plan.date === "string" &&
        typeof plan.time === "string"
      ) {
        const selectedRadio = document.querySelector(
          'input[name="virtualDate"][value="' + plan.idea + '"]'
        );

        if (selectedRadio) {
          selectedRadio.checked = true;
        }

        if (dateDay) dateDay.value = plan.date;
        if (dateTime) dateTime.value = plan.time;

        displayDatePlan(plan.idea, plan.date, plan.time);

        if (clearDateButton) {
          clearDateButton.hidden = false;
        }
      } else {
        removeLocal("justUsDatePlan");
      }
    } catch (error) {
      removeLocal("justUsDatePlan");
    }
  }

  if (clearDateButton) {
    clearDateButton.addEventListener("click", clearDatePlan);
  }
});
