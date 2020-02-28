'use babel';
import SelectListView from 'atom-select-list';
const branch = require('git-branch');

export default class BranchControlView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('branch-control');
    this.element.classList.add('padded');

    // Create panel
    const panel = document.createElement('div')
    panel.classList.add('inset-panel')
    this.element.appendChild(panel);

    // Create header
    const header = document.createElement('div');
    header.classList.add('panel-heading');
    header.textContent = 'Branch Manager';
    panel.appendChild(header);

    // Create body element
    const body = document.createElement('div');
    body.textContent = 'Select a branch:';
    body.classList.add('panel-body');
    body.classList.add('padded');
    panel.appendChild(body);

    // Create dropsown branches list
    branch(function(err, name) {
      if (err) throw err;
      console.log('Branch:', name); //=> 'Branch: master'
    });
    const branchList = new SelectListView({
      items: ['system/dev','system/stage', 'system/live'],
      elementForItem: (item) => {
        const li = document.createElement('li')
        li.textContent = item
        return li
      },
      didConfirmSelection: (item) => {
        console.log('confirmed', item)
      },
      didCancelSelection: (item) => {
        console.log('cancelled', item)
      }
    })
    body.appendChild(branchList.element);


  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

}
