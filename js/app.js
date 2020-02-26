const props = {
    name: 'Um'
};

function App(props) {
    return (<div>
        <Header />
        <Nav />
        <LoginControl />
        <Main name={props.name} />
        <Timer name='A' comment='Nishishishi' needTime={true} />
        <Timer name='B' needTime={false} />
        <GoodBye name={props.name} />
        <Footer />
        <Toggle />
        <ItemList/>
    </div>)
}

function Header(props) {
    return (<header> my header</header>);
}


function Nav(props) {
    return (<nav className="container">
        <ul className="row">
            <li className="col">Spring</li>
            <li className="col">Summer</li>
            <li className="col">Autumn</li>
            <li className="col">Winter</li>
        </ul>
    </nav>);
}


function Main(props) {
    return (<div>
        <div>Hello, {props.name}!</div>
        <div> 2 + 2 = {2 + 2}</div>
    </div>);
}

function Footer(props) {
    return (<footer> my footer</footer>);
}

/**
 * function component
 * @param {*} props 
 */
function GoodBye(props) {
    return (<div>Bye, {props.name}</div>);
}

function Timer(props) {

    if (props.needTime) {
        return (
            <Clock name={props.name} comment={props.comment} />
        );
    } else {
        return (
            <div>You don't need the time Mr {props.name}</div>
        );
    }
}


function LoginButton(props) {
    return (
        <button onClick={props.onClick}>
            Login
      </button>
    );
}

function LogoutButton(props) {
    return (
        <button onClick={props.onClick}>
            Logout
      </button>
    );
}

/**
 * render LoginButton or LogoutButton depending on state
 */
class LoginControl extends React.Component {
    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = { isLoggedIn: false };
    }

    handleLoginClick() {
        this.setState({ isLoggedIn: true });
    }

    handleLogoutClick() {
        this.setState({ isLoggedIn: false });
    }

    render() {
        /*let button;

        if (this.state.isLoggedIn) {
            button = <LogoutButton onClick={this.handleLogoutClick} />;
        } else {
            button = <LoginButton onClick={this.handleLoginClick} />;
        }
*/
        return (<div>
            {this.state.isLoggedIn ? <LogoutButton onClick={this.handleLogoutClick} /> : <LoginButton onClick={this.handleLoginClick} />}
            </div>
        );
    }
}




class Clock extends React.Component {

    constructor(props) {
        super(props);
        this.state = { date: new Date() };

    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        return (
            <div>
                <div>It is now {this.state.date.toLocaleTimeString()}, Mr {this.props.name}. {this.props.comment}</div>
            </div>
        );
    }
}


class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isToggleOn: true };

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(state => ({
            isToggleOn: !state.isToggleOn
        }));
    }

    render() {
        return (
            <button onClick={this.handleClick}>
                {this.state.isToggleOn ? 'ON' : 'OFF'}
            </button>
        );
    }
}

class ItemList extends React.Component {
    constructor(props) {
        super(props);
        this.users = [{name:'A', comment:'Nishishishi',  needTime:true},
        {name:'B', comment:'No Need',  needTime:false},
        {name:'C', comment:'Wahahahaha',}];

        this.items = this.users.map( (user) => <Timer name={user.name} comment={user.comment} needTime={user.needTime}/>)
    }
    
    render() {
        return (<div>
            {this.items}
        </div>);
    }
}

ReactDOM.render(
    App(props),
    document.getElementById('app')
);