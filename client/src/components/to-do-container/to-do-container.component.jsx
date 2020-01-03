import React from 'react';

import './to-do-container.styles.scss';

import ToDoItem from '../to-do-item/to-do-item.component';

class ToDoContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            to_dos: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:4444/api')
        .then(response => response.json())
        .then(json => this.setState({ to_dos: json }))
    }

    render() {
        return (
            <div className='to-do-container'>
                {this.state.to_dos.map(to_do => <ToDoItem text={to_do.text} key={to_do.to_do_id} />)}
            </div>
        );
    }
}

export default ToDoContainer;