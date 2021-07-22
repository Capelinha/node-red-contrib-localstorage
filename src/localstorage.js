const LocalStorage = require('node-localstorage').LocalStorage;

module.exports = function(RED) {

  // configuration
  function LocalStorageConfig(n) {
      RED.nodes.createNode(this, n);
      this.name = n.name;
      this.storage = new LocalStorage('./localStorage/' + this.name);
      this.setItem = function (key, value) {
        this.storage.setItem(key, value);
      }
      this.getItem = function (key) {
        return this.storage.getItem(key);
      }
      this.removeItem = function (key) {
        this.storage.removeItem(key);
      }
      this.clear = function (key) {
        this.storage.clear();
      }
      this.hasItem = function (key) {
        const item = this.storage.getItem(key);

        if (item) {
          return true;
        }
        return false;
      }
  }

  RED.nodes.registerType("local-storage", LocalStorageConfig);

  // set item
  function SetItem(config) {
    RED.nodes.createNode(this, config);
    const localStorage = RED.nodes.getNode(config.localStorage);
    const node = this;
    
    node.on('input', function(msg) {
      if (msg.localStorage && msg.localStorage.key && msg.localStorage.value) {
        localStorage.setItem(msg.localStorage.key, msg.localStorage.value);
      } else {
        node.error('Missing localStorage parameters!');
      }
      node.send(msg);
    });
  }
  RED.nodes.registerType("set item", SetItem);

  // get item
  function GetItem(config) {
    RED.nodes.createNode(this, config);
    const localStorage = RED.nodes.getNode(config.localStorage);
    const node = this;
    
    node.on('input', function(msg) {
      if (msg.localStorage && msg.localStorage.key) {
        msg.localStorage.data = localStorage.getItem(msg.localStorage.key);
      } else {
        node.error('Missing localStorage parameters!');
      }
      node.send(msg);
    });
  }
  RED.nodes.registerType("get item", GetItem);

  // remove item
  function RemoveItem(config) {
    RED.nodes.createNode(this, config);
    const localStorage = RED.nodes.getNode(config.localStorage);
    const node = this;
    
    node.on('input', function(msg) {
      if (msg.localStorage && msg.localStorage.key) {
        localStorage.removeItem(msg.localStorage.key);
      } else {
        node.error('Missing localStorage parameters!');
      }
      node.send(msg);
    });
  }
  RED.nodes.registerType("remove item", RemoveItem);

  // clear
  function Clear(config) {
    RED.nodes.createNode(this, config);
    const localStorage = RED.nodes.getNode(config.localStorage);
    const node = this;
    
    node.on('input', function(msg) {
      localStorage.clear();
      node.send(msg);
    });
  }
  RED.nodes.registerType("clear", Clear);

  // has item
  function HasItem(config) {
    RED.nodes.createNode(this, config);
    const localStorage = RED.nodes.getNode(config.localStorage);
    const node = this;
    
    node.on('input', function(msg) {
      if (msg.localStorage && msg.localStorage.key) {
        if (localStorage.hasItem(msg.localStorage.key)) {
          node.send([msg, null]);
        } else {
          node.send([null, msg]);
        }
      } else {
        node.error('Missing localStorage parameters!');
        node.send([null, msg]);
      }
    });
  }
  RED.nodes.registerType("has item", HasItem);
}
