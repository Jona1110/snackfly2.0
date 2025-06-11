# Instrucciones de Uso - Snackfly Website Mejorada

## 📁 Estructura de Archivos

```
snackfly_website/
├── index.html              # Página principal
├── estilos.css             # Estilos CSS
├── script.js               # JavaScript funcional
├── imagenes/               # Carpeta de imágenes
│   ├── logo.png
│   ├── Foto_1.jpg
│   ├── Foto_2.jpg
│   ├── Foto_3.jpg
│   └── Foto_4.jpg
├── MEJORAS_IMPLEMENTADAS.md # Resumen de mejoras
├── INSTRUCCIONES.md        # Este archivo
└── todo.md                 # Lista de tareas completadas
```

## 🚀 Cómo Usar la Nueva Página Web

### 1. Subir Archivos al Servidor
- Sube todos los archivos a tu servidor web o hosting
- Mantén la estructura de carpetas intacta
- Asegúrate de que la carpeta `imagenes/` esté en el mismo nivel que `index.html`

### 2. Configurar Enlaces de WhatsApp
El número de WhatsApp está configurado como `3322961969`. Si necesitas cambiarlo:
- Abre `index.html` y busca `phone=3322961969`
- Abre `script.js` y busca `phone=3322961969`
- Reemplaza con tu número (incluye código de país sin +)

### 3. Personalizar Información
Para actualizar información del negocio:
- **Horarios**: Modifica la sección "Horarios de Atención" en `index.html`
- **Dirección**: Actualiza la sección "¿Dónde Estamos?" en `index.html`
- **Redes sociales**: Cambia los enlaces en la sección "Contacto"
- **Productos**: Agrega/modifica productos en la sección "Nuestros Snacks"

### 4. Agregar Nuevos Productos
Para agregar un producto nuevo:

1. **Agrega la imagen** a la carpeta `imagenes/`
2. **Copia este código** en la sección de productos:

```html
<article class="producto animate__animated animate__fadeInUp" data-category="CATEGORIA">
    <div class="producto-image">
        <img src="imagenes/NOMBRE_IMAGEN.jpg" alt="Nombre del Producto">
        <div class="producto-overlay">
            <button class="btn-quick-view" data-producto="id_producto">
                <i class="fas fa-eye"></i> Vista Rápida
            </button>
        </div>
    </div>
    <div class="producto-info">
        <h3>Nombre del Producto</h3>
        <p>Descripción del producto...</p>
        <div class="producto-price">$PRECIO.00</div>
        <div class="producto-actions">
            <div class="quantity-selector">
                <button class="qty-btn minus">-</button>
                <input type="number" value="1" min="1" class="qty-input">
                <button class="qty-btn plus">+</button>
            </div>
            <button class="btn-comprar" data-nombre="Nombre del Producto" data-precio="PRECIO">
                <i class="fas fa-cart-plus"></i> Agregar
            </button>
        </div>
    </div>
</article>
```

3. **Agrega los datos del producto** en `script.js` en la sección `productData`:

```javascript
'id_producto': {
    name: 'Nombre del Producto',
    price: PRECIO,
    image: 'imagenes/NOMBRE_IMAGEN.jpg',
    description: 'Descripción detallada del producto...'
}
```

### 5. Cambiar Colores y Estilos
Los colores principales están definidos en `estilos.css`:
```css
:root {
    --primary-color: #ff6f61;    /* Color principal */
    --secondary-color: #ff8a80;  /* Color secundario */
    --accent-color: #ffa726;     /* Color de acento */
}
```

## 🎨 Funcionalidades Principales

### Carrito de Compras
- Los clientes pueden agregar productos
- Seleccionar cantidad deseada
- Ver resumen del pedido
- Finalizar compra por WhatsApp

### Filtros de Productos
- **Todos**: Muestra todos los productos
- **Frutas**: Solo productos de frutas
- **Verduras**: Solo productos de verduras  
- **Dulces**: Solo productos dulces

### Modo Oscuro/Claro
- Botón flotante en la esquina inferior derecha
- Guarda la preferencia del usuario
- Cambia automáticamente todos los colores

### Vista Rápida
- Click en "Vista Rápida" sobre cualquier producto
- Muestra información detallada en modal
- Permite agregar al carrito desde el modal

## 📱 Responsividad

La página se adapta automáticamente a:
- **Móviles** (hasta 480px)
- **Tablets** (481px - 768px)
- **Desktop** (769px en adelante)

## 🔧 Mantenimiento

### Actualizar Precios
1. Cambia el precio en el HTML (`data-precio="NUEVO_PRECIO"`)
2. Actualiza el precio mostrado (`$NUEVO_PRECIO.00`)
3. Si usas vista rápida, actualiza también en `script.js`

### Cambiar Imágenes
1. Reemplaza la imagen en la carpeta `imagenes/`
2. Mantén el mismo nombre o actualiza las referencias en HTML

### Modificar Textos
- Todos los textos están en `index.html`
- Busca la sección correspondiente y modifica el contenido

## 🆘 Solución de Problemas

### Las imágenes no se ven
- Verifica que la carpeta `imagenes/` esté en el lugar correcto
- Revisa que los nombres de archivo coincidan exactamente

### El carrito no funciona
- Asegúrate de que `script.js` esté cargando correctamente
- Verifica que no haya errores en la consola del navegador

### WhatsApp no abre
- Confirma que el número esté en formato correcto (sin + ni espacios)
- Verifica que los enlaces de WhatsApp estén actualizados

## 📞 Soporte

Si necesitas ayuda adicional:
1. Revisa la consola del navegador para errores
2. Verifica que todos los archivos estén subidos correctamente
3. Confirma que la estructura de carpetas sea la correcta

¡Tu nueva página web de Snackfly está lista para recibir pedidos! 🎉

