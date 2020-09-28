import React, { Component } from 'react'
import {Rating,Item, Message} from 'semantic-ui-react'
import api from '../../api';

export default class Reviews extends Component {
    constructor(props){
        super(props);
        this.state={
            reviews:[]
        }
    }

    componentDidMount(){
        api.review.getByUser(this.props.location.state.id).then(res => this.setState({reviews: res})).catch( err => { console.log(err); })
    }
    render() {
        return (

            <div >
                <Item.Group   style={{ margin:'auto', width:'75%'}} >
                {this.state.reviews.map( (r) =>
                <Item style={{margin:'10px', borderRadius:'20px', padding:'10px', backgroundColor:'white'}}>
                <Item.Content style={{margin:'20px'}}>
                <Item.Header>
                    <Rating 
                            id='stars'
                            name='rstars'
                            icon='star' 
                            defaultRating={r.rstars} 
                            maxRating={5} 
                            />
                </Item.Header>
                <br/>
                <br/>
                <Item.Header as='a'>Title: {r.rtitle}</Item.Header>
                <Item.Description>Description: {r.rdesc}</Item.Description>
                <br/>
                <Item.Meta>Submitted on: {r.rdate.split('T')[0]}</Item.Meta>
                <br/>
                <hr style={{
                        color: 'teal',
                        backgroundColor: 'teal',
                        height: 2
                    }}/>
                </Item.Content>
                
                </Item>
                )}
                
                </Item.Group>
                { this.state.reviews.length===0 &&
                <Message negative>
                    <Message.Header>We're sorry!</Message.Header>
                        <p>This user has no reviews!</p>
                </Message> }
            </div>
        )
    }
}


