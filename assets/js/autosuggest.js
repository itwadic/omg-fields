export default function(input) {

    let xhr = false;

    input.addEventListener( 'keyup', (e) => {
        if ( 3 > e.target.value.length ) {
            return false;
        }

        xhr = getOptions( xhr, updateOptions, input.value );

    } );
    input.addEventListener( 'input', onAutoSuggestInput );

    const onAutoSuggestInput = (e) => {
        const input = e.target;
        const inputValue = input.value;
        const listName = input.getAttribute('list');
        const listOptions = document.getElementById(listName).childNodes

        const match = [].filter.call( listOptions, ( option ) => {
            return option.value === inputValue
        });

        if ( 0 === match.length ) {
            console.log( 'no match found' );
        } else {
            console.log('item selected: ' + match[0]);
        }
    }

    const getOptions = ( xhr, callback, value ) => {
        const query = buildQuery(value);
        const url = `${CustomizerCuration.baseURL}/wp-json/wp/v2/posts?search=${query}`;

        if ( xhr ) {
            xhr.abort();
        }

        xhr = new XMLHttpRequest();

    	xhr.addEventListener("load", (evt) => {
    		callback( false, evt );
    	}, false);

        xhr.onreadystatechange = function() {
            if ( xhr.readyState === 4 && isJSON( xhr.responseText ) ) {
                callback(false, { results: JSON.parse( xhr.responseText ), input: input } );
            } else {
                if ( xhr.responseText && isJSON( xhr.responseText ) ) {
                    callback( JSON.parse( xhr.responseText ), false );
                }
            }
        }

    	xhr.addEventListener("error", (evt) => {
    		callback( evt, false );
    	}, false);

    	xhr.addEventListener("abort", (evt) => {
    		callback( true, false );
    	}, false);

    	xhr.open('GET', url, true);
    	xhr.send();

        return xhr;
    }

    const updateOptions = ( error, response ) => {
        if ( error ) {

            if ( true === error ) {
                return false;
            }

            console.warn( error );
        }

        if ( response ) {
            if ( ! Array.isArray( response.results ) ) {
                return false;
            }

            const results = response.results.map( (post) => post.title.rendered );
            createOptions( results, response.input );
        }
    }

    const createOptions = ( results, input ) => {
        const listName = input.getAttribute('list');
        const datalist = document.getElementById(listName);

        const newOptions = results.reduce( (acc, result) => {
            const option = createOption( result );
            return acc.concat( option );
        }, '' );

        datalist.innerHTML = newOptions;
    }

    const createOption = (value) => {
        return `<option value="${value}">`;
    }

    const isJSON = (str) => {

        if( typeof( str ) !== 'string' ) {
            return false;
        }
        try {
            JSON.parse(str);
            return true;
        } catch (e) {
            return false;
        }
    }

    const buildQuery = (value) => {
        return encodeURIComponent(value.toLowerCase());
    }
}
