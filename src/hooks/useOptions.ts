export const useOptions = () => {
    const categoryOptions = [
        { label: '线上', value: 'ONLINE' },
        { label: '线下', value: 'OFFLINE' },
    ];

    const timeOptions = [
        { label: '近七天', value: '7' },
        { label: '近十五天', value: '15' },
        { label: '近一月', value: '30' },
    ];

    const distanceOptions = [
        { label: '五百米', value: '500' },
        { label: '一千米', value: '1000' },
        { label: '三千米', value: '3000' },
    ];

    return {
        categoryOptions,
        timeOptions,
        distanceOptions,
    };
};
