// helpet function which returns options with label and value
class CommonHelper {
    getOptions(enumObj: any, enumLabels: any, config?: {}): any[] {
        return Object.keys(enumObj).map((key) => {
            return {
                value: enumObj[key],
                label: enumLabels[enumObj[key]],
                ...config ? config[enumObj[key]] : {}
            };
        });
    }
}

export { CommonHelper }