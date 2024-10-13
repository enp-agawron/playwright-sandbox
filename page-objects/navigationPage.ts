import { Page } from '@playwright/test'

export class NavigationPage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async formLayoutsPage() {
        await this.page.getByText('Forms').click()
        await this.page.getByText('Form Layouts').click()
    }

    async datepickerPage() {
        await this.page.getByText('Forms').click()
        await this.page.getByText('Datepicker').click()
    }

    private async selectGroupMenuItem(groupItemTitle: string) {
        const groupMenuItem = this.page.getByTitle(groupItemTitle)
        const expandedState = await groupMenuItem.getAttribute('aria-expand')

        if (expandedState === 'false') await groupMenuItem.click()
    }
}
