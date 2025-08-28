// Enhanced JavaScript functionality for the personal website

// Language content object
const content = {
    ar: {
        name: "مرحبًا، أنا عبدالاله عثمان غويث",
        homeLink: "الصفحة الرئيسية",
        aboutLink: "عني",
        blogLink: "المدونة",
        contactLink: "اتصل بي",
        welcomeMessage: "مرحبًا بك في موقعي الشخصي",
        introText: "أنا عبدالاله عثمان غويث، ومطور مواقع إلكترونية.",
        aboutHeading: "عني",
        blogHeading: "المدونة",
        contactHeading: "اتصل بي",
        footerName: "عبدالاله عثمان غويث",
        searchPlaceholder: "ابحث في الموقع..."
    },
    en: {
        name: "Hello, I'm Abdulilah Othman Ghowaith",
        homeLink: "Home",
        aboutLink: "About",
        blogLink: "Blog",
        contactLink: "Contact",
        welcomeMessage: "Welcome to my personal website",
        introText: "I'm Abdulilah Othman Ghowaith, a web developer.",
        aboutHeading: "About Me",
        blogHeading: "Blog",
        contactHeading: "Contact Me",
        footerName: "Abdulilah Othman Ghowaith",
        searchPlaceholder: "Search the website..."
    }
};

// Current language
let currentLanguage = 'ar';

// Change language function
function changeLanguage(lang) {
    currentLanguage = lang;
    
    // Update text content
    document.getElementById('name').textContent = content[lang].name;
    document.getElementById('home-link').textContent = content[lang].homeLink;
    document.getElementById('about-link').textContent = content[lang].aboutLink;
    document.getElementById('blog-link').textContent = content[lang].blogLink;
    document.getElementById('contact-link').textContent = content[lang].contactLink;
    document.getElementById('welcome-message').textContent = content[lang].welcomeMessage;
    document.getElementById('intro-text').textContent = content[lang].introText;
    document.getElementById('about-heading').textContent = content[lang].aboutHeading;
    document.getElementById('blog-heading').textContent = content[lang].blogHeading;
    document.getElementById('contact-heading').textContent = content[lang].contactHeading;
    document.getElementById('footer-name').textContent = content[lang].footerName;
    document.getElementById('search-input').placeholder = content[lang].searchPlaceholder;
    
    // Update document direction and language
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    // Update active language button
    document.querySelectorAll('.language-switch button').forEach(btn => {
        btn.style.opacity = '0.7';
    });
    event.target.style.opacity = '1';
    
    // Show success message
    showNotification(`Language changed to ${lang === 'ar' ? 'العربية' : 'English'}`, 'success');
}

// Search functionality
function performSearch() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase().trim();
    
    if (!searchTerm) {
        showNotification('يرجى إدخال كلمة للبحث', 'warning');
        return;
    }
    
    // Get all text content from sections
    const sections = document.querySelectorAll('section');
    let found = false;
    
    // Remove previous highlights
    removeHighlights();
    
    sections.forEach(section => {
        const textContent = section.textContent.toLowerCase();
        if (textContent.includes(searchTerm)) {
            // Highlight the section
            section.style.border = '3px solid #667eea';
            section.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.5)';
            
            // Scroll to the section
            if (!found) {
                section.scrollIntoView({ behavior: 'smooth', block: 'center' });
                found = true;
            }
        }
    });
    
    if (found) {
        showNotification(`تم العثور على "${searchTerm}" في الموقع`, 'success');
    } else {
        showNotification(`لم يتم العثور على "${searchTerm}"`, 'error');
    }
}

// Remove search highlights
function removeHighlights() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.border = '';
        section.style.boxShadow = '';
    });
}

// Show notification function
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : type === 'warning' ? '#ff9800' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 10000;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Add click event to navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add enter key support for search
    document.getElementById('search-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Contact form submission
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('شكراً لك! تم إرسال رسالتك بنجاح', 'success');
            this.reset();
        });
    }
    
    // Add loading animation to sections
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Add click effect to buttons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Add hover effect to profile image
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.1) contrast(1.1)';
        });
        
        profileImage.addEventListener('mouseleave', function() {
            this.style.filter = '';
        });
    }
});


