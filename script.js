class User extends React.Component {
	render() {
		return (
			<div style={{textAlign: 'center', padding: '5px', borderColor: '#7FFF00', borderWidth: '1px', borderStyle: 'solid', margin: '2px 0px 2px 0px', borderRadius: '10px', width: '250px', height: '150px'}}>
				<a href={this.props.user.html_url} target="_blank" style={{textDecoration: 'none', color: 'black', marginTop: '15px', textAlign: 'center'}}>
					<img src={this.props.user.avatar_url} style={{maxWidth: '100px'}}/>
					<p style={{margin: '0px', padding: '2px 0px 2px 0px'}}>{this.props.user.login}</p>
				</a>
		  	</div>
		);
	}
}

class UsersList extends React.Component {
	get users() {
		return this.props.users.map(user => <User key={user.id} user={user}/>);
	}

	render() {
		return (
			<div style={{margin: 'auto', width: '50%'}}>
				{this.users}
			</div>
		);
	}
}


class App extends React.Component {
	constructor() {
		super();
		this.state = {
		  searchText: '',
		  users: []
		};
	}

	onChangeHandle(event) {
		this.setState({searchText: event.target.value});
	}

	onSubmit(event) {
		event.preventDefault();
		const {searchText} = this.state;
		const url = `https://api.github.com/search/users?q=${searchText}`;
		fetch(url)
		  .then(response => response.json())
		  .then(responseJson => this.setState({users: responseJson.items}));
	}

	render() {
		return (
		  	<div>
				<form onSubmit={event => this.onSubmit(event)} style={{margin: '5px 0px 5px 0px'}}>
			  		<label htmlFor="searchText">Search by user name</label>
			  		<input
						type="text"
						id="searchText"
						onChange={event => this.onChangeHandle(event)}
					value={this.state.searchText}/>
				</form>
				<UsersList users={this.state.users}/>
		  	</div>
		);
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('root')
);
