import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Button, Container, Form, FormGroup, Input, Label,
	InputGroupAddon, InputGroupText } from 'reactstrap';
import AppNavbar from './AppNavbar';

class UsuarioEditar extends Component{
	emptyItem={
		userName: '',
		email: '',
		password:''
	};

	constructor(props){
		super(props);
		this.state = {
			item: this.emptyItem
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	async componentDidMount(){
		if (this.props.match.params.id !== 'add') {
			const usuario = await( await fetch(`/api/usuario/${this.props.match.params.id}`)).json();
			this.setState({item: usuario});
		}
	}

	handleChange(event){
		const target = event.target;
		const value = target.value;
		const name = target.name;
		let item = {...this.state.item};
		item[name] = value;
		this.setState({item});
	}

	async handleSubmit(event){
		event.preventDefault();
		const {item} = this.state;

		await fetch('/api/usuario', {
			method: (item.id) ? 'PUT' : 'POST',
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(item),
		});
		this.props.history.push('/usuarios');
	}

	render(){
		const {item} = this.state;
		const title = <h2>{item.id ? 'Editar Usuario' : 'Agregar Usuario'}</h2>;

		return (<div>
			<AppNavbar/>
			<Container>
			    {title}
				<Form onSubmit={this.handleSubmit}>
					<FormGroup>
						<Label for="userName">Usuario</Label>
						<Input type="text" name="userName" id="userName" value={item.userName || ''}
							   onChange={this.handleChange} autoComplete="userName" />
					</FormGroup>
					<FormGroup>
						<Label for="email">Email</Label>
						<Input id="email" type="email" name="email" value={item.email || ''} 
							   onChange={this.handleChange} autoComplete="email" />
					</FormGroup>
					<FormGroup>
						<Label htmlFor="pass">Password</Label>
						<Input id="pass" type="password" name="password" value={item.password ||''}
							   onChange={this.handleChange} />
					</FormGroup>
					<FormGroup>
						<Button color="primary" type="submit" >Guardar</Button>{' '}
						<Button color="secondary" tag={Link} to="/usuarios" >Cancelar</Button>
					</FormGroup>
				</Form>
			</Container>
		</div>)
	}
}
export default withRouter(UsuarioEditar);