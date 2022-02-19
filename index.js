const inquirer = require('inquirer');
const fs = require('fs');

const questions = [
        {
            type: 'input',
            message: 'What is the title of your project?',
            name: 'title'
        },
        {
            type: 'input',
            message: 'Describe your project in a few sentences:',
            name: 'description'
        },
        {
            type: 'input',
            message: 'Provide instructions to install your application:',
            name: 'install'
        },
        {
            type: 'list',
            message: 'Choose from the following licenses:',
            name: 'license',
            choices: ['MIT', 'ISC', 'Other'],
            default: 'MIT'
        },
        {
            type: 'input',
            message: 'How can people contribute to your project?',
            name: 'contributing'
        },
        {
            type: 'input',
            message: 'What information do you want to share regarding testing?',
            name: 'tests'
        },
        {
            type: 'input',
            message: 'Enter your GitHub username:',
            name: 'githubuser'
        },
        {
            type: 'input',
            message: 'Enter your email:',
            name: 'email'
        }
    ];

inquirer.prompt(questions)
.then((answers) => {
    console.log(answers);
})
.catch((error) => {
    console.log(error);
});


// const readMeCode = 
//     `# ${projectTitle}

//     ## Description
//     ${projectDescription}

//     ### Table of Contents
//     [Installation](#installation)
//     [Usage](#usage)
//     [License](#license)
//     [Contributing Guidelines](#contributing-guidelines)
//     [Tests](#tests)
//     [Questions](#questions)

//     ## Installation
//     ${installationInstructions}

//     ## Usage
//     ${usageInfo}

//     ## License
//     ${license}

//     ## Contributing Guidelines
//     ${contributing}

//     ## Tests
//     ${testInstructions}

//     ## Questions
//     You can find me [@${gitHubUser}](https://github.com/${githubUser})
//     Or via email: ${userEmail}

//     Please reach out with any questions regarding the application.`;