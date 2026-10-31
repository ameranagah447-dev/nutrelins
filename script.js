// GET PAGE ELEMENTS
const saveButton = document.getElementById("save-allergies");
const otherInput = document.getElementById("other-allergy");
const editButton = document.getElementById("edit-profile");

// SAVE PROFILE
saveButton.addEventListener("click", function () {

    // GET SELECTED ALLERGIES
    const selectedAllergies = document.querySelectorAll(
        '.allergy-options input[type="checkbox"]:checked'
    );

    const allergies = [];

    selectedAllergies.forEach(function (item) {
        allergies.push(item.value);
    });

    // GET OTHER ALLERGY
    const otherAllergy = otherInput.value.trim();

    // GET PROFILE TYPE
    const selectedProfile = document.querySelector(
        'input[name="profile-type"]:checked'
    );

    const profileType = selectedProfile.value;

    // VALIDATION
    if (allergies.length === 0 && otherAllergy === "") {
        alert("Please select or enter at least one allergen.");
        return;
    }

    // CREATE PROFILE DATA
    const userProfile = {
        allergies: allergies,
        otherAllergy: otherAllergy,
        profileType: profileType
    };

    // SAVE DATA
    localStorage.setItem(
        "userProfile",
        JSON.stringify(userProfile)
    );

    // KEEP ALLERGIES AVAILABLE FOR PRODUCT SCANNING
    const allAllergies = [...allergies];

    if (otherAllergy !== "") {
        allAllergies.push(otherAllergy);
    }

    localStorage.setItem(
        "userAllergies",
        JSON.stringify(allAllergies)
    );

    alert("Your profile has been saved successfully! 💚");

editButton.hidden = false;

window.location.href = "scan.html";

});


// RESTORE SAVED PROFILE
const savedProfile = localStorage.getItem("userProfile");

if (savedProfile) {

    const profile = JSON.parse(savedProfile);

    // RESTORE ALLERGY CHECKBOXES
    profile.allergies.forEach(function (allergy) {

        const checkbox = document.querySelector(
            '.allergy-options input[value="' + CSS.escape(allergy) + '"]'
        );

        if (checkbox) {
            checkbox.checked = true;
        }

    });

    // RESTORE OTHER ALLERGY
    otherInput.value = profile.otherAllergy || "";

    // RESTORE PROFILE TYPE
    const profileRadio = document.querySelector(
        'input[name="profile-type"][value="' + CSS.escape(profile.profileType) + '"]'
    );

    if (profileRadio) {
        profileRadio.checked = true;
    }
editButton.hidden = false;

}
// EDIT PROFILE
editButton.addEventListener("click", function () {

    document.querySelector(".allergy-section").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    alert("You can now edit your profile! 💚");

});