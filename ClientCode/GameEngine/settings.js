/* eslint-disable array-element-newline */
/* eslint-disable no-magic-numbers */

import { PawnType } from "./gameEnums.js"

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
            typeId: PawnType.BATTERIES,
            name: "Batteries",
            range: 0,
            destroys: [100002],
            destroyed: [100001],
            fleetSize: 4
        },
        {
            typeId: PawnType.BATTLESHIP,
            name: "Battleship",
            range: 3,
            destroys: [],
            destroyed: [100002, 100001],
            fleetSize: 3
        },
        {
            typeId: PawnType.CRUISER,
            name: "Cruiser",
            range: 6,
            destroys: [],
            destroyed: [100002, 100001],
            fleetSize: 1
        },
        {
            typeId: PawnType.DESTROYER,
            name: "Destroyer",
            range: 2,
            destroys: [],
            destroyed: [100002, 100001],
            fleetSize: 1
        },
        {
            typeId: PawnType.ESCORTSHIP,
            name: "Escortship",
            range: 7,
            destroys: [],
            destroyed: [100002, 100001],
            fleetSize: 1
        },
        {
            typeId: PawnType.FRIGATE,
            name: "Frigate",
            range: 1,
            destroys: [],
            destroyed: [100002, 100001],
            fleetSize: 1
        },
        {
            typeId: PawnType.SUBMARINE,
            name: "Submarine",
            range: 4,
            destroys: [],
            destroyed: [100002, 100001],
            fleetSize: 4
        }
    ]
};
