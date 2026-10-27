export interface DateFieldType {
    name: any;
    text: string;
    mandatory: boolean;
    disabled: boolean;
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
    minDate: {};
    maxDate: {};
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