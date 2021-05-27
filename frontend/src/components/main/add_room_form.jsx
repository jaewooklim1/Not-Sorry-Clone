import React from 'react'; 

class AddRoom extends React.Component{ 
    constructor(props){ 
        super(props); 
        this.state= this.props.room; 
        this.handleSubmit=this.handleSubmit.bind(this); 
    }

    handleSubmit(e){ 
        e.preventDefault();
        const room= Object.assign({}, this.state);
        this.props.createRoom(room);
        this.props.closeModal();
    }

    update(field){ 
        return e=> { 
            this.setState({[field]: e.currentTarget.value})
        }
    }

    render(){ 
        return ( 
            <div>
                <h2>Create a New Room</h2>
                <form onSubmit={this.handleSubmit}>
                    <label> Room Name
                        <input type="text" value={this.state.roomname} onChange={this.update('roomname')}  />
                    </label> 
                    <input type="submit" value="Create Room" />
                </form>
            </div>
        )
    }
}
export default AddRoom 