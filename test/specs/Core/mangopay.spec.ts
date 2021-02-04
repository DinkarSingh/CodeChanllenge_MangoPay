import { expect } from 'chai';
import { TestBuildingBlocks } from '../../../src/infra/utilities/testBuildingBlock';
import { TestLogger } from '../../../src/infra/loggers/test-logger';
import { MangoPricing } from '../../../src/pages/MangopayPages/mangoPay/mangopay.page';
import { BaseTestData } from "../../../src/infra/models/base-test-data";
import { JellycoreTestBuildingBlocks } from '../../../src/infra/utilities/test-BuildingBlock';

let mangoPriceing = new MangoPricing();
let logger: TestLogger;
let testIndex = 0;
let testData: BaseTestData = new BaseTestData(undefined);
let jellycoreTestBuildingBlocks = new JellycoreTestBuildingBlocks(testData);


describe('Mangopay Problématique 2 ', () => {

    before(() => {
        logger = new TestLogger();
        mangoPriceing = jellycoreTestBuildingBlocks.navigateToMangoPrice();
    });

    beforeEach(() => {
        testIndex++;
        mangoPriceing = jellycoreTestBuildingBlocks.navigateToMangoPrice();
    });

    it('Verify that Pricing page URL is displaying or not', () => {
        TestBuildingBlocks.addStepAndExecute(`Verfy that mangopay pricing page is displaying`, () => {
            const pageURL = browser.getUrl();
            expect(pageURL).to.contain('pricing', 'Price page was not displaying');
        });
    });

    it('Verify that language can change from the language panel', () => {
        const country = 'FR';
        TestBuildingBlocks.addStepAndExecute(`Verfy that Mangopay pricing page is displaying`, () => {
            expect(mangoPriceing.isStandardPriceingPanelActiveExisting()).to.equal(true, 'Price page was not displaying');
        });
        TestBuildingBlocks.addStepAndExecute(`Click on Country button`, () => {
            mangoPriceing.clickOnLanguageButton();
        });
        TestBuildingBlocks.addStepAndExecute(`Select the language form the list as ${country}`, () => {
            mangoPriceing.selectLangugeFromPanel(country);
            expect(mangoPriceing.isLanguageSelected()).to.equal(country, `Country language ${country} was not selected`);
        });
    });

    it('Verify that transparent pricing can select REMISE DE VOLUME', () => {
        const country = 'FR';
        const pricingOption = 'REMISE DE VOLUME';
        TestBuildingBlocks.addStepAndExecute(`Verfy that Mangopay pricing page is displaying`, () => {
            expect(mangoPriceing.isStandardPriceingPanelActiveExisting()).to.equal(true, 'Price page was not displaying');
        });
        TestBuildingBlocks.addStepAndExecute(`Click on Country button`, () => {
            mangoPriceing.clickOnLanguageButton();
        });
        TestBuildingBlocks.addStepAndExecute(`Select the language form the list as ${country}`, () => {
            mangoPriceing.selectLangugeFromPanel(country);
            expect(mangoPriceing.isLanguageSelected()).to.equal(country, `Country language ${country} was not selected`);
        });
        TestBuildingBlocks.addStepAndExecute(`Select the transparent pricing option as ${pricingOption} and check ${pricingOption} is selected`, () => {
            mangoPriceing.selectPricingPanel(pricingOption);
            expect(mangoPriceing.isPricingPanelActviveExisting('active')).to.equal(true, 'No home page displaying');
        });
    });

    it('Verify that payment options can select from the list', () => {
        const country = 'FR';
        const pricingOption = 'REMISE DE VOLUME';
        const paymentOption = 'Visa & Mastercard';
        TestBuildingBlocks.addStepAndExecute(`Verfy that Mangopay pricing page is displaying`, () => {
            expect(mangoPriceing.isStandardPriceingPanelActiveExisting()).to.equal(true, 'Price page was not displaying');
        });
        TestBuildingBlocks.addStepAndExecute(`Click on Country button`, () => {
            mangoPriceing.clickOnLanguageButton();
        });
        TestBuildingBlocks.addStepAndExecute(`Select the language form the list as ${country}`, () => {
            mangoPriceing.selectLangugeFromPanel(country);
            expect(mangoPriceing.isLanguageSelected()).to.equal(country, `Country language ${country} was not selected`);
        });
        TestBuildingBlocks.addStepAndExecute(`Select the transparent pricing option as ${pricingOption} and check ${pricingOption} is selected`, () => {
            mangoPriceing.selectPricingPanel(pricingOption);
            expect(mangoPriceing.isPricingPanelActviveExisting('active')).to.equal(true, 'No home page displaying');
        });
        TestBuildingBlocks.addStepAndExecute(`Verify that payment option as ${paymentOption}`, () => {
            mangoPriceing.selectPaymentOption(paymentOption);
            expect(mangoPriceing.getSelectedPaymentOptionText()).to.equal(paymentOption, `Payment option was not selected as ${paymentOption}`);
        });
    });

    it('Verify that MONTHLY PAY-IN VOLUMES vertical slider can change the value', () => {
        const value = '100,000';
        const country = 'FR';
        const pricingOption = 'REMISE DE VOLUME';
        const paymentOption = 'Visa & Mastercard';
        TestBuildingBlocks.addStepAndExecute(`Verfy that mangopay pricing page is displaying`, () => {
            expect(mangoPriceing.isStandardPriceingPanelActiveExisting()).to.equal(true, 'Price page was not displaying');
        });
        TestBuildingBlocks.addStepAndExecute(`Click on Country button`, () => {
            mangoPriceing.clickOnLanguageButton();
        });
        TestBuildingBlocks.addStepAndExecute(`Select the language form the list as ${country}`, () => {
            mangoPriceing.selectLangugeFromPanel(country);
            expect(mangoPriceing.isLanguageSelected()).to.equal(country, `Country language ${country} was not selected`);
        });
        TestBuildingBlocks.addStepAndExecute(`Select the pricing option as ${pricingOption}`, () => {
            mangoPriceing.selectPricingPanel(pricingOption);
            expect(mangoPriceing.isPricingPanelActviveExisting('active')).to.equal(true, 'No home page displaying');
        });
        TestBuildingBlocks.addStepAndExecute(`Verify that payment option as ${paymentOption}`, () => {
            mangoPriceing.selectPaymentOption(paymentOption);
            expect(mangoPriceing.getSelectedPaymentOptionText()).to.equal(paymentOption, `Payment option was not selected as ${paymentOption}`);
        });
        TestBuildingBlocks.addStepAndExecute(`Verify that pricing slider tooltip is playing or not`, () => {
            const tooltipText = mangoPriceing.getTooltipPricingText();
            expect(tooltipText).to.equal(value, `Tool tip values was not displaying as  ${tooltipText}`);
        });
        TestBuildingBlocks.addStepAndExecute(`Move the vertical pricing slider and check the tooltip valus is changing or not`, () => {
            mangoPriceing.dragPricePanel();
            const tooltipText = mangoPriceing.getTooltipPricingText();
            expect(tooltipText).to.not.eq(value, `Tool tip values was un changing as ${tooltipText}`);
        });
    });
});
