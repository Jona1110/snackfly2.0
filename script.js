document.addEventListener("DOMContentLoaded", function () {
    console.log("Snackfly - Página cargada correctamente");

    // Variables globales
    const carrito = [];
    let currentFilter = 'all';

    // Elementos del DOM
    const botonesComprar = document.querySelectorAll('.btn-comprar');
    const listaCarrito = document.getElementById("lista-carrito");
    const totalCarrito = document.getElementById("total-carrito");
    const subtotalCarrito = document.getElementById("subtotal-carrito");
    const finalizarCompraBtn = document.getElementById("finalizar-compra");
    const toggleModo = document.getElementById('toggle-modo');
    const body = document.body;
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // Inicialización
    init();

    function init() {
        setupEventListeners();
        setupModoOscuro();
        setupNavigation();
        setupProductFilters();
        setupQuantitySelectors();
        setupFAQ();
        setupModal();
        setupScrollAnimations();
        actualizarCarrito();
    }

    function setupEventListeners() {
        // Botones de compra
        botonesComprar.forEach(boton => {
            boton.addEventListener('click', handleAgregarAlCarrito);
        });

        // Finalizar compra
        if (finalizarCompraBtn) {
            finalizarCompraBtn.addEventListener("click", finalizarCompra);
        }

        // Smooth scroll para enlaces internos
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    function setupModoOscuro() {
        // Verificar preferencia guardada
        if (localStorage.getItem('modo-oscuro') === 'activado') {
            body.classList.add('modo-oscuro');
            if (toggleModo) {
                toggleModo.innerHTML = '<i class="fas fa-sun"></i>';
            }
        }

        // Toggle modo oscuro
        if (toggleModo) {
            toggleModo.addEventListener('click', () => {
                body.classList.toggle('modo-oscuro');
                
                if (body.classList.contains('modo-oscuro')) {
                    localStorage.setItem('modo-oscuro', 'activado');
                    toggleModo.innerHTML = '<i class="fas fa-sun"></i>';
                } else {
                    localStorage.setItem('modo-oscuro', 'desactivado');
                    toggleModo.innerHTML = '<i class="fas fa-moon"></i>';
                }
            });
        }
    }

    function setupNavigation() {
        // Menú hamburguesa
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                hamburger.classList.toggle('active');
            });

            // Cerrar menú al hacer click en un enlace
            navMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                });
            });
        }

        // Navbar transparente en scroll
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                if (window.scrollY > 100) {
                    navbar.style.background = body.classList.contains('modo-oscuro') 
                        ? 'rgba(30, 30, 30, 0.98)' 
                        : 'rgba(255, 255, 255, 0.98)';
                } else {
                    navbar.style.background = body.classList.contains('modo-oscuro') 
                        ? 'rgba(30, 30, 30, 0.95)' 
                        : 'rgba(255, 255, 255, 0.95)';
                }
            }
        });
    }

    function setupProductFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const productos = document.querySelectorAll('.producto');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Actualizar botones activos
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Obtener filtro
                const filter = button.getAttribute('data-filter');
                currentFilter = filter;

                // Filtrar productos
                productos.forEach(producto => {
                    const category = producto.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        producto.style.display = 'block';
                        producto.style.animation = 'fadeInUp 0.5s ease';
                    } else {
                        producto.style.display = 'none';
                    }
                });
            });
        });
    }

    function setupQuantitySelectors() {
        document.querySelectorAll('.quantity-selector').forEach(selector => {
            const minusBtn = selector.querySelector('.minus');
            const plusBtn = selector.querySelector('.plus');
            const input = selector.querySelector('.qty-input');

            minusBtn.addEventListener('click', () => {
                const currentValue = parseInt(input.value);
                if (currentValue > 1) {
                    input.value = currentValue - 1;
                }
            });

            plusBtn.addEventListener('click', () => {
                const currentValue = parseInt(input.value);
                input.value = currentValue + 1;
            });

            input.addEventListener('change', () => {
                if (parseInt(input.value) < 1) {
                    input.value = 1;
                }
            });
        });
    }

    function setupFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Cerrar todas las FAQ
                faqItems.forEach(faq => faq.classList.remove('active'));
                
                // Abrir la seleccionada si no estaba activa
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    }

    function setupModal() {
        const modal = document.getElementById('quick-view-modal');
        const modalClose = document.querySelector('.modal-close');
        const quickViewBtns = document.querySelectorAll('.btn-quick-view');

        // Datos de productos para el modal
        const productData = {
            'manzabox': {
                name: 'ManzaBox',
                price: 65,
                image: 'imagenes/Foto_1.jpg',
                description: 'Deliciosas manzanas preparadas con surtido de gomitas, cacahuates, Skwinkles, tajín (Receta Secreta), chamoy con un toque loco. Una explosión de sabores que te encantará.'
            },
            'pepinsnack': {
                name: 'PepinSnack',
                price: 50,
                image: 'imagenes/Foto_2.jpg',
                description: 'Pepinos frescos preparados con takis, jicama, salchicha, Skwinkles, tajín (Receta Secreta), chamoy con un sabor único. Perfecto para los amantes de lo picante.'
            },
            'cubiertuva': {
                name: 'CubiertUva',
                price: 65,
                image: 'imagenes/Foto_3.jpg',
                description: 'Uvas jugosas cubiertas con pulpa de tamarindo con tajín (Receta Secreta) y chamoy que te encantarán. Una combinación dulce y picante irresistible.'
            },
            'gomaloca': {
                name: 'GomaLoca',
                price: 40,
                image: 'imagenes/Foto_4.jpg',
                description: 'Vasito de gomitas surtidas con chamoy y tajín (Receta Secreta), perfecta combinación con sabores locamente ricos. Ideal para compartir o disfrutar solo.'
            }
        };

        // Abrir modal
        quickViewBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const productId = btn.getAttribute('data-producto');
                const product = productData[productId];
                
                if (product) {
                    document.getElementById('modal-img').src = product.image;
                    document.getElementById('modal-title').textContent = product.name;
                    document.getElementById('modal-description').textContent = product.description;
                    document.getElementById('modal-price').textContent = `$${product.price}.00`;
                    
                    const modalAddBtn = document.getElementById('modal-add-to-cart');
                    modalAddBtn.setAttribute('data-nombre', product.name);
                    modalAddBtn.setAttribute('data-precio', product.price);
                    
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        // Cerrar modal
        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }

        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal();
                }
            });
        }

        // Agregar al carrito desde modal
        const modalAddBtn = document.getElementById('modal-add-to-cart');
        if (modalAddBtn) {
            modalAddBtn.addEventListener('click', (e) => {
                handleAgregarAlCarrito(e);
                closeModal();
                showNotification('Producto agregado al carrito', 'success');
            });
        }

        function closeModal() {
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }

        // Cerrar modal con ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                closeModal();
            }
        });
    }

    function setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, observerOptions);

        // Observar elementos con animaciones
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }

    function handleAgregarAlCarrito(e) {
        const boton = e.target.closest('.btn-comprar') || e.target.closest('#modal-add-to-cart');
        const nombre = boton.getAttribute("data-nombre");
        const precio = parseInt(boton.getAttribute("data-precio"));
        
        // Obtener cantidad
        let cantidad = 1;
        const quantitySelector = boton.closest('.producto-actions, .modal-actions')?.querySelector('.qty-input');
        if (quantitySelector) {
            cantidad = parseInt(quantitySelector.value) || 1;
        }

        // Verificar si el producto ya existe en el carrito
        const productoExistente = carrito.find(item => item.nombre === nombre);
        
        if (productoExistente) {
            productoExistente.cantidad += cantidad;
        } else {
            carrito.push({ 
                nombre, 
                precio, 
                cantidad,
                id: Date.now() // ID único para cada item
            });
        }

        actualizarCarrito();
        showNotification(`${nombre} agregado al carrito`, 'success');
        
        // Resetear cantidad a 1
        if (quantitySelector) {
            quantitySelector.value = 1;
        }
    }

    function actualizarCarrito() {
        if (!listaCarrito) return;

        listaCarrito.innerHTML = "";

        if (carrito.length === 0) {
            listaCarrito.innerHTML = `
                <div class="carrito-empty">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Tu carrito está vacío</p>
                    <p>¡Agrega algunos snacks deliciosos!</p>
                </div>
            `;
        } else {
            carrito.forEach((item, index) => {
                const carritoItem = document.createElement("div");
                carritoItem.className = "carrito-item";
                carritoItem.innerHTML = `
                    <div class="carrito-item-info">
                        <h4>${item.nombre}</h4>
                        <p class="carrito-item-price">$${item.precio} x ${item.cantidad} = $${item.precio * item.cantidad}</p>
                    </div>
                    <button class="carrito-item-remove" onclick="eliminarDelCarrito(${index})" title="Eliminar producto">
                        <i class="fas fa-trash"></i>
                    </button>
                `;
                listaCarrito.appendChild(carritoItem);
            });
        }

        // Calcular totales
        const subtotal = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
        
        if (subtotalCarrito) {
            subtotalCarrito.textContent = `$${subtotal}.00`;
        }
        if (totalCarrito) {
            totalCarrito.textContent = `$${subtotal}.00`;
        }

        // Actualizar contador del carrito (si existe)
        updateCartCounter();
    }

    function updateCartCounter() {
        const cartCounter = document.querySelector('.cart-counter');
        const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
        
        if (cartCounter) {
            cartCounter.textContent = totalItems;
            cartCounter.style.display = totalItems > 0 ? 'block' : 'none';
        }
    }

    // Función global para eliminar del carrito
    window.eliminarDelCarrito = function (index) {
        const item = carrito[index];
        carrito.splice(index, 1);
        actualizarCarrito();
        showNotification(`${item.nombre} eliminado del carrito`, 'info');
    };

    function finalizarCompra() {
        if (carrito.length === 0) {
            showNotification("Tu carrito está vacío. ¡Agrega algunos productos!", 'warning');
            return;
        }

        // Crear mensaje de WhatsApp
        let mensaje = "¡Hola! 👋🏻 Quiero hacer el siguiente pedido: ✅\n\n";
        
        carrito.forEach(item => {
            mensaje += `• ${item.nombre} x${item.cantidad} - $${item.precio * item.cantidad}\n`;
        });
        
        const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
        mensaje += `\n💰 *Total: $${total}.00*\n\n`;
        mensaje += "¡Gracias por elegir Snackfly! 🍎🌶️";

        // Codificar mensaje para URL
        const mensajeCodificado = encodeURIComponent(mensaje);
        const whatsappURL = `https://api.whatsapp.com/send?phone=3349940235&text=${mensajeCodificado}`;

        // Abrir WhatsApp
        window.open(whatsappURL, "_blank");
        
        // Mostrar confirmación
        showNotification("Redirigiendo a WhatsApp para completar tu pedido...", 'success');
    }

    function showNotification(message, type = 'info') {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;

        // Estilos de la notificación
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${getNotificationColor(type)};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;

        document.body.appendChild(notification);

        // Animar entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remover después de 3 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    function getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    function getNotificationColor(type) {
        const colors = {
            success: '#27ae60',
            error: '#e74c3c',
            warning: '#f39c12',
            info: '#3498db'
        };
        return colors[type] || '#3498db';
    }

    // Efectos adicionales
    function addHoverEffects() {
        // Efecto parallax suave en el hero
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });

        // Efecto de typing en el título (opcional)
        const heroTitle = document.querySelector('.hero-text h1');
        if (heroTitle) {
            const text = heroTitle.textContent;
            heroTitle.textContent = '';
            let i = 0;
            
            const typeWriter = () => {
                if (i < text.length) {
                    heroTitle.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                }
            };
            
            // Iniciar después de un pequeño delay
            setTimeout(typeWriter, 1000);
        }
    }

    // Inicializar efectos adicionales
    addHoverEffects();

    // Lazy loading para imágenes
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Preloader (opcional)
    window.addEventListener('load', () => {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    });

    console.log("Snackfly - Todas las funcionalidades inicializadas correctamente");
});

