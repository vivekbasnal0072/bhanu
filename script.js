
// =====================================
// BHANU'S BIRTHDAY WEBSITE
// Shared JavaScript for both pages
// =====================================


// 1. RUNAWAY BIRTHDAY LETTER

const letter = document.getElementById("letter");
const hint = document.getElementById("hint");

let attempts = 0;
const maxAttempts = 6;

if (letter) {

  letter.addEventListener("pointerdown", function(event) {

    if (attempts < maxAttempts) {

      event.preventDefault();

      attempts++;

      const maxX = Math.max(0, window.innerWidth - 110);
      const maxY = Math.max(0, window.innerHeight - 150);

      const randomX = Math.random() * maxX;
      const randomY = Math.random() * maxY;

      letter.style.position = "fixed";
      letter.style.left = randomX + "px";
      letter.style.top = randomY + "px";
      letter.style.transform = "none";

      if (hint) {
        hint.textContent =
          attempts === maxAttempts
            ? "Okay okay! You caught me! Now open your surprise! 💗"
            : `Haha! Catch me! 😂 ${maxAttempts - attempts} more tries!`;
      }

    }

  });

  letter.addEventListener("click", function() {

    if (attempts >= maxAttempts) {
      window.location.href = "surprise.html";
    }

  });

}


// 2. REASONS WHY BHANU IS SPECIAL

const reasonButtons = document.querySelectorAll(".reason");
const reasonMessage = document.getElementById("reason-message");

reasonButtons.forEach(function(button) {

  button.addEventListener("click", function() {

    if (reasonMessage) {
      reasonMessage.textContent = button.dataset.message;
    }

  });

});


// 3. BIRTHDAY CAKE SURPRISE

const cakeButton = document.getElementById("cake-button");
const wishMessage = document.getElementById("wish-message");

if (cakeButton) {

  cakeButton.addEventListener("click", function() {

    if (cakeButton.classList.contains("blown")) {
      return;
    }

    cakeButton.classList.add("blown");

    if (wishMessage) {

      wishMessage.textContent =
        "Your wish has been sent to the universe! ✨ May all your dreams come true, Bhanu! 🩷";

    }

    createConfetti();

  });

}


// 4. CONFETTI CELEBRATION

function createConfetti() {

  const colors = [
    "#ff75a8",
    "#ffc0cb",
    "#ffd700",
    "#ffffff",
    "#d8a5ff"
  ];

  for (let i = 0; i < 90; i++) {

    const piece = document.createElement("span");

    piece.style.position = "fixed";
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.top = "-20px";

    piece.style.width = "9px";
    piece.style.height = "12px";

    piece.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];

    piece.style.borderRadius = "3px";
    piece.style.pointerEvents = "none";
    piece.style.zIndex = "9999";

    document.body.appendChild(piece);

    const duration = 2000 + Math.random() * 2500;

    const animation = piece.animate(

      [
        {
          transform: "translateY(0) rotate(0deg)",
          opacity: 1
        },

        {
          transform: `translate(${Math.random() * 150 - 75}px, ${window.innerHeight + 50}px) rotate(${Math.random() * 720}deg)`,
          opacity: 0
        }

      ],

      {
        duration: duration,
        easing: "ease-out"
      }

    );

    animation.onfinish = function() {
      piece.remove();
    };

  }

}
const birthdayVideo = document.getElementById("birthday-video");

if (birthdayVideo) {
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        birthdayVideo.play().catch((error) => {
          console.log("Video autoplay was blocked:", error);
        });

        videoObserver.unobserve(birthdayVideo);
      }
    });
  }, {
    threshold: 0.5
  });

  videoObserver.observe(birthdayVideo);
}