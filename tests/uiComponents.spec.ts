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

    test('RADIO BUTTONS', async ({ page }) => {
        const usingGridForm = page.locator('nb-card', {
            hasText: 'Using the Grid'
        })

        // await usingGridForm.getByLabel('Option 1').check({ force: true })

        await usingGridForm
            .getByRole('radio', { name: 'Option 2' })
            .check({ force: true })

        const radioStatus = await usingGridForm
            .getByRole('radio', { name: 'Option 2' })
            .isChecked() // ZWRACA TRUE or FALSE
        expect(radioStatus).toBeTruthy()

        await expect(
            usingGridForm.getByRole('radio', { name: 'Option 2' })
        ).toBeChecked()

        await usingGridForm
            .getByRole('radio', { name: 'Option 1' })
            .check({ force: true })
        expect(
            await usingGridForm
                .getByRole('radio', { name: 'Option 2' })
                .isChecked()
        ).toBeFalsy()
        expect(
            await usingGridForm
                .getByRole('radio', { name: 'Option 1' })
                .isChecked()
        ).toBeTruthy()
    })
})
