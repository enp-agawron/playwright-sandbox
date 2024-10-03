import { test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('standard locators', async ({ page }) => {
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

test('user-facing attributes', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Email' }).first().click()
    await page.getByRole('button', { name: 'Sign in' }).first().click()

    await page.getByLabel('Email').first().click()

    await page.getByPlaceholder('Jane Doe').click()

    await page.getByText('Using the Grid').click()

    // await page.getByTestId('').click() // TO DO DODAĆ atrybut do appki

    await page.getByTitle('IoT Dashboard').click()
})

test('locating child elements', async ({ page }) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    await page
        .locator('nb-card')
        .locator('nb-radio')
        .locator(':text-is("Option 2")')
        .click()

    await page
        .locator('nb-card')
        .getByRole('button', { name: 'Sign in' })
        .first()
        .click()

    await page.locator('nb-card').nth(3).getByRole('button').click()
})
