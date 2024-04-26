import {useEchoChatUsersId} from "@/Helper/hooks.js";
import {appUrl, validMessageFileType} from "@/Helper/config.js";

export function convertBaseJs(str, fromBase, toBase) {
    // https://stackoverflow.com/questions/1337419/how-do-you-convert-numbers-between-different-bases-in-javascript/55011290#55011290
    const DIGITS = "0123456789abcdefghijklmnopqrstuvwxyz-";

    const add = (x, y, base) => {
        let z = [];
        const n = Math.max(x.length, y.length);
        let carry = 0;
        let i = 0;
        while (i < n || carry) {
            const xi = i < x.length ? x[i] : 0;
            const yi = i < y.length ? y[i] : 0;
            const zi = carry + xi + yi;
            z.push(zi % base);
            carry = Math.floor(zi / base);
            i++;
        }
        return z;
    }

    const multiplyByNumber = (num, x, base) => {
        if (num < 0) return null;
        if (num === 0) return [];

        let result = [];
        let power = x;
        while (true) {
            num & 1 && (result = add(result, power, base));
            num = num >> 1;
            if (num === 0) break;
            power = add(power, power, base);
        }

        return result;
    }

    const parseToDigitsArray = (str, base) => {
        const digits = str.split('');
        let arr = [];
        for (let i = digits.length - 1; i >= 0; i--) {
            const n = DIGITS.indexOf(digits[i])
            if (n === -1) return null;
            arr.push(n);
        }
        return arr;
    }

    const digits = parseToDigitsArray(str, fromBase);
    if (digits === null) return null;

    let outArray = [];
    let power = [1];
    for (let i = 0; i < digits.length; i++) {
        digits[i] && (outArray = add(outArray, multiplyByNumber(digits[i], power, toBase), toBase));
        power = multiplyByNumber(fromBase, power, toBase);
    }

    let out = '';
    for (let i = outArray.length - 1; i >= 0; i--)
        out += DIGITS[outArray[i]];

    return out;
}
export const convertTimestamp = (timestamp) =>{
    const date = new Date(timestamp);
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();

    return `${month} ${day} ${year} ${hour}:${minute}`;
}
export const asset = (path) => {
    return `/storage${path}`
}
export const isObjectEmpty = (objectName) => {
    return JSON.stringify(objectName) === "{}";
};
export const channelLink = (type, id) => {
    return "/t/" + convertBaseJs(type+"-" + id, 37, 10)
}
export const getFileType = (mimeType) => {
    for (const [type, mimeTypes] of Object.entries(validMessageFileType)) {
        if(mimeTypes.includes(mimeType)){
            return type;
        }
    }
    return undefined;
}
export const renameFileSize = (fileSize) => {
    const units = ['bytes', 'KB', 'MB']; // max file size upload <= 30mb
    let unitIndex = 0;

    while (fileSize >= 1000 && unitIndex < units.length - 1) {
        fileSize /= 1000;
        unitIndex++;
    }

    return `${fileSize.toFixed(2)} ${units[unitIndex]}`;
};
export const shortenFileName = (fileName) => {
    const frontChars = 10;
    const endChars = 6;
    const fileNameArray = fileName.split('.')
    console.log("fileNameWithoutExtension", fileNameArray)
    const fileExtension = fileNameArray.pop();
    console.log("fileExtension", fileExtension)
    const baseName = fileNameArray.join('.')
    console.log("baseName", baseName)
    if (baseName.length <= frontChars + endChars) {
        return fileName;
    }
    const shortBaseName = `${baseName.substring(0, frontChars)}...${baseName.substring(baseName.length - endChars)}`
    return `${shortBaseName}.${fileExtension}`
}
