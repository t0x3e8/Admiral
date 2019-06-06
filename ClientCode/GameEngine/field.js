import uuid from 'uuid/v1';

/**
 * A class representing a Field object.
 * @param {object} fieldData - Object containing field information as: type, columnIndex, rowIndex,
 * @returns {void}
 */
class Field {
    constructor(fieldData) {
        const that = this,
         fieldId = uuid();

         that.type = fieldData.type;
        that.colIndex = fieldData.columnIndex;
        that.rowIndex = fieldData.rowIndex;
        that.pawn = null;

        /**
         * @returns {uuid} gets unique field id
         */
        that.getFieldId = function () {
            return fieldId;
        };
    }
}

module.exports = Field;
