const INPUT_LIST = [
    {
        name: 'Ukuran',
        value: '',
        type: 'listRadio',
        inputProps: {
            label: 'Pilh Ukuran',
            placeholder: '* Pilih salah satu',
        },
        config: {
            data: [
                { code: 'Regular', description: 'Gratis' },
                { code: 'Large', description: '+ Rp 5.000' },
            ]
        },
    },
    {
        name: 'iceLevel',
        value: '',
        type: 'listRadio',
        inputProps: {
            label: 'Level Es',
            placeholder: '* Pilih salah satu',
        },
        config: {
            data: [
                { code: 'Sedikit', description: 'Gratis' },
                { code: 'Normal', description: 'Gratis' },
            ]
        },
    },
    {
        name: 'Extra',
        value: '[]',
        type: 'listCheck',
        inputProps: {
            label: 'Level Es',
            placeholder: '* Opsional • Maksimal 4',
        },
        config: {
            data: [
                { code: 'Extra Cocout Jelly', description: '+ Rp 5.000' },
                { code: 'Extra Sugar Syrup', description: 'Gratis' },
                { code: 'Extra Expresso Shot', description: '+ Rp 5.000' },
                { code: 'Extra Grass Jelly', description: '+ Rp 4.000' },
                { code: 'Extra Oreo', description: '+ Rp 6.000' },
            ]
        },
    },
    {
        name: 'Catatan',
        value: '',
        type: 'textArea',
        inputProps: {
            label: 'Catatan',
            placeholder: 'Tulis catatan',
            maxLength: 100,
        },
    },
];
const FORM_NAME = 'kastemProdukForm';
export { INPUT_LIST, FORM_NAME }