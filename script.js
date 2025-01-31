document.addEventListener("DOMContentLoaded", function () {
    const textElement = document.getElementById("typing-text");
    const texts = ["Hola, soy Alex", "Bienvenido !!"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = texts[textIndex];
        if (isDeleting) {
            textElement.innerHTML = currentText.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(type, 500); // Pausa antes de comenzar a escribir el siguiente texto
                return;
            }
        } else {
            textElement.innerHTML = currentText.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === currentText.length) {
                isDeleting = true;
                setTimeout(type, 2000); // Pausa antes de comenzar a borrar
                return;
            }
        }
        setTimeout(type, isDeleting ? 50 : 100);
    }

    type();



    // Sistema de Menú
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    const menuItems = document.querySelectorAll('nav a');
    const body = document.querySelector('body');

    // Controlador del Menú Hamburguesa
    function handleMenu() {
        if (window.innerWidth <= 768) {
            menuToggle.style.display = 'flex';
            navMenu.classList.remove('active');
        } else {
            menuToggle.style.display = 'none';
            navMenu.classList.remove('active');
        }
    }

    // Event Listeners
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
        menuToggle.style.background = navMenu.classList.contains('active') 
            ? 'rgba(0, 255, 0, 0.3)' 
            : 'rgba(0, 255, 0, 0.1)';
    });

    // Cerrar menú al hacer click fuera (Mobile)
    body.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            !e.target.closest('nav ul') && 
            !e.target.closest('.menu-toggle')) {
            navMenu.classList.remove('active');
            menuToggle.textContent = '☰';
            menuToggle.style.background = 'rgba(0, 255, 0, 0.1)';
        }
    });

    // Cerrar menú al seleccionar opción
    menuItems.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                menuToggle.textContent = '☰';
                menuToggle.style.background = 'rgba(0, 255, 0, 0.1)';
            }
        });
    });

    // Control de Resize
    window.addEventListener('resize', handleMenu);
    handleMenu(); // Inicializar al cargar

    // Efectos Hover para Desktop
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768) {
                item.style.transform = 'scale(1.1) translateY(-2px)';
                item.style.filter = 'drop-shadow(0 0 8px #00FF00)';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768) {
                item.style.transform = 'scale(1)';
                item.style.filter = 'none';
            }
        });
    });



});