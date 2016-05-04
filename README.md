# modalx
> This is a moal dialog without jQuery, and it is used to show a dialog.

## Usage

```javascript
<link rel="stylesheet" href="./ui-modal.css">
<script src="./modal.js"></script> 

var m = modalx({
    title: 'Hello modalx',
    content: 'Here is content',
});
m.show();
```
##API

#### Options

##### title  {string}
modal's title.
 
##### content {string}
modal's content, you can use html
 
##### width {string}
modal's width, default: 400px
 
##### height {string}
modal's height default: 250px

##### quickClose {bool}
close modal when click blank, default:false
 
##### ok {object}
ok's callback, hide this button by use false

##### okValue {string}
ok button's value, default: ok

##### cancel {string} #####
cancel's callback, hide this button by use false

##### cancelValue {string} #####
cancel button's value, default: cancel

### `` show(covered, callback) ``
show modal

there is a shade when covered is true. 

### `` hide(callback) ``
hide modal

### `` destroy() ``
remove modal element
