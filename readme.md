Expo, React Native, TypeScript, Redux Toolkit ve Tailwind CSS kullanarak geliştirdim.

Webview kullanmadım. Bütün bileşenleri React Native ve Tailwind kullanarak oluşturdum.

İstenildiği gibi, https://testcase.myideasoft.com web sitesindeki ana sayfayı, ürün detay sayfasını ve arama sayfasını mobil uygulamaya ekledim.

Arama ekranında sonuçlarını gösterirken infinite scroll mantığını kullandım.

Admin paneline ürünler ve kategoriler için istenilen bütün özellikleri ekledim. Admin panelinde kategori ve ürünler için CRUD işlemleri yapılabiliyor.

### İstenilen Özelliklere Ekstra Olarak Eklenen Özellikler:

- Redux-persist kullanarak sepet verilerinin kalıcı olduğu bir alışveriş sepeti özelliği ve alışveriş sepeti ekranı ekledim
- Admin olarak ürün ekleme, silme ve listelemeye ek olarak ürün düzenleme özelliği ekledim

## admin-api/products API ile Alakalı Yaşadığım Sorun:

- **Kelime ile ürün arama**: Sorunsuz çalışıyor
- **Stokta durumuna göre filtreleme**: Sorunsuz çalışıyor
- **Sıralama**: Sorunsuz çalışıyor

Ancak minimum ve maksimum fiyata göre filtreleme beklendiği gibi çalışmıyor.

https://testcase.myideasoft.com/admin-api/products?maxPrice=100&s=GNY&criticalStock=1&page=1&limit=10

Yukarıdaki URL'nin yanıt olarak "price1" değeri 100 altındakileri döndermesini beklerdim ama 100 üzeri olanların dahil olduğu bir yanıt dönüyor. "criticalStock" parametresi beklendiği gibi çalışıyor.

React Native tarafında filtrelerde düzenleme olduğu zaman URL parametreleri kendini olması gerektiği gibi düzenleyecek şekilde ayarladım ve bu parametrelerin adlarını https://apidoc.ideasoft.dev/docs/api-v2/f9d9617a38df9-product-list adresindeki belirtildiği şekilde adlandırdım ama API'den beklediğim yanıtı alamadım .

## Diğer Uygulamalarım ve Web Siteleri

- **Ralness**:  
  Transform Outdoor Exercises Into Social and Competitive Game  
  [Ralness Web Sitesi](https://ralness.com)  
  [Ralness TestFlight](https://testflight.apple.com/join/GAypzzEc)

  **\*Not**: 2022 Haziran ayında geliştirmeye başladım. Son üç aydır iOS ve Android tarafında beta test aşamasında. Frontend'i React Native ve TypeScript ile geliştirdim. Backend için Node.js/TypeScript kullandım ve mikroservis mimarisini tercih ettim.\*

- **Alıcılar**:  
   Ürün veya hizmet almak isteyenlerin ilan verdiği tersine alışveriş platformu  
   [Alıcılar web sitesi](https://alicilar.com)  
   [Alıcılar iOS Uygulaması](https://apps.apple.com/tr/app/al%C4%B1c%C4%B1lar/id1540652598?l=tr)  
   [Alıcılar Android Uygulaması](https://play.google.com/store/apps/details?id=com.alicilar.amobile)  
  **\*Not**: React Native ile geliştirdim. Mağaza işlemleri ve Node.js backend kodlarından benim sorumlu olduğum proje.\*
