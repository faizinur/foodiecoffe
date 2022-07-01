const INPUT_LIST = [
    {
        name: 'name',
        value: '',
        type: 'text',
        inputProps: {
            label: 'Nama Lengkap',
            placeholder: 'Nama Lengkap',
        },
        controllerProps: {
            rules: {
                required: {
                    value: false,
                    message: 'Input Nama Lengkap diperlukan',
                },
            }
        }
    },
    {
        name: 'username',
        value: '',
        type: 'text',
        inputProps: {
            label: 'Nama Pengguna',
            placeholder: 'Nama Pengguna',
        },
        controllerProps: {
            rules: {
                required: {
                    value: false,
                    message: 'Input Nama Pengguna diperlukan',
                },
            }
        }
    },
    {
        name: 'email',
        value: '',
        type: 'text',
        inputProps: {
            label: 'Email',
            placeholder: 'Email',
        },
        controllerProps: {
            rules: {
                required: {
                    value: false,
                    message: 'Input Email diperlukan',
                },
            }
        }
    },
    {
        name: 'noHP',
        value: '',
        type: 'text',
        inputProps: {
            label: 'noHP',
            placeholder: 'noHP',
            keyboardType: 'phone-pad',
        },
        controllerProps: {
            rules: {
                required: {
                    value: false,
                    message: 'Input noHP diperlukan',
                },
            }
        }
    },
    {
        name: 'password',
        value: '',
        type: 'text',
        inputProps: {
            secureTextEntry: true,
            label: 'password',
            placeholder: 'password',
        },
        controllerProps: {
            rules: {
                required: {
                    value: false,
                    message: 'Input username diperlukan',
                },
            }
        }
    },
    {
        name: 'gender',
        value: '',
        type: 'radio',
        inputProps: {
            label: 'jenis Kelamin',
            placeholder: 'jenis Kelamin',
        },
        config: {
            data: [
                { code: 'L', description: 'Laki-Laki' },
                { code: 'P', description: 'Perempuan' },
            ],
        },
        controllerProps: {
            rules: {
                required: {
                    value: false,
                    message: 'Input jenis Kelamin diperlukan',
                },
            }
        }
    },
];
const FORM_NAME = 'profileForm';
export { INPUT_LIST, FORM_NAME }