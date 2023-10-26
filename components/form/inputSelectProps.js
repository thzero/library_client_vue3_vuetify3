export const useVuetifySelectInputProps = {
    items: {
        type: [Object, Array],
        default: null
    },
    itemProps: {
        type: String,
        default: 'subtitle'
    },
    itemTitle: {
        type: String,
        default: 'name'
    },
    itemValue: {
        type: String,
        default: 'id'
    },
    multiple: {
        type: Boolean,
        default: false
    }
};
