/**
 * Prepare the data for the pie chart
 * @param {*} data 
 * @returns 
 */
export const prepareData = (data = []) => {
    const transformData = [
        { name: 'Force', value: data?.force },
        { name: 'Intelligence', value: data?.intelligence },
        { name: 'Energy', value: data?.energy },
        { name: 'Speed', value: data?.speed },
        { name: 'Durability', value: data?.durability },
        { name: 'Fighting', value: data?.fighting }
    ];

    // Remove the elements with undefined values
    return transformData.filter((element) => { return element.value !== undefined; });
}