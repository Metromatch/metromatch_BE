// helpet function which returns options with label and value
class CommonHelper {
    getOptions(enumObj: any, enumLabels: any): any[] {
        return Object.keys(enumObj).map((key) => {
            return {
                value: enumObj[key],
                label: enumLabels[enumObj[key]],
            };
        });
    }
}

export { CommonHelper }