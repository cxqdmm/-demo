import React, { Component  } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
function iiHOC(WrappedComponent) {
    return class Enhancer extends WrappedComponent {
      constructor(props) {
          super(props)

      }
      show() {
          console.log(1)
      }
      render() {
        const elementsTree = super.render()
        let newProps = {gg: 'may the force be with you'};
        const props = Object.assign({}, this.props, newProps)
        const newElementsTree = React.cloneElement(elementsTree, props, elementsTree.props.children)
        return newElementsTree
      }
    }
  }
@iiHOC
class Hell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text:'22'
        }
    }
    componentDidMount () {
        document.querySelector('#testEvent').addEventListener('click', (e)=>{
            console.log('dom event');
            console.log(e);
        })
    }
    componentDidUnMount () {
        document.querySelector('#testEvent').removeEventListener('click');
    }
    handleClick (e) {
       var a = {'name': 'hello'}
       if ('name' in a) {console.log(1)}
    }
    render() {

        return (
            <div>
              <div onClick={(e) => this.handleClick(e)}>Test React Event</div>
              <div id='testEvent'>Test dom Event</div>
              <label htmlFor="">{this.context.test}</label>
        </div>
        )
    }
}
Hell.contextTypes = {
    test: PropTypes.string
};
class Parent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 1,
        }
    }
    getChildContext() {
        return {test: "hello"};
    }
    render() {

        return (
            <div>
                <label>{this.state.number}</label>
              {this.props.children}
            </div>
        )
    }
}
Parent.childContextTypes = {
    test: PropTypes.string
};
ReactDOM.render(
    <Parent><Hell ji="uu" gg="oo"></Hell></Parent>,
    document.getElementById('demo')
);