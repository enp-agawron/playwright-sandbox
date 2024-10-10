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

        await usingGridForm.getByRole('radio', { name: 'Option 2' }).check({ force: true })

        const radioStatus = await usingGridForm.getByRole('radio', { name: 'Option 2' }).isChecked() // ZWRACA TRUE or FALSE
        expect(radioStatus).toBeTruthy()

        await expect(usingGridForm.getByRole('radio', { name: 'Option 2' })).toBeChecked()

        await usingGridForm.getByRole('radio', { name: 'Option 1' }).check({ force: true })
        expect(await usingGridForm.getByRole('radio', { name: 'Option 2' }).isChecked()).toBeFalsy()
        expect(await usingGridForm.getByRole('radio', { name: 'Option 1' }).isChecked()).toBeTruthy()
    })
})

test('CHECKBOXES', async ({ page }) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click()

    await page.getByRole('checkbox', { name: 'Hide on click' }).uncheck({ force: true })
    await page.getByRole('checkbox', { name: 'Prevent arising of duplicate toast' }).check({ force: true })

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
    const optionList = page.locator('.option-list nb-option')
    await expect(optionList).toHaveText(['Light', 'Dark', 'Cosmic', 'Corporate'])
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

test('TOOLTIPS', async ({ page }) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Tooltip').click()

    const toolTipCard = page.locator('nb-card', {
        hasText: 'Tooltip Placements'
    })
    await toolTipCard.getByRole('button', { name: 'Top' }).hover()

    page.getByRole('tooltip') // ALE POWINNO BYC w HTML role ustawione na tooltip
    const tooltip = await page.locator('nb-tooltip').textContent()
    expect(tooltip).toEqual('This is a tooltip')
})

test('DIALOG BOX', async ({ page }) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    // page.on('dialog', (dialog) => {
    //     expect(dialog.message()).toEqual('Are you sure you want to delete?')
    //     dialog.accept()
    // })

    await page.getByRole('table').locator('tr', { hasText: 'mdo@gmail.com' }).locator('.nb-trash').click()

    await expect(page.locator('tbody tr').first()).toHaveText('mdo@gmail.com')
})

test('WEB TABLES', async ({ page }) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    //Get row by any tekst in this row
    const targetRow = page.getByRole('row', { name: 'ann@gmail.com' })
    await targetRow.locator('.nb-edit').click()

    await page.locator('input-editor').getByPlaceholder('Age').clear()
    await page.locator('input-editor').getByPlaceholder('Age').fill('55')
    await page.locator('.nb-checkmark').click()

    //Get row based on the value in specyfic column
    await page.locator('.ng2-smart-pagination-nav').getByText('2').click() // 2 page of pagination
    const targetRowById = page.getByRole('row').filter({ has: page.locator('td').nth(1).getByText('11') })
    await targetRowById.locator('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder('E-mail').clear()
    await page.locator('input-editor').getByPlaceholder('E-mail').fill('agawron@adafir.eu')
    await page.locator('.nb-checkmark').click()
    await expect(targetRowById.locator('td').nth(5)).toHaveText('agawron@adafir.eu')

    //Test filter of the table
    const ages = ['20', '30', '40', '200']

    for (let age of ages) {
        await page.locator('input-filter').getByPlaceholder('Age').clear()
        await page.locator('input-filter').getByPlaceholder('Age').fill(age)
        await page.waitForTimeout(500) // Specyficzny case w tabeli

        const ageRows = page.locator('tbody tr')

        for (let row of await ageRows.all()) {
            const cellValue = await row.locator('td').last().textContent()
            if (age === '200') {
                expect(await page.locator('td').textContent()).toEqual(' No data found ')
            } else {
                expect(cellValue).toEqual(age)
            }
        }
    }
})

test('DATE PICKER', async ({ page }) => {
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()

    const calendarInputField = page.getByPlaceholder('Form Picker')
    await calendarInputField.click()

    // await page.locator('[class="day-cell ng-star-inserted"]').getByText('1', { exact: true }).click()
    // await expect(calendarInputField).toHaveValue('Oct 1, 2024')

    //BETER
    let date = new Date()
    date.setDate(date.getDate() + 30)
    const expectDate = date.getDate().toString()
    const expectMonthShort = date.toLocaleString('En-US', { month: 'short' })
    const expectMonthLong = date.toLocaleString('En-US', { month: 'long' })
    const expectYear = date.getFullYear()
    const dateToAssert = `${expectMonthShort} ${expectDate}, ${expectYear}`

    let calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
    const expectMonthAdnYear = `${expectMonthLong} ${expectYear}`
    while (!calendarMonthAndYear?.includes(expectMonthAdnYear)) {
        await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
        calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
    }

    await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectDate, { exact: true }).click()
    await expect(calendarInputField).toHaveValue(dateToAssert)
})
