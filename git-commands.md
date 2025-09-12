# أوامر Git للحفظ التلقائي

## عند عمل تعديلات جديدة:

```bash
# إضافة جميع التغييرات
git add .

# عمل commit مع وصف التغيير
git commit -m "وصف التغيير هنا"

# رفع التغييرات على GitHub
git push
```

## أمثلة على رسائل الـ commit:

```bash
git commit -m "تحديث التصميم الخاص بالفوتر"
git commit -m "إضافة ميزة جديدة للفورم"
git commit -m "إصلاح مشكلة في التصميم المتجاوب"
git commit -m "تحسين الأداء والسرعة"
```

## للتحقق من حالة الملفات:

```bash
# معرفة الملفات المتغيرة
git status

# معرفة التغييرات التفصيلية
git diff

# معرفة تاريخ الـ commits
git log --oneline
```

## في حالة المشاكل:

```bash
# إلغاء التغييرات غير المحفوظة
git checkout -- .

# العودة لآخر commit
git reset --hard HEAD
```
