// Listen for submit

document.getElementById('loan-form').addEventListener('submit' , function(e){
    
    // Hide results
    document.getElementById('results').style.display = 'none';
    
    
    // showLoader
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults , 2000)

    e.preventDefault();
});

// calculate results

function calculateResults(e) {
    console.log("submitted!!");  

    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');

    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalinterest = document.getElementById('total-interest');

    const principal =  parseFloat(amount.value); 
    const calculatedInterest = parseFloat(interest.value)/100/12;
    const calculatedPayment = parseFloat(years.value)*12; 

    // compute monthlyPayment
    const x = Math.pow(1 + calculatedInterest , calculatedPayment); 
    const monthly = (principal*x*calculatedInterest)/(x-1);

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly *calculatedPayment).toFixed(2);
        totalinterest.value = ((monthly*calculatedPayment) - principal).toFixed(2);

        // Display Results 
        document.getElementById('results').style.display = 'block';

        // hide loader
        document.getElementById('loading').style.display = 'none';
    }else{
        showError('Please Check Your Numbers !!!');
        document.getElementById('loading').style.display = 'none';
    }



   
}


// showError
function showError(error) {
    // create a div
    const errorDiv = document.createElement('div');

    // Get elements
    const card = document.querySelector('.card');
    const headings = card.querySelector('.heading')


    // adding class
    errorDiv.className = 'alert alert-danger';

    errorDiv.appendChild(document.createTextNode(error))

    // insert error above heading
    card.insertBefore(errorDiv , headings);

    // Clear errror after three seconds
    setTimeout(clearError , 3000);


}

// clear error
function clearError() {
    document.querySelector('.alert').remove();
}

