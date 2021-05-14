const puppeteer = require('puppeteer');
const fs = require('fs');
const dayjs = require('dayjs');

const getDataFromStarChamps = async (checkIn = '13 jul 2021', checkOut = '16 jul 2021') => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto('https://www.secure-hotel-booking.com/smart/Star-Champs-Elysees/2YXB/es/');

  await page.type('.check-in-datepicker', checkIn);

  await page.type('#adults', '2');
  await page.type('#children', '1');
  await page.waitForTimeout(200);
  await page.focus('.check-out-datepicker')
  await page.waitForTimeout(200);
  await page.click('.check-out-datepicker', {
    clickCount: 3
  });
  await page.type('.check-out-datepicker', checkOut);
  await page.waitForTimeout(300);
  await page.click('#applicationHost > div > div.page-background > div.page-main.page-host > header > div.change-filters > div > p > a');
  await page.waitForTimeout(1500);

  const checkInDate = dayjs(checkIn).locale('en').format('YYYY-MM-DD');
  const checkOutDate = dayjs(checkOut).locale('en').format('YYYY-MM-DD');

  const data = await page.evaluate(() => {
    const $roomsRate = document.querySelectorAll('.this-room-rates');
    const info = [];
    $roomsRate.forEach(($room) => {
      info.push({
        minPrice: Number($room.querySelector('.room-rates-item-price-moy').textContent.trim().replace('€', '').trim()),
        conditions: $room.querySelector('.room-rates-item-title-meal-plan').textContent.trim(),
        currency: document.querySelector('.menu-currency-item-link span').textContent.trim(),
        occupancy: {
          adults: Number(document.querySelector('#applicationHost > div > div.page-background > div.page-main.page-host > header > div.filters-wrapper.mtn.mbs > p > span.filters-occupancy > span:nth-child(1)').textContent.trim()),
          child: Number(document.querySelector('#applicationHost > div > div.page-background > div.page-main.page-host > header > div.filters-wrapper.mtn.mbs > p > span.filters-occupancy > span:nth-child(4) > span:nth-child(1)').textContent.trim()),
        },
        totalAmount: Number($room.querySelector('[data-bind="text: formattedTotalPrice"]').textContent.trim().replace('€', '').trim()),
        language: document.querySelector('#applicationHost > div > div.page-head.js-page-head > div.this-menu-language > ul > li:nth-child(3) > a > span:nth-child(2)').textContent.trim(),
      });
    });
    return info;
  });
  browser.close();
  return {
    checkInDate,
    checkOutDate,
    data,
  }
};

module.exports = getDataFromStarChamps;