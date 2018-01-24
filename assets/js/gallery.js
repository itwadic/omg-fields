import list from './list';
import hidden from './serialized-input';
import {
  removeItems,
  dragItems,
  onDragImage,
  onRemoveImage,
} from './utilities';

export default function() {
  const gallerySections = document.querySelectorAll('.gallery-wrapper');

  if (!gallerySections) {
    return false;
  }

  [].forEach.call(gallerySections, gallery => {
    const addImage = gallery.querySelector('.add-gallery-images');
    const Hidden = hidden(gallery, '.image-gallery-hidden');

    const remove = removeItems(Hidden, onRemoveImage);
    const drag = dragItems(Hidden, onDragImage);
    const List = list(gallery, {
      list: '.gallery-images',
      onDrag: drag,
      onRemove: remove,
      listTemplate: imageItem,
    });

    const mediaFrame = wp.media({
      title: 'Choose Media',
      button: {
        text: 'Use Selected Media',
      },
      multiple: true,
    });

    addImage.addEventListener('click', event => {
      event.preventDefault();
      mediaFrame.open();
    });

    mediaFrame.on('select', function() {
      const attachments = mediaFrame
        .state()
        .get('selection')
        .toJSON();

      attachments.forEach(attachment => {
        List.add(attachment);
        Hidden.add(attachment.id);
      });
    });
  });
}

const imageItem = image => {
  return `<li class="gallery-image-item"><span class="gallery-iamge-id">${
    image.id
  }</span><img src="${
    image.url
  }" class="gallery-image"/><span><svg class="remove-gallery-image" viewBox="0 0 20 20">
  <path d="M10 2c4.42 0 8 3.58 8 8s-3.58 8-8 8-8-3.58-8-8 3.58-8 8-8zM15 13l-3-3 3-3-2-2-3 3-3-3-2 2 3 3-3 3 2 2 3-3 3 3z"></path>
</svg></span></li>`;
};
