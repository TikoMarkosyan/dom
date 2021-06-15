class OwnDomElement {

    constructor( tagtype = "div", cssStyle = {} , ...child) {

        this.tagtype = tagtype;
        this.cssStyle = cssStyle;
        this.child = child;

    }

    draw = () => {

    }
}

class DivElement extends OwnDomElement {

  draw = () => {

    const div = document.createElement(this.tagtype);

    for (let key in this.cssStyle) {
      
        div.setAttribute(key, this.cssStyle[key])

      }

      this.child.forEach(children => {
        
      if (typeof children === 'string') {

       div.appendChild(document.createTextNode(children));

      }
      else {

          if( children === null){
        
            div.appendChild(document.createTextNode(""))

          }else{

            for(let i =0; i<children.length; i++){
            
               div.appendChild(children[i].draw())

            }

            if( children.length === undefined ) {

              div.appendChild(children.draw())

            }

          }
      }
    })

    return div;
}

}

const el = (type, attributes, children) => {

    const element = new DivElement(type,attributes,children);

    return element;
  }

  const tree =  el("form", {action: '/some_action'}, [
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

  document.getElementById("root").appendChild(tree.draw());
 
  const tree2 =
  el("div", {},
    el("ul", {}, [
      el("li", {}, "Item 1"),
      el("li", {}, "Item 2"),
      el("li", {}, "Item 3")
    ])
  );

  document.getElementById("root").appendChild(tree2.draw());
 
  const tree3 =
  el("div", {"class": "some_classname", "id": "some_id"},
    el("span", {}, 'hello')
  );

  document.getElementById("root").appendChild(tree3.draw());