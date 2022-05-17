import { min } from "rxjs";

export class Potter {
    private basket: number[] = [];
    private basicSets: number[][] = [];
    
    constructor() {
        this.createBasics(this.basicSets);
    }

    buy (basket: number[]) {
        this.basket = basket;
    }

    get price() {
        if (this.isEmpty(this.basket)) {
            return 0;
        }
        else {
            let bookCount: number[] = [0, 0, 0, 0, 0]; 
            this.countBooks(bookCount);

            return this.calculatePrice(bookCount);
        }
    }

    private countBooks(bookCount: number[]) {
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < this.basket.length; j++) {
                if (this.basket[j] == i) {
                    bookCount[i]++;
                }
            }
        }
    }

    private isEmpty(list: number[]) {
        if (list.length == 0) {
            return true;
        }
        else {
            return false;
        }
    }

    private isBasic(list: number[]) {
        for (let i = 0; i < list.length; i++) {
            if ( list[i] != 0 && list[i] != 1) {
                return false;
            }
        }
        return true;
    }

    private basicPrice(books: number[]) {
        let count = 0;
        for (let i = 0; i < books.length; i++) {
            if (books[i] == 1) {
                count++;
            }
        }
        switch (count) {
            case 0:
                return 0;
            case 1:
                return count * 8;
            case 2:
                return count * 8 * 0.95;
            case 3:
                return count * 8 * 0.9;
            case 4:
                return count * 8 * 0.8;
            default:    // numTitles == 5
                return count * 8 * 0.75;
        }
    }

    private createBasics(list: number[][]) {
        for (let x1 = 0; x1 < 2; x1++) {
            for (let x2 = 0; x2 < 2; x2++) {
                for (let x3 = 0; x3 < 2; x3++) {
                    for (let x4 = 0; x4 < 2; x4++) {
                        for (let x5 = 0; x5 < 2; x5++) {
                            if (x1 == 0 && x2 == 0 && x3 == 0 && x4 == 0 && x5 == 0)
                                continue;
                            else
                                list.push([x1, x2, x3, x4, x5]);
                        }
                    }
                }
            }
        }
    }

    private isSubstracable(list: number[], basic: number[]) {
        for (let i = 0; i < list.length; i++) { 
            if (list[i] < basic[i]) {
                return false;
            }
        }
        return true;
    }

    private popBasic(list: number[], basic: number[]) {
        for (let i = 0; i < list.length; i++) { 
            list[i] = list[i] - basic[i];
        }
    }

    // Remain 1 series for simpleSet calculation.
    private extractWholeSeries(list: number[]) {
        for (let i = 0; i < list.length; i++) {
            if (list[i] <= 1) {
                return 0;
            }
        }

        const numSeries = Math.min.apply(null, list) - 1;
        for (let i = 0; i < list.length; i++) {
            list[i] -= numSeries;
        }
        return numSeries;
    }

    private calculateSimpleSetPrice(books: number[]) {
        if (this.isBasic(books)){
            return this.basicPrice(books);
        }

        let possiblePrices: number[] = [];

        for (let i = 0; i < this.basicSets.length; i++) {
            let basic = this.basicSets[i];
            let copiedBooks: number[] = books.slice();
            if (this.isSubstracable(copiedBooks, basic)) {
                this.popBasic(copiedBooks, basic);
                possiblePrices.push(this.calculatePrice(copiedBooks) + this.basicPrice(basic));
            }
        }
        return Math.min.apply(null, possiblePrices);
    }

    private calculatePrice(books: number[]) {
        const wholeSeriesPrice = this.extractWholeSeries(books) * 8 * 5 * 0.75;
        const simpleSetPrice = this.calculateSimpleSetPrice(books);
        return wholeSeriesPrice + simpleSetPrice;
    }
}