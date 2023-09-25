let audioElement = new Audio("daku.mp3")
let playIcon = document.querySelector("#play")
let songDuration = document.querySelector("#duration")

// play/pause song function
playIcon.addEventListener("click", () => {

    if (audioElement.paused) {
        audioElement.play()
        playIcon.classList.remove("fa-circle-play")
        playIcon.classList.add("fa-circle-pause")
    } else {
        audioElement.pause()
        playIcon.classList.remove("fa-circle-pause")
        playIcon.classList.add("fa-circle-play")
    }
})

audioElement.addEventListener("timeupdate", () => {
    // update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100)
    songDuration.value = progress
})

songDuration.addEventListener("change", () => {
    audioElement.currentTime = songDuration.value * audioElement.duration/100
    
})

audioElement.addEventListener("loadedmetadata", () => {
    // Update the song duration when the metadata is loaded
    const duration = audioElement.duration;
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    songDuration.max = 100; // Set the maximum value of the seek bar to 100
    songDuration.value = 0; // Initialize the seek bar value to 0
    document.querySelector("#timeStamp1").textContent = formatTime(minutes, seconds);
});

audioElement.addEventListener("timeupdate", () => {
    // Update seek bar
    const progress = (audioElement.currentTime / audioElement.duration) * 100;
    songDuration.value = progress;

    // Update the timestamp
    const currentTime = audioElement.currentTime;
    const minutes = Math.floor(currentTime / 60);
    const seconds = Math.floor(currentTime % 60);
    document.querySelector("#timeStamp0").textContent = formatTime(minutes, seconds);
});

// Helper function to format time as "mm:ss"
function formatTime(minutes, seconds) {
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
}

audioElement.addEventListener("ended", () => {
    audioElement.currentTime = 0; // Reset current time to 0
    playIcon.classList.remove("fa-circle-pause");
    playIcon.classList.add("fa-circle-play");
});
