var ContentItem = React.createClass({

  render: function(){
    var itemArr = this.props.desc.map(function(item, index){
      if(item.charAt(0) === "*")
        return <pre key={index} className="prettyprint"><code className="prettyprint">{item.substring(1)}</code></pre>
      else
        return <p key={index}>{item}</p>
    });

    return(
      <li>
        {this.props.name}
        {itemArr}
      </li>
    )
  }

});

var Content = React.createClass({

  render: function(){

    var itemsTemplate;

    if(htmlData.length > 0){
      itemsTemplate = htmlData.map(function(item, index){
        return(
          <ContentItem key={item.id} name={item.name} desc={item.desc}/>
        )
      });
    }

    return(
      <ul className="content-container">
        {itemsTemplate}
      </ul>
    )
  }
});

ReactDOM.render(
  <Content />,
  document.getElementById('content')
);