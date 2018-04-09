import React, {Component} from 'react';
import {Button, Icon} from 'antd';

class Main extends Component {

    state = {
        url: 'https://facebook.com/hypebeast',
        keyword: 'Supreme'
    }

    deleteReq = () => {
        console.log('delete')
    }

    componentDidMount() {
        if(!this.props.req.length) {
            console.log('s')
            this.props.history.push('/reqForm')
        }
    }

    render() {
        console.log(this.props)
        return(
            <div className='widget-page'>
                <h2>Your current Lookout  🔍!</h2>
                <h3>Url</h3>
                <a href={this.state.url}>{this.state.url}</a>
                <h3>Keyword</h3>
                <p>{this.state.keyword}</p>
                <Button className='buttonRight' type="danger" onClick={this.deleteReq}><Icon type="meh" />Delete</Button>
            </div>
        )
    }
}


export default Main