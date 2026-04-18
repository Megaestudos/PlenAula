// Lógica dedicada a features apenas da landing page
document.addEventListener("DOMContentLoaded", () => {
    const googleLoginBtns = document.querySelectorAll('.btn-google-login');
    googleLoginBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.innerHTML = '<i class="ph ph-spinner ph-spin"></i> Conectando...';
            btn.disabled = true;
            loginWithGoogle().catch(() => {
                btn.innerHTML = '<i class="ph-fill ph-google-logo"></i> Entrar com Google';
                btn.disabled = false;
            });
        });
    });
});
