'use strict'
var modalx = (function() {
  var modal;
  
  // 生成popup中子节点
  function createPopupElement() {
      var header,
      body,
      footer,
      close;
      
      close = document.createElement('div');
      close.setAttribute('class', 'modal-close');
      close.innerText = 'x';
      header = document.createElement('div');
      header.setAttribute('class', 'modal-header');   
      header.appendChild(close);
      
      body = document.createElement('div');
      body.setAttribute('class', 'modal-body');
      
      footer = document.createElement('div');
      footer.setAttribute('class', 'modal-footer');  
      
      return [header, body, footer];
    }
  
  // body节点结尾插入modal元素
  function insertModalElement() {
    var fragment,
    cover,
    popup,
    childArr;
    
    
    // 生成模态遮罩和对话框元素，并设置样式
    fragment = document.createDocumentFragment();
    
    cover = document.createElement('div');
    cover.setAttribute('class', 'modal-cover');
    popup = document.createElement('div');
    popup.setAttribute('class', 'modal-popup');
    
    childArr = createPopupElement();
    childArr.forEach(function (item) {
      popup.appendChild(item);
    });
    
    // 向body子节点末尾添加模态遮罩和对话框元素
    fragment.appendChild(cover);
    fragment.appendChild(popup);
    document.body.appendChild(fragment);
    
    return {
      cover: cover,
      popup: popup,
      header: childArr[0],
      body: childArr[1],
      footer: childArr[2]
    }
  }
  // 校验对象是不是函数
  function isFunction(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1) === 'Function';
  }
  
  // 创建modal对象
  function createModalObj() {
    modal = insertModalElement();
    
    modal.show = function (covered, callback) {
      if (covered) {
        this.cover.style.display = 'block';
      } 
      this.popup.style.display = 'block';
      isFunction(callback) && callback();
    };
    modal.hide = function (callback) {
      this.popup.style.display = 'none';
      this.cover.style.display = 'none';
      isFunction(callback) && callback();
    };
    modal.destroy = function () {
      var body = document.body;
      body.removeChild(this.cover);
      body.removeChild(this.popup);
    };
  }
  
  // modal按钮处理
  function insertButtons(options) {
    var okNode,
    cancelNode,
    okText,
    cancelText;
    
    document.querySelector('.modal-close').onclick = function () {
      modal.hide();
    }
    
    if (options.ok !== false) {
      okText = options.okValue || 'ok',
      okNode = document.createElement('button');
      okNode.setAttribute('class', 'modal-ok-button');
      okNode.onclick = function () {
        if (!isFunction(options.ok) || options.ok() !== false) {
            modal.hide();
        } 
      };
      okNode.innerText = okText;
      modal.footer.appendChild(okNode);
    }
    
    if (options.cancel !== false) {
      cancelText = options.cancelValue || 'cancel';
      cancelNode = document.createElement('button');
      cancelNode.setAttribute('class', 'modal-cancel-button');
      cancelNode.onclick = function () {
        if (!isFunction(options.cancel) || options.cancel() !== false ) {
          modal.hide();
        }
      };
      cancelNode.innerText = cancelText;
      modal.footer.appendChild(cancelNode);
    }  
  }
  
  // 初始化对话框的个性化配置
  function initPopupSettings(options) {
    var titleNode;
    if (options.title) {
      titleNode = document.createElement('p');
      titleNode.setAttribute('class', 'modal-title');
      titleNode.innerText = options.title;
      modal.header.appendChild(titleNode);
    }
    if (options.content) {
      modal.body.innerHTML = options.content;
    }
    if (options.width) {
      modal.popup.style.width = options.width;
    }
    if (options.height) {
      modal.popup.style.height = options.height;
    }
    if (options.quickClose) {
      modal.cover.onclick = function () {
           modal.hide();
      }
    }
    insertButtons(options);
  }
  /** 初始化modal配置
   *  @param {string} options.title modal标题
   *  @param {string} options.content modal内容，可以为html
   *  @param {string} options.width modal宽度
   *  @param {string} options.height modal高度
   *  @param {bool} options.quickClose 点击空白快速关闭
   *  @param {bool} options.ok 确认按钮callback，设置false隐藏按钮
   *  @param {bool} options.okValue 确认按钮显示文本
   *  @param {bool} options.cancel 取消按钮callback，设置false隐藏按钮
   *  @param {bool} options.cancelValue 取消按钮显示文本
   */ 
  function init(options) {
    options = options || {};
    if (!modal){
      createModalObj();
    }
    initPopupSettings(options);
    
    return modal;
  }
  
  return init;
})();