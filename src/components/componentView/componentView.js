import React from 'react';
import { Card, Tooltip, Modal  } from 'antd';
import 'antd/es/card/style/index.css';
import 'antd/es/tooltip/style/index.css';
import 'antd/es/modal/style/index.css';
import 'antd/es/button/style/index.css';

export default class ComponentView extends React.Component {
    state = { visible: false, style: {}, tempStyle:'' };

    componentWillReceiveProps(nextProps){
        if(nextProps.style!==this.props.style){
          this.setState({style: nextProps.style });
        }
      }
    
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    
    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
            style: (this.state.tempStyle==="")?this.state.style:this.state.tempStyle
        });
    };
    
    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    onChange = (event) => {
        this.setState({ tempStyle: event.target.value });
    };

    renderElements = () => {
        console.log(typeof(this.state.style));
        const style = (typeof this.state.style === 'string')?JSON.parse(this.state.style):this.state.style;
        switch(this.props.selectedComponent) {
            case "button":
                    return <button style={style}>Button</button>
            case "h1":
                    return <h1 style={style}>Heading 1</h1>
            case "h2":
                    return <h2 style={style}>Heading 2</h2>
            case "h3":
                    return <h3 style={style}>Heading 3</h3>
            default:
                return <div></div>
        }
    }

    getUsageData = () => {
        const usageArr = this.props.usage;
        const usageList = usageArr?usageArr.map((lineItem, index) => {
            return <li key={index}>{lineItem}</li>
        }):<li></li>;
        return (<ul>{usageList}</ul>);
    }

    renderModal = () => {
        return this.state.visible?<Modal
            title="Basic Modal"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
        >
            <textarea rows={10} cols={30} defaultValue={JSON.stringify(this.state.style).replace(/",/g,'",\n')} 
            onChange={(event) => this.onChange(event)}></textarea>
        </Modal>:null;
    }

    render() {
        if(this.props.selectedComponent === '') {            
            return(<div className="componentView">Please select an atom element.</div>);
        }
        
        return(
            <div className="componentView">
                <Card title={this.props.selectedComponent}>
                    <p
                    style={{
                        fontSize: 14,
                        color: 'rgba(0, 0, 0, 0.85)',
                        marginBottom: 16,
                        fontWeight: 500,
                    }}
                    >
                        {this.renderElements()}
                    </p>
                    <Card type="inner" title="Description" 
                        extra={
                            <div>
                                <button className="linkButton"  onClick={this.showModal} style={{margin: '20px'}}>Edit</button>
                                <Tooltip placement="topRight" title={this.getUsageData}>
                                    <button className="linkButton" href="#">Usage</button>
                                </Tooltip></div>
                            }
                    >
                        <pre><code>{JSON.stringify(this.state.style).replace(/",/g,'",\n') }</code></pre>
                        
                    </Card>
                </Card>
                {this.renderModal()}
            </div>
        );
    }
}