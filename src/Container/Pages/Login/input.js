const INPUT_LIST = [
    {
        name: 'email',
        value: '',
        type: 'text',
        inputProps: {
            label: 'email',
            placeholder: 'email',
        },
        controllerProps: {
            rules: {
                required: {
                    value: true,
                    message: 'Input email diperlukan',
                },
                pattern: {
                    value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Email tidak valid'
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
                    value: true,
                    message: 'Input username diperlukan',
                },
            }
        }
    },
];
const FORM_NAME = 'loginForm';
export { INPUT_LIST, FORM_NAME }