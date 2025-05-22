import { test, chromium } from '@playwright/test'

test('first test', async ({ page, context }) => {
    await page.goto('https://www.globalsqa.com/demo-site/draganddrop')
    await page.waitForTimeout(2000)

    const newTab = await context.newPage()
    await context.newPage()
    await context.newPage()
    await context.newPage()
    await context.newPage()
    await context.newPage()
    await context.newPage()
    await context.newPage()
    await context.newPage()
    await context.newPage()

    await newTab.goto('https://www.agatameble.pl')
    await page.waitForTimeout(2000)

    await page.bringToFront()
    await page.close()
})
