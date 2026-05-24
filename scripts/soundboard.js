<!-- For the Soundboard -->
function playSound(id) {

  // stop all sounds first
  const sounds = document.querySelectorAll("audio");

  sounds.forEach(sound => {
    sound.pause();
    sound.currentTime = 0;
  });

  // play selected sound
  const audio = document.getElementById(id);
  audio.play();
}
