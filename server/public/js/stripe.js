var stripe = Stripe('pk_test_q5kZTwbC59DtDohkcJtgDc04');
var elements = stripe.elements();
var style = {
  base: {
    fontSize: '22px',
    lineHeight: '22px',
  }
};
var card = elements.create('card', {style: style});
console.log(card, "this is card")


$(document).ready(function() {
    if($('#same-as-billing').prop("checked")) {
      $('#shipping-div').hide();
      console.log("it's checked")
    } 
    $('#same-as-billing').change(function(){
      console.log("else")
      $('#shipping-div').toggle();
    })
});


card.mount('#card-element')

card.addEventListener('change', function(event) {
  var displayError = document.getElementById('card-errors');
  if (event.error) {
    displayError.textContent = event.error.message;
  } else {
    displayError.textContent = '';
  }
});


var elem = $('#shipping-same');
console.log(elem)
console.log($(elem).prop())

var form = document.getElementById('payment-form');
form.addEventListener('submit', function(event) {
  event.preventDefault();

  stripe.createToken(card).then(function(result) {
    if (result.error) {
      var errorElement = document.getElementById('card-errors');
      errorElement.textContent = result.error.message;
    } else {
      console.log(result, "this is result")
      stripeTokenHandler(result.token);
    }
  });
});

function stripeTokenHandler(token) {
  console.log("inside handlers")
  var form = document.getElementById('payment-form');
  var hiddenInput = document.createElement('input');
  hiddenInput.setAttribute('type', 'hidden');
  hiddenInput.setAttribute('name', 'stripeToken');
  hiddenInput.setAttribute('value', token.id);
  form.appendChild(hiddenInput);

  form.submit();
}

