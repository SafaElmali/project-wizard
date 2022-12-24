const inquirer = require("inquirer");
const fs = require("fs");
const execSync = require("child_process").execSync;

console.log("Welcome to the project prompter!");

const prompt = inquirer.createPromptModule();

const questions = [
  {
    type: "input",
    name: "projectName",
    message: "What is the name of your project?",
  },
  {
    type: "list",
    name: "framework",
    message: "Which framework would you like to use for your project?",
    choices: ["Express", "React", "Vue"],
  },
  {
    type: "checkbox",
    name: "packages",
    message: "Which popular packages would you like to install?",
    when: (answers) => answers.framework.toLowerCase() === "express",
    choices: ["body-parser", "cors", "express-session", "helmet"],
  },
  {
    type: "checkbox",
    name: "packages",
    message: "Which popular packages would you like to install?",
    when: (answers) => answers.framework.toLowerCase() === "react",
    choices: ["react-router-dom", "redux", "react-redux", "react-bootstrap"],
  },
  {
    type: "checkbox",
    name: "packages",
    message: "Which popular packages do you want to install?",
    when: (answers) => answers.framework.toLowerCase() === "vue",
    choices: ["vue-router", "vuex", "vue-bootstrap"],
  },
];

prompt(questions).then((answers) => {
  console.log(
    `Great, you are creating a project called "${answers.projectName}" using the ${answers.framework} framework!`
  );

  switch (answers.framework) {
    case "React":
      execSync(`npx create-react-app ${answers.projectName}`, {
        stdio: "inherit",
      });
      break;
    case "Vue":
      execSync(
        `npm install -g @vue/cli && vue create ${answers.projectName} && cd ${
          answers.projectName
        } && npm init -y &&  ${
          (answers.packages.join(" "), { stdio: "inherit" })
        }`
      );
      break;
    case "Express":
      fs.mkdirSync(answers.projectName);
      execSync(
        `cd ${answers.projectName} && npm init -y && npm install express ${
          (answers.packages.join(" "), { stdio: "inherit" })
        }`
      );
      break;
  }

  console.log(`Installing packages: ${answers.packages.join(", ")}`);
  // Install the selected packages using npm
  execSync(
    `cd ${answers.projectName} && npm install ${answers.packages.join(" ")}`,
    { stdio: "inherit" }
  );

  // Print a message based on the selected framework
  if (answers.framework.toLowerCase() === "express") {
    console.log(
      "Express is a minimalist web framework for Node.js that is easy to learn and use."
    );
  } else if (answers.framework.toLowerCase() === "react") {
    console.log(
      "React is a popular JavaScript library for building user interfaces that is widely used in web development."
    );
  } else {
    console.log(
      "I'm sorry, I don't recognize that framework. Please try again."
    );
  }
  console.log("Happy coding!");
});
