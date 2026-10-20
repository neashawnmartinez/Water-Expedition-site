(function () {
  var PHONE = '5016542660';
  var EMAIL = 'WaterExpedition@gmail.com';
  var $ = function (id) { return document.getElementById(id); };

  function check(ids, msgEl) {
    var bad = ids.filter(function (id) {
      var ok = $(id).value.trim() !== '';
      $(id).classList.toggle('invalid', !ok);
      return !ok;
    });
    if (bad.length) { msgEl.textContent = 'Please fill in the highlighted fields.'; $(bad[0]).focus(); return false; }
    msgEl.textContent = '';
    return true;
  }
  function mail(subject, body) {
    window.location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  }

  // ----- Booking page -----
  var bf = $('book-form');
  if (bf) {
    var trip = new URLSearchParams(window.location.search).get('trip');
    if (trip) $('trip').value = trip;
    $('date').min = new Date().toISOString().split('T')[0];
    var via = 'email';
    bf.querySelectorAll('button[type=submit]').forEach(function (b) {
      b.addEventListener('click', function () { via = b.getAttribute('data-via'); });
    });
    bf.addEventListener('submit', function (ev) {
      ev.preventDefault();
      if (!check(['trip', 'date', 'size', 'name', 'phone'], $('form-msg'))) return;
      var text = 'Hello Water Expedition, I would like to book a trip.\n\n' +
        'Experience: ' + $('trip').value + '\n' +
        'Date: ' + $('date').value + '\n' +
        'Group size: ' + $('size').value + '\n' +
        'Name: ' + $('name').value + '\n' +
        'Phone: ' + $('phone').value + '\n' +
        ($('email').value ? 'Email: ' + $('email').value + '\n' : '') +
        ($('notes').value ? 'Notes: ' + $('notes').value + '\n' : '');
      if (via === 'whatsapp') window.open('https://wa.me/' + PHONE + '?text=' + encodeURIComponent(text), '_blank');
      else mail('Booking request: ' + $('trip').value, text);
    });
  }

  // ----- Reviews page -----
  var rf = $('review-form');
  if (rf) rf.addEventListener('submit', function (ev) {
    ev.preventDefault();
    if (!check(['r-name', 'r-trip', 'r-text'], $('review-msg'))) return;
    mail('New review from ' + $('r-name').value,
      'Name: ' + $('r-name').value + '\nTrip: ' + $('r-trip').value + '\nRating: ' + $('r-rating').value + '/5\n\n' + $('r-text').value);
  });

  // ----- Contact page -----
  var cf = $('contact-form');
  if (cf) cf.addEventListener('submit', function (ev) {
    ev.preventDefault();
    if (!check(['c-name', 'c-reach', 'c-text'], $('contact-msg'))) return;
    mail('Message from ' + $('c-name').value,
      'Name: ' + $('c-name').value + '\nContact: ' + $('c-reach').value + '\n\n' + $('c-text').value);
  });
})();
