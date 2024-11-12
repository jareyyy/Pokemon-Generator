async function fetchTikTokVideo(apiKey) {
    const url = `https://shoti.kenliejugarap.com/getvideo.php?apikey=${apiKey}`;

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const videoPlayer = document.getElementById('videoPlayer');
        const videoSource = document.getElementById('videoSource');
        const videoTitle = document.getElementById('videoTitle');
        const videoLink = document.getElementById('videoLink');
        const videoUsername = document.getElementById('videoUsername');
        
        // Set video source and info
        videoSource.src = data.videoDownloadLink;
        videoPlayer.load();
        videoTitle.textContent = `Title: ${data.title}`;
        videoLink.textContent = `Link: ${data.tiktokUrl}`;
        videoLink.innerHTML = `Link: <a href="${data.tiktokUrl}" target="_blank" rel="noopener noreferrer">${data.tiktokUrl}</a>`;

        // Autoplay the video
        videoPlayer.play();

        // Set up download button
        const downloadButton = document.getElementById('downloadButton');
        downloadButton.onclick = () => {
            window.open(data.videoDownloadLink, '_blank');
        };

        // Play/Pause functionality
        const playButton = document.getElementById('playButton');
        const pauseButton = document.getElementById('pauseButton');

        playButton.onclick = () => {
            videoPlayer.play();
        };

        pauseButton.onclick = () => {
            videoPlayer.pause();
        };

    } catch (error) {
        console.error('Error fetching TikTok video:', error);
    }
}

// Example usage
const apiKey = 'shoti-e157759a2a464cc60dd609355fae95b6876c67b875192c110f297e2f67092ab37219968394808fefc5912d6757fa01ab2e10309cdfdae8818651d81e7d5c51b206771a0eb00b411b21b31683ae26eccf4adf3fd093'; // Replace with your actual API key
fetchTikTokVideo(apiKey);

// Add functionality for the Next Video button
const nextButton = document.getElementById('nextButton');
nextButton.onclick = () => {
    fetchTikTokVideo(apiKey);
};