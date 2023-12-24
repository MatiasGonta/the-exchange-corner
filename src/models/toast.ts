export enum ToastStatus {
    SUCCESS = 'SUCCESS',
    ALERT = 'ALERT',
    ERROR = 'ERROR'
}

export type ToastConfig = {
    show: boolean,
    status: ToastStatus,
    text: string,
}
