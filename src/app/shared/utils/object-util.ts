import { cloneDeep } from 'lodash-es';

export class ObjectUtil {

    public static makeBackupOfObject<T extends object>(originalObj: T): T {
        var backupObj = {} as T;
        backupObj = cloneDeep(originalObj);
        return backupObj;
    }

    public static copyAttributes<T extends object>(originalObj: T, copyObj: T): void {

        Object.keys(originalObj).forEach((key) => {
            copyObj[key] = originalObj[key];
        })

    }

}
