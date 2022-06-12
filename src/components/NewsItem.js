import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, discription,imageUrl,newsUrl}=this.props;
    return (
      <>
      <div className="card" >
  <img src={imageUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{discription}</p>
    <a href={newsUrl} target= "_blank" rel="noreferrer" className="btn btn-primary btn-sm" >Read more</a>
  </div>
</div>
      </>
    )
  }
}

export default NewsItem