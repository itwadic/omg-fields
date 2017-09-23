import baseCss from '../css/index.css';
import textList from './textList';

function imageUploads() {
	var featuredImageWrap = document.querySelectorAll('.custom-media-upload');

	if ( featuredImageWrap.length === 0 ) {
		return;
	}

	[].map.call( featuredImageWrap, function(item) {
		// var ImageWrapId = item.attribute.id;
		var removeImage = item.querySelector('.remove-image');
		var replaceImage = item.querySelector('.replace-image');
		var setImage = item.querySelector('.set-image');
		var featuredImageTag = item.querySelector('a.replace-image img');
		var featuredImageID = item.querySelector('input[type="hidden"]');
		var mediaFrame = wp.media({
			title: 'Choose Media',
			button: {
				text: 'Use Selected Media'
			},
			multiple: false
		});

		mediaFrame.on('select', function() {
			var attachment = mediaFrame.state().get('selection').first().toJSON();

			item.classList.toggle('has-image');
			featuredImageID.value = attachment.id;
			if (attachment.hasOwnProperty('sizes')) {
				featuredImageTag.setAttribute('src', attachment.sizes.thumbnail.url);
			} else {
				featuredImageTag.setAttribute('src', attachment.icon);
			}

		});

		removeImage.addEventListener('click', function(event) {
			event.preventDefault();
			item.classList.toggle('has-image');
			featuredImageTag.setAttribute('src', '');
			featuredImageID.value = '';
		});

		replaceImage.addEventListener('click', function(event) {
			event.preventDefault();
			mediaFrame.open();
		});

		setImage.addEventListener('click', function(event) {
			event.preventDefault();
			mediaFrame.open();
		});
	});
};

const createListItem = (value) => {
    return `<li class="text-list-item">
        <span>${value}</span>
        <svg viewBox="0 0 20 20">
            <path d="M10 2c4.42 0 8 3.58 8 8s-3.58 8-8 8-8-3.58-8-8 3.58-8 8-8zM15 13l-3-3 3-3-2-2-3 3-3-3-2 2 3 3-3 3 2 2 3-3 3 3z"></path>
        </svg>
    </li>`;
}

document.addEventListener( 'DOMContentLoaded', function() {
  imageUploads();
  textList( {
	  parent: '.text-list',
	  button: '.text-list-add',
	  list: '.text-list-list',
	  hidden: '.text-list-hidden',
	  listTemplate: createListItem
  } );
} );
