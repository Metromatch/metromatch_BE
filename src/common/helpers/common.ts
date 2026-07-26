import jwt from 'jsonwebtoken';

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

const getProfileIdFromRequest = (req: any) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken: any = jwt.decode(token);
    const profileId = decodedToken.profileId;
    return profileId;
}

export { CommonHelper, getProfileIdFromRequest }