import { test, expect } from "fixtures/business.fixture";
import { generateMetrics } from "data/salesPortal/metrics/generateMetricsData";

test.describe('[MOCK] [Sales Portal] [Home Page Metrics]', () => {
    test('Verify Orders This Year metric', async ({ loginAsAdmin, homePage, mock}) => {
        const totalOrders = 4589;
        const expectedResponse = generateMetrics({orderThisYear: totalOrders});
        await mock.metricsHomePage(expectedResponse);
        await loginAsAdmin();

        expect.soft(homePage.orderThisYear).toHaveText(totalOrders.toString());
        console.log(totalOrders.toString());
        })

    test('Verify New Customers metric', async ({ loginAsAdmin, homePage, mock}) => {
        const newCustomers = 287;
        const expectedResponse = generateMetrics({newCustomers: newCustomers});
        await mock.metricsHomePage(expectedResponse);
        await loginAsAdmin();
        
        expect.soft(homePage.newCustomers).toHaveText(newCustomers.toString());
        console.log(newCustomers.toString());
    })

    test('Verify Canceled Orders metric', async ({ loginAsAdmin, homePage, mock}) => {
        const canceledOrders = 13;
        const expectedResponse = generateMetrics({canceledOrders: canceledOrders});
        await mock.metricsHomePage(expectedResponse);
        await loginAsAdmin();
        
        expect.soft(homePage.canceledOrders).toHaveText(canceledOrders.toString());
        console.log(canceledOrders.toString());
    })
});  
