// محاولة جلب بيانات السلة من localStorage
// إذا لم تكن هناك بيانات مخزنة، يتم استخدام قائمة فارغة كقيمة افتراضية
// لدي 'cart' يحتوي بيانات صالحة للتعامل معها
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// إضافة عنصر إلى السلة
function addToCart(itemName, itemPrice, itemLink) {
    const existingItem = cart.find(item => item.name === itemName);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: itemName, price: itemPrice, link: itemLink, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart)); // حفظ السلة مع رابط الصورة
    showMessage(itemName);
}





// عرض الرسالة
function showMessage() {
    const messageElement = document.getElementById('message');
    messageElement.style.display = 'flex';
    setTimeout(() => {
        messageElement.style.display = 'none';
    }, 3000); // الرسالة تظهر لمدة ثلاث ثوان
}

// إغلاق الرسالة
function closeMessage() {
    const messageElement = document.getElementById('message');
    messageElement.style.display = 'none';
}

/*********************************************************************** */
// استرجاع عنصر قائمة الطعام
const menuItems = document.querySelectorAll('.menu__content');

function applyBlurEffect(searchTerm) {
    menuItems.forEach(item => {
        const itemName = item.querySelector('.menu__name').textContent.toLowerCase();
        if (itemName.includes(searchTerm)) {
            item.classList.add('highlight');
            item.classList.remove('blur');
        } else {
            item.classList.add('blur');
            item.classList.remove('highlight');
        }
    });
}

// الحصول على نتيجة البحث
const urlParams = new URLSearchParams(window.location.search);
const searchTerm = urlParams.get('search');

if (searchTerm) {
    applyBlurEffect(searchTerm.toLowerCase());
}
