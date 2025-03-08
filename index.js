async function fetchTikTokVideo(apiKey) {
    const url = `https://shoti.kenliejugarap.com/getvideo.php?apikey=${apiKey}`;

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Update with the specific structure of the data you provided
        const videoPlayer = document.getElementById('videoPlayer');
        const videoSource = document.getElementById('videoSource');
        const videoTitle = document.getElementById('videoTitle');
        const videoLink = document.getElementById('videoLink');
        const videoUsername = document.getElementById('videoUsername');
        
        // Set video source and info using the new API response structure
        videoSource.src = data.shoti.videoUrl;
        videoPlayer.load();
        videoTitle.textContent = `Title: ${data.shoti.title}`;
        videoLink.textContent = `Link: ${data.shoti.videoUrl}`;
        videoLink.innerHTML = `Link: <a href="${data.shoti.videoUrl}" target="_blank" rel="noopener noreferrer">${data.shoti.videoUrl}</a>`;
        videoUsername.textContent = `Username: ${data.shoti.username}`;

        // Autoplay the video
        videoPlayer.play();

        // Set up download button (using the video URL as the download link)
        const downloadButton = document.getElementById('downloadButton');
        downloadButton.onclick = () => {
            window.open(data.shoti.videoUrl, '_blank');
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
