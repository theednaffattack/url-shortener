import React from 'react';
import TransitionGroupPlus from 'react-transition-group-plus';
import TodoContainer from '../item/container';

const Todos = ({
    todos,
    ...props
  }) => ( < TransitionGroupPlus component = "ul" > {
      todos && Object.keys(todos).map((key) => {
          const todo = todos[key];
          return ( < TodoContainer component = "li"
            key = {
              key
            }
            id = {
              id
            }
            todo = {
              todo
            } { ...props
            }
            />)
          })
      } < /TransitionGroupPlus>)