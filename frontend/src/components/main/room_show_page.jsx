import React from 'react'; 

class RoomShowPage extends React.Component{ 
    constructor(props){ 
        super(props)
    }

    render(){ 
        return( 
            <div>
                <header>
                    <Link to='/rooms'>
                        Back to Rooms
                    </Link>
                </header>
                <p>This is the show page of a Room</p>
                <p>Should have a board in here</p>
            </div>
        )
    }
}

export default RoomShowPage; 