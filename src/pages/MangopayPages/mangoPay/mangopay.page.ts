import { Timeouts } from '../../../infra/enum/timeouts';
import { waitUntil } from '../../../infra/waiter/wait';
import { BasePage } from '../base-Page';

export class MangoPricing extends BasePage {

    private get language() { return $('[data-target=".modal--languages"]') }

    private get languageText() { return $('.align-items-center a span') }

    private get languageOptions() { return $$('.modal-content .modal-body ul li a span') }

    private get paymentDropdown() { return $$('.fancy-select .trigger') }

    private get paymentOptions() { return $$('.fancy-select .options  li') }

    private get pricingPanels() { return $$('.btn-group-xl button') }

    private get tooltipPricing() { return $('.slider-wrap .slider-horizontal .tooltip-main .tooltip-inner') }

    private get verticalPricePanel() { return $('.slider-tick-container') }

    private get dragOption() { return $$('.slider-tick-container div') }

    /**
     * returning here the selected language text
     */
    public isLanguageSelected(): string {
        waitUntil(() => this.languageText.isExisting(), Timeouts.FORTY_SECONDS, 'Selected language was not displaying');
        return this.languageText.getText().trim();
    }

    /**
     * Checking princing panel active or not
     */
    public isStandardPriceingPanelActiveExisting(): boolean {
        waitUntil(() => this.pricingPanels[0].isExisting(), Timeouts.FORTY_SECONDS, 'Mangopay pricing page was not displaying');
        return this.pricingPanels[0].getAttribute('class').includes('active');
    }

    /**
     * 
     * @param option 
     * here select the pricing panel as passed parameter option
     */
    public selectPricingPanel(option: string) {
        const status = this.getPricePanleText(option);
        status.click();
    }

    public getPricePanleText(text) {
        const elements = this.pricingPanels;
        const itemByText = elements.find((item) => {
            const itemByTexts = item.getText().trim();
            return itemByTexts === `${text}`;
        });
        if (itemByText === undefined) {
            throw new Error(`Can't find list item by name ${text}`);
        }
        return itemByText;
    }

    /**
     * 
     * @param text 
     * ckecking pricing panel is active or not
     */
    public isPricingPanelActviveExisting(text: string): boolean {
        return this.pricingPanels[2].getAttribute('class').includes(text);
    }

    /**
     * click on language icon button
     */
    public clickOnLanguageButton() {
        waitUntil(() => this.language.isExisting(), Timeouts.FORTY_SECONDS, 'Language button was not displayed');
        this.language.click();
    }

    /**
     * 
     * @param option 
     * select the language form the list
     */
    public selectLangugeFromPanel(option: string) {
        const language = this.getlanguagesText(option);
        language.click();
    }

    public getlanguagesText(text) {
        const elements = this.languageOptions;
        const itemByText = elements.find((item) => {
            const itemByTexts = item.getText().trim();
            return itemByTexts === `${text}`;
        });
        if (itemByText === undefined) {
            throw new Error(`Can't find list item by name ${text}`);
        }
        return itemByText;
    }

    /**
     * returning the pricing tooltip values as string
     */
    public getTooltipPricingText(): string {
        waitUntil(() => this.tooltipPricing.isExisting(), Timeouts.FORTY_SECONDS, 'Tooltip pricing values was not displaying');
        return this.tooltipPricing.getText().trim()
    }

    /**
     * here draging the pricing slider
     */
    public dragPricePanel() {
        waitUntil(() => this.verticalPricePanel.isExisting(), Timeouts.FORTY_SECONDS, 'Vercal price panel was not displaying');
        this.verticalPricePanel.dragAndDrop(this.dragOption[1]);
    }

    /**
     * here click on payment option dropdown button
     */
    public clickOnPaymentDropdown() {
        waitUntil(() => this.paymentDropdown[1].isExisting(), Timeouts.FORTY_SECONDS, 'Payment dropdown list was not displaying');
        this.paymentDropdown[1].click();
    }

    /**
     * 
     * @param option 
     * selecting the payment options for the parameter
     */
    public selectPaymentOption(option: string) {
        this.clickOnPaymentDropdown();
        const language = this.getPaymentOptionText(option);
        language.click();
    }

    public getPaymentOptionText(text) {
        const elements = this.paymentOptions;
        const itemByText = elements.find((item) => {
            const itemByTexts = item.getText().trim();
            return itemByTexts === `${text}`;
        });
        if (itemByText === undefined) {
            throw new Error(`Can't find list item by name ${text}`);
        }
        return itemByText;
    }

    /**
     * returning the payment option type text
     */
    public getSelectedPaymentOptionText(): string {
        waitUntil(() => this.paymentDropdown[1].isExisting(), Timeouts.FORTY_SECONDS, 'Select payment option was not displaying');
        return this.paymentDropdown[1].getText()
    }
}