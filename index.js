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
            type: 'input',
            message: 'How can people use your work?',
            name: 'usage'
        },
        {
            type: 'list',
            message: 'Choose from the following licenses or choose the option to add your own later:',
            name: 'license',
            choices: ['MIT', 'ISC', 'Apache 2.0', 'GNU AGPLv3', 'GNU GPLv3', 'GNU LGPLv3', 'Mozilla Public License', 'Boost Software License', 'No License/Define Later'],
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
            name: 'testing'
        },
        {
            type: 'input',
            message: 'Enter your GitHub username:',
            name: 'githubUser'
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
    createReadme(answers);
})
.catch((error) => {
    console.log(error);
});

const createReadme = ({title, description, install, usage, license, contributing, testing, githubUser, email}) => {

    const licenses = {
        'MIT' : '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)',
        'ISC' : '[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)', 
        'Apache 2.0' : '[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)', 
        'GNU AGPLv3' : '[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)', 
        'GNU GPLv3' : '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)', 
        'GNU LGPLv3' : '[![License: LGPL v3](https://img.shields.io/badge/License-LGPL_v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)', 
        'Mozilla Public License' : '[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)', 
        'Boost Software License' : '[![License](https://img.shields.io/badge/License-Boost_1.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)', 
        'No License/Define Later' : ''
    };

    const licenseBadge = (licenses[`${license}`]);

    const readMeCode = 
`# ${title}
${licenseBadge}

## Description
${description}

### Table of Contents
[Installation](#installation)
[Usage](#usage)
[License](#license)
[Contributing Guidelines](#contributing-guidelines)
[Tests](#tests)
[Questions](#questions)

## Installation
${install}

## Usage
${usage}

## License
${license}

## Contributing Guidelines
${contributing}

## Tests
${testing}

## Questions
Please reach out with any questions regarding the application.
You can find me [@${githubUser}](https://github.com/${githubUser})
Or via email: ${email}(mailto:${email})
`;

    fs.writeFile('./created_files/README.md', readMeCode, (error) => {
        if (error) {
            console.log(error);
        }
        console.log('README.md created!');
    });
};