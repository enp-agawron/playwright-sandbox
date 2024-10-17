import { test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200')
    await page.getByText('Forms').click()
})

test('first test', async ({ page }) => {
    await page.getByText('Form Layouts').click()
})

test('second test', async ({ page }) => {
    await page.getByText('Datepicker').click()
})
