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

test('CHECKBOXES', async ({ page }) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toaster').click()

    await page
        .getByRole('checkbox', { name: 'Hide on click' })
        .uncheck({ force: true })
    await page
        .getByRole('checkbox', { name: 'Prevent arising of duplicate toast' })
        .check({ force: true })

    const allCheckboxes = page.getByRole('checkbox')
    for (const box of await allCheckboxes.all()) {
        await box.check({ force: true })
        expect(await box.isChecked()).toBeTruthy()
    }
})

test('LIST AND DROPDOWNS', async ({ page }) => {
    const dropDownMenu = page.locator('ngx-header nb-select')
    await dropDownMenu.click()

    page.getByRole('list') // GDY UL Tag
    page.getByRole('listitem') // GDY LI Tag

    // const optionList = page.getByRole('list').locator('nb-option')
    const optionList = page.locator('nb- option-list nb-option')
    await expect(optionList).toHaveText([
        'Light',
        'Dark',
        'Cosmic',
        'Corporate'
    ])
    await optionList.filter({ hasText: 'Cosmic' }).click()
    const header = page.locator('nb-layout-header')
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')

    const colors = {
        Light: 'rgb(255, 255, 255)',
        Dark: 'rgb(34, 43, 69)',
        Cosmic: 'rgb(50, 50, 89)',
        Corporate: 'rgb(255, 255, 255)'
    }

    await dropDownMenu.click()
    for (const color in colors) {
        await optionList.filter({ hasText: color }).click()
        await expect(header).toHaveCSS('background-color', colors[color])
        if (color !== 'Corporate') await dropDownMenu.click()
    }
})
