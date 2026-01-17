/**
 * Modal Core Functionality
 * Handles modal open/close, focus management, and accessibility
 */

class ModalCore {
    constructor() {
        this.modal = null;
        this.trigger = null;
        this.closeButton = null;
        this.overlay = null;
        this.container = null;
        this.previousFocus = null;
        this.focusableElements = [];
        this.firstFocusable = null;
        this.lastFocusable = null;
        
        this.init();
    }
    
    init() {
        // Get DOM elements
        this.modal = document.getElementById('support-modal');
        this.trigger = document.getElementById('support-trigger');
        this.closeButton = document.getElementById('modal-close');
        this.overlay = this.modal;
        this.container = this.modal.querySelector('.modal-container');
        
        // Bind event listeners
        this.bindEvents();
        
        // Initialize focus management
        this.updateFocusableElements();
    }
    
    bindEvents() {
        // Trigger button click
        this.trigger.addEventListener('click', () => this.openModal());
        
        // Close button click
        this.closeButton.addEventListener('click', () => this.closeModal());
        
        // Overlay click (close when clicking outside)
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.closeModal();
            }
        });
        
        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen()) {
                this.closeModal();
            }
        });
        
        // Tab key trapping within modal
        this.modal.addEventListener('keydown', (e) => {
            if (e.key === 'Tab' && this.isOpen()) {
                this.trapFocus(e);
            }
        });
        
        // Update focusable elements when modal content changes
        const observer = new MutationObserver(() => {
            this.updateFocusableElements();
        });
        
        observer.observe(this.container, {
            childList: true,
            subtree: true
        });
    }
    
    updateFocusableElements() {
        // Get all focusable elements within the modal
        const focusableSelectors = [
            'button:not([disabled])',
            '[href]',
            'input:not([disabled])',
            'select:not([disabled])',
            'textarea:not([disabled])',
            '[tabindex]:not([tabindex="-1"])'
        ].join(', ');
        
        this.focusableElements = Array.from(
            this.container.querySelectorAll(focusableSelectors)
        );
        
        this.firstFocusable = this.focusableElements[0];
        this.lastFocusable = this.focusableElements[this.focusableElements.length - 1];
    }
    
    openModal() {
        // Store current focus
        this.previousFocus = document.activeElement;
        
        // Show modal
        this.modal.hidden = false;
        
        // Add open class for animations
        requestAnimationFrame(() => {
            this.overlay.classList.add('is-open');
        });
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Set ARIA attributes
        this.trigger.setAttribute('aria-expanded', 'true');
        
        // Announce to screen readers
        this.announceToScreenReader('Support modal opened');
        
        // Focus management
        requestAnimationFrame(() => {
            if (this.firstFocusable) {
                this.firstFocusable.focus();
            }
        });
        
        // Emit custom event
        this.emitEvent('modal:opened');
    }
    
    closeModal() {
        // Remove open class
        this.overlay.classList.remove('is-open');
        
        // Wait for animation to complete
        setTimeout(() => {
            this.modal.hidden = true;
            document.body.style.overflow = '';
        }, 300);
        
        // Update ARIA attributes
        this.trigger.setAttribute('aria-expanded', 'false');
        
        // Announce to screen readers
        this.announceToScreenReader('Support modal closed');
        
        // Return focus to trigger
        if (this.previousFocus) {
            this.previousFocus.focus();
        }
        
        // Emit custom event
        this.emitEvent('modal:closed');
    }
    
    isOpen() {
        return !this.modal.hidden && this.overlay.classList.contains('is-open');
    }
    
    trapFocus(e) {
        if (this.focusableElements.length === 0) return;
        
        if (e.shiftKey) {
            // Shift + Tab
            if (document.activeElement === this.firstFocusable) {
                e.preventDefault();
                this.lastFocusable.focus();
            }
        } else {
            // Tab
            if (document.activeElement === this.lastFocusable) {
                e.preventDefault();
                this.firstFocusable.focus();
            }
        }
    }
    
    announceToScreenReader(message) {
        // Create a temporary element for screen reader announcement
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        // Remove after announcement
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
    
    emitEvent(eventName) {
        const event = new CustomEvent(eventName, {
            detail: {
                modal: this.modal,
                isOpen: this.isOpen()
            }
        });
        document.dispatchEvent(event);
    }
    
    // Public methods for external use
    focusFirstElement() {
        if (this.firstFocusable) {
            this.firstFocusable.focus();
        }
    }
    
    focusLastElement() {
        if (this.lastFocusable) {
            this.lastFocusable.focus();
        }
    }
    
    getFocusableElements() {
        return this.focusableElements;
    }
}

// Initialize modal when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.modalCore = new ModalCore();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ModalCore;
}
