var SubMenu = React.createClass({

  render: function(){
    var subTemplate = this.props.prop.map(function(item, index){
      return (<li className="subMenuItem" key={index} ref={item}>{item}</li>);
    });

    return(
      <ul className="subMenu">
        {subTemplate}
      </ul>
    )
  }
});

var MenuItem = React.createClass({

  render: function(){
    return(
      <li className="menuItem">
        {this.props.name}
        <SubMenu prop={this.props.prop}/>
      </li>
    )
  }

});

var SidebarMenu = React.createClass({

  render: function(){
    var itemsTemplate;

    if(htmlData.length > 0){
      itemsTemplate = htmlData.map(function(item, index){
        var props = (item.prop !== undefined) ? item.prop : [];
        return( <MenuItem ref={item.main} key={item.id} name={item.name} prop={props}/> )
      });
    }

    return(
      <ul className="menu">
        {itemsTemplate}
      </ul>
    )
  }
});

ReactDOM.render(
  <SidebarMenu />,
  document.getElementById('sidebar-menu')
);