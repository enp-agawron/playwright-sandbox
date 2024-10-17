import { test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200')
})

test('first test', async ({ page }) => {
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('second test', async ({ page }) => {
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()
})

test.describe('suite 1', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Modal & Overlays').click()
    })

    test('dialog', async ({ page }) => {
        await page.getByText('Dialog').click()
    })

    test('window', async ({ page }) => {
        await page.getByText('Window').click()
    })

    test('popover', async ({ page }) => {
        await page.getByText('Popover').click()
    })
})

test.describe('suite 2', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click()
    })

    test('first test', async ({ page }) => {
        await page.getByText('Form Layouts').click()
    })

    test('second test', async ({ page }) => {
        await page.getByText('Datepicker').click()
    })
})
