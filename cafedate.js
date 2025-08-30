// Sample user data (expanded with more profiles)
const users = [
    {
        id: 1,
        name: "Emma",
        age: 25,
        bio: "Photographer & Travel enthusiast. Love hiking and coffee.",
        interests: ["Photography", "Travel", "Coffee", "Hiking"],
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        distance: "2 km away"
    },
    {
        id: 2,
        name: "Sophia",
        age: 27,
        bio: "Software engineer who loves jazz and weekend brunches.",
        interests: ["Technology", "Music", "Brunch", "Movies"],
        image: "https://images.unsplash.com/photo-1519764622345-23439dd774f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        distance: "5 km away"
    },
    {
        id: 3,
        name: "Olivia",
        age: 24,
        bio: "Art student who enjoys painting and visiting museums.",
        interests: ["Art", "Museums", "Painting", "Reading"],
        image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        distance: "3 km away"
    },
    {
        id: 4,
        name: "Ava",
        age: 26,
        bio: "Yoga instructor and wellness coach. Love healthy living.",
        interests: ["Yoga", "Wellness", "Meditation", "Cooking"],
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        distance: "4 km away"
    },
    {
        id: 5,
        name: "Isabella",
        age: 28,
        bio: "Marketing manager who loves fashion and exploring new cities.",
        interests: ["Fashion", "Travel", "Food", "Shopping"],
        image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        distance: "7 km away"
    },
    {
        id: 6,
        name: "Mia",
        age: 23,
        bio: "Grad student in psychology. Love reading and deep conversations.",
        interests: ["Psychology", "Books", "Philosophy", "Coffee"],
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        distance: "3 km away"
    },
    {
        id: 7,
        name: "Charlotte",
        age: 29,
        bio: "Architect with a passion for sustainable design and photography.",
        interests: ["Architecture", "Design", "Photography", "Nature"],
        image: "https://images.unsplash.com/photo-1527082395-e939b847da0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        distance: "6 km away"
    },
    {
        id: 8,
        name: "Amelia",
        age: 25,
        bio: "Chef and food blogger. Always looking for new culinary experiences.",
        interests: ["Cooking", "Food", "Travel", "Blogging"],
        image: "https://images.unsplash.com/photo-1546961329-78bef0414d7c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
        distance: "2 km away"
    }
];

// Store liked users and matches
let likedUsers = JSON.parse(localStorage.getItem('likedUsers')) || [];
let matches = JSON.parse(localStorage.getItem('matches')) || [];
let currentUserIndex = 0;
let currentChatUser = null;
let isVideoCallActive = false;

// Three.js initialization for 3D background
function initThreeJS() {
    const container = document.getElementById('threejs-container');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Add floating shapes
    const geometry = new THREE.SphereGeometry(0.5, 32, 32);
    const material = new THREE.MeshPhongMaterial({ 
        color: 0xD4A76A, 
        shininess: 100,
        transparent: true,
        opacity: 0.7
    });
    
    const shapes = [];
    for (let i = 0; i < 15; i++) {
        const shape = new THREE.Mesh(geometry, material.clone());
        shape.position.x = Math.random() * 10 - 5;
        shape.position.y = Math.random() * 10 - 5;
        shape.position.z = Math.random() * 10 - 5;
        shape.material.color.setHex(Math.random() * 0xFFFFFF);
        shapes.push(shape);
        scene.add(shape);
    }

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    camera.position.z = 5;

    // Animation
    function animate() {
        requestAnimationFrame(animate);
        
        shapes.forEach(shape => {
            shape.rotation.x += 0.01;
            shape.rotation.y += 0.01;
            shape.position.x += Math.sin(Date.now() * 0.001 + shape.position.y) * 0.005;
            shape.position.y += Math.cos(Date.now() * 0.001 + shape.position.x) * 0.005;
        });

        renderer.render(scene, camera);
    }

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Show specific screen
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
    
    // Show video call and date planning buttons after 7 days (simulated)
    if (screenId === 'chat-screen') {
        setTimeout(() => {
            document.getElementById('video-call-btn').style.display = 'flex';
            document.getElementById('date-planning-btn').style.display = 'flex';
        }, 2000);
    }
    
    // Initialize profile stack if showing profile screen
    if (screenId === 'profile-screen') {
        initializeProfileStack();
    }
    
    // Update liked users screen if showing
    if (screenId === 'liked-screen') {
        updateLikedScreen();
    }
    
    // Update matches screen if showing
    if (screenId === 'matches-screen') {
        updateMatchesScreen();
    }
    
    // Update badge counts
    updateBadgeCounts();
}

// Update badge counts
function updateBadgeCounts() {
    document.getElementById('liked-count').textContent = likedUsers.length;
    document.getElementById('matches-count').textContent = matches.length;
}

// Initialize profile stack with user data
function initializeProfileStack() {
    const profileStack = document.getElementById('profile-stack');
    profileStack.innerHTML = '';
    
    // Filter out already liked users
    const availableUsers = users.filter(user => 
        !likedUsers.some(liked => liked.id === user.id)
    );
    
    if (availableUsers.length === 0) {
        profileStack.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <i class="fas fa-users" style="font-size: 50px; color: #ccc; margin-bottom: 20px;"></i>
                <h3>No more profiles nearby</h3>
                <p>Check back later for new matches!</p>
            </div>
        `;
        return;
    }
    
    availableUsers.forEach((user, index) => {
        const profileCard = document.createElement('div');
        profileCard.classList.add('profile-card');
        profileCard.dataset.userId = user.id;
        
        if (index > 0) {
            profileCard.style.zIndex = availableUsers.length - index;
            profileCard.style.transform = `scale(${1 - index * 0.05}) translateY(${index * 10}px)`;
            profileCard.style.opacity = 1 - index * 0.2;
        }
        
        profileCard.innerHTML = `
            <img src="${user.image}" class="profile-img" alt="${user.name}">
            <div class="profile-info">
                <div class="profile-name">${user.name}, <span class="profile-age">${user.age}</span></div>
                <div class="profile-bio">${user.bio}</div>
                <div class="profile-interests">
                    ${user.interests.map(interest => `<span class="interest">${interest}</span>`).join('')}
                </div>
                <div class="profile-distance">
                    <i class="fas fa-map-marker-alt"></i> ${user.distance}
                </div>
            </div>
        `;
        
        profileStack.appendChild(profileCard);
    });
    
    currentUserIndex = 0;
}

// Update liked users screen
function updateLikedScreen() {
    const likedContainer = document.getElementById('liked-container');
    likedContainer.innerHTML = '';
    
    if (likedUsers.length === 0) {
        likedContainer.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <i class="fas fa-heart" style="font-size: 50px; color: #ccc; margin-bottom: 20px;"></i>
                <h3>No liked users yet</h3>
                <p>Start swiping right to like someone!</p>
            </div>
        `;
        return;
    }
    
    likedUsers.forEach(user => {
        const isMatch = matches.some(match => match.id === user.id);
        
        const likedCard = document.createElement('div');
        likedCard.classList.add('liked-user-card');
        likedCard.innerHTML = `
            <img src="${user.image}" class="liked-user-img" alt="${user.name}">
            <div class="liked-user-info">
                <div class="liked-user-name">${user.name}, ${user.age}</div>
                <div class="liked-user-status">
                    ${isMatch ? 
                        '<span class="match-status">It\'s a match!</span>' : 
                        'You liked this profile'}
                </div>
            </div>
            ${isMatch ? 
                `<button class="btn" style="padding: 8px 15px; font-size: 14px;" 
                 onclick="startChat(${user.id})">Message</button>` : 
                ''}
        `;
        
        likedContainer.appendChild(likedCard);
    });
}

// Update matches screen
function updateMatchesScreen() {
    const matchesContainer = document.getElementById('matches-container');
    matchesContainer.innerHTML = '';
    
    if (matches.length === 0) {
        matchesContainer.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <i class="fas fa-heart" style="font-size: 50px; color: #ccc; margin-bottom: 20px;"></i>
                <h3>No matches yet</h3>
                <p>When you match with someone, they'll appear here!</p>
            </div>
        `;
        return;
    }
    
    matches.forEach(user => {
        const matchCard = document.createElement('div');
        matchCard.classList.add('match-card');
        matchCard.onclick = () => startChat(user.id);
        
        matchCard.innerHTML = `
            <img src="${user.image}" class="match-img" alt="${user.name}">
            <div class="match-info">
                <div class="match-name">${user.name}</div>
                <div class="match-last-message">It's a match! Send a message.</div>
            </div>
            <div class="match-time">Now</div>
        `;
        
        matchesContainer.appendChild(matchCard);
    });
}

// Start chat with a user
function startChat(userId) {
    const user = users.find(u => u.id === userId);
    if (!user) return;
    
    currentChatUser = user;
    
    // Update chat screen with user info
    document.getElementById('chat-user-img').src = user.image;
    document.getElementById('chat-user-name').textContent = user.name;
    
    // Load messages from localStorage or initialize empty
    const messages = JSON.parse(localStorage.getItem(`chat-${userId}`)) || [];
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.innerHTML = '';
    
    messages.forEach(msg => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(msg.sender === 'me' ? 'sent' : 'received');
        messageDiv.innerHTML = `
            ${msg.text}
            <div class="message-time">${msg.time}</div>
        `;
        chatMessages.appendChild(messageDiv);
    });
    
    // Scroll to bottom of chat
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    showScreen('chat-screen');
}

// Handle key press in message input
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Send a message
function sendMessage() {
    if (!currentChatUser) return;
    
    const input = document.getElementById('message-input');
    const messageText = input.value.trim();
    if (!messageText) return;
    
    // Create message object
    const message = {
        text: messageText,
        sender: 'me',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    // Save to localStorage
    const chatKey = `chat-${currentChatUser.id}`;
    const messages = JSON.parse(localStorage.getItem(chatKey)) || [];
    messages.push(message);
    localStorage.setItem(chatKey, JSON.stringify(messages));
    
    // Add to chat UI
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add('sent');
    messageDiv.innerHTML = `
        ${message.text}
        <div class="message-time">${message.time}</div>
    `;
    chatMessages.appendChild(messageDiv);
    
    // Clear input and scroll to bottom
    input.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Simulate reply after a delay
    setTimeout(() => {
        simulateReply();
    }, 1000 + Math.random() * 2000);
}

// Simulate a reply from the other user
function simulateReply() {
    if (!currentChatUser) return;
    
    const replies = [
        "That sounds great!",
        "I'd love to!",
        "What time were you thinking?",
        "I know a perfect place for that!",
        "Can't wait to see you!",
        "That works for me!",
        "Sounds like a plan!",
        "I've been wanting to try that place!"
    ];
    
    const reply = replies[Math.floor(Math.random() * replies.length)];
    
    // Create message object
    const message = {
        text: reply,
        sender: 'them',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    // Save to localStorage
    const chatKey = `chat-${currentChatUser.id}`;
    const messages = JSON.parse(localStorage.getItem(chatKey)) || [];
    messages.push(message);
    localStorage.setItem(chatKey, JSON.stringify(messages));
    
    // Add to chat UI
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add('received');
    messageDiv.innerHTML = `
        ${message.text}
        <div class="message-time">${message.time}</div>
    `;
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Show date planning modal
function showDateModal() {
    document.getElementById('date-modal').classList.add('show');
}

// Hide date planning modal
function hideDateModal() {
    document.getElementById('date-modal').classList.remove('show');
}

// Schedule a date
function scheduleDate(type) {
    const dateTypes = {
        'coffee': 'Coffee Date',
        'dinner': 'Dinner Date',
        'movie': 'Movie Night',
        'walk': 'Walk in the Park'
    };
    
    alert(`You've scheduled a ${dateTypes[type]} with ${currentChatUser.name}!`);
    hideDateModal();
    
    // Add to chat
    const message = {
        text: `I'd like to schedule a ${dateTypes[type]} with you!`,
        sender: 'me',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    const chatKey = `chat-${currentChatUser.id}`;
    const messages = JSON.parse(localStorage.getItem(chatKey)) || [];
    messages.push(message);
    localStorage.setItem(chatKey, JSON.stringify(messages));
    
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add('sent');
    messageDiv.innerHTML = `
        ${message.text}
        <div class="message-time">${message.time}</div>
    `;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Start video call
function startVideoCall() {
    if (isVideoCallActive) return;
    
    // For demo purposes, we'll simulate a video call
    isVideoCallActive = true;
    showScreen('video-call-screen');
    
    // Simulate video call (in a real app, you would use WebRTC)
    setTimeout(() => {
        document.getElementById('remote-video').src = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";
        document.getElementById('local-video').src = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";
    }, 1000);
}

// End video call
function endVideoCall() {
    isVideoCallActive = false;
    showScreen('chat-screen');
}

// Toggle mute
function toggleMute() {
    const micIcon = document.querySelector('.mute-call i');
    if (micIcon.classList.contains('fa-microphone')) {
        micIcon.classList.remove('fa-microphone');
        micIcon.classList.add('fa-microphone-slash');
    } else {
        micIcon.classList.remove('fa-microphone-slash');
        micIcon.classList.add('fa-microphone');
    }
}

// Toggle video
function toggleVideo() {
    const videoIcon = document.querySelector('.video-toggle i');
    if (videoIcon.classList.contains('fa-video')) {
        videoIcon.classList.remove('fa-video');
        videoIcon.classList.add('fa-video-slash');
    } else {
        videoIcon.classList.remove('fa-video-slash');
        videoIcon.classList.add('fa-video');
    }
}

// Swipe left action
function swipeLeft() {
    const profileStack = document.getElementById('profile-stack');
    if (profileStack.children.length > 0) {
        profileStack.children[0].classList.add('swipe-left');
        setTimeout(() => {
            profileStack.removeChild(profileStack.children[0]);
            checkEmptyProfiles();
        }, 500);
    }
}

// Swipe right action
function swipeRight() {
    const profileStack = document.getElementById('profile-stack');
    if (profileStack.children.length > 0) {
        const userId = parseInt(profileStack.children[0].dataset.userId);
        const user = users.find(u => u.id === userId);
        
        if (user) {
            // Add to liked users
            if (!likedUsers.some(u => u.id === user.id)) {
                likedUsers.push(user);
                localStorage.setItem('likedUsers', JSON.stringify(likedUsers));
                
                // Check if it's a match (50% chance for demo)
                if (Math.random() > 0.5) {
                    if (!matches.some(u => u.id === user.id)) {
                        matches.push(user);
                        localStorage.setItem('matches', JSON.stringify(matches));
                        alert(`It's a match with ${user.name}! You can now message each other.`);
                    }
                }
                
                updateBadgeCounts();
            }
        }
        
        profileStack.children[0].classList.add('swipe-right');
        setTimeout(() => {
            profileStack.removeChild(profileStack.children[0]);
            checkEmptyProfiles();
        }, 500);
    }
}

// Check if no more profiles
function checkEmptyProfiles() {
    const profileStack = document.getElementById('profile-stack');
    if (profileStack.children.length === 0) {
        profileStack.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <i class="fas fa-users" style="font-size: 50px; color: #ccc; margin-bottom: 20px;"></i>
                <h3>No more profiles nearby</h3>
                <p>Check back later for new matches!</p>
            </div>
        `;
    }
}

// Super like action
function superLike() {
    alert('Super like sent! This will get their attention!');
    swipeRight();
}

// Subscribe action
function subscribe() {
    alert('Redirecting to payment gateway...');
    // After successful payment
    showScreen('profile-screen');
}

// Initialize the app
window.onload = function() {
    // Initialize Three.js for 3D background
    initThreeJS();
    
    // Add coffee elements randomly
    for (let i = 0; i < 10; i++) {
        const coffeeElement = document.createElement('div');
        coffeeElement.classList.add('coffee-element');
        coffeeElement.innerHTML = '<i class="fas fa-' + 
            ['coffee', 'mug-hot', 'cookie', 'croissant', 'ice-cream'][Math.floor(Math.random() * 5)] + 
            '"></i>';
        coffeeElement.style.left = Math.random() * 100 + '%';
        coffeeElement.style.top = Math.random() * 100 + '%';
        coffeeElement.style.transform = 'rotate(' + (Math.random() * 360) + 'deg)';
        coffeeElement.style.animationDelay = Math.random() * 2 + 's';
        coffeeElement.classList.add('floating');
        document.querySelector('.container').appendChild(coffeeElement);
    }
    
    // Initialize profile stack
    initializeProfileStack();
    
    // Update badge counts
    updateBadgeCounts();
    
    // Add swipe functionality to profile cards
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    
    const profileStack = document.getElementById('profile-stack');
    
    profileStack.addEventListener('touchstart', (e) => {
        if (profileStack.children.length > 0) {
            startX = e.touches[0].clientX;
            isDragging = true;
            profileStack.children[0].style.transition = 'none';
        }
    });
    
    profileStack.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
        const diff = currentX - startX;
        profileStack.children[0].style.transform = `translateX(${diff}px) rotate(${diff * 0.1}deg)`;
    });
    
    profileStack.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;
        profileStack.children[0].style.transition = 'transform 0.3s';
        
        const diff = currentX - startX;
        if (Math.abs(diff) > 100) {
            if (diff > 0) {
                swipeRight();
            } else {
                swipeLeft();
            }
        } else {
            profileStack.children[0].style.transform = '';
        }
    });
};
