import { h, Component } from 'preact';

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

export default class TodoItem extends Component {
    
    /*
    add properties to `this.`, which is the TodoItem
    the `this.state` also has editText, which we can add
    (i don't know where the constructor is)
    if user has typed in something, save it with the
    onSave() function, and set the state of `this.` to
    the item
    */

    handleSubmit = ()=> {
        let { onSave, onDestroy, todo } = this.props,
            val = this.state.editText.trim();
        if (val) {
            onSave(todo, val);
            this.setState({ editText: val });
        }
        else {
            onDestroy(todo);
        }
    };

    handleEdit = ()=> {
        let { onEdit, todo } = this.props;
        onEdit(todo);
        this.setState({ editText: todo.title });
    };

    toggle = e=> {
        let { onToggle, todo } = this.props;
        onToggle(todo);
        e.preventDefault();
    };

    handleKeyDown = e=> {
        if (e.which===ESCAPE_KEY) {
            let { todo } = this.props;
            this.setState({ editText: todo.title });
            this.props.onCancel(todo);
        }
        else if (e.which===ENTER_KEY) {
            this.handleSubmit();
        }
    };

    handleDestroy = ()=> {
        this.props.onDestroy(this.props.todo);
    };

    componentDisUpdate() {
        let node = this.base && this.base.querySelector('.edit');
        if (node) node.focus();
    };

    /*
    cool stuff:
    - during the edit, it continuously checks for keypresses
    and if either escape or enter is pressed it will perform
    the relevant functions.

    */
    render({ todo:{ title, completed }, onToggle, onDestroy, editing }, { editText }) {
        return (
            <li class={{ completed, editing }}>
                <div class="view">
                    <input
                        class="toggle"
                        type="checkbox"
                        checked={completed}
                        onChange={this.toggle}
                    />
                    <label onDblClick={this.handleEdit}>{title}</label>
                    <button class="destroy" onClick={this.handleDestroy} />
                </div>
                { editing && (
                    <input
                        class="edit"
                        value={editText}
                        onBlur={this.handleSubmit}
                        onInput={this.linkState('editText')}
                        onKeyDown={this.handleKeyDown}
                    />
                )}
            </li>
        );
    }
}