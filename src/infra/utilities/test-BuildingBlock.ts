import { Timeouts } from '../enum/timeouts';
import { waitUntil } from '../waiter/wait';
import { TestBuildingBlocks } from "./testBuildingBlock";
import { MangoPricing } from '../../pages/MangopayPages/mangoPay/mangopay.page';

export class JellycoreTestBuildingBlocks extends TestBuildingBlocks {

  public navigateToMangoPrice(): MangoPricing {
    const mangoPriceing: MangoPricing = new MangoPricing();
    mangoPriceing.navigateToPage();
    waitUntil(() => mangoPriceing.isStandardPriceingPanelActiveExisting(), Timeouts.FIVE_SECONDS, 'Pricing page wasn\'t loaded');
    return new MangoPricing();
  }

}