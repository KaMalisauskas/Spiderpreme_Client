import React, {Component} from 'react'
import { Form, Input, Button } from 'antd';
import '../App.css';
import 'antd/dist/antd.css';
import axios from 'axios';
import LogoutButton from './LogoutButton'
const FormItem = Form.Item;


class ReqForm extends Component {
    state = {
        loading: false,
    };
    async componentDidMount() {
        try{
            const RES = await fetch(`https://spiderpremeclient.herokuapp.com/getRequest/${localStorage.getItem('username')}`)

            const RESJSON = await RES.json()

            if(RESJSON.success) {
                this.props.history.push('/')
            }

        } catch (err) {
            console.error(err)
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {

            if (!err) {

                if(!values.Url.includes('https://facebook.com')) return alert('Wrong Url')

                this.setState({ loading: true });

                try{

                    await axios.post('https://spiderpremeclient.herokuapp.com/addRequest', {
                        id: localStorage.getItem('id'),
                        url: values.Url,
                        keyword: values.Keyword
                    });

                    this.setState({ loading: false });

                    this.props.history.push('/');

                } catch(err) {

                    alert('Something went wrong')

                    this.setState({ loading: false });

                    console.error(err)
                }


            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='widget-page'>
                <LogoutButton />
                <h3>You're logged on!!</h3>
                <p className='center'>Enter you Requested input to begin!</p>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem>
                        {getFieldDecorator('Url', {
                            rules: [{ required: true, message: 'Please input your requested URL!' }],
                        })(
                            <Input size="small" placeholder="Requested Url" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('Keyword', {
                            rules: [{ required: true, message: 'Please input your requested Keyword!' }],
                        })(
                            <Input size="small" placeholder="Keyword" />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button loading={this.state.loading} size="small" type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

export default Form.create()(ReqForm)