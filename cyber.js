let tips = [
    {
        tipNumber: 1,
        title: "Use a password manager",
        category: "Passwords",
        whyItMatters: "Reusing one password means a single data breach can unlock all of your accounts. A password manager creates and remembers a different strong password for each site.",
    },
    {
        tipNumber: 2,
        title: "Turn on multi-factor authentication (MFA)",
        category: "Accounts",
        whyItMatters: "Even if someone steals your password, they still need the code from your phone or app to get in.",
    },
    {
        tipNumber: 3,
        title: "Check the sender's real email address",
        category: "Phishing",
        whyItMatters: "Scammers copy the name and logo of real companies, but the actual address often has misspellings or a strange domain.",
    },
    {
        tipNumber: 4,
        title: "Hover over links before you click",
        category: "Phishing",
        whyItMatters: "The text of a link can say one thing while the real web address goes to a fake login page that steals your password.",
    },
    {
        tipNumber: 5,
        title: "Never share a verification code",
        category: "Text Messages",
        whyItMatters: "No real company will text or call asking for the code they just sent you. Anyone asking for it is trying to break into your account.",
    },
    {
        tipNumber: 6,
        title: "Set social media accounts to private",
        category: "Social Media",
        whyItMatters: "Public posts about your school, pets, birthday or hometown give scammers the answers to common security questions.",
    },
    {
        tipNumber: 7,
        title: "Keep your phone and apps updated",
        category: "Devices",
        whyItMatters: "Updates fix security holes that attackers already know about. Putting them off leaves your device open to attack.",
    },
];

const maxTips = 10;

const act = () => {
    let action = document.querySelector("#choice").value.toUpperCase();
    let tipInQuestion;
 
    switch (action) {
        case "C":
            createATip();
            break;
        case "R":
            readATip();
            break;
        case "U":
            tipInQuestion = findATip();
            if (tipInQuestion) {
                updateATip(tipInQuestion);
            }
            break;
        case "D":
            tipInQuestion = findATip();
            if (tipInQuestion) {
                deleteATip(tipInQuestion);
            }
            break;
        default:
            setDetails("Please enter C, R, U or D.");
    }
 
  
    document.querySelector("#choice").value = "";
};
 

const listTips = () => {
    let displayOfTips = document.querySelector(".list-all");
    displayOfTips.innerHTML = "";
 
    tips.forEach((tip) => {
        displayOfTips.innerHTML +=
            "<li>" + tip.tipNumber + " - " + tip.title +
            " (" + tip.category + ")</li>";
    });
};

const setDetails = (message) => {
    document.querySelector(".details-info").innerHTML = message;
};
 

const describeTip = (tip) => {
    return "<b>Tip " + tip.tipNumber + ": " + tip.title + "</b><br>" +
        "Category: " + tip.category + "<br>" +
        "Why it matters: " + tip.whyItMatters;
};
 

const findATip = () => {
    let numberAsked = parseInt(prompt("Which tip number? (example: 3)"));
 
    let tip = tips.find((item) => item.tipNumber === numberAsked);
 
    if (tip === undefined) {
        setDetails("No tip was found with that number.");
    }
    return tip;
};
 

const createATip = () => {
    if (tips.length >= maxTips) {
        setDetails("The list is full (" + maxTips + " tips). Delete one first.");
        return;
    }
 
    let number = parseInt(prompt("Tip number?"));
    if (isNaN(number)) {
        setDetails("The tip number must be a number. Nothing was added.");
        return;
    }

    let alreadyThere = tips.find((item) => item.tipNumber === number);
    if (alreadyThere) {
        setDetails("There is already a tip with number " + number + ".");
        return;
    }
 
    let title = prompt("Tip title?");
    let category = prompt("Category? (example: Passwords, Phishing, Social Media)");
    let why = prompt("Why does this tip matter?");
 
    tips.push({
        tipNumber: number,
        title: title,
        category: category,
        whyItMatters: why,
    });
 
    listTips();
    setDetails("Added:<br>" + describeTip(tips[tips.length - 1]));
    console.log(tips);
};
 

const readATip = () => {
    let tip = findATip();
    if (tip) {
        setDetails(describeTip(tip));
        console.log(tip);
    }
};
 

const updateATip = (tip) => {
    let field = prompt(
        "What do you want to change?\n" +
        "T - Title\nC - Category\nW - Why it matters"
    );
    if (field === null) {
        return;
    }
    let newValue = prompt("Enter the new value:");
    if (newValue === null || newValue === "") {
        setDetails("No change was made.");
        return;
    }
 
    if (field.toUpperCase() === "T") {
        tip.title = newValue;
    } else if (field.toUpperCase() === "C") {
        tip.category = newValue;
    } else if (field.toUpperCase() === "W") {
        tip.whyItMatters = newValue;
    } else {
        setDetails("Please choose T, C or W. No change was made.");
        return;
    }
 
    listTips();
    setDetails("Updated:<br>" + describeTip(tip));
    console.log(tip);
};
 

const deleteATip = (tip) => {
    let indexToRemove = -1;
 
    for (let i = 0; i < tips.length; i++) {
        if (tips[i].tipNumber === tip.tipNumber) {
            indexToRemove = i;
        }
    }
 
    if (indexToRemove !== -1) {
        tips.splice(indexToRemove, 1);
        listTips();
        setDetails("Deleted tip " + tip.tipNumber + ": " + tip.title + ".");
        console.log(tips);
    }
};

listTips();