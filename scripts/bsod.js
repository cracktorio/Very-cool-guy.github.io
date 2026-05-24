(function () {
  const STOP_CODES = [
    "TOO_CUTE_TO_FUNCTION",
    "THIGH_HIGHS_NOT_FOUND",
    "BOTTOM_LICENSE_EXPIRED",
    "CATGIRL_BUFFER_OVERFLOW",
    "UWU_STACK_OVERFLOW",
    "FEMBOY_KERNEL_PANIC",
    "GAY_AWAKENING_FAULT",
    "SPARKLE_DRIVER_CRASHED",
    "CRITICAL_BLUSH_EXCEPTION",
    "PROCESS_BOYKISSER_HALTED",
  ];

  const MESSAGES = [
    "Your PC got a little too gay and needs a moment. We're just collecting some sparkles, and then we'll pretend nothing happened. ✨",
    "Oopsie~ your computer caught feelings and crashed. Maybe try kissing the screen?",
    "A problem has been detected and Windows has been shut down to prevent damage to your vibes. Stay cute. 🎀",
    "Something happened. We're not sure what. Probably you were just too pretty for this machine.",
    "Critical femboy overflow in kernel space. Please tuck and reboot.",
    "Your CPU saw something cute and forgot how to compute. Please hold while it recovers~",
  ];

  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function buildOverlay() {
    const overlay = document.createElement("div");
    overlay.id = "bsod-overlay";
    overlay.innerHTML = `
      <div class="bsod-frown">;3</div>
      <div class="bsod-message"></div>
      <div class="bsod-progress">0% sparkly</div>
      <div class="bsod-details">
        <div class="bsod-qr">
          <img alt="QR code"
               src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://www.youtube.com/watch?v=dQw4w9WgXcQ">
        </div>
        <div class="bsod-info">
          For more cuteness about this issue and possible fixes, scan the QR code above.<br>
          If you call your bf, give him this info:<br>
          <div class="bsod-stop">Stop code: <span class="bsod-stopcode"></span></div>
        </div>
      </div>
      <div class="bsod-hint">click anywhere or press any key to forgive uwu ♡</div>
    `;
    document.body.appendChild(overlay);
    return overlay;
  }

  let overlay = null;
  let progressTimer = null;
  let active = false;

  function showBsod() {
    if (active) return;
    active = true;

    if (!overlay) overlay = buildOverlay();

    overlay.querySelector(".bsod-message").textContent = pick(MESSAGES);
    overlay.querySelector(".bsod-stopcode").textContent = pick(STOP_CODES);

    let progress = 0;
    const progressEl = overlay.querySelector(".bsod-progress");
    progressEl.textContent = "0% sparkly";

    overlay.classList.add("bsod-visible");

    const audios = document.querySelectorAll("audio, video");
    audios.forEach((a) => {
      if (!a.paused) {
        a.dataset.bsodWasPlaying = "1";
        a.pause();
      }
    });

    progressTimer = setInterval(() => {
      progress += Math.random() * 4;
      if (progress > 99) progress = 99;
      progressEl.textContent = `${Math.floor(progress)}% sparkly`;
    }, 600);
  }

  function dismissBsod() {
    if (!active) return;
    active = false;
    if (progressTimer) {
      clearInterval(progressTimer);
      progressTimer = null;
    }
    if (overlay) overlay.classList.remove("bsod-visible");

    document.querySelectorAll('[data-bsod-was-playing="1"]').forEach((a) => {
      delete a.dataset.bsodWasPlaying;
      a.play().catch(() => {});
    });
  }

  document.addEventListener("click", (e) => {
    if (active) {
      e.stopPropagation();
      e.preventDefault();
      dismissBsod();
    }
  }, true);

  document.addEventListener("keydown", (e) => {
    if (active) {
      e.stopPropagation();
      e.preventDefault();
      dismissBsod();
    }
  }, true);

  window.triggerBsod = showBsod;

  const MIN_DELAY = 30000;
  const MAX_DELAY = 90000;
  const delay = MIN_DELAY + Math.random() * (MAX_DELAY - MIN_DELAY);
  setTimeout(showBsod, delay);
})();
