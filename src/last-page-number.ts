import max from 'lodash/fp/max';
import { Page } from 'puppeteer';

/**
 * Return number of last page in pagination block
 *
 */
export default async function lastPageNumber(
  pageMain: Page
): Promise<number | undefined> {
  const paginationAllNumbers = await pageMain.evaluate(
    (): number[] | undefined => {
      const pagination = document.querySelector(
        'div[id="pagination-wrap"] > nav[class="pagination"]'
      );
      if (pagination) {
        const paginationAll = [...pagination.querySelectorAll('*')];
        return paginationAll
          .map((att: Element): number => Number(att.textContent))
          .filter(Boolean);
      }
    }
  );
  return max(paginationAllNumbers);
}
