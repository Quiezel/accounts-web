import React, {Component} from 'react';
import {Button, ButtonGroup, Container, Table} from 'reactstrap';
import AppNavbar from './AppNavbar';
import {Link} from 'react-router-dom';

class UsuarioLista extends Component{
	constructor(props){
		super(props);
		this.state = {usuarios:[], isLoading: true};
		this.remove = this.remove.bind(this);
	}

	componentDidMount(){
		this.setState({isLoading: true})

		fetch('api/usuarios')
		.then(response => response.json())
		.then(data => this.setState({usuarios: data, isLoading: false}));
	}

	async remove(id) {
		try{
		await fetch(`/api/usuario/${id}`,{
			method: 'DELETE',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}).then(() =>{
			let usuariosActualizados = [...this.state.usuarios].filter(i => i.id !== id);
			this.setState({usuarios: usuariosActualizados});
		});
	}catch(e){
		alert(e.message);
	}
	}

	render(){
		const {usuarios, isLoading} = this.state;

		if (isLoading) {
			return <p>Cargando...</p>
		}

		const usuariosLista = usuarios.map(usuario => {
			return <tr key={usuario.id} >
			<td style={{witheSpace: 'nowrap'}} >{usuario.userName}</td>
			<td>{usuario.id}</td>
			<td>{usuario.email}</td>
			<td>{usuario.cuentas.map(cuenta => {
				const data = `${cuenta.nombre || ''}-${cuenta.tipo || 'No disponible'}`;
				return <div key={cuenta.id} >{data}</div>
			})}</td>
			<td>
			<ButtonGroup>
				<Button size="sm" color="primary" tag={Link} to={"/usuarios/" + usuario.id} >Edit</Button>
				<Button size="sm" color="danger" onClick={() => this.remove(usuario.id)} >Delete</Button>
			</ButtonGroup></td>
			</tr>
		});

		return(
			<div>
				<AppNavbar/>
				<Container 	fluid>
					<div className="float-rigth">
						<Button color="success" tag={Link} to="/usuarios/add" >Agregar Usuario</Button>
					</div>
					<h3>Usuarios</h3>
					<Table className="mt-4">
						<thead>
							<tr>
								<th width="15%" >Usuario</th>
								<th width="15%" >Id</th>
								<th width="20%">Email</th>
								<th>Cuentas</th>
								<th width="15%" >Acciones</th>
							</tr>
						</thead>
						<tbody>
							{usuariosLista}
						</tbody>
					</Table>
				</Container>
			</div>
			);
	}
}

export default UsuarioLista