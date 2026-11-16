# Görev Panosu

Görevlerini ekleyip düzenleyebildiğin, tamamladıkça işaretleyebildiğin basit bir görev yönetimi uygulaması. Veriler tarayıcının LocalStorage alanında tutulur, sayfa yenilense de kaybolmaz.

## Özellikler

- Görev ekleme (başlık, açıklama, öncelik, son tarih)
- Görevleri listeleme, arama ve filtreleme (tümü / aktif / tamamlanan)
- Görev düzenleme
- Görev silme
- Tamamlandı olarak işaretleme, geciken görevlerin vurgulanması

## Kullanılan teknolojiler

- React
- TypeScript
- Vite
- Tailwind CSS
- LocalStorage

## Klasör yapısı

```
src/
  components/   Arayüz bileşenleri (form, liste, görev kartı, filtre, düzenleme penceresi)
  pages/        Sayfalar (HomePage)
  interfaces/   Tip tanımları (Task)
  hooks/        Görev verisini yöneten useTasks
```

## Kurulum ve çalıştırma

```bash
git clone <repo-adresi>
cd todo-web-app
npm install
npm run dev
```

Tarayıcıda terminalde yazan adresi aç (genelde http://localhost:5173).

Yayın için derleme:

```bash
npm run build
```

Derlenen dosyalar `dist` klasörüne çıkar.
