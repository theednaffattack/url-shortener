import React from 'react';
import ReactDOM from 'react-dom';

import animation from './animation';
import TransitionGroupPlus from 'react-transition-group-plus';
import TodoView from './view'

export default class TodoContainer extends React.Component {
    constructor(props) {
        super(props);
        // this.dom = {};
    }

    <div className="loader" ref={div => this.loaderWrap = div}>
    THIS IS THE LOADER WRAP, PUT THE SPINNER HERE
    <div><button>press me</button></div>
  </div>

    componentDidMount() {
        // this.dom.root = ReactDOM.findDOMNode(this);
        ref={(n) => this.node = n}
    }

    componentWillEnter(cb) {
        animation.show(ref, cb);
    }

    componentWillLeave(cb) {
        animation.hide(ref, cb);
    }

    render() {
        const {
            component,
            id,
            todo,
            edit,
            toggleEdit,
            update,
            ...props
        } = this.props;
        return ( <
            TodoView component = {
                component
            }
            id = {
                id
            }
            todo = {
                todo
            }
            onClick = {
                this.toggleEdit
            }
            onUpdate = {
                update
            } { ...props
            }
            />
        )
    }
}