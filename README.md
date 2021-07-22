# node-red-contrib-localstorage

This node was designed to act like the browser localstorage.

Install
-----------
You can install this node directly from the "Manage Palette" menu in the Node-RED interface. There are no compilation steps.

```
npm install node-red-contrib-localstorage
```

How to use
-----------
![Example Flow](/example/flow_example.png

#### Configure the node
Configure the local-storage configuration with a unique name for the storage. To create multiple storages it is necessary to create new configurations with different names

![Example Configure](/example/config_example.png)

#### Set item

The 'set item' Node save a value to a key sent in localStorage message field.

![Example Configure](/example/setItem_example.png)

#### Get item

The 'get item' Node get a value from a key sent in localStorage message field.

![Example Configure](/example/getItem_example.png)

#### Clear

The 'clear' Node remove all keys from localStorage.

![Example Configure](/example/clear_example.png)

#### Has item

The 'Has item' Node checks if a key is defined in localstorage

![Example Configure](/example/hasItem_example.png)
