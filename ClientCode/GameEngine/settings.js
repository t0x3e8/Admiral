/* eslint-disable array-element-newline */
/* eslint-disable no-magic-numbers */

import { PawnType } from './gameEnums.js'

export default {
    board: {
        numberOfColumns: 12,
        numberOfRows: 18,
        map: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 1, 1, 3, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 5, 5, 5, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 5, 5, 5, 5, 5, 0, 0, 0],
            [0, 0, 0, 5, 5, 5, 5, 5, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 5, 5, 5, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [2, 2, 4, 2, 2, 0, 0, 0, 0, 0, 0, 0],
            [2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2],
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 2, 2],
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
        ]
    },
    pawns: [
        {
            typeId: PawnType.CRUISER,
            name: 'Cruiser',
            range: 1,
            destroys: [100002],
            destroyed: [100001],
            fleetSize: 3
        },
        {
            typeId: PawnType.SUBMARINE,
            name: 'Submarine',
            range: 4,
            destroys: [],
            destroyed: [100002, 100001],
            fleetSize: 4
        }

    ]
};
