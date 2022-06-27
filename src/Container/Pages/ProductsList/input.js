import { log } from '@Utils'
const INPUT_LIST = (addons) => [...addons.map(({ list, name }) => ({
    name: name,
    value: '',
    type: 'listRadio',
    inputProps: {
        label: `Pilh ${name}`,
        placeholder: '* Pilih salah satu',
    },
    config: {
        data: list.map(({ name, price }) => ({ code: name, description: price, prefix: 'Rp.', suffix: ',-' }))
    },
})),
{
    name: 'Catatan',
    value: '',
    type: 'textArea',
    inputProps: {
        label: 'Catatan',
        placeholder: 'Tulis catatan',
        maxLength: 100,
    },
}]
// [
//     {
//         name: 'Ukuran',
//         value: '',
//         type: 'listRadio',
//         inputProps: {
//             label: 'Pilh Ukuran',
//             placeholder: '* Pilih salah satu',
//         },
//         config: {
//             data: [
//                 { code: 'Regular', description: 'Gratis' },
//                 { code: 'Large', description: '+ Rp 5.000' },
//             ]
//         },
//     },
//     {
//         name: 'Extra',
//         value: '[]',
//         type: 'listCheck',
//         inputProps: {
//             label: 'Level Es',
//             placeholder: '* Opsional • Maksimal 4',
//         },
//         config: {
//             data: [
//                 { code: 'Extra Cocout Jelly', description: '+ Rp 5.000' },
//                 { code: 'Extra Sugar Syrup', description: 'Gratis' },
//             ]
//         },
//     },
//     {
//         name: 'Catatan',
//         value: '',
//         type: 'textArea',
//         inputProps: {
//             label: 'Catatan',
//             placeholder: 'Tulis catatan',
//             maxLength: 100,
//         },
//     },
// ];

const FORM_NAME = 'kastemProdukForm';
export { INPUT_LIST, FORM_NAME }