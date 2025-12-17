 // DOM Elements
        const darkModeToggle = document.getElementById('darkModeToggle');
        const sunIcon = document.querySelector('.fa-sun');
        const moonIcon = document.querySelector('.fa-moon');
        const modeOptions = document.querySelectorAll('.mode-option');
        const purchaseMode = document.querySelector('.purchase-mode');
        const donationMode = document.getElementById('donationMode');
        const purchaseOptions = document.querySelectorAll('.purchase-option');
        const customAmount = document.getElementById('customAmount');
        const customAmountInput = document.getElementById('customAmountInput');
        const donationAmount = document.getElementById('donationAmount');
        const donationSuggestions = document.querySelectorAll('.donation-suggestion');
        const discountCode = document.getElementById('discountCode');
        const applyDiscount = document.getElementById('applyDiscount');
        const discountInfo = document.getElementById('discountInfo');
        const savedAmount = document.getElementById('savedAmount');
        const planPrice = document.getElementById('planPrice');
        const discountSummary = document.getElementById('discountSummary');
        const discountValue = document.getElementById('discountValue');
        const totalPrice = document.getElementById('totalPrice');
        const payButtonAmount = document.getElementById('payButtonAmount');
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const secondPassword = document.getElementById('secondPassword');
        const togglePassword = document.getElementById('togglePassword');
        const toggleSecondPassword = document.getElementById('toggleSecondPassword');
        const cardName = document.getElementById('cardName');
        const cardNumber = document.getElementById('cardNumber');
        const expiryDate = document.getElementById('expiryDate');
        const cvv = document.getElementById('cvv');
        const captcha = document.getElementById('captcha');
        const captchaDisplay = document.getElementById('captchaDisplay');
        const captchaRefresh = document.getElementById('captchaRefresh');
        const payButton = document.getElementById('payButton');
        const successOverlay = document.getElementById('successOverlay');
        const continueButton = document.getElementById('continueButton');
        const minimalCard = document.getElementById('minimalCard');
        
        // Preview elements
        const previewCardNumber = document.getElementById('previewCardNumber');
        const previewCardName = document.getElementById('previewCardName');
        const previewCardExpiry = document.getElementById('previewCardExpiry');

        // Error message elements
        const emailError = document.getElementById('emailError');
        const emailSuccess = document.getElementById('emailSuccess');
        const passwordError = document.getElementById('passwordError');
        const secondPasswordError = document.getElementById('secondPasswordError');
        const nameError = document.getElementById('nameError');
        const numberError = document.getElementById('numberError');
        const expiryError = document.getElementById('expiryError');
        const cvvError = document.getElementById('cvvError');
        const captchaError = document.getElementById('captchaError');

        // Form validation state
        let formIsValid = {
            email: false,
            password: false,
            secondPassword: false,
            name: false,
            number: false,
            expiry: false,
            cvv: false,
            captcha: false
        };

        // Payment state
        let currentMode = 'purchase';
        let selectedAmount = 29.99;
        let discountApplied = false;
        let discountPercentage = 0;
        let discountCodeValue = '';

        // Generate random captcha
        function generateCaptcha() {
            const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
            let captchaText = '';
            for (let i = 0; i < 6; i++) {
                captchaText += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            captchaDisplay.textContent = captchaText;
            return captchaText;
        }

        let currentCaptcha = generateCaptcha();

        // Dark Mode Toggle
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            if (document.body.classList.contains('dark-mode')) {
                sunIcon.style.display = 'none';
                moonIcon.style.display = 'inline';
            } else {
                sunIcon.style.display = 'inline';
                moonIcon.style.display = 'none';
            }
        });

        // Mode Toggle
        modeOptions.forEach(option => {
            option.addEventListener('click', () => {
                modeOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
                currentMode = option.dataset.mode;
                
                if (currentMode === 'purchase') {
                    purchaseMode.style.display = 'block';
                    donationMode.classList.remove('show');
                    donationMode.style.display = 'none';
                    updateTotalAmount();
                } else {
                    purchaseMode.style.display = 'none';
                    donationMode.classList.add('show');
                    donationMode.style.display = 'block';
                    updateDonationAmount();
                }
            });
        });

        // Purchase Options
        purchaseOptions.forEach(option => {
            option.addEventListener('click', () => {
                purchaseOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
                selectedAmount = parseFloat(option.dataset.amount);
                discountApplied = false;
                discountInfo.classList.remove('show');
                discountSummary.style.display = 'none';
                updateTotalAmount();
            });
        });

        // Custom Amount Input
        customAmountInput.addEventListener('input', () => {
            const value = parseFloat(customAmountInput.value);
            if (value && value > 0) {
                selectedAmount = value;
                discountApplied = false;
                discountInfo.classList.remove('show');
                discountSummary.style.display = 'none';
                updateTotalAmount();
            }
        });

        // Donation Amount
        donationAmount.addEventListener('input', () => {
            const value = parseFloat(donationAmount.value);
            if (value && value > 0) {
                selectedAmount = value;
                updatePayButtonAmount();
            }
        });

        // Donation Suggestions
        donationSuggestions.forEach(suggestion => {
            suggestion.addEventListener('click', () => {
                const amount = parseFloat(suggestion.dataset.amount);
                donationAmount.value = amount;
                selectedAmount = amount;
                updatePayButtonAmount();
            });
        });

        // Discount Code
        applyDiscount.addEventListener('click', () => {
            if (currentMode !== 'purchase') return;
            
            const code = discountCode.value.trim().toUpperCase();
            
            if (code === 'DISCOUNT30') {
                discountPercentage = 30;
                discountCodeValue = code;
                discountApplied = true;
                const saved = (selectedAmount * discountPercentage) / 100;
                savedAmount.textContent = `$${saved.toFixed(2)}`;
                discountValue.textContent = `-$${saved.toFixed(2)}`;
                discountInfo.classList.add('show');
                discountSummary.style.display = 'flex';
                updateTotalAmount();
            } else if (code === 'WELCOME20') {
                discountPercentage = 20;
                discountCodeValue = code;
                discountApplied = true;
                const saved = (selectedAmount * discountPercentage) / 100;
                savedAmount.textContent = `$${saved.toFixed(2)}`;
                discountValue.textContent = `-$${saved.toFixed(2)}`;
                discountInfo.classList.add('show');
                discountSummary.style.display = 'flex';
                updateTotalAmount();
            } else if (code === 'SALE15') {
                discountPercentage = 15;
                discountCodeValue = code;
                discountApplied = true;
                const saved = (selectedAmount * discountPercentage) / 100;
                savedAmount.textContent = `$${saved.toFixed(2)}`;
                discountValue.textContent = `-$${saved.toFixed(2)}`;
                discountInfo.classList.add('show');
                discountSummary.style.display = 'flex';
                updateTotalAmount();
            } else {
                discountApplied = false;
                discountInfo.classList.remove('show');
                discountSummary.style.display = 'none';
                updateTotalAmount();
                // Show error without alert
                discountCode.style.borderColor = 'var(--danger)';
                setTimeout(() => {
                    discountCode.style.borderColor = 'var(--border-color)';
                }, 2000);
            }
        });

        function updateTotalAmount() {
            if (currentMode !== 'purchase') return;
            
            planPrice.textContent = `$${selectedAmount.toFixed(2)}`;
            payButtonAmount.textContent = `$${selectedAmount.toFixed(2)}`;
            
            if (discountApplied) {
                const finalAmount = selectedAmount - (selectedAmount * discountPercentage / 100);
                totalPrice.textContent = `$${finalAmount.toFixed(2)}`;
                payButtonAmount.textContent = `$${finalAmount.toFixed(2)}`;
            } else {
                totalPrice.textContent = `$${selectedAmount.toFixed(2)}`;
            }
        }

        function updateDonationAmount() {
            if (currentMode !== 'donation') return;
            selectedAmount = parseFloat(donationAmount.value) || 25.00;
            updatePayButtonAmount();
        }

        function updatePayButtonAmount() {
            payButtonAmount.textContent = `$${selectedAmount.toFixed(2)}`;
        }

        // Password Toggle - Eye Icons
        togglePassword.addEventListener('click', () => {
            const icon = togglePassword.querySelector('i');
            if (password.type === 'password') {
                password.type = 'text';
                icon.className = 'fas fa-eye-slash';
            } else {
                password.type = 'password';
                icon.className = 'fas fa-eye';
            }
        });

        toggleSecondPassword.addEventListener('click', () => {
            const icon = toggleSecondPassword.querySelector('i');
            if (secondPassword.type === 'password') {
                secondPassword.type = 'text';
                icon.className = 'fas fa-eye-slash';
            } else {
                secondPassword.type = 'password';
                icon.className = 'fas fa-eye';
            }
        });

        // Captcha Refresh
        captchaRefresh.addEventListener('click', () => {
            currentCaptcha = generateCaptcha();
            captcha.value = '';
            captcha.classList.remove('error', 'success');
            captchaError.classList.remove('show');
            validateCaptcha();
        });

        // Real-time card preview updates
        cardName.addEventListener('input', () => {
            const name = cardName.value.trim().toUpperCase();
            previewCardName.textContent = name || 'CARDHOLDER NAME';
            validateName();
        });

        cardNumber.addEventListener('input', () => {
            const value = cardNumber.value.replace(/\D/g, '');
            const formatted = value.replace(/(\d{4})/g, '$1 ').trim();
            cardNumber.value = formatted;
            
            // Update preview
            if (value.length === 16) {
                previewCardNumber.textContent = `${value.slice(0, 4)} ${value.slice(4, 8)} ${value.slice(8, 12)} ${value.slice(12, 16)}`;
            } else {
                previewCardNumber.textContent = '•••• •••• •••• ••••';
            }
            
            validateCardNumber();
        });

        expiryDate.addEventListener('input', () => {
            const value = expiryDate.value.replace(/\D/g, '');
            if (value.length >= 2) {
                expiryDate.value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
            }
            
            // Update preview
            previewCardExpiry.textContent = expiryDate.value || 'MM/YY';
            validateExpiry();
        });

        cvv.addEventListener('input', () => {
            cvv.value = cvv.value.replace(/\D/g, '');
            validateCVV();
        });

        email.addEventListener('input', validateEmail);
        password.addEventListener('input', validatePassword);
        secondPassword.addEventListener('input', validateSecondPassword);
        captcha.addEventListener('input', validateCaptcha);

        // Advanced Validation Functions
        function validateEmail() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const emailValue = email.value.trim();
            
            if (emailValue === '') {
                setValid(email, emailError, emailSuccess, null);
                formIsValid.email = false;
            } else if (emailRegex.test(emailValue)) {
                setValid(email, emailError, emailSuccess, true);
                formIsValid.email = true;
            } else {
                setValid(email, emailError, emailSuccess, false);
                formIsValid.email = false;
            }
            checkFormValidity();
        }

        function validatePassword() {
            const passwordValue = password.value;
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
            
            if (passwordValue === '') {
                setValid(password, passwordError, null, null);
                formIsValid.password = false;
            } else if (passwordRegex.test(passwordValue)) {
                setValid(password, passwordError, null, true);
                formIsValid.password = true;
            } else {
                setValid(password, passwordError, null, false);
                formIsValid.password = false;
            }
            checkFormValidity();
        }

        function validateSecondPassword() {
            const secondPasswordValue = secondPassword.value;
            const passwordValue = password.value;
            
            if (secondPasswordValue === '') {
                setValid(secondPassword, secondPasswordError, null, null);
                formIsValid.secondPassword = false;
            } else if (secondPasswordValue === passwordValue && secondPasswordValue.length >= 8) {
                setValid(secondPassword, secondPasswordError, null, true);
                formIsValid.secondPassword = true;
            } else {
                setValid(secondPassword, secondPasswordError, null, false);
                formIsValid.secondPassword = false;
            }
            checkFormValidity();
        }

        function validateName() {
            const name = cardName.value.trim();
            const nameRegex = /^[a-zA-Z\s]{2,50}$/;
            
            if (name === '') {
                setValid(cardName, nameError, null, null);
                formIsValid.name = false;
            } else if (nameRegex.test(name)) {
                setValid(cardName, nameError, null, true);
                formIsValid.name = true;
            } else {
                setValid(cardName, nameError, null, false);
                formIsValid.name = false;
            }
            checkFormValidity();
        }

        function validateCardNumber() {
            const number = cardNumber.value.replace(/\D/g, '');
            
            if (number === '') {
                setValid(cardNumber, numberError, null, null);
                formIsValid.number = false;
            } else if (number.length === 16 && /^\d{16}$/.test(number)) {
                setValid(cardNumber, numberError, null, true);
                formIsValid.number = true;
            } else {
                setValid(cardNumber, numberError, null, false);
                formIsValid.number = false;
            }
            checkFormValidity();
        }

        function validateExpiry() {
            const expiry = expiryDate.value;
            const expiryRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
            
            if (expiry === '') {
                setValid(expiryDate, expiryError, null, null);
                formIsValid.expiry = false;
            } else if (expiryRegex.test(expiry)) {
                const [month, year] = expiry.split('/');
                const currentYear = new Date().getFullYear() % 100;
                const currentMonth = new Date().getMonth() + 1;
                
                const expYear = parseInt(year);
                const expMonth = parseInt(month);
                
                if (expYear > currentYear || (expYear === currentYear && expMonth >= currentMonth)) {
                    setValid(expiryDate, expiryError, null, true);
                    formIsValid.expiry = true;
                } else {
                    setValid(expiryDate, expiryError, null, false);
                    formIsValid.expiry = false;
                }
            } else {
                setValid(expiryDate, expiryError, null, false);
                formIsValid.expiry = false;
            }
            checkFormValidity();
        }

        function validateCVV() {
            const cvvValue = cvv.value;
            
            if (cvvValue === '') {
                setValid(cvv, cvvError, null, null);
                formIsValid.cvv = false;
            } else if (cvvValue.length === 4 && /^\d{4}$/.test(cvvValue)) {
                setValid(cvv, cvvError, null, true);
                formIsValid.cvv = true;
            } else {
                setValid(cvv, cvvError, null, false);
                formIsValid.cvv = false;
            }
            checkFormValidity();
        }

        function validateCaptcha() {
            const captchaValue = captcha.value.trim().toUpperCase();
            
            if (captchaValue === '') {
                setValid(captcha, captchaError, null, null);
                formIsValid.captcha = false;
            } else if (captchaValue === currentCaptcha) {
                setValid(captcha, captchaError, null, true);
                formIsValid.captcha = true;
            } else {
                setValid(captcha, captchaError, null, false);
                formIsValid.captcha = false;
            }
            checkFormValidity();
        }

        function setValid(element, errorElement, successElement, isValid) {
            if (isValid === null) {
                // Clear state
                element.classList.remove('error', 'success');
                if (errorElement) errorElement.classList.remove('show');
                if (successElement) successElement.classList.remove('show');
            } else if (isValid) {
                element.classList.remove('error');
                element.classList.add('success');
                if (errorElement) errorElement.classList.remove('show');
                if (successElement) successElement.classList.add('show');
            } else {
                element.classList.remove('success');
                element.classList.add('error');
                if (errorElement) errorElement.classList.add('show');
                if (successElement) successElement.classList.remove('show');
            }
        }

        function checkFormValidity() {
            const isFormValid = Object.values(formIsValid).every(value => value);
            payButton.disabled = !isFormValid;
        }

        // Payment Processing with Success Animation
        payButton.addEventListener('click', () => {
            // Show loading state
            payButton.classList.add('loading');
            
            // Simulate payment processing
            setTimeout(() => {
                payButton.classList.remove('loading');
                
                // Simulate success (90% success rate)
                const isSuccess = Math.random() > 0.1;
                
                if (isSuccess) {
                    // Show success animation
                    setTimeout(() => {
                        successOverlay.classList.add('show');
                        setTimeout(() => {
                            document.querySelector('.success-check').classList.add('show');
                        }, 1700);
                    }, 100);
                } else {
                    // Show error message without alert
                    const errorDiv = document.createElement('div');
                    errorDiv.className = 'error-message show';
                    errorDiv.textContent = 'Payment failed. Please try again with a different card.';
                    payButton.parentNode.insertBefore(errorDiv, payButton.nextSibling);
                    setTimeout(() => {
                        errorDiv.remove();
                    }, 5000);
                }
            }, 3000);
        });

        // Continue button
        continueButton.addEventListener('click', () => {
            successOverlay.classList.remove('show');
        });

        // Initialize form validation
        email.addEventListener('blur', validateEmail);
        password.addEventListener('blur', validatePassword);
        secondPassword.addEventListener('blur', validateSecondPassword);
        cardName.addEventListener('blur', validateName);
        cardNumber.addEventListener('blur', validateCardNumber);
        expiryDate.addEventListener('blur', validateExpiry);
        cvv.addEventListener('blur', validateCVV);
        captcha.addEventListener('blur', validateCaptcha);

        // Initialize form state
        payButton.disabled = true;
        purchaseOptions[0].classList.add('active'); // Set Basic as default
        updateTotalAmount();

        // Add card hover effect
        minimalCard.addEventListener('mouseenter', () => {
            setTimeout(() => {
                minimalCard.style.transform = 'translateY(-8px) rotateX(3deg)';
            }, 100);
        });

        minimalCard.addEventListener('mouseleave', () => {
            minimalCard.style.transform = 'translateY(0) rotateX(0deg)';
        });

        // Add some initial animations
        document.addEventListener('DOMContentLoaded', () => {
            const sections = document.querySelectorAll('.purchase-mode, .payment-form');
            sections.forEach((section, index) => {
                section.style.opacity = '0';
                section.style.transform = 'translateY(30px)';
                setTimeout(() => {
                    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, index * 300);
            });
        });