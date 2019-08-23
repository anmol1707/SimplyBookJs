import {BookingData} from "./DataInterfaces";
import {createMuiTheme, responsiveFontSizes} from "@material-ui/core";

export function roundOffTo2DecimalPlaces(givenNumber: number): number {
    if(givenNumber == null || givenNumber === 0) {
        return 0;
    }
    return Math.round(givenNumber * 100) / 100;
}

export function validateEmail(email: string): boolean {
    let regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regExp.test(String(email).toLowerCase());
}

export function checkIfRowColumnCombinationPresentInBookingArray(bookings: BookingData[], row: number, column: number): number {
    let indexInList: number = null;
    if(bookings != null) {
        bookings.map((booking: BookingData, index: number) => {
            if(booking.rowNumber === row && booking.columnNumber === column) {
                indexInList = index;
            }
        });
    }
    return indexInList;
}

export const responsiveFontSizeTheme = responsiveFontSizes(createMuiTheme());

export function getPriceForTicket(selectedRowNumber: number, totalRows: number): number {
    return selectedRowNumber > totalRows / 2 ? 100 : 50;
}
