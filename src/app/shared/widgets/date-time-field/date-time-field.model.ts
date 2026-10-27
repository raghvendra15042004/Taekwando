export interface DateTimeFieldType {
    name: any;
    text: string;
    type: number;
    range: number;
    decimalPrecisionValue: number;
    mandatory: boolean;
    disabled: boolean;
    pattern: string;
    hidden: boolean;
    defaultTodayDate: boolean;
    requiredISODate: boolean;
    isDesabledFutureDate: boolean;
    isDisabledPastDate: boolean;
    format: string;
    allowUserToEdit: boolean;
    properties: {
        defaultValue: string;
    };
    readonly: boolean;
    showClearBtn: boolean;
    options: {
        showMeridian: boolean;
    };
    listeners: ListenerType;
}

interface ListenerType {
    "change": {
        "methodName": string;
    };
    "onClose": {
        "methodName": string;
    };
    "onLoad": boolean;
}