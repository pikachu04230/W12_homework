import { Potter } from './potter';

describe('Potter', () => {
    let potter: Potter;
  
    beforeEach(() => {
      potter = new Potter();
    });
  
    test('Test Basics', () => {
      potter.buy([]);
      expect(potter.price).toBe(0);
      potter.buy([1]);
      expect(potter.price).toBe(8);
      potter.buy([2]);
      expect(potter.price).toBe(8);
      potter.buy([3]);
      expect(potter.price).toBe(8);
      potter.buy([4]);
      expect(potter.price).toBe(8);
      potter.buy([1, 1, 1]);
      expect(potter.price).toBe(8 * 3);
    });

    test('Test Simple Discounts', () => {
        potter.buy([0, 1]);
        expect(potter.price).toBe(8 * 2 * 0.95);
        potter.buy([0, 2, 4]);
        expect(potter.price).toBe(8 * 3 * 0.9);
        potter.buy([0, 1, 2, 4]);
        expect(potter.price).toBe(8 * 4 * 0.8);
        potter.buy([0, 1, 2, 3, 4]);
        expect(potter.price).toBe(8 * 5 * 0.75);
      });
  });