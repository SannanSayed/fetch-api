const base_url = "https://randomuser.me/api/";

  
  
async function fetchUsers(gender = '') {
    try {
        const response = await fetch(`${base_url}?results=10${gender ? `&gender=${gender}` : ''}`);
        if (response.status === 200) {
            const { results } = await response.json();
            let postCard = document.getElementById("post_container");
            postCard.innerHTML = '';

            results.map((user, index) => {
                let card = document.createElement("div");
                card.className = "cards";
                card.id = `${user.login.uuid}`;

                card.innerHTML = `
                <div>
                    <img src="${user.picture.medium}" class="pic" alt="Profile Picture" />
                    <h5 class="m-4">Name :  ${user.name.first} ${user.name.last}</h5>
                    <h6>Gender :  ${user.gender}</h6>
                    <button type="button" class="btn btn-dark m-3 view-post" data-id="${user.login.uuid}">ViewPost</button>
                </div>
                `;
                postCard.append(card);
            });
            // Attach event listeners to "ViewPost" buttons
            document.querySelectorAll('.view-post').forEach(button => {
                button.addEventListener('click', (e) => {
                    const userId = e.target.getAttribute('data-id');
                    const user = results.find(u => u.login.uuid === userId);
                    showSinglePost(user);
                });
            });
        } else {
            console.log("Failed to fetch users.");
        }
    } catch (error) {
        console.log("Error:", error);
    }
}
function showSinglePost(user) {
    // **CHANGES START**
    // Hide male and female buttons
    document.getElementById("fetch_males").style.display = "none"; // Hide male button
    document.getElementById("fetch_females").style.display = "none"; // Hide female button
    // **CHANGES END**
    let postCard = document.getElementById("post_container");
    postCard.innerHTML = `
        <div class="card mb-3 bg-danger" style="width: 18rem;">
        <div class="card-body">
        <h5 class="card-title">${user.name.title} ${user.name.first} ${user.name.last}</h5>
        <div class="single-post">
            <img src="${user.picture.large}" class="pic" alt="Profile Picture" />
            <h6>Gender: ${user.gender}</h6>
            <p>Email: ${user.email}</p>
            <p>Phone: ${user.phone}</p>
            
        </div>
        </div>
       <button type="button" class="btn btn-secondary back-btn m-3">Go Back</button>
        </div>
    `;
    // Attach event listener to the "Back" button
    document.querySelector('.back-btn').addEventListener('click', () => {
        // **CHANGES START**
        // Show male and female buttons again
        document.getElementById("fetch_males").style.display = "inline"; // Show male button
        document.getElementById("fetch_females").style.display = "inline"; // Show female button
        // **CHANGES END**
        fetchUsers();
    });
}
document.getElementById("fetch_males").addEventListener("click", () => {
    fetchUsers('male');
});
document.getElementById("fetch_females").addEventListener("click", () => {
    fetchUsers("female");
});
document.getElementById("fetch_both").addEventListener("click", () => {
    const maleButton = document.getElementById("fetch_males");
    const femaleButton = document.getElementById("fetch_females");
    maleButton.style.display = "inline";
    femaleButton.style.display = "inline";
    fetchUsers();
});
// const base_url = "https://randomuser.me/api/";

// async function fetchUsers(gender = '') {
//     try {
//         const response = await fetch(`${base_url}?results=10${gender ? `&gender=${gender}` : ''}`);
//         if (response.status === 200) {
//             const { results } = await response.json();
//             let postCard = document.getElementById("post_container");
//             postCard.innerHTML = '';

//             results.map((user, index) => {
//                 let card = document.createElement("div");
//                 card.className = "cards";
//                 card.id = `${user.login.uuid}`;

//                 card.innerHTML = `
//                 <div>
//                     <img src="${user.picture.medium}" class="pic" alt="Profile Picture" />
//                     <h5 class="m-4">Name :  ${user.name.first} ${user.name.last}</h5>
//                     <h6>Gender :  ${user.gender}</h6>
//                     <button type="button" class="btn btn-dark m-3 view-post" 
//                         data-id="${user.login.uuid}"
//                         data-user='${JSON.stringify(user)}'>
//                         ViewPost
//                     </button>
//                 </div>
//                 `;
//                 postCard.append(card);
//             });

//             // Attach event listeners to "ViewPost" buttons
//             document.querySelectorAll('.view-post').forEach(button => {
//                 button.addEventListener('click', (e) => {
//                     const user = JSON.parse(e.target.getAttribute('data-user'));
//                     openUserDetailTab(user);
//                 });
//             });
//         } else {
//             console.log("Failed to fetch users.");
//         }
//     } catch (error) {
//         console.log("Error:", error);
//     }
// }

// // Function to open user details in a new tab
// function openUserDetailTab(user) {
//     const userDetailHtml = `
//         <!DOCTYPE html>
//         <html lang="en">
//         <head>
//             <meta charset="UTF-8">
//             <meta name="viewport" content="width=device-width, initial-scale=1.0">
//             <title>${user.name.first}'s Profile</title>
//             <style>
//                 body { font-family: Arial, sans-serif; }
//                 .container { max-width: 600px; margin: 20px auto; padding: 20px; background: #f9f9f9; border-radius: 8px; }
//                 .profile-pic { display: block; width: 100px; height: 100px; border-radius: 50%; margin: 0 auto; }
//                 h1 { text-align: center; }
//             </style>
//         </head>
//         <body>
//             <div class="container">
//                 <img src="${user.picture.large}" alt="Profile Picture" class="profile-pic">
//                 <h1>${user.name.title} ${user.name.first} ${user.name.last}</h1>
//                 <p><strong>Gender:</strong> ${user.gender}</p>
//                 <p><strong>Email:</strong> ${user.email}</p>
//                 <p><strong>Phone:</strong> ${user.phone}</p>
//                 <button onclick="window.close()">Go Back</button>
//             </div>
//         </body>
//         </html>
//     `;

//     const newTab = window.open("", "postDetail"); // Open new tab
//     newTab.document.write(userDetailHtml); // Write content
//     newTab.document.close(); // Close document stream
// }

// document.getElementById("fetch_males").addEventListener("click", () => {
//     fetchUsers('male');
// });

// document.getElementById("fetch_females").addEventListener("click", () => {
//     fetchUsers("female");
// });

// document.getElementById("fetch_both").addEventListener("click", () => {
//     const maleButton = document.getElementById("fetch_males");
//     const femaleButton = document.getElementById("fetch_females");
//     maleButton.style.display = "inline";
//     femaleButton.style.display = "inline";
//     fetchUsers();
// });

