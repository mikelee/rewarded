import React from 'react';
import { fetchData } from '../../utils';

import './todo-item.styles.scss';

import ToggleButton from '../toggle-button/toggle-button.component';
import { Clear } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

interface OwnProps {
    id: number,
    text: string,
    completed: number,
    selectedRewardId: number | null,
    associatedReward: number | undefined,
    fetchTodos: () => void,
    fetchRequirements: () => void,
    fetchTodosForSelection: () => void,
}

type Props = OwnProps;

interface State {
    text: string,
    swipeStart: number | undefined,
    swipeEnd: number | undefined,
    swipeChange: number | undefined
}

class TodoItem extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            text: this.props.text,
            swipeStart: undefined,
            swipeEnd: undefined,
            swipeChange: undefined
        }
    }

    handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        
        this.setState({
            text: value
        });
    }

    handleSwipeStart = (event: React.TouchEvent<HTMLDivElement>) => {
        let x: number = event.changedTouches[0].clientX;

        this.setState({swipeStart: x})
    }
    
    handleSwipeEnd = (event: React.TouchEvent<HTMLDivElement>) => {
        let x: number = event.changedTouches[0].clientX;
        let changeX;

        if (this.state.swipeStart) {
            changeX = x - this.state.swipeStart;
        }

        this.setState({swipeEnd: x});

        if (this.state.swipeStart && changeX) {
            if (changeX <= -75 || 75 <= changeX) {
                this.deleteTodo();
            } else {
                this.setState({swipeChange: 0});
            }
        }
    }

    handleSwipeMove = (event: React.TouchEvent<HTMLDivElement>) => {
        let x: number = event.changedTouches[0].clientX;
        let start: number | undefined = this.state.swipeStart;

        if (start) {
            this.setState({swipeChange: x - start});
        }
    }

    updateTodo = async (event: React.FocusEvent<HTMLFormElement> | React.FormEvent<HTMLFormElement>) => {
        if (event) {
            event.preventDefault();
        }

        const path = '/api/todo/update';
        const method = 'PUT';
        const body = {
            todo_id: this.props.id,
            text: this.state.text
        };

        await fetchData(path, method, body);

        this.props.fetchTodos();
        this.props.fetchRequirements();
    }

    deleteTodo = async (event: React.FormEvent<HTMLFormElement> | undefined = undefined) => {
        if (event) event.preventDefault();

        const path = '/api/todo/delete';
        const method = 'DELETE';
        const body = { todo_id: this.props.id };

        await fetchData(path, method, body);

        this.props.fetchTodos();
        this.props.fetchRequirements();
    }

    toggleTodoCompleted = async () => {
        const path = '/api/todo/complete';
        const method = 'POST';
        const body = { todo_id: this.props.id };

        await fetchData(path, method, body);

        this.props.fetchTodos();
        this.props.fetchRequirements();
    }

    createOrDeleteRequirement = async () => {
        let selected = this.props.selectedRewardId === this.props.associatedReward;

        const path = '/api/requirement/toggle';
        const method = 'POST';
        const body = {
            todoId: this.props.id,
            rewardId: this.props.selectedRewardId,
            selected
        };

        await fetchData(path, method, body);

        this.props.fetchTodosForSelection();
        this.props.fetchRequirements();
    }

    render() {
        const { id, text, completed, selectedRewardId, associatedReward } = this.props;

        return (
            <div
                className='todo' 
                {...window.innerWidth <= 480 &&
                    {
                        onTouchStart: event => this.handleSwipeStart(event), 
                        onTouchEnd: event => this.handleSwipeEnd(event), 
                        onTouchMove: event => this.handleSwipeMove(event)
                    }
                } 
                style={{transform: `translateX(${this.state.swipeChange}px)`}}
            >
                {!selectedRewardId
                ? <ToggleButton type='forTodo' completed={completed} toggleTodoCompleted={this.toggleTodoCompleted} />
                : <ToggleButton type='forRequirement' selectedRewardId={selectedRewardId} associatedReward={associatedReward} completed={completed} toggleRequirement={this.createOrDeleteRequirement} />
                }
                <form className='todo-edit-form' id={`todo-edit-form-${id}`} onBlur={this.updateTodo} onSubmit={this.updateTodo} >
                    <input name='text' className='todo-edit-form-textfield' onChange={this.handleTextChange} placeholder='I want to...' defaultValue={text}/>
                </form>
                {!selectedRewardId
                ?
                    <form className='todo-delete-form' onSubmit={this.deleteTodo}>
                        <IconButton className='todo-icon-button' type='submit'>
                            <Clear className='todo-clear-icon' fontSize='large'/>
                        </IconButton>
                    </form>
                : null
                }
            </div>
        );
    }
}

export default TodoItem;