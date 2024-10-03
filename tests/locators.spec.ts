import { test, expect } from '@playwright/test'
import { exitCode } from 'process'

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

test('locating parent elements', async ({ page }) => {
    await page
        .locator('nb-card', { hasText: 'Using the Grid' })
        .getByRole('textbox', { name: 'Email' })
        .click()

    await page
        .locator('nb-card', { has: page.locator('#inputEmail1') })
        .getByRole('textbox', { name: 'Email' })
        .click()

    await page
        .locator('nb-card')
        .filter({ hasText: 'Basic Form' })
        .getByRole('textbox', { name: 'Email' })
        .click()

    await page
        .locator('nb-card')
        .filter({ has: page.locator('.status-danger') })
        .getByRole('textbox', { name: 'Password' })
        .click()

    await page
        .locator('nb-card')
        .filter({ has: page.locator('nb-checkbox') })
        .filter({ hasText: 'Sign in' })
        .getByRole('textbox', { name: 'Email' })
        .click()

    await page
        .locator(':text-is("Using the Grid")')
        .locator('..')
        .getByRole('textbox', { name: 'Email' })
        .click()
})

test('Reusing locators', async ({ page }) => {
    const basicForm = page.locator('nb-card').filter({ hasText: 'Basic Form' })
    const emailField = basicForm.getByRole('textbox', { name: 'Email' })

    await emailField.fill('agawron@adafir.eu')

    await basicForm.getByRole('textbox', { name: 'Password' }).fill('Dupa1234')

    await basicForm.locator('nb-checkbox').click()

    await basicForm.getByRole('button').click()

    await expect(emailField).toHaveValue('agawron@adafir.eu')
})

test('Extracting values', async ({ page }) => {
    //SINGLE VALUE
    const basicForm = page.locator('nb-card').filter({ hasText: 'Basic Form' })
    const buttonValue = await basicForm.locator('button').textContent()

    expect(buttonValue).toEqual('Submit')

    //MORE VALUES
    const allRadioButtons = await page.locator('nb-radio').allTextContents()

    expect(allRadioButtons).toContain('Option 1')

    //INPUT VALUE
    const emailField = basicForm.getByRole('textbox', { name: 'Email' })
    await emailField.fill('agawron@adafir.eu')
    const emailValue = await emailField.inputValue()

    expect(emailValue).toEqual('agawron@adafir.eu')

    //ATTRIBUTE VALUE
    const placeholderValue = await emailField.getAttribute('placeholder')
    expect(placeholderValue).toEqual('Email')
})

test('Assertions', async ({ page }) => {
    const formButton = page
        .locator('nb-card')
        .filter({ hasText: 'Basic Form' })
        .locator('button')

    //GENERAL ASSERTIONS
    const value = 66
    expect(value).toEqual(66)

    const text = await formButton.textContent()
    expect(text).toEqual('Submit')

    //LOCATOR ASSERTIONS
    await expect(formButton).toHaveText('Submit')

    //SOFT ASSERTIONS
    await expect.soft(formButton).toHaveText('Submitooo')
    await formButton.click()
})
