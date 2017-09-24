export const onAutoSuggestInput = (e) => {
    const input = e.target;
    const inputValue = input.value;
    const listName = input.getAttribute('list');
    const listOptions = document.getElementById(listName).childNodes

    const match = [].reduce.call( listOptions, ( acc, option ) => {
        if ( option.value === inputValue ) {
            return acc.concat({
                id: option.dataset.id,
                title: option.value
            }) ;
        }
        return acc;
    }, []);

    return ( 0 === match.length ) ? false :  match[0];
}

export const getOptions = ( xhr, callback, input, endpoint ) => {
    const spinner = input.nextElementSibling;
    const query = buildQuery(input.value);
    const url = endpoint + query;

    if ( xhr ) {
        xhr.abort();
    }

    xhr = new XMLHttpRequest();

    xhr.addEventListener("load", (evt) => {
        callback( false, evt );
    }, false);

    xhr.onreadystatechange = function() {
        if ( xhr.readyState === 4 && isJSON( xhr.responseText ) ) {
            callback(false, { results: JSON.parse( xhr.responseText ), input: input, spinner: spinner } );
        } else {
            if ( xhr.responseText && isJSON( xhr.responseText ) ) {
                callback( { message: JSON.parse( xhr.responseText ), spinner: spinner }, false );
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

export const buildEndpoint = (args) => {
    const data = Object.assign({ apiVersion: 'wp/v2', resource: 'posts' }, args);
    return `${OMGFields.baseURL}/wp-json/${data.apiVersion}/${data.resource}?search=`;
}

export const updateOptions = ( error, response ) => {
    if ( error ) {

        if ( true === error ) {
            return false;
        }

        error.spinner.classList.remove('show');
        console.warn( error );
    }

    if ( response ) {
        if ( ! Array.isArray( response.results ) ) {
            return false;
        }

        createOptions( response.results, response.input, response.spinner );
    }
}

const createOptions = ( results, input, spinner ) => {
    const listName = input.getAttribute('list');
    const datalist = document.getElementById(listName);

    const newOptions = results.reduce( (acc, result) => {
        const option = createOption( result );
        return acc.concat( option );
    }, '' );

    spinner.classList.remove('show');
    datalist.innerHTML = newOptions;
}

const createOption = (value) => {
    return `<option data-id=${value.id} value="${value.title.rendered}">`;
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
