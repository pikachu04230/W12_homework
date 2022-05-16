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
  });