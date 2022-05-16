export class Potter {
    private books: number[] = []
    buy (basket: number[]) {
        this.books = basket;
    }

    get price() {
        if (this.books.length == 0) {
            return 0;
        }
        else {
            switch (this.numTitles()) {
                case 1:
                    return this.books.length * 8;
                case 2:
                    return this.books.length * 8 * 0.95;
                case 3:
                    return this.books.length * 8 * 0.9;
                case 4:
                    return this.books.length * 8 * 0.8;
                default:    // numTitles == 5
                    return this.books.length * 8 * 0.75;
            }
        }
    }

    private numTitles() {
        let numTitles = 0;
        for (let i = 0; i < 5; i++) {
            if (this.books.includes(i))
                numTitles++;
        }
        return numTitles;
    }
}