// Set active nav link
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
});

// MCQ Functionality
function toggleAnswer(button) {
    const card = button.closest('.mcq-card');
    const explanation = card.querySelector('.answer-explanation');
    explanation.classList.toggle('show');
    button.textContent = explanation.classList.contains('show') ? 'Hide Answer' : 'Show Answer';
}

function selectOption(element) {
    const card = element.closest('.mcq-card');
    const options = card.querySelectorAll('.mcq-option');
    const correctAnswer = element.dataset.correct === 'true';
    
    options.forEach(option => option.classList.remove('selected', 'correct', 'incorrect'));
    
    if (correctAnswer) {
        element.classList.add('correct');
    } else {
        element.classList.add('incorrect');
        options.forEach(option => {
            if (option.dataset.correct === 'true') {
                option.classList.add('correct');
            }
        });
    }
    
    // Show explanation
    const explanation = card.querySelector('.answer-explanation');
    if (explanation) {
        explanation.classList.add('show');
        const button = card.querySelector('.show-answer-btn');
        if (button) {
            button.textContent = 'Hide Answer';
        }
    }
}

// Filter MCQs
function filterMCQs() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    
    if (!searchInput || !categoryFilter) return;
    
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    
    const mcqs = document.querySelectorAll('.mcq-card');
    
    mcqs.forEach(mcq => {
        const question = mcq.querySelector('.mcq-question')?.textContent.toLowerCase() || '';
        const category = mcq.dataset.category || '';
        
        const matchesSearch = question.includes(searchTerm);
        const matchesCategory = selectedCategory === '' || category === selectedCategory;
        
        mcq.style.display = (matchesSearch && matchesCategory) ? 'block' : 'none';
    });
}

// Reset Filters
function resetFilters() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    
    if (searchInput) searchInput.value = '';
    if (categoryFilter) categoryFilter.value = '';
    
    filterMCQs();
}

// Add event listeners for filtering
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    
    if (searchInput) {
        searchInput.addEventListener('keyup', filterMCQs);
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterMCQs);
    }
});
