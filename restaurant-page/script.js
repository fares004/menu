// تحديد العناصر من صفحة الويب باستخدام selectores
let menu = document.querySelector('#menu-bars'); // تحديد عنصر القائمة
let navbar = document.querySelector('.navbar'); // تحديد عنصر شريط التنقل

// عند النقر على عنصر القائمة، قم بتبديل الصنفين 'fa-times' و 'active'
menu.onclick = () => {
   menu.classList.toggle('fa-times'); // تبديل الصنف 'fa-times' لتغيير شكل أيقونة القائمة
   navbar.classList.toggle('active'); // تبديل الصنف 'active' لعرض أو إخفاء شريط التنقل
}

/* Search */

// عندما يتم التمرير على الصفحة (scroll)، قم بإزالة الأصناف 'fa-times' و 'active'
window.onscroll = () => {
    menu.classList.remove('fa-times'); // إزالة الصنف 'fa-times' عند التمرير
    navbar.classList.remove('active'); // إزالة الصنف 'active' عند التمرير
}

// عند النقر على أيقونة البحث، قم بتبديل الصنف 'active' في نموذج البحث
document.querySelector('#search-icon').onclick = () => {
    document.querySelector('#search-form').classList.toggle('active'); // عرض أو إخفاء نموذج البحث
}

// عند النقر على زر الإغلاق في نموذج البحث، قم بإزالة الصنف 'active'
document.querySelector('#close').onclick = () => {
    document.querySelector('#search-form').classList.remove('active'); // إخفاء نموذج البحث
}

/* مساحة كتابة الرأي */

// الحصول على العناصر
const submitButton = document.getElementById('submitReview');
const reviewText = document.getElementById('reviewText');

// إضافة مستمع للحدث click على الزر
submitButton.addEventListener('click', function() {
    // مسح محتوى الـ textarea
    reviewText.value = '';
});