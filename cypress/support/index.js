import './commands';

import addContext from 'mochawesome/addContext'

Cypress.on("test:after:run", (test, runnable) => {

  if (test.state === 'failed') {

    let item = runnable
    const testnameParts = [runnable.title]

    // Iterate through all parents and grab the titles
    while (item.parent) {
      testnameParts.unshift(item.parent.title)
      item = item.parent
    }

    const fullTestName = testnameParts
            .filter(Boolean)
            .join(' -- ')          

    const imageUrl = `screenshots/${
      Cypress.spec.name
    }/${fullTestName} (failed).png`

    addContext({ test }, imageUrl)
  }

});