// defines cognito Pool callback
export interface CognitoCallback {
    error(errorMessage: string):void;
    success(message: string, result: any):void;
}