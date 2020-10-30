// STEP 3: Create article cards.
// -----------------------
// Send an HTTP GET request to the following address: https://lambda-times-api.herokuapp.com/articles
// Study the response data you get back, closely.
// You will be creating a card for each article in the response.
// This won't be as easy as just iterating over an array though.
//
// Write a function that takes a single article object and returns the following markup:
//
// <div class="card">
//   <div class="headline">{Headline of article}</div>
//   <div class="author">
//     <div class="img-container">
//       <img src={url of authors image} />
//     </div>
//     <span>By {author's name}</span>
//   </div>
// </div>
//
// Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
//
// Use your function to create a card for each of the articles, and append each card to the DOM.

axios
    .get('https://lambda-times-api.herokuapp.com/articles')
    .then(res => 
        { 
            // console.log(res.data)
            
            const bootStr = res.data.articles.bootstrap;
            const javaScr = res.data.articles.javascript; 
            const jquery  = res.data.articles.jquery; 
            const node    = res.data.articles.node;
            const tech    = res.data.articles.technology;

            const topics = [bootStr, javaScr, jquery, node, tech]; 

            const cardsEntry =  document.querySelector('.cards-container');

            topics.forEach(topic =>
                { 
                    // console.log(topic);

                    topic.forEach(item => 
                        { 
                            cardsEntry.appendChild(articleMaker(item));
                        })
                })

            function articleMaker(articleObj) 
            { 
                const card = document.createElement('div');
                const headline = document.createElement('div');
                const author = document.createElement('div');
                const imgContainer = document.createElement('div');
                const authorImg = document.createElement('img');
                const by = document.createElement('span');

                card.classList.add('card');
                headline.classList.add('headline');
                author.classList.add('author');
                imgContainer.classList.add('img-container');
                
                headline.textContent = articleObj.headline;
                authorImg.setAttribute('src', `${articleObj.authorPhoto}`);
                by.textContent = `By ${articleObj.authorName}`;

                card.appendChild(headline);
                card.appendChild(author); 
                author.appendChild(imgContainer);
                imgContainer.appendChild(authorImg); 
                imgContainer.appendChild(by); 

                card.addEventListener('click', (e) => 
                { 
                    console.log(articleObj.headline);
                })

                // extra change cursor to pointer on hover
                card.style.cursor = "pointer";

                return card;
            } 

            
           
        })
    .catch(err => 
        { 
            console.log(`Error: ${err}`);
        })
    .finally(() => 
        { 
            console.log("DONE");
        })