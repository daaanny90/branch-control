'use babel';

import BranchControlView from './branch-control-view';
import { CompositeDisposable } from 'atom';

export default {

  branchControlView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.branchControlView = new BranchControlView(state.branchControlViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.branchControlView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'branch-control:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.branchControlView.destroy();
  },

  serialize() {
    return {
      branchControlViewState: this.branchControlView.serialize()
    };
  },

  toggle() {
    console.log('BranchControl was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
