(function() {
    'use strict';
    
    // Check authentication
    function checkAuth() {
        const auth = localStorage.getItem('auth');
        const authTime = localStorage.getItem('authTime');
        
        if (!auth || auth !== 'true') {
            redirectHome();
            return false;
        }
        
        // Check 30 min timeout
        if (authTime) {
            const elapsed = Date.now() - parseInt(authTime);
            if (elapsed > 30 * 60 * 1000) {
                localStorage.clear();
                redirectHome();
                return false;
            }
        }
        
        return true;
    }
    
    function redirectHome() {
        window.location.href = '../index.html';
    }
    
    // Run check
    if (!checkAuth()) {
        document.body.innerHTML = `
            <div style="display:flex;justify-content:center;align-items:center;height:100vh;background:linear-gradient(135deg,#FACC15,#EAB308);font-family:sans-serif;">
                <div style="background:white;padding:50px;border-radius:12px;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,0.3);">
                    <div style="font-size:64px;margin-bottom:20px;">🔒</div>
                    <h2 style="color:#2c2c2c;margin-bottom:15px;">Access Denied</h2>
                    <p style="color:#666;margin-bottom:30px;">Please enter the correct PIN.</p>
                    <a href="../index.html" style="display:inline-block;padding:15px 40px;background:linear-gradient(135deg,#FACC15,#EAB308);color:#333;text-decoration:none;border-radius:8px;font-weight:600;">Go Back</a>
                </div>
            </div>
        `;
    }
    
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
    
})();
