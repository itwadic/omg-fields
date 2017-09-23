export default function( parent, hiddenInput ) {
    const hiddenEl = parent.querySelector(hiddenInput);

    const getCurrentValue = () => JSON.parse( hiddenEl.value );

    const addValue = (value) => {
        const currentValue = getCurrentValue();
        return currentValue.concat( value );
    }

    const removeValue = (value) => {
        const currentValue = getCurrentValue();
        return currentValue.filter( (current) => current !== value );
    }

    return {
        add: function(value) {
            hiddenEl.value = JSON.stringify(addValue(value));
        },
        remove: function(value) {
            hiddenEl.value = JSON.stringify(removeValue(value));
        },
        update: function(values) {
            hiddenEl.value = JSON.stringify(values);
        }
    }
}
