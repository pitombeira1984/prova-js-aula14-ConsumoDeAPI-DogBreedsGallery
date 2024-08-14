document.addEventListener('DOMContentLoaded', () => {
    const breedButtonsContainer = document.getElementById('breedButtons');
    const dogImagesContainer = document.getElementById('dogImages');

   
    fetch('https://dog.ceo/api/breeds/list/all')
        .then(response => response.json())
        .then(data => {
            const breeds = data.message;
            for (const breed in breeds) {
                const button = document.createElement('button');
                button.innerText = breed.charAt(0).toUpperCase() + breed.slice(1);
                button.addEventListener('click', () => fetchDogImages(breed));
                breedButtonsContainer.appendChild(button);
            }
        })
        .catch(error => {
            console.error('Erro ao buscar lista de raças:', error);
            breedButtonsContainer.innerText = 'Erro ao carregar raças. Por favor, tente novamente mais tarde.';
        });

    
    function fetchDogImages(breed) {
        fetch(`https://dog.ceo/api/breed/${breed}/images/random/4`)
            .then(response => response.json())
            .then(data => {
                dogImagesContainer.innerHTML = ''; // Clear previous images
                data.message.forEach(imageUrl => {
                    const img = document.createElement('img');
                    img.src = imageUrl;
                    dogImagesContainer.appendChild(img);
                });
            })
            .catch(error => {
                console.error('Erro ao buscar imagens:', error);
                dogImagesContainer.innerText = 'Erro ao carregar imagens. Por favor, tente novamente mais tarde.';
            });
    }
});
