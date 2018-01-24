import flatpickr from 'flatpickr';

export default function() {
  const datepickers = document.querySelectorAll('.datepicker-input');

  if (!datepickers) {
    return false;
  }

  [].forEach.call(datepickers, dateField => {
    const currentDate = dateField.dataset.date;

    flatpickr(dateField, {
      altInput: true,
      altFormat: 'F j, Y',
      dateFormat: 'U',
      defaultDate: !currentDate ? '' : currentDate,
    });
  });
}
