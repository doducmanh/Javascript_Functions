function toast({
    title = '',
    message = '',
    type = 'info',
    duration = 3000 }) {
    const main = document.getElementById('toast')
    if (main) {
        const toast = document.createElement('div')
        // Auto remove tag
        const autoRemoveID = setTimeout(function() {
            main.removeChild(toast)
        }, duration + 1000)
        // Remove toast when click
        toast.onclick = function(e) {
            if (e.target.closest('.toast__close')){
                main.removeChild(toast)
                clearTimeout(autoRemoveID);
            }
        }
        const icons = {
            success: 'fas fa-check-circle',
            infor: 'fas fa-info-circle',
            warning: 'fas fa-exclamation-circle'
        }
        const icon = icons[type]
        const delay = (duration/1000).toFixed(2)
        toast.classList.add('toast', `toast--${type}`)
        toast.style.animation = `animation: slideInLeft ease 0.3s, fadeOut linear 1s ${delay}s forwards;`
        toast.innerHTML = `
            <div class="toast__icon">
                <i class="${icon}"></i>
            </div >
            <div class="toast__body">
                <h3 class="toast__title">
                    ${title}
                </h3>
                <p class="toast__msg">${message}</p>
            </div>
            <div class="toast__close">
                <i class="fas fa-xmark"></i>
            </div>
        `
        main.appendChild(toast)
    }
}