import { Page } from '@playwright/test'

export class FormPage {
    private readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async submitUsingFormWithCredentialsAndSelectOption(email: string, password: string, optionText: string) {
        const usingGridForm = this.page.locator('nb-card', { hasText: 'Using the Grid' })
        await usingGridForm.getByRole('textbox', { name: 'Email' }).fill(email)
        await usingGridForm.getByRole('textbox', { name: 'Password' }).fill(password)
        await usingGridForm.getByRole('radio', { name: optionText }).check({ force: true })
        await usingGridForm.getByRole('button').click()
    }

    async submitUsingInlineFormWithNameEmailAndCheckbox(name: string, email: string, rememberMe: boolean) {
        const usingInlineForm = this.page.locator('nb-card', { hasText: 'Inline Form' })
        usingInlineForm.getByRole('textbox', { name: 'Jane Doe' }).fill(name)
        usingInlineForm.getByRole('textbox', { name: 'Email' }).fill(email)
        if (rememberMe) await usingInlineForm.getByRole('checkbox').check({ force: true })
        await usingInlineForm.getByRole('button').click()
    }
}
