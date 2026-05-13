import { defineConfig, devices } from '@playwright/test';

/**
 * Pavan Online Trainings & SDET Pavan Reference Configuration
 */
export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000, // 30 saniye
  fullyParallel: true,
  
    // Hata durumunda 1 kez tekrar dene
    //retries: process.env.CI ? 2 : 0,
    retries: 1,
    // Testlerin sıralı çalışması için worker sayısı 1
    //workers: process.env.CI ? 1 : undefined,
    workers: 4,  //paralel mode true olursa workers 1 olursa default ayar olarak serial modeda calsir yani degisiklik olmaz.
    // workers 1 disinda olursa paralel olur.serial mode istersek false yapmaya gerek yok workers 1 olursa yeterli

    
  // Raporlama seçenekleri
  reporter: [
    ['html'],
    ['allure-playwright'],
    ['dot'],
    ['list']
  ],

  use: {
    /* Test başarısız olduğunda detayları kaydet */
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    /* Tarayıcı ayarları */
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true, // Ignore SSL errors if necessary permissions
    permissions: ['geolocation'],  // Set necessary permissions for geolocation-based tests
  },

  /* Farklı tarayıcılarda test çalıştırma */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    /*
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },*/
  ],
});