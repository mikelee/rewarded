import React from 'react';

import './to-do-container.styles.scss';

import ToDoItem from '../to-do-item/to-do-item.component';
import AddItem from '../add-item/add-item.component';

class ToDoContainer extends React.Component {
    constructor(props) {
        super(props);

        this.getToDos = this.getToDos.bind(this);

        this.state = {
            to_dos: null,
            currentUser: null
        }
    }

    componentDidMount() {
        this.getToDos();
    }

    getToDos() {
        if (this.props.currentUser) {
            fetch('http://localhost:4444/api', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials' : true
                },
                body: JSON.stringify(this.props.currentUser)
            })
            .then(response => response.json())
            .then(json => this.setState({ to_dos: json }));
        }
    }

    render() {
        return (
            <div className='to-do-container'>
                {this.state.to_dos ? this.state.to_dos.map(to_do => <ToDoItem key={to_do.to_do_id} id={to_do.to_do_id} text={to_do.text} />) : null}
                {this.state.to_dos ? <AddItem updateState={this.getToDos} currentUser={this.props.currentUser} /> : null}
            </div>
        );
    }
}

export default ToDoContainer;