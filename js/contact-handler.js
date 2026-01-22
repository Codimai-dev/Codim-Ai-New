// js/contact-handler.js
import { db } from './firebase-config.js';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;

        // Collect form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            product: document.getElementById('product').value,
            message: document.getElementById('message').value,
            timestamp: serverTimestamp(),
            source: 'contact_page'
        };

        try {
            // Disable button and show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';

            // Add document to Firestore
            // Collection name is 'contacts'
            const docRef = await addDoc(collection(db, "contacts"), formData);
            
            console.log("Document written with ID: ", docRef.id);

            // Success notification (using a simple alert for now, can be improved with a custom modal)
            showFeedback('success', 'Thank you! Your message has been sent successfully. We will get back to you soon.');
            
            // Reset form
            contactForm.reset();

        } catch (error) {
            console.error("Error adding document: ", error);
            showFeedback('error', 'Oops! Something went wrong. Please try again later.');
        } finally {
            // Restore button state
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    });

    /**
     * Shows a feedback message to the user
     * @param {'success' | 'error'} type 
     * @param {string} message 
     */
    function showFeedback(type, message) {
        // Check if there's an existing feedback element
        const existing = document.querySelector('.form-feedback');
        if (existing) existing.remove();

        const feedbackDiv = document.createElement('div');
        feedbackDiv.className = `form-feedback ${type}`;
        feedbackDiv.style.cssText = `
            margin-top: 1.5rem;
            padding: 1rem;
            border-radius: 8px;
            text-align: center;
            font-weight: 500;
            background: ${type === 'success' ? 'rgba(40, 167, 69, 0.1)' : 'rgba(220, 53, 69, 0.1)'};
            color: ${type === 'success' ? '#28a745' : '#dc3545'};
            border: 1px solid ${type === 'success' ? '#28a745' : '#dc3545'};
            animation: fadeIn 0.3s ease-out;
        `;
        feedbackDiv.textContent = message;

        contactForm.appendChild(feedbackDiv);

        // Auto-remove after 5 seconds if success
        if (type === 'success') {
            setTimeout(() => {
                feedbackDiv.style.opacity = '0';
                feedbackDiv.style.transition = 'opacity 0.5s ease-out';
                setTimeout(() => feedbackDiv.remove(), 500);
            }, 5000);
        }
    }
});
