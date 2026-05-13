/**
 * Test Case: Account Registration
 * 
 * Tags: @master @sanity @regression
 * 
 * Steps:
 * 1) Navigate to application URL 
 * 2) Go to 'My Account' and click 'Register'
 * 3) Fill in registration details with random data
 * 4) Agree to Privacy Policy and submit the form
 * 5) Validate the confirmation message
 */

import { test, expect} from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { RandomDataUtil } from '../utils/randomDataGenerator';
import { TestConfig } from '../test.config';


let config:TestConfig;
let homePage:HomePage;
let registrationPage:RegistrationPage;

test.beforeEach(async ({ page }) => {
    //1) Navigate to application URL 
    config = new TestConfig(); // bu insteadi(obj) create ettik test.configdeki tüm methodlari kullanabilmek icin 
    await page.goto(config.appUrl); // navigate to application URL
    homePage=new HomePage(page); // HomePage sinifinda ki contructor da belirttigim page. bu vesileyle methodlari kullanabildim
    registrationPage=new RegistrationPage(page);

});



test.afterEach(async({page})=>{
    
    await page.waitForTimeout(3000);
    await page.close();

});



test('User registration test',async({})=>{


    //2) Go to 'My Account' and click 'Register'
    homePage.clickMyAccount();
    homePage.clickRegister();

    //3) Fill in registration details with random data
    
    await registrationPage.setFirstName(RandomDataUtil.getFirstName());
    await registrationPage.setLastName(RandomDataUtil.getlastName());
    await registrationPage.setEmail(RandomDataUtil.getEmail());
    await registrationPage.setTelephone(RandomDataUtil.getPhoneNumber());

    const password = RandomDataUtil.getPassword();
    await registrationPage.setPassword(password);
    await registrationPage.setConfirmPassword(password);


    //4) Agree to Privacy Policy and submit the form  
    await registrationPage.setPrivacyPolicy();
    await registrationPage.clickContinue();


    //5)Validate the confirmation message
    const confirmationMsg=await registrationPage.getConfirmationMsg();  //page obj class icinde assertion yazmadim.assertion etmek icin variable create edip validate etcez
    expect(confirmationMsg).toContain('Your Account Has Been Created!');

    




/*
Eğer kodu şu şekilde yazsaydı:

await registrationPage.setPassword(RandomDataUtil.getPassword());
await registrationPage.setConfirmPassword(RandomDataUtil.getPassword()); // HATA RİSKİ!

Burada büyük bir risk oluşurdu. RandomDataUtil.getPassword() fonksiyonu her çağrıldığında farklı ve rastgele bir şifre üretir.

İlk satır çalıştığında şifre "Ab123" olabilir.

İkinci satır çalıştığında yeni bir rastgele şifre üretilir ve "Xy987" olabilir.

Bu durumda "Şifre" ve "Şifre Onayı" alanları birbirinden farklı olurdu ve kayıt formu hata verirdi. Testin kalırdı.

Değişkene Atamanın Avantajları
const password = RandomDataUtil.getPassword(); satırını ekleyerek şunları sağlamış oluyoruz:

Aynı Veriyi Kullanma: Rastgele üretilen o özel şifreyi bir kutuya (değişkene) koyuyoruz. Sonra hem ana şifre alanına hem de onay alanına aynı kutunun içindeki veriyi boşaltıyoruz.

Hafızada Tutma: Eğer ilerleyen adımlarda (örneğin giriş yapma aşamasında) bu şifreye tekrar ihtiyacın olursa, değişken sayesinde şifrenin ne olduğunu biliyor olursun.

Kodun Okunabilirliği: Kodun ne yaptığı daha net anlaşılır: "Önce bir şifre belirle, sonra bu şifreyi iki yere de yaz."

Diğerlerinde Neden Yapmadı?
İsim, soyisim veya telefon numarası gibi veriler formda sadece bir kez giriliyor. Bu yüzden onları bir değişkende saklamaya gerek duymadan, doğrudan üretip kutucuğa yazdırabiliyoruz. Tekrar kullanma ihtiyacı olmadığı için ekstra bir satır koda gerek kalmıyor.

Özetle: Şifre ve Şifre Onayı'nın birbiriyle aynı (match) olması gerektiği için, rastgele değeri bir kez üretip sabit bir değişkene (const) hapsediyoruz.
*/


})

