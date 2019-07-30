const guideList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const adminItems = document.querySelectorAll('.admin');
const setupUI = (user) => {
    if (user) {
        if(user.admin){
            adminItems.forEach(item => item.style.display = 'block');
        }
        // account info
        db.collection('users').doc(user.uid).get().then(doc => {
            const html = `
            <div>Logged in as ${user.email}</div>
            <div>${doc.data().bio}</div>
            <div class="pink-text">${user.admin ? 'Admin' : ''}</div>
            `;
            accountDetails.innerHTML = html;
        })
        //toggle UI elements
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
    } else {
        adminItems.forEach(item => item.style.display = 'none');
        //hide account info
        accountDetails.innerHTML = '';
        //toggle UI elements
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
    }
}

//setup guides/profiles
const setupGuides = (data) => {
    
    if (data.length) {
        let html = '';
        data.forEach(doc => {
            const guide = doc.data();
            const li = `
            <li>
                <div class="collapsible-header grey lighten-4">${guide.title}</div>
                <div class="collapsible-body white">${guide.content}</div>
            </li>
            `;
            html += li
        });

        guideList.innerHTML = html;
    } else {
        guideList.innerHTML = '<div class="slider">' +
            '<ul class="slides">' +
            '<li>' +
            '<img src="img/girldog.jpg"> <!-- random image -->' +
            '<div class="caption center-align">' +
            '<h3>This is our big Tagline!</h3>' +
            '<h5 class="light grey-text text-lighten-3">Here\'s our small slogan.</h5>' +
            '</div>' +
            '</li>' +
            '<li>' +
            '<img src="https://lorempixel.com/580/250/nature/2"> <!-- random image -->' +
            '<div class="caption left-align">' +
            '<h3>Left Aligned Caption</h3>' +
            '<h5 class="light grey-text text-lighten-3">Here\'s our small slogan.</h5>' +
            '</div>' +
            '</li>' +
            '<li>' +
            '<img src="https://lorempixel.com/580/250/nature/3"> <!-- random image -->' +
            '<div class="caption right-align">' +
            '<h3>Right Aligned Caption</h3>' +
            '<h5 class="light grey-text text-lighten-3">Here\'s our small slogan.</h5>' +
            '</div>' +
            '</li>' +
            '<li>' +
            '<img src="https://lorempixel.com/580/250/nature/4"> <!-- random image -->' +
            '<div class="caption center-align">' +
            '<h3>This is our big Tagline!</h3>' +
            '<h5 class="light grey-text text-lighten-3">Here\'s our small slogan.</h5>' +
            '</div>' +
            '</li>' +
            '</ul>' +
            '</div>'
            // '<img class="responsive-img" src="img/girldog.jpg" alt="Girl with dog">' +
            // '<h5 class="center-align">Where Volunteers and Organizations Connect</h>' +
            // '<br>'+
            // '<img src="img/girldog.jpg" alt="Girl with dog" width="500" height="600" class="center">' +
            // '<h5 class="center-align">Login to view profiles</h>'
    }
}

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
  
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

    var elems = document.querySelectorAll('.slider');

    var instances = M.Slider.init(elems, options);
  
  });