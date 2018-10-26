import * as React from 'react';
import './index.styl';

interface IProps {
    filter: string;
    left: number;
    handleTodoListFilter: (condition: string) => void;
    handleClearCompleted: () => void;
}

class Tabs extends React.PureComponent<IProps, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            tabs: ['all', 'active', 'completed']
        };
        this.handleTodoListFilter = this.handleTodoListFilter.bind(this);
        this.handleClearCompleted = this.handleClearCompleted.bind(this);
    }

    public handleTodoListFilter(condition: string) {
        this.props.handleTodoListFilter(condition);
    }

    public handleClearCompleted() {
        this.props.handleClearCompleted();
    }

    public render() {
        return (
            <div className="helper">
                <span className="left">{this.props.left} items left</span>
                <span className="tabs">
                    {
                        this.state.tabs.map((ele: any) => <span className={this.props.filter === ele ? 'state actived' : 'state'} onClick={() => this.handleTodoListFilter(ele)} key={ele}>{ele}</span>)
                    }
                </span>
                <span className="clear" onClick={this.handleClearCompleted}>Clear Completed!</span>
            </div>
        );
    }
}

export default Tabs;