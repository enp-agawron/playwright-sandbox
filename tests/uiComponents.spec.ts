import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200')
})

test.describe('Form Layouts page', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test('INPUT FIELDS', async ({ page }) => {
        const usingTheGridEmailInput = page
            .locator('nb-card', { hasText: 'Using the Grid' })
            .getByRole('textbox', { name: 'Email' })

        await usingTheGridEmailInput.fill('agawron@adafir.eu')
        await usingTheGridEmailInput.clear()
        await usingTheGridEmailInput.pressSequentially('agawron@adafir.eu', {
            delay: 300
        })

        //GENERIC ASSERTION
        const inputValue = await usingTheGridEmailInput.inputValue()
        expect(inputValue).toEqual('agawron@adafir.eu')

        //LOCATOR ASSERTION
        await expect(usingTheGridEmailInput).toHaveValue('agawron@adafir.eu')
    })
})
