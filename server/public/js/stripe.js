var stripe = Stripe('pk_test_Y1S2xaRAcqVc2rWVVmVdaLwK');

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
  console.log("inside handler")
  var shipping = true;
  if($('#same-as-billing').prop('checked') != true){
    shipping = false;
  }
  var form = document.getElementById('payment-form');
  var hiddenInput = document.createElement('input');
  var checkedInput = document.createElement('input');
  hiddenInput.setAttribute('type', 'hidden');
  hiddenInput.setAttribute('name', 'stripeToken');
  hiddenInput.setAttribute('value', token.id);

  checkedInput.setAttribute('type', 'hidden');
  checkedInput.setAttribute('name', 'isChecked');
  checkedInput.setAttribute('value', shipping);

  form.appendChild(hiddenInput);
  form.appendChild(checkedInput);

  form.submit();
}

