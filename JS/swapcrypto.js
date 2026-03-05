 document.addEventListener('DOMContentLoaded', () => {
            // Theme toggle functionality
            const themeToggle = document.getElementById('theme-toggle');
            const body = document.body;
            
            // Check for saved theme preference
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'light') {
                body.classList.remove('dark-theme');
                themeToggle.checked = false;
            } else {
                body.classList.add('dark-theme');
                themeToggle.checked = true;
            }
            
            // Theme toggle event listener
            themeToggle.addEventListener('change', () => {
                body.classList.toggle('dark-theme');
                
                // Save theme preference
                if (body.classList.contains('dark-theme')) {
                    localStorage.setItem('theme', 'dark');
                } else {
                    localStorage.setItem('theme', 'light');
                }
            });
            
            // Fake exchange rates for demo
            const EXCHANGE_RATES = {
                'ETH_BTC': 0.05234,
                'BTC_ETH': 19.106,
                'ETH_USDT': 3245.60,
                'USDT_ETH': 0.000308,
                'BTC_USDT': 69880,
                'USDT_BTC': 0.00001431,
                'SOL_USDT': 142.65,
                'USDT_SOL': 0.00701,
                'BNB_USDT': 578.42,
                'USDT_BNB': 0.001729
            };
            
            // DOM Elements
            const fromAmount = document.getElementById('fromAmount');
            const fromCurrency = document.getElementById('fromCurrency');
            const toAmount = document.getElementById('toAmount');
            const toCurrency = document.getElementById('toCurrency');
            const exchangeRate = document.getElementById('exchange-rate');
            const swapBtn = document.getElementById('swap-btn');
            const swapCurrenciesBtn = document.getElementById('swap-currencies');
            
            // Update exchange rate and calculate output
            function updateExchange() {
                const from = fromCurrency.value;
                const to = toCurrency.value;
                const amount = parseFloat(fromAmount.value) || 0;
                
                // Get exchange rate
                const rateKey = `${from}_${to}`;
                const rate = EXCHANGE_RATES[rateKey] || 0;
                
                // Calculate output amount
                const outputAmount = (amount * rate).toFixed(5);
                
                // Update UI
                toAmount.value = outputAmount;
                exchangeRate.textContent = `1 ${from} = ${rate.toLocaleString()} ${to}`;
                
                // Enable/disable swap button
                swapBtn.disabled = amount <= 0 || rate === 0;
            }
            
            // Event listeners
            fromAmount.addEventListener('input', updateExchange);
            fromCurrency.addEventListener('change', updateExchange);
            toCurrency.addEventListener('change', updateExchange);
            
            // Swap currencies button
            swapCurrenciesBtn.addEventListener('click', () => {
                // Swap currency selections
                const temp = fromCurrency.value;
                fromCurrency.value = toCurrency.value;
                toCurrency.value = temp;
                
                // Swap amounts (approximately)
                const tempAmount = fromAmount.value;
                fromAmount.value = toAmount.value;
                toAmount.value = tempAmount;
                
                // Update exchange rate
                updateExchange();
                
                // Visual feedback
                swapCurrenciesBtn.style.transform = 'rotate(180deg)';
                setTimeout(() => {
                    swapCurrenciesBtn.style.transform = 'rotate(0deg)';
                }, 300);
            });
            
            // Swap button action
            swapBtn.addEventListener('click', () => {
                const from = fromCurrency.value;
                const to = toCurrency.value;
                const amount = fromAmount.value;
                
                if (amount <= 0) {
                    alert('Please enter a valid amount to swap.');
                    return;
                }
                
                // Show confirmation
                const confirmed = confirm(
                    `Are you sure you want to swap ${amount} ${from} for approximately ${toAmount.value} ${to}?\n\n` +
                    `Network fee: $3.89\n` +
                    `Processing time: 15-30 seconds`
                );
                
                if (confirmed) {
                    // Simulate swap
                    alert(`✅ Swap initiated successfully!\n\nYour transaction is being processed and will be completed shortly.`);
                    
                    // Add to recent swaps (simulated)
                    const now = new Date();
                    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    
                    // Reset form
                    fromAmount.value = '1';
                    updateExchange();
                }
            });
            
            // Initialize
            updateExchange();
            
            // Show notification badge
            setTimeout(() => {
                document.querySelector('.notification-badge').style.display = 'block';
            }, 2000);
        });