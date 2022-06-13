const INPUT_LIST = [
    {
        name: 'NamaPerusahaan',
        value: '',
        type: 'text',
        inputProps: {
            label: 'Nama Perusahaan',
            placeholder: 'Nama Perusahaan',
        },
        controllerProps: {
            rules: {
                required: {
                    value: false,
                    message: 'Input Nama Perusahaan diperlukan',
                },
            }
        }
    },
    {
        name: 'namaPengguna',
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
        name: 'kategoriBisnis',
        value: '',
        type: 'dropdown',
        inputProps: {
            label: 'Kategori Bisnis',
            placeholder: 'Kategori Bisnis',
        },
        config: {
            data: [
                { code: 'Restoran', description: 'Restoran' },
                { code: 'Rumah Makan', description: 'Rumah Makan' },
            ]
        },
        controllerProps: {
            rules: {
                required: {
                    value: false,
                    message: 'Input Kategori Bisnis diperlukan',
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
const FORM_NAME = 'registerForm';
export { INPUT_LIST, FORM_NAME }