const REENUM_FLAG = Symbol('__REENUMED__');
const REENUM_LIST = Symbol('__REENUM_LIST__');

/** 给enum对象注入反向映射 */
export function reEnum(enumObject: Record<string, unknown>) {
    if ((<unknown>enumObject)[REENUM_FLAG]) return enumObject;
    Object.keys(enumObject).forEach((k) => {
        const valKey = enumObject[k];
        if (valKey === k) return;
        if (typeof valKey !== 'string') return;
        if (Object.hasOwn(enumObject, valKey)) {
            console.error(
                `enumObject value ${valKey} is already exists in ${valKey} key, please recheck`,
            );
            return;
        }
        if (!(<unknown>enumObject)[REENUM_LIST]) {
            (<unknown>enumObject)[REENUM_LIST] = [];
        }
        (<unknown>enumObject)[REENUM_LIST].push(valKey);
        enumObject[valKey] = k;
    });
    (<unknown>enumObject)[REENUM_FLAG] = true;
}

/** 将一个enum对象转成下拉选项 */
export function convertEnum2Options(enumObject: Record<string, string>) {
    let keys = Object.keys(enumObject).filter(
        (v) =>
            typeof v !== 'number' &&
            !(<unknown>enumObject)[REENUM_LIST]?.includes(v),
    );
    return keys.map((v) => ({
        label: v,
        value: enumObject[v],
    }));
}
