const inquirer = require('inquirer');
const fs = require('fs');

const questions = [
        {
            type: 'confirm',
            message: 'If a README file already exists do you wish to overwrite it?\n(Any response other than Y will create a new file)',
            name: 'overwrite'
        },    
        {
            type: 'input',
            message: 'What is the title of your project?',
            name: 'title'
        },
        {
            type: 'input',
            message: 'Provide a short description explaining the what, why, and how of your project. Use the following questions as a guide:\n- What was your motivation?\n- Why did you build this project?\n- What problem does it solve?\n- What did you learn?\n',
            name: 'description'
        },
        {
            type: 'input',
            message: 'What are the steps required to install your project?\nProvide a step-by-step description of how to get the development environment running:\n',
            name: 'install'
        },
        {
            type: 'input',
            message: 'Provide instructions that detail how people can use your work:\n',
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
            message: 'If you would like other developers to contribute to you project, include guidelines for how to do so:\n',
            name: 'contributing'
        },
        {
            type: 'input',
            message: 'If tests have been written for your application please provide instruction on how to run them here:\n',
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

const createReadme = ({overwrite, title, description, install, usage, license, contributing, testing, githubUser, email}) => {

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

<details>
<summary><strong>Table of Contents</strong></summary>

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing Guidelines](#contributing-guidelines)
- [Tests](#tests)
- [Questions](#questions)
- [Additional Sections](#additional-sections)
</details>

## Installation
${install}

## Usage
${usage}

## License
Distributed under the **${license}** license.

## Contributing Guidelines
Contributions help our open source community to continue to evolve, and any contributions are greatly appreciated. If you have a suggestion that would improve this code please follow the directions below. I require that any and all changes adhere to the Code of Conduct outlined in the [Contributor Covenant](https://www.contributor-covenant.org/).

 - ${contributing}

> _**Note:** Any contributions are understood to be under the same ${license} that covers the project. If this is a concern please contact me._

## Tests
${testing}

## Questions
Please reach out with any questions regarding the application.
You can find me [@${githubUser}](https://github.com/${githubUser})
Or via email: ${email}(mailto:${email})

## Additional Sections
Additional information to consider including in your final README file:
- List of languages and/or skills used to write the code.
- Collaborators and acknowledgements.
- A link to your deployed application or examples.
- Additional badges. Checkout [shields.io](https://shields.io/) to learn more.

`;

// check if the user requested to override the README file or to create a new one
// set the default filename and incrementor
    let fileName = 'README.md';
    let incrementer = 0;
        
// function that actually creates the file and writes the markdown code to the file
    const writeToFile = () => fs.writeFile(`./created_files/${fileName}`, readMeCode, (error) => {
        if (error) {
            console.log(error);
        }
        console.log(`${fileName} created!`);
    });

// this function checks to see if a file already exists. If it does, the incrementor increases by one and appended to the file name. The function repeats itself until the next available README[n] filename is found, then runs the writeToFile function
    const fileNameCheck = () => {
        if (fs.existsSync(`./created_files/${fileName}`)) {
            incrementer++;
            fileName = `README${incrementer}.md`;
            console.log(fileName);
            fileNameCheck();
        } else {
            writeToFile();
        }
    };

// either goes straight to write file or run through to find the next file name depending on the user choice to the first question
    overwrite ? writeToFile() : fileNameCheck();
};


