'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the TLQ Phoenix Generator, please use a sub generator`)
    );
  }
};
