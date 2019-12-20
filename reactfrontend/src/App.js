import React from 'react';
import './App.css';
import api from './api';
import PostView from './Components/PostView';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class App extends React.Component {

  constructor(props){
    super(props)
    this.state={
      title:'',
      content:'',
      results:[],
    }
  }

  componentDidMount(){
    this.getPosts()
  }

  async getPosts(){
    const _results=await api.getAllPosts()
    this.setState({results:_results.data})
  }

  handlingChange=(event)=>{
    this.setState({[event.target.name]:event.target.value})
  }

  handlingSubmit=async (event)=>{
    event.preventDefault()
    let result=await api.createPost({title:this.state.title, content:this.state.content})
    console.log("완료", result)
    this.setState({title:'',content:''})
    this.getPosts()
  }

  handlingDelete=async (id)=>{
    await api.deletePost(id)
    this.getPosts()
  }

  render(){
    return (
      <div className="App">
        <Container maxWidth="lg">
          <div className="PostingSection">
            <div className="title">~대나무숲~</div>
              <Paper className="MyPaper">
              <form onSubmit={this.handlingSubmit}>
                <div className="PostingForm">
                  <TextField
                    id="standard-basic"
                    label="title"
                    name="title"
                    value={this.state.title}
                    onChange={this.handlingChange}
                  />
                  <TextField
                    id="standard-basic"
                    label="content"
                    name="content"
                    value={this.state.content}
                    onChange={this.handlingChange}
                    multiline
                    rows="4"
                  />
                </div>
                <div className="Buttons">
                  <Button size="small" type="submit" color="primary">제출</Button>
                </div>
              </form>
            </Paper>
          </div>

          <div className="ViewSection">
            {
              this.state.results.map((post)=>
              <Paper className={'MyPaper'}>
                <PostView key={post.id} title={post.title} content={post.content}/>
                <div className="Buttons">
                  <Button size="small" color="secondary" onClick={(event)=>this.handlingDelete(post.id)}>삭제</Button>
                </div>
              </Paper>
              )
            }
          </div>
        </Container>
      </div>
    );
  }
}

export default App;
