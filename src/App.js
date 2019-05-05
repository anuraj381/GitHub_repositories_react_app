import React from 'react';
import {Card, ListGroup, Row, Col} from 'react-bootstrap'
import './App.css';

let API = 'https://api.github.com/search/repositories?q=';

let initialState = {
    keyword: '',
    repos: []
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
            repos: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //function to fetch the repositories
    fetchProfile(keyword) {
        let url = `${API}/${keyword}`;
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                this.setState(initialState);
                for (let i = 0; i < data.items.length; i++) {
                    //After fetching repos, notify state about the change
                    this.setState(prevState => ({
                        repos: [...prevState.repos, {
                            name: data.items[i].name,
                            avatar: data.items[i].owner.avatar_url,
                            description: data.items[i].description,
                            forks: data.items[i].forks,
                            open_issues: data.items[i].open_issues,
                            link: data.items[i].html_url
                        }]
                    }))
                }
            })
            .catch((error) => console.log('Oops! . There Is A Problem'))
    }

    handleChange(event) {
        this.setState({keyword: event.target.value});
    }

    //submitting the keyword searched to get repositories
    handleSubmit(event) {
        console.log(this.state.keyword);
        event.preventDefault();
        this.fetchProfile(encodeURIComponent(this.state.keyword));
    }

    render() {
        return (
            <div className={"text-center"} style={{margin: "0 auto"}}>
                <form style={{margin: "15px"}} onSubmit={this.handleSubmit}>
                    <label>
                        <input type="text" value={this.state.value} onChange={this.handleChange}/>
                    </label>
                    <input type="submit" value="Search Repositories"/>
                </form>
                <Row>
                    {this.state.repos.map(item => (
                        <Col md={3} style={{marginTop: "10px"}}>
                            <Card>
                                <Card.Img variant="top" src={item.avatar}/>
                                <Card.Body>
                                    <Card.Title>{item.name}</Card.Title>
                                    <Card.Text>
                                        {item.description}
                                    </Card.Text>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>Open Issues: {item.open_issues}</ListGroup.Item>
                                        <ListGroup.Item>Forks: {item.forks}</ListGroup.Item>
                                    </ListGroup>
                                    <Card.Footer className="text-muted">
                                        <a href={item.link}>Go to repository</a>
                                    </Card.Footer>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        );
    }
}

export default App;