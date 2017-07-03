// Initialize Firebase
var config = {
  apiKey: "AIzaSyD1UCpu5L54wqZOn89UE5jAGlBWYgKoYXM",
  authDomain: "progress-tracker-13d1c.firebaseapp.com",
  databaseURL: "https://progress-tracker-13d1c.firebaseio.com",
  projectId: "progress-tracker-13d1c",
  storageBucket: "progress-tracker-13d1c.appspot.com",
  messagingSenderId: "742939111596"
};
firebase.initializeApp(config);

// Add an exercise to Firebase
function addExercise() {
  const exercisesRef = firebase.database().ref("exercises");
  const exercise = {
    title: document.querySelector("#newTitle").value,
    setting: document.querySelector("#newSetting").value,
    settingType: document.querySelector("#newSettingType").value,
    reps: document.querySelector("#newReps").value,
    raiseAfter: document.querySelector("#newRaiseAfter").value,
    raiseBy: document.querySelector("#newRaiseBy").value
  };
  console.log(exercise);
}

// Event Listners
document.querySelector("#addExercise").addEventListener("submit", function(e) {
  e.preventDefault();
  addExercise();
});
