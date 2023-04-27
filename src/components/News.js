import React, { Component } from "react";
import Spinner from "./Spinner";
import NewsItem from "./NewsItem";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

    static defaultProps={
      country:'in',
      pageSize:21,
      categoty: 'general'
    }
    static propTypes={
      country: PropTypes.string,
      pageSize: PropTypes.number,
      categoty: PropTypes.string
    }


    constructor(props){
        super(props);
        this.state={
            articles:[],
            loading:false,
            page:1,
            totalResults:0
        }
    }

    // async updateNews(){
    //   let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=243c2fdd5a2f4250b9e220a75f9b215e&${this.state.page}&pageSie=${this.props.pageSize}`;
    //     this.setState({loading:true})
    //     let data = await fetch (url);
    //     let parcedData = await data.json();
    //     // console.log(parcedData);
    //     this.setState({
    //       articles: parcedData.articles,
    //       totalResults: parcedData.totalResults, 
    //       loading:false
    //     });
    // }

    async componentDidMount() { 
      // this.updateNews();
      let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=243c2fdd5a2f4250b9e220a75f9b215e&${this.state.page}&pageSie=${this.props.pageSize}`;
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

    // handlePrevClick=async()=>{
    //     console.log("prev");
    //     let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=243c2fdd5a2f4250b9e220a75f9b215e&page=${this.state.page-1}&pageSie=21`;
    //     this.setState({loading:true})
    //     let data = await fetch (url);
    //     let parcedData = await data.json();
    //     // console.log(parcedData);
    //     this.setState({
    //       articles: parcedData.articles,
    //       page:this.state.page-1,
    //       loading:false
    //   });
    // }
    
    // handleNextClick=async()=>{
    //      if(this.state.page+1 <= Math.ceil(this.state.totalResults/20))
    //      console.log("next");
    //      let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=243c2fdd5a2f4250b9e220a75f9b215e&page=${this.state.page+1}&pageSie=21`;
    //      this.setState({loading:true})
    //      let data = await fetch (url);
    //      let parcedData = await data.json();
    //     //  console.log(parcedData);
    //      this.setState({
    //        articles: parcedData.articles,
    //        page:this.state.page+1,
    //        loading:false
    //      });

    //  }

     fetchMoreData = async() => {
      this.setState({page:this.state.page+1})
      let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=243c2fdd5a2f4250b9e220a75f9b215e&page=${this.state.page}&pageSie=${this.props.pageSize}`;
      this.setState({loading:true})
      let data = await fetch (url);
      let parcedData = await data.json();
      // console.log(parcedData);
      this.setState({
        articles: this.state.articles.concat(parcedData.articles),
        totalResults: parcedData.totalResults, 
        loading:false,
      });
    };


  render() {
    return (
      <>

        
      
        
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">

          
          <div className="row">
            {
                this.state.articles.map((element=>{
                    return <div className="col-md-4">
                    <NewsItem title={element.title} description={element.description} imageUrl ={element.urlToImage} newsUrl = {element.url} />
                  </div>
                }))
            }
            {/* {this.state.loading&&<Spinner/>} */}
          </div>
          </div>
        </InfiniteScroll>
        
    
      </>
    );
  }
}

export default News;
