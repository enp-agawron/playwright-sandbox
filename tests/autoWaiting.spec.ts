import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('http://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request').click()
})

test('auto waiting', async ({ page }) => {
    const successButton = page.locator('.bg-success')

    //await successButton.click()

    const text = await successButton.textContent()
    const text2 = await successButton.allTextContents()

    expect(text).toEqual('Data loaded with AJAX get request.')
})

test('alternative waits', async ({ page }) => {
    const successButton = page.locator('.bg-success')

    //WAIT FOR ELEMENT
    await page.waitForSelector('.bg-success')

    //WAIT FOR PARTICULAR RESPONSE
    await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    //WAIT FOR NETWORK CALLS TO BE COMPLETED
    await page.waitForLoadState('networkidle')
})
