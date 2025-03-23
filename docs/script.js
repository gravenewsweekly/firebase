// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcURztoFAJFAsnhnEmwj5aNlY5BwPRu-w",
  authDomain: "signupandlogin-4da45.firebaseapp.com",
  projectId: "signupandlogin-4da45",
  storageBucket: "signupandlogin-4da45.firebasestorage.app",
  messagingSenderId: "859922458173",
  appId: "1:859922458173:web:95084d6e60e9e3fa50ec54",
  measurementId: "G-9B917XQE63"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Function to Save Data
function saveData() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;

    if (name === "" || email === "") {
        alert("Please fill all fields");
        return;
    }

    let userId = database.ref('users').push().key;  // Generate Unique Key
    database.ref('users/' + userId).set({
        name: name,
        email: email
    });

    alert("Data Saved!");
    document.getElementById('name').value = "";
    document.getElementById('email').value = "";

    loadData(); // Refresh data
}

// Function to Retrieve Data
function loadData() {
    let dataList = document.getElementById('dataList');
    dataList.innerHTML = ""; // Clear old data

    database.ref('users').once('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            let data = childSnapshot.val();
            let li = document.createElement('li');
            li.textContent = `${data.name} - ${data.email}`;
            dataList.appendChild(li);
        });
    });
}

// Load Data on Start
window.onload = loadData;
