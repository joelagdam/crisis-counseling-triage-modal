/**
 * Triage Flow Logic
 * Handles the interactive triage system with state management
 */

class TriageFlow {
    constructor() {
        // State management
        this.state = {
            currentStep: 1,
            selections: {
                resourceType: null,  // 'local' | 'national'
                concern: null,       // 'burnout' | 'crisis' | 'general'
                contactMethod: null  // 'phone' | 'text'
            },
            history: []
        };
        
        // DOM elements
        this.dynamicContent = document.getElementById('dynamic-content');
        this.currentStepElement = document.getElementById('current-step');
        this.totalStepsElement = document.getElementById('total-steps');
        this.progressFill = document.getElementById('progress-fill');
        
        // Resource data
        this.resources = {
            national: {
                phone: {
                    number: "988",
                    label: "Suicide & Crisis Lifeline",
                    hours: "24/7",
                    description: "Free, confidential support for people in distress"
                },
                text: {
                    number: "988",
                    instruction: "Text or message",
                    label: "Crisis Text Line",
                    hours: "24/7",
                    description: "Connect with a trained crisis counselor"
                }
            },
            local: {
                burnout: {
                    phone: {
                        number: "1-800-273-8255",
                        label: "Workplace Burnout Hotline",
                        hours: "Mon-Fri 9AM-8PM",
                        description: "Specialized support for workplace and caregiver burnout"
                    },
                    text: {
                        number: "BURNOUT",
                        instruction: "Text to 741741",
                        label: "Burnout Text Support",
                        hours: "Daily 10AM-10PM",
                        description: "Text-based support for burnout and stress management"
                    }
                },
                crisis: {
                    phone: {
                        number: "1-800-784-2433",
                        label: "Local Crisis Response",
                        hours: "24/7",
                        description: "Immediate crisis intervention and support"
                    },
                    text: {
                        number: "HOME",
                        instruction: "Text to 741741",
                        label: "Crisis Text Support",
                        hours: "24/7",
                        description: "24/7 text-based crisis support"
                    }
                },
                general: {
                    phone: {
                        number: "1-800-662-4357",
                        label: "Mental Health Helpline",
                        hours: "Mon-Sat 8AM-8PM",
                        description: "General mental health support and counseling"
                    },
                    text: {
                        number: "HELLO",
                        instruction: "Text to 741741",
                        label: "Counseling Text Support",
                        hours: "Daily 9AM-9PM",
                        description: "Text-based counseling and emotional support"
                    }
                }
            }
        };
        
        // Questions configuration
        this.questions = {
            1: {
                text: "What type of support are you looking for?",
                description: "Choose the option that best fits your current needs",
                options: [
                    {
                        value: 'national',
                        icon: '🇺🇸',
                        title: 'National Hotline',
                        description: '24/7 crisis support available nationwide'
                    },
                    {
                        value: 'local',
                        icon: '📍',
                        title: 'Local Resources',
                        description: 'Community-based support in your area'
                    }
                ]
            },
            2: {
                text: "What are you experiencing right now?",
                description: "This helps us find the most appropriate resources for you",
                options: [
                    {
                        value: 'crisis',
                        icon: '🚨',
                        title: 'Crisis Situation',
                        description: 'Immediate danger or severe distress'
                    },
                    {
                        value: 'burnout',
                        icon: '🔥',
                        title: 'Burnout',
                        description: 'Work-related or caregiver exhaustion'
                    },
                    {
                        value: 'general',
                        icon: '💭',
                        title: 'General Support',
                        description: 'Stress, anxiety, or other concerns'
                    }
                ]
            },
            3: {
                text: "How would you prefer to connect?",
                description: "Choose your preferred way to get support",
                options: [
                    {
                        value: 'phone',
                        icon: '📞',
                        title: 'Phone Call',
                        description: 'Speak with someone directly'
                    },
                    {
                        value: 'text',
                        icon: '💬',
                        title: 'Text Message',
                        description: 'Text-based support and counseling'
                    }
                ]
            }
        };
        
        this.init();
    }
    
    init() {
        // Listen for modal events
        document.addEventListener('modal:opened', () => {
            this.resetFlow();
            this.renderCurrentStep();
        });
        
        // Listen for modal closed
        document.addEventListener('modal:closed', () => {
            this.resetFlow();
        });
    }
    
    resetFlow() {
        this.state = {
            currentStep: 1,
            selections: {
                resourceType: null,
                concern: null,
                contactMethod: null
            },
            history: []
        };
        this.updateProgress();
    }
    
    renderCurrentStep() {
        if (this.state.currentStep === 'results') {
            this.renderResults();
        } else {
            this.renderQuestion(this.state.currentStep);
        }
        this.updateProgress();
    }
    
    renderQuestion(stepNumber) {
        const question = this.questions[stepNumber];
        if (!question) return;
        
        const html = `
            <div class="question-container">
                <h3 class="question-text">${question.text}</h3>
                <p class="question-description">${question.description}</p>
                <div class="options-container">
                    ${question.options.map(option => `
                        <button 
                            class="option-button" 
                            data-value="${option.value}"
                            type="button">
                            <span class="option-icon">${option.icon}</span>
                            <div class="option-content">
                                <span class="option-title">${option.title}</span>
                                <span class="option-description">${option.description}</span>
                            </div>
                        </button>
                    `).join('')}
                </div>
                ${this.renderNavigation()}
            </div>
        `;
        
        this.dynamicContent.innerHTML = html;
        this.bindQuestionEvents();
    }
    
    renderNavigation() {
        const hasHistory = this.state.history.length > 0;
        
        return `
            <div class="navigation-container">
                ${hasHistory ? `
                    <button class="nav-button nav-button-secondary" data-action="back" type="button">
                        ← Back
                    </button>
                ` : '<div></div>'}
                <button class="nav-button" data-action="restart" type="button">
                    Start Over
                </button>
            </div>
        `;
    }
    
    renderResults() {
        const results = this.getResults();
        
        const html = `
            <div class="results-container">
                <h3 class="results-title">Support Resources For You</h3>
                <p class="results-description">
                    Based on your selections, here are resources that can help you right now.
                    All services are confidential and available 24/7 unless otherwise noted.
                </p>
                <div class="resource-list">
                    ${results.map(resource => this.renderResource(resource)).join('')}
                </div>
                <div class="navigation-container">
                    <button class="nav-button nav-button-secondary" data-action="back" type="button">
                        ← Change Selections
                    </button>
                    <button class="nav-button" data-action="restart" type="button">
                        Start Over
                    </button>
                </div>
            </div>
        `;
        
        this.dynamicContent.innerHTML = html;
        this.bindResultsEvents();
    }
    
    renderResource(resource) {
        return `
            <div class="resource-item">
                <div class="resource-header">
                    <h4 class="resource-name">${resource.label}</h4>
                    <p class="resource-hours">${resource.hours}</p>
                </div>
                <p class="resource-description">${resource.description}</p>
                <div class="resource-contact">
                    <div>
                        ${resource.instruction ? `<p class="contact-instruction">${resource.instruction}</p>` : ''}
                        <p class="contact-info">${resource.number}</p>
                    </div>
                    <button class="copy-button" data-number="${resource.number}" type="button">
                        <span class="copy-icon">📋</span>
                        <span class="copy-text">Copy</span>
                    </button>
                </div>
            </div>
        `;
    }
    
    getResults() {
        const { resourceType, concern, contactMethod } = this.state.selections;
        
        if (resourceType === 'national') {
            return [this.resources.national[contactMethod]];
        } else {
            return [this.resources.local[concern][contactMethod]];
        }
    }
    
    bindQuestionEvents() {
        // Option button clicks
        const optionButtons = this.dynamicContent.querySelectorAll('.option-button');
        optionButtons.forEach(button => {
            button.addEventListener('click', () => {
                const value = button.dataset.value;
                this.handleSelection(value);
            });
        });
        
        // Navigation buttons
        const navButtons = this.dynamicContent.querySelectorAll('.nav-button');
        navButtons.forEach(button => {
            button.addEventListener('click', () => {
                const action = button.dataset.action;
                this.handleNavigation(action);
            });
        });
    }
    
    bindResultsEvents() {
        // Copy buttons
        const copyButtons = this.dynamicContent.querySelectorAll('.copy-button');
        copyButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.copyToClipboard(button);
            });
        });
        
        // Navigation buttons
        const navButtons = this.dynamicContent.querySelectorAll('.nav-button');
        navButtons.forEach(button => {
            button.addEventListener('click', () => {
                const action = button.dataset.action;
                this.handleNavigation(action);
            });
        });
    }
    
    handleSelection(value) {
        // Save current state to history
        this.state.history.push({
            step: this.state.currentStep,
            selections: { ...this.state.selections }
        });
        
        // Update selection based on current step
        switch (this.state.currentStep) {
            case 1:
                this.state.selections.resourceType = value;
                if (value === 'national') {
                    // Skip to results for national resources
                    this.state.selections.concern = 'national';
                    this.state.currentStep = 'results';
                } else {
                    this.state.currentStep = 2;
                }
                break;
            case 2:
                this.state.selections.concern = value;
                this.state.currentStep = 3;
                break;
            case 3:
                this.state.selections.contactMethod = value;
                this.state.currentStep = 'results';
                break;
        }
        
        this.renderCurrentStep();
    }
    
    handleNavigation(action) {
        switch (action) {
            case 'back':
                if (this.state.history.length > 0) {
                    const previousState = this.state.history.pop();
                    this.state.currentStep = previousState.step;
                    this.state.selections = previousState.selections;
                    this.renderCurrentStep();
                } else if (this.state.currentStep === 'results') {
                    // Go back to step 3 from results
                    this.state.currentStep = 3;
                    this.renderCurrentStep();
                }
                break;
            case 'restart':
                this.resetFlow();
                this.renderCurrentStep();
                break;
        }
    }
    
    updateProgress() {
        if (this.state.currentStep === 'results') {
            this.currentStepElement.textContent = 'Complete';
            this.progressFill.style.width = '100%';
        } else {
            this.currentStepElement.textContent = this.state.currentStep;
            const progress = (this.state.currentStep / 3) * 100;
            this.progressFill.style.width = `${progress}%`;
        }
    }
    
    async copyToClipboard(button) {
        const number = button.dataset.number;
        const copyText = button.querySelector('.copy-text');
        
        try {
            await navigator.clipboard.writeText(number);
            
            // Update button state
            button.classList.add('copied');
            copyText.textContent = 'Copied!';
            
            // Announce to screen readers
            this.announceToScreenReader(`Copied ${number} to clipboard`);
            
            // Reset after 2 seconds
            setTimeout(() => {
                button.classList.remove('copied');
                copyText.textContent = 'Copy';
            }, 2000);
            
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = number;
            textArea.style.position = 'fixed';
            textArea.style.opacity = '0';
            document.body.appendChild(textArea);
            textArea.select();
            
            try {
                document.execCommand('copy');
                button.classList.add('copied');
                copyText.textContent = 'Copied!';
                
                setTimeout(() => {
                    button.classList.remove('copied');
                    copyText.textContent = 'Copy';
                }, 2000);
            } catch (fallbackErr) {
                console.error('Failed to copy text: ', fallbackErr);
                // Show error message
                copyText.textContent = 'Failed';
                setTimeout(() => {
                    copyText.textContent = 'Copy';
                }, 2000);
            }
            
            document.body.removeChild(textArea);
        }
    }
    
    announceToScreenReader(message) {
        // Use the existing modal core's announcement method if available
        if (window.modalCore && window.modalCore.announceToScreenReader) {
            window.modalCore.announceToScreenReader(message);
        } else {
            // Fallback announcement
            const announcement = document.createElement('div');
            announcement.setAttribute('aria-live', 'polite');
            announcement.setAttribute('aria-atomic', 'true');
            announcement.className = 'sr-only';
            announcement.textContent = message;
            
            document.body.appendChild(announcement);
            setTimeout(() => {
                document.body.removeChild(announcement);
            }, 1000);
        }
    }
}

// Initialize triage flow when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.triageFlow = new TriageFlow();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TriageFlow;
}
