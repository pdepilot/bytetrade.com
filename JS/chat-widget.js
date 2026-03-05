document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const chatWidgetButton = document.getElementById('chatWidgetButton');
    const chatPopup = document.getElementById('chatPopup');
    const chatClose = document.getElementById('chatClose');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    const chatMessages = document.getElementById('chatMessages');
    const supportLink = document.getElementById('supportLink');
    const chatBadge = document.querySelector('.chat-badge');
    const chatOverlay = document.createElement('div');
    chatOverlay.className = 'chat-overlay';
    document.body.appendChild(chatOverlay);
    
    // State
    let isChatOpen = false;
    let messageCount = 1;
    
    // Initialize chat widget
    function initChatWidget() {
        // Set initial badge count
        chatBadge.textContent = messageCount;
        
        // Toggle chat popup
        chatWidgetButton.addEventListener('click', toggleChat);
        chatClose.addEventListener('click', closeChat);
        chatOverlay.addEventListener('click', closeChat);
        
        // Send message on button click
        chatSend.addEventListener('click', sendMessage);
        
        // Send message on Enter key
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
        
        // Auto-resize textarea
        chatInput.addEventListener('input', () => {
            chatInput.style.height = 'auto';
            chatInput.style.height = (chatInput.scrollHeight) + 'px';
        });
        
        // Support link click handler
        supportLink.addEventListener('click', (e) => {
            // In a real app, this would navigate to your support page
            e.preventDefault();
            showRedirectMessage('Redirecting to support agent chat...');
            setTimeout(() => {
                window.location.href = 'support.html';
            }, 1500);
        });
        
        // Show initial welcome message after a delay
        setTimeout(() => {
            if (!isChatOpen) {
                messageCount++;
                chatBadge.textContent = messageCount;
                chatBadge.style.display = 'flex';
            }
        }, 3000);
    }
    
    // Toggle chat popup
    function toggleChat() {
        isChatOpen = !isChatOpen;
        
        if (isChatOpen) {
            chatPopup.classList.add('active');
            chatOverlay.classList.add('active');
            chatInput.focus();
            
            // Hide badge when chat is opened
            if (chatBadge.style.display !== 'none') {
                chatBadge.style.display = 'none';
                messageCount = 0;
            }
            
            // Scroll to bottom
            scrollToBottom();
        } else {
            closeChat();
        }
    }
    
    // Close chat popup
    function closeChat() {
        isChatOpen = false;
        chatPopup.classList.remove('active');
        chatOverlay.classList.remove('active');
        chatInput.blur();
    }
    
    // Send message
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message === '') return;
        
        // Add user message
        addMessage(message, 'user');
        
        // Clear input
        chatInput.value = '';
        chatInput.style.height = 'auto';
        
        // Show bot response after delay
        setTimeout(() => {
            addMessage('Thank you for your message! Redirecting you to our support agent for detailed assistance...', 'bot');
            
            // Redirect after a short delay
            setTimeout(() => {
                showRedirectMessage('Redirecting to support agent chat...');
                setTimeout(() => {
                    // In a real app, this would navigate to your support page
                    window.location.href = '/supportchat2.html';
                }, 1200);
            }, 1500);
        }, 800);
        
        // Scroll to bottom
        scrollToBottom();
    }
    
    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        const now = new Date();
        const timeString = now.getHours().toString().padStart(2, '0') + ':' + 
                          now.getMinutes().toString().padStart(2, '0');
        
        messageDiv.innerHTML = `
            <div class="message-content">${text}</div>
            <div class="message-time">${timeString}</div>
        `;
        
        chatMessages.appendChild(messageDiv);
    }
    
    // Show redirect message
    function showRedirectMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot redirect-message';
        messageDiv.innerHTML = `
            <div class="message-content">${text}</div>
            <div class="message-time">Just now</div>
        `;
        chatMessages.appendChild(messageDiv);
        scrollToBottom();
    }
    
    // Scroll to bottom of chat
    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Initialize the chat widget
    initChatWidget();
    
    // Auto-show chat badge animation on page load
    setTimeout(() => {
        chatBadge.style.animation = 'bounce 1.5s 1';
    }, 2000);
});