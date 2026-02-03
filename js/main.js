// JavaScript principal para todas las páginas

document.addEventListener('DOMContentLoaded', function() {
    // Menú móvil toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            if (navMenu) {
                navMenu.classList.toggle('active');
                this.querySelector('i').classList.toggle('fa-bars');
                this.querySelector('i').classList.toggle('fa-times');
            }
        });
    }

    // Sidebar (barra lateral) toggle
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    const overlaySidebar = document.getElementById('overlaySidebar');
    const closeSidebarBtn = document.querySelector('.close-sidebar');

    function openSidebar() {
        if (sidebar) sidebar.classList.add('active');
        if (overlaySidebar) overlaySidebar.classList.add('active');
    }

    function closeSidebar() {
        if (sidebar) sidebar.classList.remove('active');
        if (overlaySidebar) overlaySidebar.classList.remove('active');
    }

    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            // toggle sidebar
            if (sidebar && sidebar.classList.contains('active')) {
                closeSidebar();
                this.querySelector('i').classList.remove('fa-times');
                this.querySelector('i').classList.add('fa-bars');
            } else {
                openSidebar();
                this.querySelector('i').classList.remove('fa-bars');
                this.querySelector('i').classList.add('fa-times');
            }
        });
    }

    if (closeSidebarBtn) {
        closeSidebarBtn.addEventListener('click', closeSidebar);
    }

    if (overlaySidebar) {
        overlaySidebar.addEventListener('click', closeSidebar);
    }

    // Filter panel toggle inside header search
    const filterToggle = document.querySelectorAll('.filter-toggle');
    const filterPanels = document.querySelectorAll('.filter-panel');

    filterToggle.forEach((btn, idx) => {
        const panel = filterPanels[idx] || document.querySelector('.filter-panel');
        if (!panel) return;
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            panel.classList.toggle('active');
        });
    });

    // Cerrar paneles al hacer clic fuera
    document.addEventListener('click', () => {
        document.querySelectorAll('.filter-panel.active').forEach(p => p.classList.remove('active'));
    });

    // Evitar propagation dentro del panel
    document.querySelectorAll('.filter-panel').forEach(panel => {
        panel.addEventListener('click', (e) => e.stopPropagation());
    });

    // Aplicar filtros desde el panel del header
    document.querySelectorAll('.apply-filters').forEach(btn => {
        btn.addEventListener('click', (e) => {
            // cerrar panel
            const panel = e.target.closest('.filter-panel');
            if (panel) panel.classList.remove('active');
            applyFilters();
        });
    });
    
    // Cerrar menú al hacer clic en enlace (soporta nav-menu y sidebar)
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (menuToggle) {
                    menuToggle.querySelector('i').classList.toggle('fa-bars');
                    menuToggle.querySelector('i').classList.toggle('fa-times');
                }
            }

            if (sidebar && sidebar.classList.contains('active')) {
                closeSidebar();
                if (sidebarToggle) {
                    const icon = sidebarToggle.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            }
        });
    });
    
    // Funcionalidad de FAQ (Preguntas Frecuentes)
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            faqItem.classList.toggle('active');
        });
    });
    
    // Funcionalidad de botones de ayuda
    const helpButtons = document.querySelectorAll('.btn-help');
    helpButtons.forEach(button => {
        button.addEventListener('click', function() {
            const contactType = this.getAttribute('data-contact');
            switch(contactType) {
                case 'email':
                    window.location.href = 'mailto:soporte@gmail.com';
                    break;
                case 'phone':
                    window.location.href = 'tel:+526954569631';
                    break;
                case 'chat':
                    alert('Iniciando chat en vivo... (Simulación)');
                    break;
            }
        });
    });
    
    // Formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validación simple
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (name && email && message) {
                alert('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.');
                contactForm.reset();
            } else {
                alert('Por favor, completa todos los campos obligatorios (*)');
            }
        });
    }
    
    // Funcionalidad del carrito
    const cartModal = document.getElementById('cartModal');
    const closeCart = document.querySelector('.close-cart');
    const cartCount = document.querySelectorAll('.cart-count');
    
    // Cargar carrito del localStorage o inicializar vacío
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    // Actualizar contador al cargar la página
    cartCount.forEach(counter => {
        counter.textContent = cartItems.length;
    });
    
    // Botones "Añadir al carrito"
    document.querySelectorAll('.btn-add-cart').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;
            
            // Agregar producto al carrito
            cartItems.push({
                name: productName,
                price: productPrice
            });
            
            // Guardar en localStorage
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            
            // Actualizar contador en todos los lugares
            cartCount.forEach(counter => {
                counter.textContent = cartItems.length;
            });
            
            console.log('Producto agregado:', {name: productName, price: productPrice, totalItems: cartItems.length});
            
            // Mostrar feedback
            this.textContent = '✓ Añadido';
            this.style.backgroundColor = 'var(--success)';
            
            setTimeout(() => {
                this.textContent = 'Añadir al carrito';
                this.style.backgroundColor = '';
            }, 2000);
        });
    });
    
    // Abrir modal del carrito desde cualquier botón .btn-cart
    document.querySelectorAll('.btn-cart').forEach(button => {
        button.addEventListener('click', function(e) {
            // Sincronizar cartItems con localStorage
            cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            
            console.log('Carrito clickeado. Items en localStorage:', cartItems.length, cartItems);
            if (cartModal) {
                cartModal.style.display = 'flex';
                setTimeout(() => {
                    cartModal.classList.add('active');
                }, 10);
                updateCartDisplay();
                console.log('Carrito abierto. Mostrando', cartItems.length, 'productos');
            } else {
                console.error('cartModal no existe');
            }
        });
    });
    
    // Función para actualizar la vista del carrito
    function updateCartDisplay() {
        const cartItemsDiv = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');
        
        // IMPORTANTE: Leer siempre del localStorage, no de la variable local
        let currentCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        
        console.log('updateCartDisplay llamado. CartItems en localStorage:', currentCartItems);
        
        if (!cartItemsDiv) {
            console.error('cartItemsDiv no encontrado');
            return;
        }
        
        if (currentCartItems.length === 0) {
            cartItemsDiv.innerHTML = '<p class="empty-cart">Tu carrito está vacío</p>';
            if (cartTotal) cartTotal.textContent = '$0.00';
            console.log('Carrito vacío');
            return;
        }
        
        let total = 0;
        let html = '';
        
        currentCartItems.forEach((item, index) => {
            const price = parseFloat(item.price.replace('$', '').replace(',', ''));
            total += price;
            
            html += `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <p class="cart-item-name">${item.name}</p>
                        <p class="cart-item-price">${item.price}</p>
                    </div>
                    <button class="btn-remove-cart" data-index="${index}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
        });
        
        cartItemsDiv.innerHTML = html;
        if (cartTotal) cartTotal.textContent = '$' + total.toFixed(2);
        
        console.log('Carrito actualizado. Total:', total, 'Productos:', currentCartItems.length);
        
        // Agregar eventos a los botones de eliminar
        document.querySelectorAll('.btn-remove-cart').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                console.log('Eliminando producto en índice:', index);
                currentCartItems.splice(index, 1);
                
                // Guardar en localStorage
                localStorage.setItem('cartItems', JSON.stringify(currentCartItems));
                
                // Actualizar variable global y contadores
                cartItems = currentCartItems;
                cartCount.forEach(counter => {
                    counter.textContent = cartItems.length;
                });
                updateCartDisplay();
            });
        });
    }
    
    if (closeCart) {
        closeCart.addEventListener('click', (e) => {
            if (cartModal) {
                cartModal.classList.remove('active');
                setTimeout(() => {
                    cartModal.style.display = 'none';
                }, 300);
            }
        });
    }
    
    // Cerrar modal al hacer clic fuera
    if (cartModal) {
        cartModal.addEventListener('click', (e) => {
            if (e.target === cartModal) {
                cartModal.classList.remove('active');
                setTimeout(() => {
                    cartModal.style.display = 'none';
                }, 300);
            }
        });
    }
    
    // Buscador de productos
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const products = document.querySelectorAll('.product-card');
            let visibleCount = 0;
            
            products.forEach(product => {
                const productName = product.querySelector('h3').textContent.toLowerCase();
                const productDesc = product.querySelector('p').textContent.toLowerCase();
                
                if (productName.includes(searchTerm) || productDesc.includes(searchTerm)) {
                    product.style.display = 'block';
                    visibleCount++;
                } else {
                    product.style.display = 'none';
                }
            });
            
            // Si no hay productos visibles y hay búsqueda activa, mostrar mensaje
            const productsContainer = document.getElementById('products-container');
            if (searchTerm && visibleCount === 0 && productsContainer) {
                productsContainer.innerHTML = '<p class="no-products">No se encontraron productos. <a href="../html/404.html">Ver página de error</a></p>';
            }
        });
        
        // Manejador para el botón de búsqueda (Enter o click en el botón)
        const searchButton = document.querySelector('.btn-search');
        if (searchButton) {
            searchButton.addEventListener('click', function() {
                const searchTerm = searchInput.value.toLowerCase().trim();
                if (!searchTerm) {
                    alert('Por favor ingresa un término de búsqueda');
                    return;
                }
                
                const products = document.querySelectorAll('.product-card');
                let hasResults = false;
                
                products.forEach(product => {
                    const productName = product.querySelector('h3').textContent.toLowerCase();
                    const productDesc = product.querySelector('p').textContent.toLowerCase();
                    
                    if (productName.includes(searchTerm) || productDesc.includes(searchTerm)) {
                        hasResults = true;
                    }
                });
                
                // Si no hay resultados, redirigir a 404.html
                if (!hasResults) {
                    window.location.href = '../html/404.html';
                }
            });
        }
        
        // Detectar Enter en el input de búsqueda
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value.toLowerCase().trim();
                if (!searchTerm) {
                    alert('Por favor ingresa un término de búsqueda');
                    return;
                }
                
                const products = document.querySelectorAll('.product-card');
                let hasResults = false;
                
                products.forEach(product => {
                    const productName = product.querySelector('h3').textContent.toLowerCase();
                    const productDesc = product.querySelector('p').textContent.toLowerCase();
                    
                    if (productName.includes(searchTerm) || productDesc.includes(searchTerm)) {
                        hasResults = true;
                    }
                });
                
                // Si no hay resultados, redirigir a 404.html
                if (!hasResults) {
                    window.location.href = '../html/404.html';
                }
            }
        });
    }
    
    // Filtros de productos
    const filters = document.querySelectorAll('.filter-group select');
    filters.forEach(filter => {
        filter.addEventListener('change', applyFilters);
    });
    
    function applyFilters() {
        // Leer filtros desde header (si existen) o desde los controles de página
        const headerCategory = document.getElementById('filter-category');
        const headerPrice = document.getElementById('filter-price');
        const headerSort = document.getElementById('filter-sort');

        const category = headerCategory ? headerCategory.value : (document.getElementById('category') ? document.getElementById('category').value : 'all');
        const price = headerPrice ? headerPrice.value : (document.getElementById('price') ? document.getElementById('price').value : 'all');
        const sort = headerSort ? headerSort.value : (document.getElementById('sort') ? document.getElementById('sort').value : 'popular');

        console.log('Aplicando filtros...', { category, price, sort });

        // Si estamos en la página de productos, filtrar los .product-card visibles
        const products = document.querySelectorAll('.product-card');
        if (products.length === 0) return;

        products.forEach(product => {
            // criterios simples: usar atributos data-category y data-price si están presentes
            const pCategory = product.getAttribute('data-category') || '';
            const pPriceStr = (product.querySelector('.product-price') ? product.querySelector('.product-price').textContent.replace(/[^0-9.]/g,'') : '') || '0';
            const pPrice = parseFloat(pPriceStr) || 0;

            let matches = true;
            if (category && category !== 'all' && pCategory !== category) matches = false;
            if (price && price !== 'all') {
                const max = parseFloat(price);
                if (!isNaN(max) && pPrice > max) matches = false;
            }

            product.style.display = matches ? 'block' : 'none';
        });

        // Nota: el orden (sort) no reordena DOM aquí; para implementación completa se necesitaría re-renderizar.
    }
    
    // Botón "Proceder al Pago"
    const checkoutBtn = document.querySelector('.btn-checkout');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (cartItems.length === 0) {
                alert('Tu carrito está vacío. Agrega productos antes de proceder al pago.');
                return;
            }
            
            // Guardar total para mostrar en la página de pago
            const total = cartItems.reduce((sum, item) => {
                const price = parseFloat(item.price.replace('$', '').replace(',', ''));
                return sum + price;
            }, 0);
            
            localStorage.setItem('orderTotal', total.toFixed(2));
            localStorage.setItem('orderItems', cartItems.length);
            
            // Simular redirección a página de pago
            console.log('Proceder al pago. Total:', total, 'Items:', cartItems.length);
            alert('Redirigiendo a la página de pago... Total: $' + total.toFixed(2));
            
            // Limpiar carrito después del pago
            cartItems = [];
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            cartCount.forEach(counter => {
                counter.textContent = '0';
            });
            
            // Cerrar modal
            if (cartModal) {
                cartModal.classList.remove('active');
                setTimeout(() => {
                    cartModal.style.display = 'none';
                }, 300);
            }
            
            // Redirigir
            window.location.href = '../html/pago-error.html';
        });
    }
    
    // Animaciones al hacer scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.product-card, .help-card, .value-item');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Inicializar animaciones
    document.querySelectorAll('.product-card, .help-card, .value-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Ejecutar al cargar

    // Breadcrumb minimalista: genera ruta a partir de la URL
    function generateBreadcrumb() {
        const container = document.getElementById('breadcrumb');
        if (!container) return;

        const nameMap = {
            'index.html': 'Inicio',
            '': 'Inicio',
            'productos.html': 'Productos',
            'sobre-nosotros.html': 'Sobre Nosotros',
            'ayuda.html': 'Ayuda',
            'contacto.html': 'Contacto'
        };

        // Obtener la última parte del path
        let path = window.location.pathname.split('/').pop();
        if (!path) path = 'index.html';

        // Crear enlace a inicio
        const homeLink = document.createElement('a');
        homeLink.href = 'index.html';
        homeLink.textContent = nameMap['index.html'];
        container.appendChild(homeLink);

        // Si no es la página inicio, añadir separador y nombre actual
        if (path !== 'index.html') {
            const sep = document.createElement('span');
            sep.className = 'sep';
            sep.textContent = '›';
            container.appendChild(sep);

            const current = document.createElement('span');
            current.className = 'current';
            current.textContent = nameMap[path] || decodeURIComponent(path.replace('.html',''));
            container.appendChild(current);
        }
    }

    generateBreadcrumb();
});
// ====================
// FUNCIONALIDAD PARA JERARQUÍA DE CONTENIDOS
// ====================

// Toggle para mostrar/ocultar detalles de producto (Nivel 3)
function toggleDetails(button) {
    const detailsContent = button.nextElementSibling;
    const icon = button.querySelector('i');
    
    if (detailsContent.style.display === 'none' || !detailsContent.style.display) {
        detailsContent.style.display = 'block';
        detailsContent.classList.add('active');
        icon.classList.remove('fa-chevron-down');
        icon.classList.add('fa-chevron-up');
        button.innerHTML = '<i class="fas fa-chevron-up"></i> Ver menos detalles';
    } else {
        detailsContent.style.display = 'none';
        detailsContent.classList.remove('active');
        icon.classList.remove('fa-chevron-up');
        icon.classList.add('fa-chevron-down');
        button.innerHTML = '<i class="fas fa-chevron-down"></i> Ver más detalles';
    }
}

// Inicializar botones de detalles en productos
function initializeDetailButtons() {
    document.querySelectorAll('.btn-view-details').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            toggleDetails(this);
        });
    });
}

// Sistema de comparación de productos
function initializeCompareButtons() {
    let compareList = JSON.parse(localStorage.getItem('compareList')) || [];
    
    document.querySelectorAll('.btn-compare').forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productId = productCard.querySelector('.btn-add-cart').getAttribute('data-id');
            const productName = productCard.querySelector('.product-title').textContent;
            
            if (!compareList.some(item => item.id === productId)) {
                if (compareList.length >= 3) {
                    alert('Solo puedes comparar hasta 3 productos a la vez');
                    return;
                }
                
                compareList.push({
                    id: productId,
                    name: productName
                });
                
                localStorage.setItem('compareList', JSON.stringify(compareList));
                this.innerHTML = '<i class="fas fa-check"></i> En comparación';
                this.style.backgroundColor = 'var(--success)';
                this.style.color = 'white';
                
                updateCompareBadge();
            }
        });
    });
}

// Actualizar badge de comparación
function updateCompareBadge() {
    const compareList = JSON.parse(localStorage.getItem('compareList')) || [];
    let badge = document.querySelector('.compare-badge');
    
    if (!badge) {
        badge = document.createElement('span');
        badge.className = 'compare-badge';
        document.querySelector('.nav-right').prepend(badge);
    }
    
    if (compareList.length > 0) {
        badge.textContent = compareList.length;
        badge.style.display = 'flex';
    } else {
        badge.style.display = 'none';
    }
}

// Sistema de wishlist
function initializeWishlistButtons() {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    document.querySelectorAll('.btn-wishlist').forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productId = productCard.querySelector('.btn-add-cart').getAttribute('data-id');
            const productName = productCard.querySelector('.product-title').textContent;
            
            const index = wishlist.findIndex(item => item.id === productId);
            
            if (index === -1) {
                // Añadir a wishlist
                wishlist.push({
                    id: productId,
                    name: productName,
                    date: new Date().toISOString()
                });
                
                this.innerHTML = '<i class="fas fa-heart"></i> Guardado';
                this.style.color = 'var(--accent)';
                showNotification('Producto añadido a tu lista de deseos');
            } else {
                // Remover de wishlist
                wishlist.splice(index, 1);
                this.innerHTML = '<i class="far fa-heart"></i> Guardar';
                this.style.color = '';
                showNotification('Producto removido de tu lista de deseos');
            }
            
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            updateWishlistBadge();
        });
    });
}

// Actualizar badge de wishlist
function updateWishlistBadge() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    let badge = document.querySelector('.wishlist-badge');
    
    if (!badge) {
        badge = document.createElement('span');
        badge.className = 'wishlist-badge';
        document.querySelector('.nav-right').prepend(badge);
    }
    
    if (wishlist.length > 0) {
        badge.textContent = wishlist.length;
        badge.style.display = 'flex';
    } else {
        badge.style.display = 'none';
    }
}

// Notificación flotante
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Mostrar
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Ocultar después de 3 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// CSS para notificaciones y badges
const style = document.createElement('style');
style.textContent = `
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    padding: 1rem 1.5rem;
    border-radius: var(--radius);
    box-shadow: var(--shadow-lg);
    display: flex;
    align-items: center;
    gap: 0.75rem;
    z-index: 9999;
    transform: translateX(100%);
    opacity: 0;
    transition: all 0.3s ease;
}

.notification.show {
    transform: translateX(0);
    opacity: 1;
}

.notification.success {
    border-left: 4px solid var(--success);
}

.notification i {
    font-size: 1.2rem;
}

.notification.success i {
    color: var(--success);
}

.compare-badge,
.wishlist-badge {
    position: absolute;
    top: -5px;
    right: -5px;
    background-color: var(--accent);
    color: white;
    font-size: 0.7rem;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    display: none;
    align-items: center;
    justify-content: center;
    font-weight: bold;
}

.nav-right {
    position: relative;
}

.nav-right > a,
.nav-right > button {
    position: relative;
}
`;
document.head.appendChild(style);

// Inicializar todo al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    initializeDetailButtons();
    initializeCompareButtons();
    initializeWishlistButtons();
    updateCompareBadge();
    updateWishlistBadge();
    
    // Añadir badges al HTML si no existen
    if (!document.querySelector('.compare-badge')) {
        const compareBadge = document.createElement('span');
        compareBadge.className = 'compare-badge';
        document.querySelector('.nav-right').prepend(compareBadge);
    }
    
    if (!document.querySelector('.wishlist-badge')) {
        const wishlistBadge = document.createElement('span');
        wishlistBadge.className = 'wishlist-badge';
        document.querySelector('.nav-right').prepend(wishlistBadge);
    }
});