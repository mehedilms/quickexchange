// script.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('currency-form');
    const amountInput = document.getElementById('amount');
    const fromCurrencySelect = document.getElementById('from-currency');
    const toCurrencySelect = document.getElementById('to-currency');
    const resultDiv = document.getElementById('result');

    const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'];

    currencies.forEach(currency => {
        const option1 = document.createElement('option');
        option1.value = currency;
        option1.textContent = currency;
        fromCurrencySelect.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = currency;
        option2.textContent = currency;
        toCurrencySelect.appendChild(option2);
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const amount = amountInput.value;
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;

        if (amount === '' || isNaN(amount)) {
            alert('Please enter a valid amount.');
            return;
        }

        const conversionResult = await convertCurrency(amount, fromCurrency, toCurrency);
        resultDiv.textContent = `${amount} ${fromCurrency} = ${conversionResult} ${toCurrency}`;
    });

    async function convertCurrency(amount, fromCurrency, toCurrency) {
        const apiKey = 'e7906fbe5e00d9575af8363c';  // Replace with your API key
        const url = ` https://v6.exchangerate-api.com/v6/e7906fbe5e00d9575af8363c/latest/USD`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            const rate = data.conversion_rates[toCurrency];
            const convertedAmount = (amount * rate).toFixed(2);
            return convertedAmount;
        } catch (error) {
            console.error('Error fetching exchange rates:', error);
            alert('Unable to fetch exchange rates. Please try again later.');
        }
    }
});
``
