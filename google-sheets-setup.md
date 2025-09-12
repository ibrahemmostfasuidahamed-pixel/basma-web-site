# ربط فورم التواصل بجوجل شيت

## الخطوات المطلوبة:

### 1. إنشاء جوجل شيت جديد
- اذهب إلى [Google Sheets](https://sheets.google.com)
- أنشئ شيت جديد واسمه "بيانات التواصل - بصمة"
- في الصف الأول اكتب العناوين التالية:
  - A1: الاسم
  - B1: الدولة
  - C1: رقم الهاتف
  - D1: الجنس
  - E1: نوع الجهاز
  - F1: تاريخ الإرسال

### 2. إنشاء Google Apps Script
- في الشيت، اذهب إلى Extensions > Apps Script
- احذف الكود الموجود والصق هذا الكود:

```javascript
function doPost(e) {
  try {
    // فتح الشيت
    var sheet = SpreadsheetApp.getActiveSheet();
    
    // تحويل البيانات من JSON
    var data = JSON.parse(e.postData.contents);
    
    // إضافة صف جديد بالبيانات
    sheet.appendRow([
      data.name,
      data.country,
      data.phone,
      data.gender,
      data.device,
      data.timestamp
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({"result": "success"}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({"result": "error", "error": error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### 3. نشر الـ Script
- اضغط على "Deploy" > "New deployment"
- اختر Type: "Web app"
- Execute as: "Me"
- Who has access: "Anyone"
- اضغط "Deploy"
- انسخ الـ URL الذي سيظهر

### 4. تحديث الكود في الموقع
- في ملف `script.js` في السطر 238
- استبدل `YOUR_SCRIPT_ID` بالـ URL الذي نسخته
- مثال:
```javascript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx.../exec';
```

## ملاحظات مهمة:
- تأكد من أن الشيت مشارك مع الإيميل الذي أنشأت به الـ Script
- قد يستغرق النشر بضع دقائق ليعمل
- يمكنك اختبار الفورم بعد التحديث

## البيانات التي ستُحفظ:
- الاسم الرباعي
- كود الدولة ورقم الهاتف
- الجنس (ذكر/أنثى)
- نوع الجهاز (كمبيوتر/لاب توب)
- تاريخ ووقت الإرسال
