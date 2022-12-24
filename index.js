const inquirer = require('inquirer');

console.log("Welcome to the project prompter!");

const prompt = inquirer.createPromptModule();

const questions = [
  {
    type: 'input',
    name: 'projectName',
    message: 'What is the name of your project?',
  },
  {
    type: 'list',
    name: 'framework',
    message: 'Which framework would you like to use for your project?',
    choices: [
      'Express',
      'NestJS',
      'React',
      'Vue'
    ],
  }
];

prompt(questions).then(answers => {
  console.log(`Great, you are creating a project called "${answers.projectName}" using the ${answers.framework} framework!`);
  // Print a message based on the selected framework
  if (answers.framework.toLowerCase() === "express") {
    console.log("Express is a minimalist web framework for Node.js that is easy to learn and use.");
  } else if (answers.framework.toLowerCase() === "nestjs") {
    console.log("NestJS is a powerful and flexible web framework for Node.js that is great for building complex web applications.");
  } else if (answers.framework.toLowerCase() === "react") {
    console.log("React is a popular JavaScript library for building user interfaces that is widely used in web development.");
  } else if (answers.framework.toLowerCase() === "vue") {
    console.log("Vue is a popular JavaScript library for building user interfaces that is widely used in web development.");
  } else {
    console.log("I'm sorry, I don't recognize that framework. Please try again.");
  }
  console.log("Happy coding!");
});
