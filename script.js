document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    let highlights = [];
    
    
    function removeHighlights() {
        highlights.forEach(highlight => {
            const parent = highlight.parentNode;
            parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
            parent.normalize();
        });
        highlights = [];
    }
    
    
    function highlightText(text) {
        if (!text) return;
        
        
        const excludeTags = ['SCRIPT', 'STYLE', 'INPUT', 'TEXTAREA'];
        const elementsToSearch = document.querySelectorAll('body *:not(script):not(style):not(input):not(textarea)');
        
        const regex = new RegExp(text, 'gi');
        
        elementsToSearch.forEach(element => {
            if (excludeTags.includes(element.nodeName)) return;
            
            for (let child of element.childNodes) {
                if (child.nodeType === 3) { 
                    const matches = child.textContent.match(regex);
                    if (matches) {
                        const newContent = document.createElement('span');
                        newContent.innerHTML = child.textContent.replace(regex, match => 
                            `<span class="highlight">${match}</span>`
                        );
                        
                       
                        newContent.querySelectorAll('.highlight').forEach(el => {
                            highlights.push(el);
                        });
                        
                        child.replaceWith(newContent);
                    }
                }
            }
        });
    }
    
    
    searchInput.addEventListener('input', function() {
        const searchText = this.value.trim();
        
        
        removeHighlights();
        
        
        if (searchText.length > 0) {
            highlightText(searchText);
            
            
            if (highlights.length > 0) {
                highlights[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
    
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            searchInput.value = '';
            removeHighlights();
            searchInput.blur();
        }
    });
});
