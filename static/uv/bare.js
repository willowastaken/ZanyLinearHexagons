// /static/uv/dynamic-config.js
window.onload = function() {
    const savedBare = localStorage.getItem('bare');
    const savedOption = localStorage.getItem('bareOption');

    if (savedOption) {
        document.getElementById('bareSelect').value = savedOption;
        if (savedBare) {
            applyCustomBare(savedBare);
        }
    }
};

function updateBare() {
    const select = document.getElementById('bareSelect');
    const selectedOption = select.value;

    if (selectedOption === 'custom') {
        const customBare = prompt('Enter custom bare link:');
        if (customBare && isValidUrl(customBare)) {
            localStorage.setItem('bare', customBare);
            localStorage.setItem('bareOption', 'custom');
            applyCustomBare(customBare);
            alert('Custom bare URL saved successfully!');
        } else {
            alert('Please enter a valid URL.');
            select.value = 'custom'; // Reset to custom if invalid input
        }
    } else {
        localStorage.setItem('bare', selectedOption);
        localStorage.setItem('bareOption', selectedOption);
        applyCustomBare(selectedOption);
    }
}

function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
}

function applyCustomBare(bareUrl) {
    if (typeof Ultraviolet !== 'undefined') {
        Ultraviolet.config.bare = bareUrl; // Update configuration dynamically
        console.log('Updated bare URL:', bareUrl);

        // Optionally reload or reinitialize components if needed
        location.reload(); // Use if necessary to apply changes
    } else {
        console.log('Ultraviolet or client-side config not available.');
    }
}

