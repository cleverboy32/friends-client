import { useMemo } from 'react';

interface Option {
    label: string;
    value: string | number;
}

// 辅助函数：从 const enum 生成选项
const createOptionsFromEnum = (
    enumObj: Record<string, string | number>,
): Option[] => {
    return Object.keys(enumObj).map((key) => ({
        label: key,
        value: key,
    }));
};

export const useOptions = () => {
    const categoryOptions = useMemo<Option[]>(() => {
        return [
            { label: '全部', value: '全部' },
            { label: '美食', value: '美食' },
            { label: '运动', value: '运动' },
            { label: '学习', value: '学习' },
            { label: '娱乐', value: '娱乐' },
            { label: '其他', value: '其他' },
        ];
    }, []);

    const timeOptions = useMemo<Option[]>(() => {
        return [
            { label: '全部', value: '全部' },
            { label: '一周内', value: '一周内' },
            { label: '一个月内', value: '一个月内' },
        ];
    }, []);

    const distanceOptions = useMemo<Option[]>(() => {
        return [
            { label: '全部', value: '全部' },
            { label: '五百米', value: '五百米' },
            { label: '一千米', value: '一千米' },
            { label: '三千米', value: '三千米' },
        ];
    }, []);

    const peopleOptions = useMemo<Option[]>(() => {
        return [
            { label: '全部', value: '全部' },
            { label: '1-3人', value: '1-3人' },
            { label: '4-9人', value: '4-9人' },
            { label: '10人以上', value: '10人以上' },
        ];
    }, []);

    return {
        categoryOptions,
        timeOptions,
        distanceOptions,
        peopleOptions,
    };
};
