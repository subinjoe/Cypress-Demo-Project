import './commands';

import addContext from 'mochawesome/addContext'

/** 
 * After each test run, if the test has failed, then add the screenshot file path to 
 * current test context. On adding this to context, will help in displaying failed test's
 * screenshot in HTML report generated after test run
*/

Cypress.on("test:after:run", (test, runnable) => {

  if (test.state === 'failed') {

    let item = runnable
    const testnameParts = [runnable.title]

    // Iterate through all parents and grab the titles
    while (item.parent) {
      testnameParts.unshift(item.parent.title)
      item = item.parent
    }

    //get full test name
    const fullTestName = testnameParts
            .filter(Boolean)
            .join(' -- ')          

    //construct image path
    const imageUrl = `screenshots/${
      Cypress.spec.name
    }/${fullTestName} (failed).png`

    //add image path to context
    addContext({ test }, imageUrl)
  }

});