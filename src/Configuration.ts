export class Configuration {
    static singleton: Configuration = new Configuration();

    isViewer(): boolean {
        return false;
    }

    showLogger(): boolean {
        return false;
    }

    isWebsite(): boolean {
        return false;
    }
}