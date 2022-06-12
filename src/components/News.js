import React, { Component } from "react";
import Spinner from "./Spinner";
import NewsItem from "./NewsItem";
import PropTypes from 'prop-types'

export class News extends Component {

    static defaultProps={
      country:'in',
      categoty: 'general'
    }
    static propTypes={
      country: PropTypes.string,
      categoty: PropTypes.string
    }


    constructor(){
        super();
        this.state={
            articles:[],
            loading:false,
            page:1
        }
    }

    async componentDidMount() { 
        let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=243c2fdd5a2f4250b9e220a75f9b215e&page=1&pageSie=20`;
        this.setState({loading:true})
        let data = await fetch (url);
        let parcedData = await data.json();
        // console.log(parcedData);
        this.setState({
          articles: parcedData.articles,
          totalResults: parcedData.totalResults, 
          loading:false
        });
     }

    handlePrevClick=async()=>{
        console.log("prev");
        let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=243c2fdd5a2f4250b9e220a75f9b215e&page=${this.state.page-1}&pageSie=20`;
        this.setState({loading:true})
        let data = await fetch (url);
        let parcedData = await data.json();
        // console.log(parcedData);
        this.setState({
          articles: parcedData.articles,
          page:this.state.page-1,
          loading:false
      });
    }
    
    handleNextClick=async()=>{
         if(this.state.page+1 <= Math.ceil(this.state.totalResults/20))
         console.log("next");
         let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=243c2fdd5a2f4250b9e220a75f9b215e&page=${this.state.page+1}&pageSie=20`;
         this.setState({loading:true})
         let data = await fetch (url);
         let parcedData = await data.json();
        //  console.log(parcedData);
         this.setState({
           articles: parcedData.articles,
           page:this.state.page+1,
           loading:false
         });

     }


  render() {
    return (
      <>

        <div className="container d-flex justify-content-between my-3">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark"onClick={this.handlePrevClick}>&larr; Previous</button>
        <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/20)} type="button" className="btn btn-dark"onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      
        <div className="container my-3">
          <div className="row">
            {
                !this.state.loading && this.state.articles.map((element=>{
                    return <div className="col-md-4">
                    <NewsItem title={element.title} description={element.description} imageUrl ={element.urlToImage} newsUrl = {element.url} />
                  </div>
                }))
            }
            {this.state.loading&&<Spinner/>}
          </div>
        </div>
        {!this.state.loading&&<div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark"onClick={this.handlePrevClick}>&larr; Previous</button>
        <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/20)} type="button" className="btn btn-dark"onClick={this.handleNextClick}>Next &rarr;</button>
        </div>}
      </>
    );
  }
}

export default News;
