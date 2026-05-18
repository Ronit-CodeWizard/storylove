// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Modal functions
function showPasswordLock() {
    document.getElementById('passwordLock').classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => document.getElementById('pin1').focus(), 100);
}

function hidePasswordLock() {
    document.getElementById('passwordLock').classList.remove('active');
    document.body.style.overflow = 'auto';
    clearPinInputs();
    document.getElementById('errorMessage').textContent = '';
}

function clearPinInputs() {
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`pin${i}`).value = '';
    }
}

function verifyPin() {
    const pin = Array.from({length: 4}, (_, i) => 
        document.getElementById(`pin${i + 1}`).value
    ).join('');

    if (pin.length !== 4) {
        document.getElementById('errorMessage').textContent = 'Please enter all 4 digits';
        return;
    }

    // Simple PIN check - change "1234" to your desired PIN
    if (pin === "ro9e") {
        // Set authentication
        localStorage.setItem('auth', 'true');
        localStorage.setItem('authTime', Date.now());
        
        // Redirect
        window.location.href = './protected/story.html';
    } else {
        document.getElementById('errorMessage').textContent = 'Incorrect PIN. Please try again.';
        clearPinInputs();
        document.getElementById('pin1').focus();
    }
}

// PIN input handling
window.addEventListener('DOMContentLoaded', function() {
    for (let i = 1; i <= 4; i++) {
        const input = document.getElementById(`pin${i}`);
        
        input.addEventListener('input', function() {
            if (this.value.length === 1 && i < 4) {
                document.getElementById(`pin${i + 1}`).focus();
            }
            if (i === 4 && this.value.length === 1) {
                verifyPin();
            }
        });
        
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && this.value === '' && i > 1) {
                document.getElementById(`pin${i - 1}`).focus();
            }
            if (e.key === 'Enter') {
                verifyPin();
            }
        });
    }
});

// Security
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', function(e) {
    if (e.keyCode === 123 || 
        (e.ctrlKey && e.shiftKey && e.keyCode === 73) || 
        (e.ctrlKey && e.shiftKey && e.keyCode === 74) || 
        (e.ctrlKey && e.keyCode === 85)) {
        e.preventDefault();
    }
});

// Navbar effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');
    if (window.pageYOffset > 50) {
        nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        nav.style.boxShadow = 'none';
    }
});
