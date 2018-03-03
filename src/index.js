module.exports = function solveSudoku(matrix) {

    const returnLast = (solv, horizont, vertical) => {
        let findNext = nextSolve(solv, horizont, vertical);

        if (findNext === null) {
            return true;
        }

        horizont = findNext[0];
        vertical = findNext[1];

        for (let numb = 1; numb <= 9; numb++) {
            if (testingNumber(solv, horizont, vertical, numb)) {
                solv[horizont][vertical] = numb;

                if (returnLast(solv, horizont, vertical)) {
                    return true;
                }

                solv[horizont][vertical] = 0;
            }
        }

        return false;
    };

    const testingNumber = (solv, horizont, vertical, numb) => {
        return !findHorizont(solv, horizont, numb) &&
            !findVertical(solv, vertical, numb) &&
            !findSquare(solv, horizont, vertical, numb);
    };

    const nextSolve = (solv, horizont, vertical) => {
        for (; horizont < 9; vertical = 0, horizont++) {
            for (; vertical < 9; vertical++) {
                if (solv[horizont][vertical] == 0) {
                    return [horizont, vertical];
                }
            }
        }
        return null;
    };

    const findHorizont = (solv, horizont, numb) => {
        for (let vertical = 0; vertical < 9; vertical++) {
            if (solv[horizont][vertical] == numb) {
                return true;
            }
        }
        return false;
    };

    const findVertical = (solv, vertical, numb) => {
        for (let horizont = 0; horizont < 9; horizont++) {
            if (solv[horizont][vertical] == numb) {
                return true;
            }
        }
        return false;
    };

    const findSquare = (solv, horizont, vertical, numb) => {
        horizont = Math.floor(horizont / 3) * 3;
        vertical = Math.floor(vertical / 3) * 3;

        for (let setHorizont = 0; setHorizont < 3; setHorizont++) {
            for (let setVertical = 0; setVertical < 3; setVertical++) {
                if (solv[horizont + setHorizont][vertical + setVertical] == numb) {
                    return true;
                }
            }
        }
        return false;
    };
    let solv = matrix.slice();
    returnLast(solv, 0, 0);

    return solv;
};
