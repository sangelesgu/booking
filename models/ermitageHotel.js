const puppeteer = require('puppeteer');


const getDataFromErmitage = async () => {

  const browser = await puppeteer.launch();

  const page = await browser.newPage();
  await page.goto('https://www.petitermitage.com/');
  await page.waitForTimeout(1000);
  await page.click('.css-nkm7jc');

  await page.waitForTimeout(1000);
  await page.click('.css-h6usn4');
  await page.waitForTimeout(500);
  await page.click('#layout-style-c-widget-1-1-item');
  await page.waitForTimeout(500);
  await page.click('.DayPickerNavigation_button_2', {
    clickCount: 2
  });
  await page.waitForTimeout(500);
  await page.click('.CalendarDay_1');
  await page.waitForTimeout(500);
  await page.click('.CalendarDay__lastDayOfWeek_3');
  await page.waitForTimeout(200);
  page.click('.css-17y2kki');
  await page.waitForTimeout(5000);
  const pages = await browser.pages();
  await pages[2].select('#room-1-occupancy-details > div:nth-child(1) > div:nth-child(2) > select', 'number:1');
  await pages[2].click('.btn-promo');
  await page.waitForTimeout(500);
  await pages[2].click('#update-guests-button');

  const data = await pages[2].evaluate(() => {
    const roomsInfo = document.querySelector('#toast-container > div.toast.ng-scope.toast-error > div.toast-message > div').textContent;
    return roomsInfo
  });

  return data

};

module.exports = getDataFromErmitage;