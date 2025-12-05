// Mock data
        const albums = [
            { id: 1, title: "Midnight Vibes", artist: "Luna Echo", year: "2023", image: "album1", tracks: 12 },
            { id: 2, title: "Electric Dreams", artist: "Neon Pulse", year: "2024", image: "album2", tracks: 10 },
            { id: 3, title: "Ocean Waves", artist: "Azure Skies", year: "2023", image: "album3", tracks: 8 },
            { id: 4, title: "Urban Jungle", artist: "City Beats", year: "2024", image: "album4", tracks: 14 },
            { id: 5, title: "Stellar Journey", artist: "Cosmic Drift", year: "2023", image: "album5", tracks: 11 },
            { id: 6, title: "Golden Hour", artist: "Sunset Collective", year: "2024", image: "album6", tracks: 9 }
        ];

        const artists = [
            { id: 1, name: "Luna Echo", genre: "Indie Pop", followers: "245K", image: "artist1" },
            { id: 2, name: "Neon Pulse", genre: "Electronic", followers: "189K", image: "artist2" },
            { id: 3, name: "Azure Skies", genre: "Ambient", followers: "156K", image: "artist3" },
            { id: 4, name: "City Beats", genre: "Hip Hop", followers: "312K", image: "artist4" },
            { id: 5, name: "Cosmic Drift", genre: "Space Rock", followers: "98K", image: "artist5" },
            { id: 6, name: "Sunset Collective", genre: "Chillout", followers: "203K", image: "artist6" }
        ];

        const playlist = [
            { id: 1, title: "Midnight Drive", artist: "Luna Echo", album: "Midnight Vibes", duration: "3:45", image: "track1", favorite: true },
            { id: 2, title: "Digital Rain", artist: "Neon Pulse", album: "Electric Dreams", duration: "4:20", image: "track2", favorite: true },
            { id: 3, title: "Deep Blue", artist: "Azure Skies", album: "Ocean Waves", duration: "5:10", image: "track3", favorite: false },
            { id: 4, title: "Concrete Jungle", artist: "City Beats", album: "Urban Jungle", duration: "3:30", image: "track4", favorite: true },
            { id: 5, title: "Starlight", artist: "Cosmic Drift", album: "Stellar Journey", duration: "6:15", image: "track5", favorite: false },
            { id: 6, title: "Golden Sunset", artist: "Sunset Collective", album: "Golden Hour", duration: "4:50", image: "track6", favorite: true },
            { id: 7, title: "Echo Chamber", artist: "Luna Echo", album: "Midnight Vibes", duration: "4:12", image: "track7", favorite: false },
            { id: 8, title: "Neon Lights", artist: "Neon Pulse", album: "Electric Dreams", duration: "3:58", image: "track8", favorite: true }
        ];

        const favorites = [
            { id: 1, title: "Midnight Vibes", artist: "Luna Echo", year: "2023", type: "album", tracks: 12 },
            { id: 2, title: "Electric Dreams", artist: "Neon Pulse", year: "2024", type: "album", tracks: 10 },
            { id: 3, title: "Luna Echo", genre: "Indie Pop", followers: "245K", type: "artist" },
            { id: 4, title: "Neon Pulse", genre: "Electronic", followers: "189K", type: "artist" },
            { id: 5, title: "Golden Hour", artist: "Sunset Collective", year: "2024", type: "album", tracks: 9 }
        ];

        // DOM Elements
        const albumsGrid = document.getElementById('albumsGrid');
        const artistsGrid = document.getElementById('artistsGrid');
        const playlistItems = document.getElementById('playlistItems');
        const favoritesGrid = document.getElementById('favoritesGrid');
        const favoriteTracks = document.getElementById('favoriteTracks');
        const currentTrackImage = document.getElementById('currentTrackImage');
        const currentTrackTitle = document.getElementById('currentTrackTitle');
        const currentTrackArtist = document.getElementById('currentTrackArtist');
        const playBtn = document.getElementById('playBtn');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const progressBar = document.getElementById('progressBar');
        const currentTime = document.getElementById('currentTime');
        const duration = document.getElementById('duration');
        const volumeSlider = document.getElementById('volumeSlider');
        const searchInput = document.getElementById('searchInput');
        const navLinks = document.querySelectorAll('.nav-links a');
        const homeSection = document.getElementById('homeSection');
        const favoritesSection = document.getElementById('favoritesSection');
        const profileSection = document.getElementById('profileSection');

        // Player state
        let currentTrackIndex = 0;
        let isPlaying = false;
        let currentProgress = 0;
        let totalDuration = 300; // 5 minutes in seconds for demo

        // Initialize the app
        function init() {
            renderAlbums();
            renderArtists();
            renderPlaylist();
            renderFavorites();
            renderFavoriteTracks();
            setupEventListeners();
            updateCurrentTrack();
            
            // Set initial active nav link
            document.querySelector('.nav-links a[data-section="home"]').classList.add('active');
        }

        // Navigation
        function switchSection(section) {
            // Hide all sections
            homeSection.classList.add('hidden');
            favoritesSection.classList.add('hidden');
            profileSection.classList.add('hidden');
            
            // Show selected section
            if (section === 'home') {
                homeSection.classList.remove('hidden');
            } else if (section === 'favorites') {
                favoritesSection.classList.remove('hidden');
            } else if (section === 'profile') {
                profileSection.classList.remove('hidden');
            }
            
            // Update active nav link
            navLinks.forEach(link => link.classList.remove('active'));
            document.querySelector(`.nav-links a[data-section="${section}"]`).classList.add('active');
        }

        // Render albums
        function renderAlbums() {
            albumsGrid.innerHTML = '';
            albums.forEach((album, index) => {
                const albumCard = document.createElement('div');
                albumCard.className = 'album-card';
                albumCard.style.animationDelay = `${(index + 1) * 0.1}s`;
                albumCard.innerHTML = `
                    <div class="album-cover">
                        <i class="fas fa-compact-disc"></i>
                    </div>
                    <div class="album-info">
                        <h3>${album.title}</h3>
                        <p>${album.artist} • ${album.year}</p>
                    </div>
                `;
                albumCard.addEventListener('click', () => {
                    const albumTracks = playlist.filter(track => track.album === album.title);
                    if (albumTracks.length > 0) {
                        currentTrackIndex = playlist.findIndex(t => t.id === albumTracks[0].id);
                        playTrack();
                    }
                });
                albumsGrid.appendChild(albumCard);
            });
        }

        // Render artists
        function renderArtists() {
            artistsGrid.innerHTML = '';
            artists.forEach((artist, index) => {
                const artistCard = document.createElement('div');
                artistCard.className = 'artist-card';
                artistCard.style.animationDelay = `${(index + 1) * 0.1}s`;
                artistCard.innerHTML = `
                    <div class="artist-image">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="artist-info">
                        <h3>${artist.name}</h3>
                        <p>${artist.genre} • ${artist.followers}</p>
                    </div>
                `;
                artistCard.addEventListener('click', () => {
                    const artistTracks = playlist.filter(track => track.artist === artist.name);
                    if (artistTracks.length > 0) {
                        currentTrackIndex = playlist.findIndex(t => t.id === artistTracks[0].id);
                        playTrack();
                    }
                });
                artistsGrid.appendChild(artistCard);
            });
        }

        // Render playlist
        function renderPlaylist() {
            playlistItems.innerHTML = '';
            playlist.forEach((track, index) => {
                const playlistItem = document.createElement('div');
                playlistItem.className = `playlist-item ${index === currentTrackIndex ? 'active' : ''}`;
                playlistItem.innerHTML = `
                    <img src="https://placehold.co/50x50/667eea/white?text=${track.title.charAt(0)}" alt="${track.title}">
                    <div class="playlist-item-info">
                        <h4>${track.title}</h4>
                        <p>${track.artist}</p>
                    </div>
                    <div class="playlist-item-duration">${track.duration}</div>
                `;
                playlistItem.addEventListener('click', () => {
                    currentTrackIndex = index;
                    playTrack();
                });
                playlistItems.appendChild(playlistItem);
            });
        }

        // Render favorites
        function renderFavorites() {
            favoritesGrid.innerHTML = '';
            favorites.forEach((favorite, index) => {
                const favoriteCard = document.createElement('div');
                favoriteCard.className = 'favorite-card album-card';
                favoriteCard.style.animationDelay = `${(index + 1) * 0.1}s`;
                let content = '';
                
                if (favorite.type === 'album') {
                    content = `
                        <div class="favorite-badge">
                            <i class="fas fa-heart"></i>
                        </div>
                        <div class="favorite-cover album-cover">
                            <i class="fas fa-compact-disc"></i>
                        </div>
                        <div class="favorite-info album-info">
                            <h3>${favorite.title}</h3>
                            <p>${favorite.artist} • ${favorite.year}</p>
                        </div>
                    `;
                } else if (favorite.type === 'artist') {
                    content = `
                        <div class="favorite-badge">
                            <i class="fas fa-heart"></i>
                        </div>
                        <div class="favorite-cover artist-image">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="favorite-info artist-info">
                            <h3>${favorite.title}</h3>
                            <p>${favorite.genre} • ${favorite.followers}</p>
                        </div>
                    `;
                }
                
                favoriteCard.innerHTML = content;
                favoritesGrid.appendChild(favoriteCard);
            });
        }

        // Render favorite tracks
        function renderFavoriteTracks() {
            favoriteTracks.innerHTML = '';
            const favoriteTracksList = playlist.filter(track => track.favorite);
            favoriteTracksList.forEach((track, index) => {
                const playlistItem = document.createElement('div');
                playlistItem.className = `playlist-item ${index === currentTrackIndex && track.favorite ? 'active' : ''}`;
                playlistItem.innerHTML = `
                    <img src="https://placehold.co/50x50/764ba2/white?text=${track.title.charAt(0)}" alt="${track.title}">
                    <div class="playlist-item-info">
                        <h4>${track.title}</h4>
                        <p>${track.artist}</p>
                    </div>
                    <div class="playlist-item-duration">${track.duration}</div>
                `;
                playlistItem.addEventListener('click', () => {
                    currentTrackIndex = playlist.findIndex(t => t.id === track.id);
                    playTrack();
                });
                favoriteTracks.appendChild(playlistItem);
            });
        }

        // Update current track display
        function updateCurrentTrack() {
            const track = playlist[currentTrackIndex];
            currentTrackTitle.textContent = track.title;
            currentTrackArtist.textContent = track.artist;
            currentTrackImage.src = `https://placehold.co/65x65/667eea/white?text=${track.title.charAt(0)}`;
            
            // Update active playlist item
            document.querySelectorAll('.playlist-item').forEach((item, index) => {
                const trackId = playlist[index]?.id;
                const isActive = trackId === playlist[currentTrackIndex]?.id;
                item.classList.toggle('active', isActive);
            });
        }

        // Play current track
        function playTrack() {
            isPlaying = true;
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            playBtn.classList.remove('pulse');
            playBtn.style.animation = 'none';
            setTimeout(() => {
                playBtn.style.animation = 'pulse 2s infinite';
            }, 10);
            updateCurrentTrack();
        }

        // Pause current track
        function pauseTrack() {
            isPlaying = false;
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
            playBtn.classList.remove('pulse');
            playBtn.style.animation = 'none';
        }

        // Setup event listeners
        function setupEventListeners() {
            // Navigation
            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const section = link.dataset.section;
                    switchSection(section);
                });
            });

            // Play/Pause button
            playBtn.addEventListener('click', () => {
                if (isPlaying) {
                    pauseTrack();
                } else {
                    playTrack();
                }
            });

            // Previous button
            prevBtn.addEventListener('click', () => {
                currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
                playTrack();
            });

            // Next button
            nextBtn.addEventListener('click', () => {
                currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
                playTrack();
            });

            // Progress bar
            progressBar.addEventListener('click', (e) => {
                const width = progressBar.clientWidth;
                const clickX = e.offsetX;
                currentProgress = (clickX / width) * totalDuration;
                const progressElement = progressBar.querySelector('::before');
                progressBar.style.setProperty('--progress', `${(currentProgress / totalDuration) * 100}%`);
                updateCurrentTime();
            });

            // Volume slider
            volumeSlider.addEventListener('click', (e) => {
                const width = e.currentTarget.clientWidth;
                const clickX = e.offsetX;
                const volume = clickX / width;
                volumeSlider.style.setProperty('--volume', `${volume * 100}%`);
            });

            // Search functionality
            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                filterResults(searchTerm);
            });
        }

        // Filter results based on search
        function filterResults(searchTerm) {
            if (searchTerm === '') {
                renderAlbums();
                renderArtists();
                return;
            }

            // Filter albums
            const filteredAlbums = albums.filter(album => 
                album.title.toLowerCase().includes(searchTerm) || 
                album.artist.toLowerCase().includes(searchTerm)
            );
            
            // Filter artists
            const filteredArtists = artists.filter(artist => 
                artist.name.toLowerCase().includes(searchTerm) || 
                artist.genre.toLowerCase().includes(searchTerm)
            );

            // Re-render with filtered results
            albumsGrid.innerHTML = '';
            artistsGrid.innerHTML = '';

            if (filteredAlbums.length === 0) {
                albumsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--gray);">No albums found</p>';
            } else {
                filteredAlbums.forEach((album, index) => {
                    const albumCard = document.createElement('div');
                    albumCard.className = 'album-card';
                    albumCard.style.animationDelay = '0s';
                    albumCard.innerHTML = `
                        <div class="album-cover">
                            <i class="fas fa-compact-disc"></i>
                        </div>
                        <div class="album-info">
                            <h3>${album.title}</h3>
                            <p>${album.artist} • ${album.year}</p>
                        </div>
                    `;
                    albumCard.addEventListener('click', () => {
                        const albumTracks = playlist.filter(track => track.album === album.title);
                        if (albumTracks.length > 0) {
                            currentTrackIndex = playlist.findIndex(t => t.id === albumTracks[0].id);
                            playTrack();
                        }
                    });
                    albumsGrid.appendChild(albumCard);
                });
            }

            if (filteredArtists.length === 0) {
                artistsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--gray);">No artists found</p>';
            } else {
                filteredArtists.forEach((artist, index) => {
                    const artistCard = document.createElement('div');
                    artistCard.className = 'artist-card';
                    artistCard.style.animationDelay = '0s';
                    artistCard.innerHTML = `
                        <div class="artist-image">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="artist-info">
                            <h3>${artist.name}</h3>
                            <p>${artist.genre} • ${artist.followers}</p>
                        </div>
                    `;
                    artistCard.addEventListener('click', () => {
                        const artistTracks = playlist.filter(track => track.artist === artist.name);
                        if (artistTracks.length > 0) {
                            currentTrackIndex = playlist.findIndex(t => t.id === artistTracks[0].id);
                            playTrack();
                        }
                    });
                    artistsGrid.appendChild(artistCard);
                });
            }
        }

        // Update current time display
        function updateCurrentTime() {
            const minutes = Math.floor(currentProgress / 60);
            const seconds = Math.floor(currentProgress % 60);
            currentTime.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            duration.textContent = `${Math.floor(totalDuration / 60)}:${(totalDuration % 60).toString().padStart(2, '0')}`;
        }

        // Initialize the app when DOM is loaded
        document.addEventListener('DOMContentLoaded', init);

        // Simulate progress update (for demo purposes)
        setInterval(() => {
            if (isPlaying && currentProgress < totalDuration) {
                currentProgress += 1;
                const progressPercentage = (currentProgress / totalDuration) * 100;
                progressBar.style.setProperty('--progress', `${progressPercentage}%`);
                updateCurrentTime();
                
                // Auto next track
                if (currentProgress >= totalDuration) {
                    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
                    currentProgress = 0;
                    playTrack();
                }
            }
        }, 1000);