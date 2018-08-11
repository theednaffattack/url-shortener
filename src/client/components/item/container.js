import React from 'react';
import ReactDOM from 'react-dom';

import animation from './animation';
import TransitionGroupPlus from 'react-transition-group-plus';
import TodoView from './view'

export default class TodoContainer extends React.Component {
    constructor(props) {
        super(props);
        this.dom = {};
    }

    componentDidMount() {
        this.dom.root = ReactDOM.findDOMNode(this);
    }

    componentWillEnter(cb) {
        animation.show(this.dom.root, cb);
    }

    componentWillLeave(cb) {
        animation.hide(this.dom.root, cb);
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