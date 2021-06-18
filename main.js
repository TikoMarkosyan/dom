class OldDomeElement {

  constructor( tagtype = "div", cssStyle = {} , ...child) {

    this.tagtype = tagtype;
    this.cssStyle = cssStyle;
    this.child = child;

  } 

  OldDraw = () => {

  }

}
class OwnDomElement {
    
    constructor(obj) {

      this.obj = obj;

    }

    draw = () => {

    }
}

class OldDivElement extends OldDomeElement {

  OldDraw = () => {

      const div = document.createElement(this.tagtype);

      for (let key in this.cssStyle) {
        
          div.setAttribute(key, this.cssStyle[key])

      }

      this.child.forEach(children => {
          
        if (typeof children === 'string') {

        div.appendChild(document.createTextNode(children));

        } else {

            if( children === null){
          
              div.appendChild(document.createTextNode(""))

            } else{

                for(let i =0; i<children.length; i++){
                
                  div.appendChild(children[i].OldDraw())

                }

                if( children.length === undefined ) {

                  div.appendChild(children.OldDraw())

                }

            }
          }
      }) 

      return div;
  } 
}

class DivElement extends OwnDomElement {

  draw = () => {

   const { type, attributes, children } =  this.obj.div;

    const div = document.createElement(type);

    for (let key in attributes) {
      
      div.setAttribute(key, attributes[key])

    }

    children.forEach(({ type, attributes, value, children = [] }) => {

      const chiled = document.createElement(type);

      for (let key in attributes) {
      
        chiled.setAttribute(key, attributes[key])

      }
      children.forEach(el => {
      
          const item = document.createElement(el.type);

          item.appendChild(document.createTextNode(value));
          chiled.appendChild(item);

      })
  
      if(children.length === 0){

        chiled.appendChild(document.createTextNode(value === null ? "" : value));
      }

      div.appendChild(chiled);

    })

   return div;
  }

}

  const el = ( type = "div", attributes = {}, children = [] ) => {

      const element = new OldDivElement(type,attributes,children);

      return element;
  }

  const tree1 = el("div", {"class": "some_classname", "id": "some_id"},
    el("span", {}, 'hello')
  );

  document.getElementById("root").appendChild(tree1.OldDraw());

  const tree2 = el("div", {},
    el("ul", {}, [
      el("li", {}, "Item 1"),
      el("li", {}, "Item 2"),
      el("li", {}, "Item 3")
    ])
  );

  document.getElementById("root").appendChild(tree2.OldDraw());

  const tree3 =  el("form", {action: '/some_action'}, [
    el("label", {for: 'name'}, "First name:"),
    el("br", {}, null),
    el("input", {type: 'text', id: 'name', name: 'name', value: "My name"}, null),
    el("br", {}, null),
    el("label", {for: 'last_name'}, "Last name:"),
    el("br", {}, null),
    el("input", {type: 'text', id: 'last_name', name: 'last_name', value: "My second name"}, null),
    el("br", {}, null),
    el("input", {type: 'submit', value: "Submit"}, null),
  ]);
  document.getElementById("root").appendChild(tree3.OldDraw());

  const obj = {
    div:{
      type:"div", 
      attributes: { 
        class: "some_classname", 
        id:"some_id" 
      },
      children:[{type:"span", attributes:{}, value:"hello"}]
    }
  }
  const obj2 = {
    div:{
      type:"div", 
        attributes: { 
          class: "some_classname", 
          id:"some_id" 
        },
        children:[
          {
            type:"ul", 
            attributes:{},
            value:"hello",
            children:[
              {
                type:"li",
                attributes:{}, 
                value:"Item 1"
              },
              {
                type:"li",
                attributes:{}, 
                value:"Item 2"
              },
              {
                type:"li",
                attributes:{}, 
                value:"Item 3"}
              ]
          }
        ] 
    }
  }
  const obj3 = {
    div: {
      type:"form",
      attributes:{action: '/some_action'},
      children: [
        {
          type:"label",
          attributes:{for: 'name'},
          value:"First name:"
        },
        {
          type:"br",
          attributes:{},
          value:null
        },
        {
          type:"input",
          attributes:{type: 'text', id: 'name', name: 'name', value: "My name"},
          value:null
        },
        {
          type:"br",
          attributes:{},
          value:null
        },
        {
          type:"label",
          attributes:{for: 'last_name'},
          value:"Last name:"
        },
        {
          type:"br",
          attributes:{},
          value:null
        },
        {
          type:"input",
          attributes:{type: 'text', id: 'last_name', name: 'last_name', value: "My second name"},
          value:null
        },
        {
          type:"input",
          attributes:{type: 'submit', string: "Submit"},
          value:null
        },
      ]
    }
  }

  const treeobj = new DivElement(obj3);

  document.getElementById("root").appendChild(treeobj.draw());

  // New Version 
  
  const tagType = ( Itemtype = "", domObj = {}, parent = null ,index = 0) => {

    const { type , attributes, children } = domObj;

    switch(Itemtype){
      case "div":

        if(parent === null){
        
          domObj = new DivElem(type,attributes,children);

        }else {

          parent.children[index] = new DivElem(type,attributes,children);

        }
        break;
      case "span":

        if(parent === null){

          domObj = new SpanElem(type,attributes,children);

        }else {

          parent.children[index] = new SpanElem(type,attributes,children);

        }
        break;  
      case "ul":

        if(parent === null){

          domObj = new UlElem(type,attributes,children);

        }else {

          parent.children[index] = new UlElem(type,attributes,children);

        }
        break;  
      case "li":

        if(parent === null){

          domObj = new LiElem(type,attributes,children);

        }else {

          parent.children[index] = new LiElem(type,attributes,children);

        }
        break;  
      case "form":

        if(parent === null){

          domObj = new FormElem(type,attributes,children);

        }else {

          parent.children[index] = new FormElem(type,attributes,children);

        }
        break; 
        case "input":

          if(parent === null){

            domObj = new InputElem(type,attributes,children);

          }else {

            parent.children[index] = new InputElem(type,attributes,children);

          }
          break; 
      case "label":

        if(parent === null){

          domObj = new LabelElem(type,attributes,children);

        }else {

          parent.children[index] = new LabelElem(type,attributes,children);

        }
        break;  
        case "br":

          if(parent === null){

            domObj = new BrElem(type,attributes,children);

          }else {

            parent.children[index] = new BrElem(type,attributes,children);

          }
          break; 
    }
    return domObj
  }


  const elFactory = ( objectTag = {} ) => {
        
      const tag = objectTag.draw();

      const dom = (el) => {

        if( el.children !== undefined ) {
          
          el.children.map(dom);
        }

        tag.appendChild(el.draw());
      
      }

      if( objectTag.children !== undefined ){

      objectTag.children.map(dom);

      }

    return tag;

  }




  const newtree = (obj, parent = null , index = 0) => {
    let res;
    let domObj = obj.hasOwnProperty('div') ? obj.div : obj; 
   
      for (let i in domObj) {

        if ( domObj[i] !== null && typeof domObj[i] =="object"  && i === "children") { 


          newtree(domObj.children[index], domObj, index);

        } else {

          const { type , attributes, children } = domObj;

          if(parent !== null){

            parent.children.map((el,index) => {
             
              res = tagType(el.type,parent.children[index],parent,index++);

            })

          }else {

            res =  tagType(type,domObj,parent,index);

          }

        }
      }

      return res;
  }

  class NewDomeElement {

    constructor( tagtype = "div", attributes = {} , children = []) {
  
      this.tagtype = tagtype;
      this.attributes = attributes;
      this.children = children;
  
    } 
  
    draw = () => {
  
    }
  
  }


  class DivElem extends NewDomeElement {

      draw = () => {
        
      const tag = document.createElement(this.tagtype);

      for (let key in this.attributes) {
        
        tag.setAttribute(key, this.attributes[key])

      }

      if(this.children != undefined){
        
        this.children.map(el => {
    
          tag.appendChild(elFactory(el))

        })
      }

      return tag;

      }
  }

  class InputElem extends NewDomeElement {

    draw = () => {

      const tag = document.createElement(this.tagtype);
        
        for (let key in this.attributes) {
          
          tag.setAttribute(key, this.attributes[key])
    
        }
        if(this.children != undefined){
          
          this.children.map(el => {
          
            tag.appendChild(elFactory(el))

          })
        }

      return  tag;

    }

  }
  
  class UlElem extends NewDomeElement {

      draw = () => {

        const tag = document.createElement(this.tagtype);
          
          for (let key in this.attributes) {
            
            tag.setAttribute(key, this.attributes[key])
              
          }
          if(this.children != undefined){
            
            this.children.map(el => {
            
              tag.appendChild(elFactory(el))
          
            })
          }

        return tag;

      }
  }

  class LiElem extends NewDomeElement {

      draw = () => {

        const tag = document.createElement(this.tagtype);

          for (let key in this.attributes) {
            
            tag.setAttribute(key, this.attributes[key])
      
          }
    
          if(this.children != undefined){
            
            this.children.map(el => {
            
            tag.appendChild(elFactory(el))

            })

          }
    
      return  tag;

      }
  }
  
  class FormElem extends NewDomeElement {

    draw = () => {

      const tag = document.createElement(this.tagtype);

        for (let key in this.attributes) {
        
          tag.setAttribute(key, this.attributes[key])
  
        }

        if(this.children != undefined){
              
            this.children.map(el => {

            tag.appendChild(elFactory(el))

            })
        }

        return  tag;

      }

  }

  class BrElem extends NewDomeElement {

    draw = () => {

      const tag = document.createElement(this.tagtype);

      for (let key in this.attributes) {
       
       tag.setAttribute(key, this.attributes[key])
 
      }
  
      if(this.children != undefined){
          
        this.children.map(el => {
        
          tag.appendChild(elFactory(el))
       
        })
      }
    
      return  tag;

    }

  }
  
  class SpanElem extends NewDomeElement {

    draw = () => {
      
      const tag = document.createElement(this.tagtype);

      for (let key in this.attributes) {
       
       tag.setAttribute(key, this.attributes[key])
 
      }

      if(this.children != undefined){
            
        this.children.map(el => {

          tag.appendChild(elFactory(el))

        })
      }
      
      return  tag;

    }

  }
  class LabelElem extends NewDomeElement {

    draw = () => {

      const tag = document.createElement(this.tagtype);

      for (let key in this.attributes) {
       
       tag.setAttribute(key, this.attributes[key])
 
      }
  
      if(this.children != undefined){
       
      this.children.map(el => {
        console.log(elFactory(el));
        tag.appendChild(elFactory(el))
      
      })
    
    }
       return  tag;
    }

  }

  const res = newtree(obj3, null,0)



  document.getElementById("root").appendChild(res.draw());