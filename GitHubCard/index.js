/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/



/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = ["tetondan",
  "dustinmyers",
  "justsml",
  "luishrd",
  "bigknell"];

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/



function Users(person){
 const cardHolder = document.querySelector('.cards');

 const createUser = () => {
    const card = document.createElement('div');
    card.classList.add('card');

    const img = document.createElement('img');
    img.src = person.data.avatar_url;
    card.appendChild(img);

    const cardInfo = document.createElement('div');
    cardInfo.classList.add('card-info');
    
    const name = document.createElement('h3');
    name.classList.add('name');
    name.textContent = person.data.name;
    cardInfo.appendChild(name);

    cardInfo.appendChild(paragraphMaker('Location', person.data.location));
    cardInfo.appendChild(paragraphMaker('Profile', person.data.html_url, true));
    cardInfo.appendChild(paragraphMaker('Followers', person.data.followers));
    cardInfo.appendChild(paragraphMaker('Following', person.data.following));
    cardInfo.appendChild(paragraphMaker('Bio', person.data.bio));

    card.appendChild(cardInfo);

    return card;
  };

  function paragraphMaker(string, data, link = false){
    const paragraph = document.createElement('p');
    paragraph.textContent = `${string}: `;

    if(link){
      //console.log('here');
      const newLink = document.createElement('a');
      newLink.href = data;
      newLink.target = '_blank';
      newLink.textContent = data;
      paragraph.appendChild(newLink);
      //console.log(paragraph);
    }else
      paragraph.textContent += `${data}`;
    //console.log(paragraph);
    return paragraph;
  };

  cardHolder.appendChild(createUser());
}

axios.get(`https://api.github.com/users/prototype109`)
  .then((data) => {
    Users(data);
    //console.log(data);
  }).catch((err) => {
    console.log('failed: ', err)
    //console.log(data);
  });

  followersArray.forEach(follower => {
    axios.get(`https://api.github.com/users/${follower}`)
    .then((data) => {
      Users(data);
      //console.log(data);
    }).catch((err) => {
      console.log('failed: ', err)
      //console.log(data);
    });
  });

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
