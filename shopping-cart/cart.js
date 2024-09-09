// استرجاع بيانات العربة من localStorage، أو تهيئة مصفوفة فارغة إذا لم تكن موجودة
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// دالة لتحديث عرض عربة التسوق على الصفحة
function updateCartDisplay() {
    // الحصول على العناصر من الـ DOM لتحديثها
    const cartItemsElement = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const totalItemsElement = document.getElementById('total-items');
    const emptyCartMessageElement = document.getElementById('empty-cart-message');
    const clearCartButton = document.getElementById('clear-cart-btn');
    const checkoutButton = document.getElementById('checkout-btn');

    // التحقق مما إذا كانت العربة فارغة
    if (cart.length === 0) {
        // إذا كانت العربة فارغة، قم بإخفاء العناصر ذات الصلة وتحديث الرسالة الخاصة بالعبوة الفارغة
        cartItemsElement.innerHTML = ''; 
        totalPriceElement.textContent = ''; 
        totalItemsElement.textContent = ''; 
        emptyCartMessageElement.style.display = 'block'; 
        clearCartButton.style.display = 'none';
        checkoutButton.style.display = 'none'; 
    } else {
        // إذا كانت العربة تحتوي على عناصر، قم بتحديث العرض
        emptyCartMessageElement.style.display = 'none'; 
        clearCartButton.style.display = 'block'; 
        checkoutButton.style.display = 'block'; 

        // تحديث عرض العناصر في العربة
        cartItemsElement.innerHTML = cart.map(( item, index) => {
            // تحقق من وجود الخصائص المطلوبة
            if (!item.name || !item.price ||!item.link || item.quantity === undefined) {
                console.error(`Item at index ${index} is missing required properties`, item);
                return ''; // إرجاع عنصر فارغ في حال وجود خطأ في البيانات
            }
            return `
                <div class="cart-item">
                    <!-- عرض صورة العنصر بناءً على رابط العنصر -->
                   <img src="${item.link}" alt="${item.name}" class="menu__img" >
                    <div class="info-and-quantity-and-removeitem">
                        <div>
                            <!-- عرض اسم العنصر -->
                            <h4>${item.name}</h4>
                            <!-- عرض سعر العنصر -->
                            <p>سعر: ${item.price}lt</p>
                            <!-- عرض السعر الإجمالي للعنصر -->
                            <p>سعر الإجمالي: ${item.price * item.quantity}lt</p>
                        </div>
                        <div class="quantit-and-removeitem">
                            <div class="quantity-controls">
                                <!-- أزرار لتغيير كمية العنصر -->
                                <button onclick="changeQuantity(${index}, 1)">+</button>
                                <span>${item.quantity}</span>
                                <button onclick="changeQuantity(${index}, -1)">-</button>
                            </div>
                            <!-- زر لحذف العنصر -->
                            <button onclick="removeItem(${index})">حذف</button>
                        </div>
                    </div>
                </div>
            `;
        }).join(''); // دمج جميع العناصر كـ HTML

        // حساب السعر الإجمالي للعربة
        const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        // تحديث عنصر السعر الإجمالي
        totalPriceElement.textContent = `السعر الإجمالي: ${totalPrice}lt`;
        // تحديث عنصر عدد العناصر
        totalItemsElement.textContent = `العدد الكلي: ${cart.length}`;
    }
}

// تغيير كمية العنصر
function changeQuantity(index, change) {
    if (cart[index].quantity + change < 1) {
        showMinQuantityMessage();
        return;
    }
    cart[index].quantity += change;
    if (cart[index].quantity === 0) {
        cart.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// حذف عنصر من السلة
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// حذف جميع عناصر السلة
function clearCart() {
    cart = [];
    localStorage.removeItem('cart');
    updateCartDisplay();
}

// تقديم الطلب عبر واتساب
function checkout() {
    const message = cart.map(item => `${item.name}: ${item.quantity} x ${item.price}lt`).join('\n') + 
    `\n\n-------\n\nالمبلغ الإجمالي: ${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)}lt\nعدد الوجبات المختلفة: ${cart.length}`;
    const phoneNumber = '12232131208'; // الرقم بتنسيق دولي بدون رموز
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// عرض رسالة الكمية الأدنى
function showMinQuantityMessage() {
    const messageElement = document.getElementById('min-quantity-message');
    messageElement.style.display = 'flex';
    setTimeout(() => {
        messageElement.style.display = 'none';
    }, 3000);
}

// إغلاق رسالة الكمية الأدنى
function closeMessage() {
    const messageElement = document.getElementById('min-quantity-message');
    messageElement.style.display = 'none';
}

// تحميل البيانات عند فتح الصفحة
document.addEventListener('DOMContentLoaded', updateCartDisplay);
