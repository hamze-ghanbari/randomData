export let configData = {
    countString: 20,
    rangeNumber: 10000,
};

function randomNumber() {
    return Math.floor(Math.random() * configData.rangeNumber);
}

function randomString() {
    var alphaChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var generatedString = '';
    configData.rangeNumber = alphaChars.length;
    for (var i = 0; i < configData.countString; i++) {
        generatedString += alphaChars[randomNumber()];
    }

    return generatedString.toLowerCase();
}

function randomBoolean() {
    return (Math.floor(Math.random() * configData.rangeNumber) % 2) ? true : false;
}

function randomDate() {
    return new Date().toISOString();
}

function randomArray(array) {
    let result: any = [];
    let lengthMock: number;
    for (let i = 0; i < array.length; i++) {
        // result.push(array[i]);
        lengthMock = array.length > 1 ? array.lenght : 2;
        result.push(generateData(array[i]));
    }
    return result;
}

function generateData(object) {
    let result = {};
    let keys = Object.keys(object);
    let values = Object.values(object);
    let type;
    for (let i = 0; i < keys.length; i++) {
        type = values[i];
        if (type == 'string' || type == 'Strnig')
            result[keys[i]] = randomString();
        if (type == 'number' || type == 'Number')
            result[keys[i]] = randomNumber();
        if (type == 'boolean' || type == 'Boolean')
            result[keys[i]] = randomBoolean();
        if (type == 'date' || type == 'Date')
            result[keys[i]] = randomDate();
        if (Array.isArray(type))
            result[keys[i]] = randomArray(type);
        if (typeof type === 'object' && type !== null && !Array.isArray(type))
            result[keys[i]] = generateData(type);
        if (type == null || type == 'Null')
            result[keys[i]] = null;
    }
    return result;
}

function findProperty(object, properties = {}) {
    let keys = Object.keys(properties);
    let values = Object.values(properties);

    for (let i = 0; i < keys.length; i++) {
        if (object.hasOwnProperty(keys[i]))
            object[keys[i]] = values[i];
    }
    return object;
}

export function mockResult(object, count = 1, properties = {}) {
    // let result: any = [];

    // let tServiceModel = {
    //     result: {},
    //     message: 'string',
    //     error: 'string',
    //     hasError: 'boolean',
    //     refrenceId: 'string',
    // };
    // let pageListModel = {
    //     indexFrom: 'number',
    //     pageIndex: 'number',
    //     pageSize: 'number',
    //     totalCount: 'number',
    //     totalPages: 'number',
    //     items: [],
    //     hasPreviousPage: 'boolean',
    //     hasNextPage: 'boolean',
    // };

    // let serviceResult: any;
    // let finalResult: any;

    // finalResult = generateData(tServiceModel);

    // if (count > 1) {
    //     serviceResult = generateData(pageListModel);
    //     for (let i = 0; i < count; i++) {
    //         result.push(generateData(object));
    //     }
    //     serviceResult.items = result;
    //     serviceResult.totalCount = count;
    //     serviceResult.totalPages = Math.ceil(count / 20);
    //     finalResult.result = serviceResult;

    // } else {
    //     finalResult.result = generateData(object)
    // }

    // return finalResult;
    let result: any = [];
    if (count > 1) {
        for (let i = 0; i < count; i++) {
            result.push(generateData(object));
            if (Object.keys(properties).length > 0){
                result[i] = findProperty(result[i], properties);
                 result.splice(result.indexOf(result[i]), 1, result[i]);
            }
        }
    } else {
        result = generateData(object);
        if (Object.keys(properties).length > 0)
            result = findProperty(result, properties);
    }


    return result;
}

export function mockPageListResult(object, count = 1, properties = {}) {
    let result: any = [];
    let finalResult: any;
    let tServiceModel = {
        result: {},
        message: 'string',
        error: 'string',
        hasError: 'boolean',
        refrenceId: 'string',
    };
    let pageListModel = {
        indexFrom: 'number',
        pageIndex: 'number',
        pageSize: 'number',
        totalCount: 'number',
        totalPages: 'number',
        items: [],
        hasPreviousPage: 'boolean',
        hasNextPage: 'boolean',
    };

    let serviceResult: any;
    finalResult = generateData(tServiceModel);
    serviceResult = generateData(pageListModel);
    for (let i = 0; i < count; i++) {
        result.push(generateData(object));
        if (Object.keys(properties).length > 0){
            result[i] = findProperty(result[i], properties);
             result.splice(result.indexOf(result[i]), 1, result[i]);
        }
    }
    serviceResult.items = result;

    if (Object.keys(properties).length > 0) {
        finalResult = findProperty(finalResult, properties);
        serviceResult = findProperty(serviceResult, properties);
    }

    Object.assign(finalResult.result, serviceResult);
    return finalResult;
}

export function mockTServiceResult(object, properties = {}) {
    let finalResult: any;
    let tServiceModel = {
        result: {},
        message: 'string',
        error: 'string',
        hasError: 'boolean',
        refrenceId: 'string',
    };


    finalResult = generateData(tServiceModel);

    if (Object.keys(properties).length > 0)
        finalResult = findProperty(tServiceModel, properties);

    Object.assign(finalResult.result, generateData(object));
    return finalResult;
}