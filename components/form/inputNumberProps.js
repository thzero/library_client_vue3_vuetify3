export const useVuetifyNumberInputProps = {
    blur: {
        type: Function,
        default: () => {}
    },
    min: {
        type: Number,
        default: null
    },
    max: {
        type: Number,
        default: null
    },
    negativeColor: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        default: 'decimal'
    }
};
