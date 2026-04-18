// Lógica dedicada a features apenas da landing page
document.addEventListener("DOMContentLoaded", () => {
    const googleLoginBtns = document.querySelectorAll('.btn-google-login');
    googleLoginBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.innerHTML = '<i class="ph ph-spinner ph-spin"></i> Conectando...';
            btn.disabled = true;
            loginWithGoogle().catch(() => {
                btn.innerHTML = '<img src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg" style="width: 18px;" /> Entrar com Google';
                btn.disabled = false;
            });
        });
    });
});

window.openLoginModal = function() {
    const modal = document.getElementById('loginModalOverlay');
    if (modal) modal.classList.add('show');
}
window.closeLoginModal = function() {
    const modal = document.getElementById('loginModalOverlay');
    if (modal) modal.classList.remove('show');
}
