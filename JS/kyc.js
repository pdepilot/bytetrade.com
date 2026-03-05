 document.addEventListener('DOMContentLoaded', () => {
            // Theme toggle functionality
            const themeToggle = document.getElementById('theme-toggle');
            const body = document.body;
            
            // Check for saved theme preference
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'light') {
                body.classList.remove('dark-theme');
                body.classList.add('light-theme');
            } else {
                body.classList.add('dark-theme');
            }
            
            // Theme toggle event listener
            themeToggle.addEventListener('click', () => {
                body.classList.toggle('dark-theme');
                body.classList.toggle('light-theme');
                
                // Save theme preference
                if (body.classList.contains('dark-theme')) {
                    localStorage.setItem('theme', 'dark');
                } else {
                    localStorage.setItem('theme', 'light');
                }
            });
            
            // Form step navigation
            const steps = document.querySelectorAll('.step');
            const formSteps = document.querySelectorAll('.form-step');
            const nextButtons = document.querySelectorAll('.btn-next');
            const prevButtons = document.querySelectorAll('.btn-prev');
            const submitButton = document.getElementById('submit-kyc');
            
            // Show KYC status card (simulating pending status for demo)
            // In a real app, this would be based on user's KYC status from backend
            const kycStatusCard = document.getElementById('kyc-status-card');
            const kycFormContainer = document.getElementById('kyc-form-container');
            
            // For demo purposes, show form by default
            // Uncomment below to show status card instead
            // kycStatusCard.style.display = 'block';
            // kycFormContainer.style.display = 'none';
            
            // Step 1 Next Button
            document.getElementById('next-step-1').addEventListener('click', () => {
                const fullName = document.getElementById('fullName').value;
                const dob = document.getElementById('dob').value;
                const country = document.getElementById('country').value;
                const address = document.getElementById('address').value;
                
                if (!fullName || !dob || !country || !address) {
                    alert('Please fill in all required fields in Step 1');
                    return;
                }
                
                // Update review section
                document.getElementById('review-name').textContent = fullName;
                document.getElementById('review-dob').textContent = dob;
                document.getElementById('review-country').textContent = 
                    document.getElementById('country').options[document.getElementById('country').selectedIndex].text;
                
                // Move to next step
                steps[0].classList.remove('active');
                steps[0].classList.add('completed');
                steps[1].classList.add('active');
                formSteps[0].classList.remove('active');
                formSteps[1].classList.add('active');
                
                // Scroll to top
                window.scrollTo(0, 0);
            });
            
            // Step 2 Navigation
            document.getElementById('prev-step-2').addEventListener('click', () => {
                steps[1].classList.remove('active');
                steps[0].classList.remove('completed');
                steps[0].classList.add('active');
                formSteps[1].classList.remove('active');
                formSteps[0].classList.add('active');
                window.scrollTo(0, 0);
            });
            
            document.getElementById('next-step-2').addEventListener('click', () => {
                const idType = document.getElementById('idType').value;
                const idNumber = document.getElementById('idNumber').value;
                const frontFile = document.getElementById('front-upload').files.length;
                
                if (!idType || !idNumber) {
                    alert('Please fill in all required fields in Step 2');
                    return;
                }
                
                if (frontFile === 0) {
                    alert('Please upload the front of your ID document');
                    return;
                }
                
                // For Driver's License and National ID, back is required
                if (idType !== 'passport') {
                    const backFile = document.getElementById('back-upload').files.length;
                    if (backFile === 0) {
                        alert('Please upload the back of your ID document');
                        return;
                    }
                }
                
                // Update review section
                document.getElementById('review-id-type').textContent = 
                    document.getElementById('idType').options[document.getElementById('idType').selectedIndex].text;
                document.getElementById('review-id-number').textContent = idNumber;
                
                // Move to next step
                steps[1].classList.remove('active');
                steps[1].classList.add('completed');
                steps[2].classList.add('active');
                formSteps[1].classList.remove('active');
                formSteps[2].classList.add('active');
                window.scrollTo(0, 0);
            });
            
            // Step 3 Navigation
            document.getElementById('prev-step-3').addEventListener('click', () => {
                steps[2].classList.remove('active');
                steps[1].classList.remove('completed');
                steps[1].classList.add('active');
                formSteps[2].classList.remove('active');
                formSteps[1].classList.add('active');
                window.scrollTo(0, 0);
            });
            
            document.getElementById('next-step-3').addEventListener('click', () => {
                const selfieFile = document.getElementById('selfie-upload').files.length;
                
                if (selfieFile === 0) {
                    alert('Please upload a selfie with your ID document');
                    return;
                }
                
                // Move to next step
                steps[2].classList.remove('active');
                steps[2].classList.add('completed');
                steps[3].classList.add('active');
                formSteps[2].classList.remove('active');
                formSteps[3].classList.add('active');
                window.scrollTo(0, 0);
            });
            
            // Step 4 Navigation
            document.getElementById('prev-step-4').addEventListener('click', () => {
                steps[3].classList.remove('active');
                steps[2].classList.remove('completed');
                steps[2].classList.add('active');
                formSteps[3].classList.remove('active');
                formSteps[2].classList.add('active');
                window.scrollTo(0, 0);
            });
            
            // Submit KYC
            submitButton.addEventListener('click', () => {
                const termsChecked = document.getElementById('terms-checkbox').checked;
                const privacyChecked = document.getElementById('privacy-checkbox').checked;
                
                if (!termsChecked || !privacyChecked) {
                    alert('Please accept the terms and privacy policy to proceed');
                    return;
                }
                
                // Show success message and status card
                kycFormContainer.style.display = 'none';
                kycStatusCard.style.display = 'block';
                kycStatusCard.className = 'kyc-status-card pending';
                document.querySelector('.status-icon').className = 'status-icon pending';
                document.querySelector('.status-icon i').className = 'fas fa-hourglass-half';
                document.querySelector('.status-title').textContent = 'KYC Verification Pending';
                document.querySelector('.status-message').textContent = 
                    'Your KYC documents have been submitted and are currently under review by our verification team. ' +
                    'This process typically takes 24-48 hours. You will receive a notification once your verification is complete.';
                
                // Scroll to top
                window.scrollTo(0, 0);
                
                // In a real app, this would submit the form data to the backend
                console.log('KYC form submitted successfully');
            });
            
            // Check status button
            document.getElementById('check-status-btn').addEventListener('click', () => {
                // Simulate status check
                alert('Your KYC verification is still under review. Please check back later or contact support for updates.');
            });
            
            // ID Type change handler (show/hide back upload)
            document.getElementById('idType').addEventListener('change', (e) => {
                const backUploadGroup = document.getElementById('back-upload-group');
                if (e.target.value === 'passport') {
                    backUploadGroup.style.display = 'none';
                } else {
                    backUploadGroup.style.display = 'block';
                }
            });
            
            // File upload handlers with preview
            const uploadAreas = document.querySelectorAll('.upload-area');
            const fileInputs = document.querySelectorAll('.file-input');
            const previewContainers = document.querySelectorAll('.preview-container');
            
            // Setup file upload areas
            uploadAreas.forEach((area, index) => {
                area.addEventListener('click', () => {
                    fileInputs[index].click();
                });
                
                area.addEventListener('dragover', (e) => {
                    e.preventDefault();
                    area.classList.add('dragover');
                });
                
                area.addEventListener('dragleave', () => {
                    area.classList.remove('dragover');
                });
                
                area.addEventListener('drop', (e) => {
                    e.preventDefault();
                    area.classList.remove('dragover');
                    
                    if (e.dataTransfer.files.length) {
                        fileInputs[index].files = e.dataTransfer.files;
                        handleFileSelect(e.dataTransfer.files, previewContainers[index]);
                    }
                });
                
                fileInputs[index].addEventListener('change', (e) => {
                    if (e.target.files.length) {
                        handleFileSelect(e.target.files, previewContainers[index]);
                    }
                });
            });
            
            // Handle file selection and preview
            function handleFileSelect(files, previewContainer) {
                previewContainer.innerHTML = '';
                
                for (let i = 0; i < files.length && i < 3; i++) {
                    const file = files[i];
                    
                    // Create preview element
                    const previewItem = document.createElement('div');
                    previewItem.className = 'preview-item';
                    
                    if (file.type.startsWith('image/')) {
                        const previewImg = document.createElement('img');
                        previewImg.className = 'preview-img';
                        
                        // Create object URL for preview
                        const objectUrl = URL.createObjectURL(file);
                        previewImg.src = objectUrl;
                        
                        // Revoke object URL after image loads
                        previewImg.onload = () => {
                            URL.revokeObjectURL(objectUrl);
                        };
                        
                        previewItem.appendChild(previewImg);
                    } else {
                        previewItem.innerHTML = `
                            <div style="width:100%; height:120px; background: var(--primary-color); color: white; display: flex; align-items: center; justify-content: center; font-size: 24px;">
                                <i class="fas fa-file-pdf"></i>
                            </div>
                        `;
                    }
                    
                    // Add remove button
                    const removeBtn = document.createElement('button');
                    removeBtn.className = 'remove-preview';
                    removeBtn.innerHTML = '&times;';
                    removeBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        previewItem.remove();
                    });
                    
                    previewItem.appendChild(removeBtn);
                    previewContainer.appendChild(previewItem);
                }
            }
            
            // Initialize back upload visibility based on default ID type
            document.getElementById('back-upload-group').style.display = 'block';
        });