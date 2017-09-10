export interface IGroupLogger {
    startGroup(groupName: string);
    endGroup(groupName: string);
    log(message: string);
}