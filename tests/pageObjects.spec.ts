import { test, expect } from '@playwright/test'
import { NavigationPage } from '../page-objects/navigationPage'
import { FormPage } from '../page-objects/formPage'

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200')
})

test('navigate to form page', async ({ page }) => {
    const navigateTo = new NavigationPage(page)

    await navigateTo.formLayoutsPage()
    await navigateTo.datepickerPage()
})

test('parametrized form method', async ({ page }) => {
    const navigateTo = new NavigationPage(page)
    const onFormLayoutsPage = new FormPage(page)

    await navigateTo.formLayoutsPage()
    await onFormLayoutsPage.submitUsingFormWithCredentialsAndSelectOption('agawron@adafir.eu', 'Testowe', 'Option 1')
    await onFormLayoutsPage.submitUsingInlineFormWithNameEmailAndCheckbox('Artur Gawron', 'agawron@adafir.eu', false)
})
