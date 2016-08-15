

var MenuItem = React.createClass({

  render: function(){
    return(
      <li ref={this.props.name}>
        {this.props.name}
      </li>
    )
  }

});

var SidebarMenu = React.createClass({

  render: function(){

    var itemsTemplate;

    if(arrayData.length > 0){
      itemsTemplate = arrayKeys.map(function(item, index){
        return(
          <MenuItem ref={item} key={index} name={item} />
        )
      });
    }

    return(
      <ul className="menu-container">
        {itemsTemplate}
      </ul>
    )
  }
});

ReactDOM.render(
  <SidebarMenu />,
  document.getElementById('sidebar-menu')
);