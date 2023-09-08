document.addEventListener('DOMContentLoaded', function () {
    const ingredientInput = document.getElementById('ingredientInput');
    const suggestRecipeBtn = document.getElementById('suggestRecipeBtn');
    const recipeList = document.getElementById('recipeList');
    const appId = '2575ba7f'; // Edamam App ID
    const appKey = 'afe97cedf9a67c63319a26f31831e843'; // Edamam App Key

    suggestRecipeBtn.addEventListener('click', function () {
        const ingredients = ingredientInput.value;

        // Make an HTTP GET request to the Edamam API
        fetch(`https://api.edamam.com/search?q=${encodeURIComponent(ingredients)}&app_id=${appId}&app_key=${appKey}`)
            .then(response => response.json())
            .then(data => {
                // Clear previous recipe cards
                recipeCards.innerHTML = '';

                // Create recipe cards for each result
                data.hits.forEach(hit => {
                    const recipeCard = createRecipeCard(hit.recipe);
                    recipeCards.appendChild(recipeCard);
                });
            })
            .catch(error => {
                console.error('Error fetching data from Edamam API:', error);
            });
    });

    function createRecipeCard(recipe) {
        const card = document.createElement('div');
        card.classList.add('recipe-card','rounded-lg', 'shadow-lg','mb-5','border','border-0');

        // Recipe image
        const image = document.createElement('img');
        image.classList.add('recipe-image','py-9','mx-auto');
        image.src = recipe.image;
        card.appendChild(image);

        // Recipe label as a clickable link
        const labelLink = document.createElement('a');
        labelLink.classList.add('recipe-label', 'text-xl','hover:text-red-600','cursor-pointer','font-bold','block','text-center','mx-auto');
        labelLink.textContent = recipe.label;
        labelLink.href = recipe.url; // Link to the full recipe
        labelLink.target = '_blank'; // Open the link in a new tab
        card.appendChild(labelLink);
        

        // Recipe description
        const description = document.createElement('div');
        description.classList.add('recipe-description', 'text-lg', 'pb-5','text-center','mx-auto');
        description.textContent = recipe.source;
        card.appendChild(description);

        return card;
    }
});


// JavaScript to toggle the mobile menu
const mobileMenuButton = document.getElementById('mobileMenuButton');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuButton.addEventListener('click', () => {
    if (mobileMenu.style.display === 'block') {
        mobileMenu.style.display = 'none';
    } else {
        mobileMenu.style.display = 'block';
    }
});