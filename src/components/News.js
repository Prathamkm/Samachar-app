import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
    constructor(){
        super();
        this.state={
            articles:[],
            loading:false,
            page:1
        }
    }

    async componentDidMount() { 
        let url ="https://newsapi.org/v2/top-headlines?country=in&apiKey=593f5f87fd7740ca81ece1ce29b7937b&page=1";
        let data = await fetch (url);
        let parcedData = await data.json();
        console.log(parcedData);
        this.setState({articles: parcedData.articles});
     }

    handlePrevClick=async()=>{
        console.log("prev");
         let url =`https://newsapi.org/v2/top-headlines?country=in&apiKey=593f5f87fd7740ca81ece1ce29b7937b&page=${this.state.page-1}`;
        let data = await fetch (url);
        let parcedData = await data.json();
        console.log(parcedData);
        this.setState({
            page:this.state.page-1,
            articles: parcedData.articles
        });
    }
    
    handleNextClick=async()=>{
         console.log("next");
         let url =`https://newsapi.org/v2/top-headlines?country=in&apiKey=593f5f87fd7740ca81ece1ce29b7937b&page=${this.state.page+1}`;
        let data = await fetch (url);
        let parcedData = await data.json();
        console.log(parcedData);
        this.setState({
            page:this.state.page+1,
            articles: parcedData.articles
        });

     }


  render() {
    return (
      <>

        <div className="container d-flex justify-content-between my-3">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark"onClick={this.handlePrevClick}>&larr; Previous</button>
        <button type="button" className="btn btn-dark"onClick={this.handleNextClick}>Next &rarr;</button>
        </div>

        <div className="container my-3">
          <div className="row">
            {
                this.state.articles.map((element=>{
                    return <div className="col-md-4">
                    <NewsItem title={element.title} description={element.description} imageUrl ={element.urlToImage} newsUrl = {element.url} />
                  </div>
                }))
            }
          </div>
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark"onClick={this.handlePrevClick}>&larr; Previous</button>
        <button type="button" className="btn btn-dark"onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </>
    );
  }
}

export default News;
