import React from 'react';
import { connect } from 'react-redux';
import ComponentList from './../components/componentList/componentList';
import ComponentView from './../components/componentView/componentView';
import { GET_STYLE, UPDATE_STYLE } from '../actions';
import { Icon  } from 'antd';
import 'antd/es/icon/style/index.css';

class Styles extends React.Component {
    selectComponent = e => {
        this.props.elementClick(e.item.props.id , e.item.props, this.props.data);
    }

    updateRecord = (id, record) => {
        this.props.updateRecord(id, record, this.props.data);
    }

    generateStylesheet = (data) => {
        // this.props.generateStylesheet(data);
        let strStyle = '';
        data.map((item)=>{
            strStyle += "."+item.type+"_"+item.id;
            strStyle += JSON.stringify(item.styles).replace(/",/g,'";\n');
            strStyle += "\n\n";
            return strStyle;
        });
        const element = document.createElement("a");
        const file = new Blob([strStyle], {type: 'text/css'}, {rel: 'stylesheet'});
        element.href = URL.createObjectURL(file);
        element.download = "myStylsheet.css";
        document.body.appendChild(element);
        element.click(); 
    }

    render() {
        const styleData  = (this.props.data === undefined)?[]:this.props.data;
        const data = styleData.length > 0? (
            <div className="App">
            <header className="App-header">
                <h1>CSS Guidelines</h1>
                <div style={{textAlign: 'right',width:'100%',marginRight: '50px'}}>
                    <Icon title="Download stylesheet" onClick={()=>{this.generateStylesheet(styleData)}} style={{fontSize: '30px'}} type="vertical-align-bottom" />
                </div>
            </header>
            <section className="flex-container">

            <ComponentList data={styleData} onSelect={this.selectComponent}  />
            <ComponentView 
                data={styleData} 
                selectedComponent={this.props.element} 
                style={this.props.style}
                usage={this.props.usage}
                onEdit={this.updateRecord}
                id={this.props.id}
            /> 
            
            </section>
        </div>
        ): null;

        return data;

    }
}

const mapStateToProps = state => {
    return {
        data: state.data,
        element: state.element,
        style: state.style,
        usage: state.usage,
        id: state.id
    };
};

function mapDispatchToProps(dispatch) {
    return({
        elementClick: (id, item, data) => {dispatch(getStyle(id, item, data))}, 
        updateRecord: (id, record, data) => {dispatch(updateData(id, record, data))}
    })
}

function getStyle(index, item, data) {
    return { type: GET_STYLE, id: index, element: item.value, style:item.styleitem, usage: item.usage, data }
}

function updateData(id, record, data) {
    return { type: UPDATE_STYLE, id, data, record }
}

export default connect(mapStateToProps, mapDispatchToProps)(Styles);
