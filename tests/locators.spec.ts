import { test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('locators', async ({ page }) => {
    //BY TAG NAME
    page.locator('input')

    //BY ID
    page.locator('#inputEmails1')

    //BY CLASS VALUE
    page.locator('.shape-rectangle')

    //BY ATTRIBUTE
    page.locator('[placeholder="Email"]')

    //BY CLASS VALUE (FULL)
    page.locator(
        '[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]'
    )

    //BY COMBINE DIFFERENT SELECTOR
    page.locator('input[placeholder="Email"][nbinput]')

    //BY XPATH
    page.locator('//*[@id="inputEmail1"')

    //BY PARTIAL TEXT MATCH
    page.locator(':text("Using")')

    //BY EXACT TEXT MATCH
    page.locator(':text-is("Using the Grid"')
})
