export interface GenericObserver<NotifyObjectType> {
    notify(notifyObject: NotifyObjectType): void;
}
