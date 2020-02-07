import React from 'react';
import { Menu, Icon } from 'antd';
import 'antd/es/menu/style/index.css';

const { SubMenu } = Menu;
const elements = [{group: 'Buttons', type:['button']}, {group: 'Typography', type:["h1","h2","h3"]}];

export default class ComponentList extends React.Component {

    data = this.props.data;

    renderMenuItems = (jsn) => {        
        const menuItem = jsn.map((item, index) => {
            const key = item.type + '_' + index;
            return(<Menu.Item key={key} styleitem={item.styles} value={item.type} usage={item.usage}>{item.type}</Menu.Item>)
        })
        return menuItem;
    }

    renderComponentList = () => {
        const list = elements.map((elementObj,index) => {
            return <Menu.ItemGroup key={index} title={elementObj.group}>
            {elementObj.type.map((item) => {                                    
                    return this.renderMenuItems(this.props.data.filter((element) => {
                        return (element.type === item)
                    }))  
            })}
            </Menu.ItemGroup>
        });
        return list;
    }
    
    render() {
        const menu = this.renderComponentList();
        return(
            <Menu
                onClick={this.props.onSelect}
                style={{ width: 256}}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
            >
                <SubMenu
                    key="sub1"
                    title={
                        <span>
                        <Icon type="appstore" />
                        <span>Atoms</span>
                        </span>
                    }
                >
                    {menu}
                </SubMenu>
            </Menu>
        );
    }
}
